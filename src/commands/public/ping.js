const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong'),
		
	run (interaction) {
		interaction.reply({ content: 'Pong', ephemeral: true });
	}
};