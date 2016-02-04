//include this in order to add to other files
// var user = require("../models/userModel").User;
//Now you can do Item.find, Item.update, etc
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		lowercase: true
	},
	email: {
		type: String,
		required: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

var User = mongoose.model('User', UserSchema);

module.exports = {
	User: User
}