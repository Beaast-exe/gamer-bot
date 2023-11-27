const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Expulsa um membro do servidor.')
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.addUserOption(option => option
			.setName('membro')
			.setDescription('Membro que será kickado.')
			.setRequired(true))
		.addStringOption(option => option
			.setName('motivo')
			.setDescription('Motivo da expulsão.')
			.setRequired(false)),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async run (interaction, client) {
		const { options } = interaction;

		const user = options.getUser('membro');
		const reason = options.getString('motivo') || `Expulso por: ${interaction.user.tag}`;

		const member = await interaction.guild.members.fetch(user.id);

		if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.KickMembers)) return interaction.reply({ content: 'Não tenho permissão para executar essa ação.', ephemeral: true });

		const errorEmbed = new EmbedBuilder()
			.setColor('#ff0000')
			.setDescription(`Não podes expulsar o membro ${user} por ele ter um cargo superior a ti.`);

		const cantKickUser = new EmbedBuilder()
			.setColor('#ff0000')
			.setDescription(`Não posso expulsar o membro ${user} por ele ter um cargo superior a mim`);

		if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		if (!member.kickable) return interaction.reply({ embeds: [cantKickUser], ephemeral: true });

		await member.kick(reason);

		const embed = new EmbedBuilder()
			.setColor('#ff0000')
			.setDescription(`${user} foi expulso pelo motivo: ${reason}`);
		
		await interaction.reply({ embeds: [embed] });
	}
};