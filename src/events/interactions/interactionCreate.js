const { CommandInteraction, Client } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */
	run (interaction, client) {
		const { customId, values, guild, member } = interaction;

		if (interaction.isUserContextMenuCommand()) {
			const command = client.contextCommands.get(interaction.commandName);
			if (!command) return interaction.reply({ content: 'Outdated Command', ephemeral: true });

			command.run(interaction, client);
		} else if (interaction.isChatInputCommand()) {
			const command = client.commands.get(interaction.commandName);
			if (!command) return interaction.reply({ content: 'Outdated Command', ephemeral: true });

			command.run(interaction, client);
		} else if (interaction.isStringSelectMenu()) {
			if (customId === 'reaction-roles') {
				for (let i = 0; i < values.length; i++) {
					const roleId = values[i];

					const role = guild.roles.cache.get(roleId);
					const hasRole = member.roles.cache.has(roleId);

					switch (hasRole) {
						case true:
							member.roles.remove(roleId);
							break;
						case false:
							member.roles.add(roleId);
							break;
					}
				}

				interaction.reply({ content: 'Os teus cargos foram atualizados.', ephemeral: true });
			}
		} else {
			return;
		}
	}
};