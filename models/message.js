var mongoose = require('mongoose');

//Helper object to help create blueprints of the models
var Schema = mongoose.Schema;

//This is a blueprint
var schema =  new Schema({
    content: {type: String, required: true},
    //Object ID is the internal type of mongoose to store IDs of different objects we store in the MongoDB
    // the ref is necessary as a property to be able to have mongoose make the connection to the User schema model in the database
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

//you export the actual model using mongoose - first argument is the name of hte model, and the second argument is the schema to export
module.exports = mongoose.model('Message', schema);

