var express = require('express');
var router = express.Router();

//Message model
var Message = require('../models/message');

//Making it post to store messages on the server - technically each path here is message/ before the path
router.post('/', function (req, res, next) {

    var message = new Message({
        content: req.body.content
    });

    //Save the message, and pass a callback function to handle errors
    message.save(function(err, result) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        //If there is no error - 201 = everything is OK
        res.status(201).json({
            message: 'Saved message',
            obj: result
        })
    });
});

module.exports = router;
