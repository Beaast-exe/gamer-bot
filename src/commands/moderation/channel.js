const { Message, Client, SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

const welcomeSchema = require('../../models/Welcome');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel')
		.setDescription('Gerencia algum canal')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addSubcommand(subCommand => subCommand
			.setName('duplicate')
			.setDescription('Duplica um canal e copia as suas configurações')
			.addChannelOption(option => option
				.setName('canal')
				.setDescription('Canal para duplicar')
				.setRequired(true))
		),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async run (interaction, client) {
		const { options } = interaction;

		try {
			switch (options.getSubcommand()) {
				case 'duplicate': {
					const originalChannel = options.getChannel('canal');

					if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: 'Não tenho permissão para gerir canais.', ephemeral: true });

					const newChannel = await originalChannel.clone(originalChannel.name);

					const originalWebhooks = await originalChannel.fetchWebhooks().then(webhooks => {
						webhooks.forEach(async webhook => {
							webhook.edit({
								channel: newChannel.id,
								reason: `Canal duplicado por ${interaction.user.tag}`
							});

							await interaction.reply({
								content: 'Canal duplicado com sucesso.\nApagando canal em 5 segundos.',
								ephemeral: true
							});

							setTimeout(async () => {
								await originalChannel.delete(`Canal duplicado por ${interaction.user.tag}`);
							}, 5 * 1000);

						})
					}).catch(console.error);
					break;
				}
			}
		} catch (error) {
			console.log(error);
			return interaction.reply({ content: 'Houve um erro ao usar o comando:', ephemeral: true });
		}
	}
};