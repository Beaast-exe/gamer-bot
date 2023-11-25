const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ChatInputCommandInteraction, Client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('criarverify')
		.setDescription('Seta o canal de verificação')
		.addChannelOption(option => option.setName('channel')
			.setDescription('Send verification embed in this channel')
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

		/**
		 * 
		 * @param {ChatInputCommandInteraction} interaction 
		 * @param {Client} client 
		 */
		async run (interaction, client) {
			const channel = interaction.options.getChannel('channel');
			const verifyEmbed = new EmbedBuilder()
				.setColor('#ff0000')
				.setTitle('Verificação')
				.setDescription('Clica no botão para verificares e receber acesso aos canais.');
			
				const message = channel.send({
					embeds: [verifyEmbed],
					components: [new ActionRowBuilder().setComponents(new ButtonBuilder().setCustomId('verify-button').setLabel('Verificar').setStyle(ButtonStyle.Success))]
				});

				if (!message) {
					return interaction.reply({
						content: 'Houve um erro ao enviar mensagem.',
						ephemeral: true
					});
				}

				return interaction.reply({
					content: 'Verificação criada com sucesso',
					ephemeral: true
				});
		}
};