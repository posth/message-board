var express = require('express');
var router = express.Router();

//importing encryption for password [npm install --save bcryptjs]
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

//sign up 
router.post('/', function (req, res, next) {

    //Creating a new user
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
    });

    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        //201 resource was created
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

//sign in
router.post('/signin', function (req, res, next) {
    //retrieving the user by email
    //Mongoose method to find user by criteria you pass in
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        //If a user isn't found
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'User not found' }
            });
        }

        //we have a user fitting this email address
        //matching passwords the user inputs with the one that is on the DB
        //Use bcrypt to decrypt pass
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            //if it's invalid
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Password does not match'}
            });
        }

        //The user does exist and the right password is matched
        //Creating a token for the client to use in future requests to remind the server they are alread logged in
        //JSON Web Token ->[npm install --save jsonwebtoken ]

        //This generates a new token - takes a payload, 2nd is a secret key, 3rd is config for the token
        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });

        //pass token to the client
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});

module.exports = router;