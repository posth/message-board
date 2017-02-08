var express = require('express');
var router = express.Router();

//importing encryption for password [npm install --save bcryptjs]
var bcrypt = require('bcryptjs');

var User = require('../models/user');

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

module.exports = router;