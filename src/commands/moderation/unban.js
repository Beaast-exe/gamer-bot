const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Remove um banimento do servidor.')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addStringOption(option => option
			.setName('userid')
			.setDescription('Id que será retirado o banimento')
			.setRequired(true)),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async run (interaction) {
		const { options } = interaction;

		const userId = options.getString('userid');

		try {
			await interaction.guild.members.unban(userId, `Desbanido por: ${interaction.user.tag}`);

			const embed = new EmbedBuilder()
				.setColor('#f00000')
				.setDescription(`ID: \`${userId}\` foi desbanido com sucesso.`)
				.setTimestamp();

			await interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.log(error);

			const errorEmbed = new EmbedBuilder()
				.setColor('#ff0000')
				.setDescription('Por favor usa um ID válido para ser desbanido.');
			
			interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}
	}
};