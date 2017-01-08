var express = require('express');
var router = express.Router();

//importing the user model
var User = require('../models/user');

router.get('/', function (req, res, next) {
    //The single page for the Angular 2 application
        res.render('index');
    });

module.exports = router;
/*
router.get('/', function (req, res, next) {
    //access the db and get something
    User.findOne({}, function(err, doc) {
        if(err) {
            return res.send('Error!');
        }
        res.render('node', {email: doc.email});
    });
});

router.post('/', function(req, res, next) {
    var email = req.body.email;

    //Creating an instance of the model for the DB
    var user = new User({
        firstName: 'Marc',
        lastName: 'Posth',
        password: 'super-secret',
        email: email
    });

    //This tells mongoose to store this object in the users collection where the DB itself is configured in the app.js file 
    user.save();
    res.redirect('/');

});
*/

