const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction } = require('discord.js');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('castigar')
		.setDescription('Castiga um membro do servidor.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.addUserOption(option => option
			.setName('membro')
			.setDescription('Membro que será castigado.')
			.setRequired(true))
		.addStringOption(option => option
			.setName('tempo')
			.setDescription('Quanto tempo deve durar o castigo ?')
			.setRequired(true))
		.addStringOption(option => option
			.setName('motivo')
			.setDescription('Qual o motivo do castigo ?')
			.setRequired(false)),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async run (interaction, client) {
		const { guild, options } = interaction;

		const user = options.getUser('membro');
		const member = guild.members.cache.get(user.id);
		const time = options.getString('tempo');
		const convertedTime = ms(time);
		const reason = options.getString('motivo') || `Castigado por: ${interaction.user.tag}`;

		if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply({ content: 'Não tenho permissão para executar essa ação.', ephemeral: true });

		const errorEmbed = new EmbedBuilder()
			.setColor('#ff0000')
			.setDescription(`Não podes castigar o membro ${user} por ele ter um cargo superior a ti.`);

		const wrongTimeEmbed = new EmbedBuilder()
			.setColor('#ff0000')
			.setDescription('Tempo de castigo inválido.');

		const cantModerateUser = new EmbedBuilder()
			.setColor('#ff0000')
			.setDescription(`Não posso castigar o membro ${user} por ele ter um cargo superior a mim`);

		if (member.roles.highest.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== member.id) return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		if (!member.moderatable) return interaction.reply({ embeds: [cantModerateUser], ephemeral: true });

		const successEmbed = new EmbedBuilder()
			.setColor('#ff0000')
			.setDescription(`${user} foi castigado.`)
			.addFields(
				{ name: 'Motivo', value: `${reason}`, inline: true },
				{ name: 'Duração', value: `${time}`, inline: true }
			)
			.setTimestamp();
		
		if (!convertedTime) return interaction.reply({ embeds: [wrongTimeEmbed], ephemeral: true });

		try {
			await member.timeout(convertedTime, reason);

			interaction.reply({ embeds: [successEmbed], ephemeral: true });
		} catch (error) {
			console.log(error);
			
			interaction.reply({ content: `Houve um erro ao castigar o membro: ${user}`, ephemeral: true });
		}
	}
};