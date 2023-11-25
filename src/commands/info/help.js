const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder, Client, ActionRowBuilder, StringSelectMenuBuilder, ComponentType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lista de todos os comandos'),

	/**
	* 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async run (interaction, client) {
		const emojis = {
			info: '📝',
			moderation: '🛠️',
			general: '⚙️'
		};

		const directories = [...new Set(client.commands.map(cmd => cmd.folder))];

		const formatString = str => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;

		const categories = directories.map(dir => {
			const getCommands = client.commands.filter(cmd => cmd.folder === dir).map(cmd => {
				return {
					name: cmd.data.name,
					description: cmd.data.description || 'Não existe descrição para este comando.'
				};
			});

			return {
				directory: formatString(dir),
				commands: getCommands
			};
		});

		const embed = new EmbedBuilder().setColor('#ff0000').setDescription('Por favor escolhe uma categoria no menu abaixo:');
		const components = state => [
			new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
					.setCustomId('help-menu')
					.setPlaceholder('Seleciona uma categoria')
					.setDisabled(state)
					.addOptions(categories.map(cmd => {
						return {
							label: cmd.directory,
							value: cmd.directory.toLowerCase(),
							description: `Comandos da categoria: ${formatString(cmd.directory)}`,
							emoji: emojis[cmd.directory.toLowerCase() || null]
						};
					})))
		];

		const initialMessage = await interaction.reply({
			embeds: [embed],
			components: components(false)
		});

		const filter = interaction => interaction.user.id === interaction.member.id;

		const collector = interaction.channel.createMessageComponentCollector({
			filter,
			componentType: ComponentType.StringSelect
			
		});

		collector.on('collect', interaction => {
			const [directory] = interaction.values;
			const category = categories.find(x => x.directory.toLowerCase() === directory);

			const categoryEmbed = new EmbedBuilder()
				.setColor('#ff0000')
				.setTitle(`Comandos de: ${formatString(directory)}`)
				.setDescription(`Lista de todos os comandos da categoria: ${formatString(directory)}`)
				.addFields(category.commands.map(command => {
						return {
							name: `\`${command.name}\``,
							value: command.description,
							inline: true
						};
					}));
			
			interaction.update({ embeds: [categoryEmbed] });
		});

		collector.on('end', () => {
			initialMessage.edit({ components: components(true) });
		});
	}
};