const { Message, Client, SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require('discord.js');
const { model, Schema } = require('mongoose');

const welcomeSchema = require('../../models/Welcome');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Configura o teu servidor')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addSubcommand(subCommand => subCommand
			.setName('welcome')
			.setDescription('Configura a mensagem de bem-vindo.')
			.addChannelOption(option => option
				.setName('canal')
				.setDescription('Canal para enviar as mensagens de entrada')
				.setRequired(true))
			.addStringOption(option => option
				.setName('mensagem')
				.setDescription('Mensagem para enviar quando alguem entra.')
				.setRequired(true))
			.addRoleOption(option => option
				.setName('cargo')
				.setDescription('Cargo para adicionar aos novos membros.')
				.setRequired(true))),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async run (interaction, client) {
		const { channel, options } = interaction;

		const welcomeChannel = options.getChannel('canal');
		const welcomeMessage = options.getString('mensagem');
		const welcomeRole = options.getRole('cargo');

		if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessagesInThreads)) return interaction.reply({ content: 'Não tenho permissão para enviar mensagens.', ephemeral: true });

		welcomeSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
			if (!data) {
				const newWelcome = await welcomeSchema.create({
					Guild: interaction.guild.id,
					Channel: welcomeChannel.id,
					Message: welcomeMessage,
					Role: welcomeRole.id
				});
			}

			interaction.reply({ content: 'Mensagem de bem-vindo criada com sucesso.', ephemeral: true });
		});
	}
};