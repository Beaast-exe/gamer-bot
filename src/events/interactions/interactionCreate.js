const { CommandInteraction, Client } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */
	run (interaction, client) {
		if (interaction.isUserContextMenuCommand()) {
			const command = client.contextCommands.get(interaction.commandName);
			if (!command) return interaction.reply({ content: 'Outdated Command', ephemeral: true });

			command.run(interaction, client);
		} else if (interaction.isChatInputCommand()) {
			const command = client.commands.get(interaction.commandName);
			if (!command) return interaction.reply({ content: 'Outdated Command', ephemeral: true });

			command.run(interaction, client);
		} else if (interaction.isButton()) {
			const role = interaction.guild.roles.cache.get('989830824151093249');
			return interaction.member.roles
				.add(role)
				.then(member => interaction.reply({
					content: `Recebeste o cargo ${role}`,
					ephemeral: true
				}));
		} else {
			return;
		}
	}
};