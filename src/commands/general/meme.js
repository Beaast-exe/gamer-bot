const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ChatInputCommandInteraction, Client } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Recebe um meme de uma plataforma à escolha')
		.addStringOption(option => option
			.setName('plataforma')
			.setDescription('Plataforma do meme')
			.setRequired(false)
			.addChoices(
				{ name: 'Reddit', value: 'reddit' },
				{ name: 'Giphy', value: 'giphy' }
			)),
	async run (interaction, client) {
		const { guild, options, member } = interaction;

		const platform = options.getString('plataforma');

		async function redditMeme () {
			await fetch('https://www.reddit.com/r/memes/random/.json').then(async res => {
				const meme = await res.json();

				const title = meme[0].data.children[0].data.title;
				const url = meme[0].data.children[0].data.url;
				const author = meme[0].data.children[0].data.author;

				return interaction.reply({
					embeds: [new EmbedBuilder().setColor('#ff0000').setTitle(title).setImage(url).setURL(url).setFooter({ text: author })]
				});
			});
		}

		async function giphyMeme () {
			await fetch('https://www.reddit.com/r/memes/random/.json').then(async res => {

			});
		}
	}
};