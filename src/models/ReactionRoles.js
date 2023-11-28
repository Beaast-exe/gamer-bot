const { model, Schema } = require('mongoose');

const reactionRoles = new Schema({
	guild_id: String,
	roles: Array
});

module.exports = model('ReactionRoles', reactionRoles);