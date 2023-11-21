const { model, Schema } = require('mongoose');

const welcomeSchema = new Schema({
	Guild: String,
	Channel: String,
	Message: String,
	Role: String
});

module.exports = model('Welcome', welcomeSchema);