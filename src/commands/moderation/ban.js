const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bane um membro do servidor.')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addUserOption(option => option
			.setName('membro')
			.setDescription('Membro que será banido.')
			.setRequired(true))
		.addStringOption(option => option
			.setName('motivo')
			.setDescription('Motivo do banimento.')
			.setRequired(false)),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} Client 
	 */
	async run (interaction, client) {
		const { options } = interaction;

		const user = options.getUser('membro');
		const reason = options.getString('motivo') || `Banido por: ${interaction.user.tag}`;

		const member = await interaction.guild.members.fetch(user.id);

		if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({ content: 'Não tenho permissão para executar essa ação.', ephemeral: true });

		const errorEmbed = new EmbedBuilder()
			.setColor('#ff0000')
			.setDescription(`Não podes banir o membro ${user} por ele ter um cargo superior a ti.`);

		const cantBanUser = new EmbedBuilder()
			.setColor('#ff0000')
			.setDescription(`Não posso banir o membro ${user} por ele ter um cargo superior a mim`);

		if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		if (!member.bannable) return interaction.reply({ embeds: [cantBanUser], ephemeral: true });

		await member.ban({ reason });

		const embed = new EmbedBuilder()
			.setColor('#ff0000')
			.setDescription(`${user} foi banido pelo motivo: ${reason}`);
		
		await interaction.reply({ embeds: [embed] });
	}
};