const { Message, Client, SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { model, Schema } = require('mongoose');

const welcomeSchema = require('../../models/Welcome');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Configura o teu servidor')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addSubcommandGroup(subCommandGroup => subCommandGroup
			.setName('welcome')
			.setDescription('Configura a mensagem de bem-vindo do servidor')
			.addSubcommand(subCommand => subCommand
				.setName('create')
				.setDescription('Configura a mensagem de bem-vindo.')
				.addChannelOption(option => option
					.setName('canal')
					.setDescription('Canal para enviar as mensagens de entrada')
					.setRequired(true))
				.addStringOption(option => option
					.setName('titulo')
					.setDescription('Titulo do embed na mensagem de entrar')
					.setRequired(true))
				.addStringOption(option => option
					.setName('mensagem')
					.setDescription('Mensagem para enviar quando alguem entra.')
					.setRequired(true))
				.addRoleOption(option => option
					.setName('cargo')
					.setDescription('Cargo para adicionar aos novos membros.')
					.setRequired(true))
				.addStringOption(option => option
					.setName('imagem')
					.setDescription('Imagem para enviar no embed')
					.setRequired(false)))
			.addSubcommand(subCommand => subCommand
				.setName('preview')
				.setDescription('Vê como está configurada a mensagem de bem-vindo do servidor'))),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async run (interaction, client) {
		const { options } = interaction;

		try {
			switch (options.getSubcommand()) {
				case 'create': {
					const welcomeChannel = options.getChannel('canal');
					const welcomeMessage = options.getString('mensagem');
					const welcomeRole = options.getRole('cargo');
					const titulo = options.getString('titulo');
					const imageUrl = options.getString('imagem') || 'None';

					if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessagesInThreads)) return interaction.reply({ content: 'Não tenho permissão para enviar mensagens.', ephemeral: true });

					const data = await welcomeSchema.findOne({ Guild: interaction.guild.id });
					if (!data) {
						welcomeSchema.create({
							Guild: interaction.guild.id,
							Channel: welcomeChannel.id,
							Message: welcomeMessage,
							Role: welcomeRole.id,
							Title: titulo,
							Image: imageUrl
						});

						interaction.reply({ content: 'Mensagem de bem-vindo criada com sucesso.', ephemeral: true });
					} else {
						try {
							await welcomeSchema.findOneAndUpdate({ Guild: interaction.guild.id }, {
								Guild: interaction.guild.id,
								Channel: welcomeChannel.id,
								Message: welcomeMessage,
								Role: welcomeRole.id,
								Title: titulo,
								Image: imageUrl
							}, { new: true });
			
							interaction.reply({ content: 'Mensagem de bem-vindo atualizada com sucesso.', ephemeral: true });
						} catch (error) {
							console.log(error);
							interaction.reply({ content: 'Houve um erro ao criar/atualizar a mensagem de bem-vindo', ephemeral: true });
						}
					}
					break;
				}

				case 'preview': {
					const data = await welcomeSchema.findOne({ Guild: interaction.guild.id });
					if (!data) return interaction.reply({ content: 'Não existe nenhuma mensagem de bem-vindo neste servidor.' });

					let Message = data.Message || '';
					let Title = data.Title;
					const Image = data.Image;
					const guild = interaction.guild;

					Title = Title.replaceAll('%guild_name%', `${guild.name}`);
					Message = Message.replaceAll('%member_name%', `${interaction.user.username}`);
					Message = Message.replaceAll('%member_mention%', `<@${interaction.user.id}>`);

					const welcomeEmbed = new EmbedBuilder()
						.setColor('#ff0000')
						.setTitle(`${Title}`)
						.setDescription(Message);
					if (Image !== 'None') welcomeEmbed.setImage(Image);

					interaction.reply({ embeds: [welcomeEmbed] });
					break;
				}
			}
		} catch (error) {
			console.log(error);
			return interaction.reply({ content: 'Houve um erro ao usar o comando:', ephemeral: true });
		}
	}
};