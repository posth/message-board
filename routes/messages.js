var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

//Message model
var Message = require('../models/message');
var User = require('../models/user');

//Fetching messages from the database
router.get('/', function (req, res, next) {
    //If you don't pass anything to find function you get all the messages
    Message.find()
        .exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            });
        });
});

// ------------  Every route below here should have a verified user otherwise the routes shouldn't be accessible  ------------------
//On each route request, this method is used
router.use('/', function (req, res, next) {
    //Check if the user is issued a valid token - grabbing it from the request and checking it against our secret key from user.js
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: err
            });
        }
        //Let the request continue if it has a valid token, which is whichever route it requested
        next();
    });
});

//Making it post to store messages on the server - technically each path here is message/ before the path
router.post('/', function (req, res, next) {

    //Decoding the token, it's already valid which is why we decode now, and not verify as done in the previous function
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user
        });

        //Save the message, and pass a callback function to handle errors
        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }

            //pushing the new message from this user onto the messages array of this user in the db
            user.messages.push(result);

            user.save();

            //If there is no error - 201 = everything is OK
            res.status(201).json({
                message: 'Saved message',
                obj: result
            })
        });

    })
});

//Used to change existing messages - passind the id of the message we want to update
router.patch('/:id', function (req, res, next) {
    Message.findById(req.params.id, function (err, message) {
        //Getting the message, and checking for erros
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        //If we don't receive a message
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found',
                error: { message: 'Message not found' }
            });
        }

        //Update the content of the message
        message.content = req.body.content;

        //Save the message
        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            //If there is no error - 201 = everything is OK
            res.status(200).json({
                message: 'Updated message',
                obj: result
            })
        });
    });
});

router.delete('/:id', function (req, res, next) {
    Message.findById(req.params.id, function (err, message) {
        //Getting the message, and checking for erros
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        //If we don't receive a message
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found',
                error: { message: 'Message not found' }
            });
        }

        //Delete the message
        message.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            //If there is no error - 201 = everything is OK
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            })
        });
    });
});

module.exports = router;
