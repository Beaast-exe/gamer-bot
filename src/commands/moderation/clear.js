const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder, Client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Limpa uma quantidade específica de alguem ou algum canal.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addIntegerOption(option => option
			.setName('quantidade')
			.setDescription('Quantidade de mensagens para apagar.')
			.setRequired(true))
		.addUserOption(option => option
			.setName('membro')
			.setDescription('Membro de quem as mensagens serão apagadas.')
			.setRequired(false)),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async run (interaction, client) {
		const { channel, options } = interaction;

		const amount = options.getInteger('quantidade');
		const target = options.getUser('membro');

		const messages = await channel.messages.fetch({ limit: amount + 1 });
		
		const embed = new EmbedBuilder()
			.setColor('#ff0000');

		if (target) {
			let i = 0;
			const filtered = [];

			(await messages).filter(msg => {
				if (msg.author.id === target.id && amount > i) {
					filtered.push(msg);
					i++;
				}
			});

			await channel.bulkDelete(filtered).then(msgs => {
				embed.setDescription(`${client.config.emojis.check} | ${msgs.size} mensagens de ${target} foram limpas com sucesso`);
				interaction.reply({ embeds: [embed], ephemeral: true });
			});
		} else {
			await channel.bulkDelete(amount, true).then(msgs => {
				embed.setDescription(`${client.config.emojis.check} | ${msgs.size} mensagens foram limpas com sucesso`);
				interaction.reply({ embeds: [embed], ephemeral: true });
			});
		}
	}
};