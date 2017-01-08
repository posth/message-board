var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

//This is a blueprint
var schema =  new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    //the unique keyword is taken from 'npm install --save mongoose-unique-validator'
    email: {type: String, required: true, unique: true},
    messages: [{
        //ref tells mongoose that this field holds a connection to another model
        type: Schema.Types.ObjectId, ref: 'Message'
    }]
});

//Unique validator is plugged in here when used for the email property in this model's schema
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);

