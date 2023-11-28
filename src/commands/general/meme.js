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
		const { options } = interaction;

		const platform = options.getString('plataforma');
		const embed = new EmbedBuilder().setColor('#ff0000');

		async function redditMeme () {
			await fetch('https://www.reddit.com/r/memes/random/.json').then(async res => {
				const meme = await res.json();

				const title = meme[0].data.children[0].data.title;
				const url = meme[0].data.children[0].data.url;
				const author = meme[0].data.children[0].data.author;

				return interaction.reply({
					embeds: [embed.setTitle(title).setImage(url).setURL(url).setFooter({ text: author })]
				});
			});
		}

		async function giphyMeme () {
			await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${client.config.giphyKey}&tag=&rating=g`).then(async res => {
				const meme = await res.json();

				const title = meme.data.title;
				const url = meme.data.images.original.url;
				const link = meme.data.url;
				const author = meme.data.user.display_name;
				const authorImage = meme.data.user.avatar_url;

				return interaction.reply({
					embeds: [embed.setTitle(title).setImage(url).setURL(link).setFooter({ text: author, iconURL: authorImage })]
				});
			});
		}

		if (platform === 'reddit') {
			redditMeme();
		} else if (platform === 'giphy') {
			giphyMeme();
		}

		if (!platform) {
			const memes = [giphyMeme, redditMeme];
			memes[Math.floor(Math.random() * memes.length)]();
		}
	}
};