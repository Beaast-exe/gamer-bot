const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require('discord.js');
const { argv } = require('./utils');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { YouTubePlugin } = require('@distube/youtube');
const { YtDlpPlugin } = require('@distube/yt-dlp');

const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { loadEvents } = require('./handlers/eventHandler');
const { loadCommands } = require('./handlers/commandHandler');

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates],
	partials: [User, Message, GuildMember, ThreadMember, Channel]
});

client.dev = false;
client.config = require('./config');
client.owner = client.config.ownerID;
client.server = client.config.developerGuild;
client.emojis = client.config.emojis;
client.commands = new Collection();
client.contextCommands = new Collection();
client.distube = new DisTube(client, {
	emitNewSongOnly: true,
	emitAddListWhenCreatingQueue: false,
	emitAddSongWhenCreatingQueue: false,
	plugins: [
		new SpotifyPlugin(),
		new YouTubePlugin({
			cookies: [
				{
					'domain': '.youtube.com',
					'expirationDate': 1771800595.236496,
					'hostOnly': false,
					'httpOnly': false,
					'name': '__Secure-1PAPISID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'ZHqEYCinyIbuXkMg/AUOSyNeiDinwxpeA6',
					'id': 1
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1771800595.236541,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-1PSID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'g.a000sgh48V28BPZv_rIQ465uLDZiSiCFURKSEhxpOHr6-EtfIKPns3_RZbV4ZFDuexAHgE4EiAACgYKAUkSARESFQHGX2Mi72guZ-zY0sgtMBHWRjOXNxoVAUF8yKqz7xV58bLDTHO-4j7up2tj0076',
					'id': 2
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1768908443.850007,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-1PSIDCC',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'AKEyXzXrRQBG-i2-IlZqZlIkGyX1ZVXDJXfOP7DEktZgKR0lF4CVQIpR5L8U4yWmzB5wJxGx93Q',
					'id': 3
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1768908205.912985,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-1PSIDTS',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'sidts-CjEBmiPuTbwG_qHd4B27y2Y-T7JXerSX_wXaQBuRCXypcoS2YaeBxtxn8KkPHYIK-6QGEAA',
					'id': 4
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1771800595.236511,
					'hostOnly': false,
					'httpOnly': false,
					'name': '__Secure-3PAPISID',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'ZHqEYCinyIbuXkMg/AUOSyNeiDinwxpeA6',
					'id': 5
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1771800595.236557,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-3PSID',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'g.a000sgh48V28BPZv_rIQ465uLDZiSiCFURKSEhxpOHr6-EtfIKPn8fPTCnXGRm8rCSkGozo2tQACgYKAQsSARESFQHGX2MimUuD5UNW5lR5Ra_b01tIIxoVAUF8yKozuXUXDzUVXKFYEJ3dZG-x0076',
					'id': 6
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1768908443.850047,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-3PSIDCC',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'AKEyXzV6OByJXTKQqUIvAv-CDWu-g3SoZKW21Pfc95XXHstP-FRbkzws8yGHfnCOY_FoGhWo9_S_',
					'id': 7
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1768908205.913062,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-3PSIDTS',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'sidts-CjEBmiPuTbwG_qHd4B27y2Y-T7JXerSX_wXaQBuRCXypcoS2YaeBxtxn8KkPHYIK-6QGEAA',
					'id': 8
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1765732118.213437,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-YEC',
					'path': '/',
					'sameSite': 'lax',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'CgtMQ05RNmhLanh6SSimtbi8BjIiCgJQVBIcEhgSFhMLFBUWFwwYGRobHB0eHw4PIBAREiEgJw%3D%3D',
					'id': 9
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1771800595.236466,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'APISID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'DSP6MnRmshP8dINT/AXsgY7YhjeCNhpDRl',
					'id': 10
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1771800595.236433,
					'hostOnly': false,
					'httpOnly': true,
					'name': 'HSID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'A8QAxRXWsmBp5f1B9',
					'id': 11
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1767002566.899352,
					'hostOnly': false,
					'httpOnly': true,
					'name': 'LOGIN_INFO',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'AFmmF2swRAIgD5jJTXMljsgV85hG5JTsZs6tPpaRK7C11-hs5W7K89ICIFCFvGAl1RpyXflimmTKQReDdFGPVMx8ezeQmWbKuGtn:QUQ3MjNmeXVKeTI2MnROQ1Nxb2NaSlNzSjNKVXV4U1NvTnJLZklWdlBjZVExVnpTam5wb01jbWszQUg3cVJWZUZWQUd0Qm1uNzhDRVZXTnBRRDBhZ2JPUmltYlNZenAwR1pvSXlQWENqZ2gwbkRROWJGVTRuY2pmNnFPeEdpV3ZkbVVMalNqYVJqV3g1UjRta21VUnBjN0dFcXBSTkJaVGxR',
					'id': 12
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1771932443.214879,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'PREF',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'f6=40000000&tz=Europe.Lisbon&f5=30000&f7=100',
					'id': 13
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1771800595.236482,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'SAPISID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'ZHqEYCinyIbuXkMg/AUOSyNeiDinwxpeA6',
					'id': 14
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1771800595.236525,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'SID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'g.a000sgh48V28BPZv_rIQ465uLDZiSiCFURKSEhxpOHr6-EtfIKPn9FRucz49-3w0aEPwjya0rwACgYKAaoSARESFQHGX2MiVYagK_PdkXclYk4fXsHaAxoVAUF8yKo1ibwyyvDCRoDTHZ2tvvng0076',
					'id': 15
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1768908443.849918,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'SIDCC',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'AKEyXzU86hQs-ewpdrDsG-pSZyKSsJxbpKZogBOVuEzvgWJKRDFmtw2rJXeoBntYkluPdk4gi0I',
					'id': 16
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1771800595.236452,
					'hostOnly': false,
					'httpOnly': true,
					'name': 'SSID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'AbNIB07gHHghlmwDd',
					'id': 17
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1737372446,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'ST-l3hjtt',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'session_logininfo=AFmmF2swRAIgD5jJTXMljsgV85hG5JTsZs6tPpaRK7C11-hs5W7K89ICIFCFvGAl1RpyXflimmTKQReDdFGPVMx8ezeQmWbKuGtn%3AQUQ3MjNmeXVKeTI2MnROQ1Nxb2NaSlNzSjNKVXV4U1NvTnJLZklWdlBjZVExVnpTam5wb01jbWszQUg3cVJWZUZWQUd0Qm1uNzhDRVZXTnBRRDBhZ2JPUmltYlNZenAwR1pvSXlQWENqZ2gwbkRROWJGVTRuY2pmNnFPeEdpV3ZkbVVMalNqYVJqV3g1UjRta21VUnBjN0dFcXBSTkJaVGxR',
					'id': 18
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1737372448,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'ST-xuwub9',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'session_logininfo=AFmmF2swRAIgD5jJTXMljsgV85hG5JTsZs6tPpaRK7C11-hs5W7K89ICIFCFvGAl1RpyXflimmTKQReDdFGPVMx8ezeQmWbKuGtn%3AQUQ3MjNmeXVKeTI2MnROQ1Nxb2NaSlNzSjNKVXV4U1NvTnJLZklWdlBjZVExVnpTam5wb01jbWszQUg3cVJWZUZWQUd0Qm1uNzhDRVZXTnBRRDBhZ2JPUmltYlNZenAwR1pvSXlQWENqZ2gwbkRROWJGVTRuY2pmNnFPeEdpV3ZkbVVMalNqYVJqV3g1UjRta21VUnBjN0dFcXBSTkJaVGxR',
					'id': 19
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1752923150.458422,
					'hostOnly': false,
					'httpOnly': true,
					'name': 'VISITOR_INFO1_LIVE',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'vePaeqPbj4g',
					'id': 20
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1752924440.223592,
					'hostOnly': false,
					'httpOnly': true,
					'name': 'VISITOR_PRIVACY_METADATA',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'CgJQVBIcEhgSFhMLFBUWFwwYGRobHB0eHw4PIBAREiEgNg%3D%3D',
					'id': 21
				},
				{
					'domain': '.youtube.com',
					'hostOnly': false,
					'httpOnly': false,
					'name': 'wide',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': true,
					'storeId': '0',
					'value': '1',
					'id': 22
				},
				{
					'domain': '.youtube.com',
					'hostOnly': false,
					'httpOnly': true,
					'name': 'YSC',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': true,
					'storeId': '0',
					'value': 'Ax53SSch-RQ',
					'id': 23
				}
			]
		}),
		new YtDlpPlugin()
	]
});

const status = queue => `Volume: \`${queue.volume}\` | Filtro: \`${queue.filters.names.join(', ') || 'Nenhum'}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? 'Queue' : 'Música' : 'Desligado'}\` | Autoplay: \`${queue.autoplay ? 'Ativo' : 'Desativado'}\``;
client.distube
	.on('playSong', (queue, song) => {
		queue.textChannel.send({
			embeds: [new EmbedBuilder().setColor('#FF0000').setDescription(`🎶 | A Tocar: **[${song.name}](${song.url})** - \`${song.formattedDuration}\`\n\nPedido por: ${song.user}\n\n${status(queue)}`)]
		});
	})
	.on('addSong', (queue, song) => queue.textChannel.send({
		embeds: [new EmbedBuilder().setColor('#FF0000').setDescription(`🎶 | Adicionado **[${song.name}](${song.url})** - \`${song.formattedDuration}\` ao queue por: ${song.user}`)]
	}))
	.on('addList', (queue, playlist) => queue.textChannel.send({
		embeds: [new EmbedBuilder().setColor('#FF0000').setDescription(`🎶 | Adicionado de \`${playlist.name}\` : \`${playlist.songs.length} \` sons; \n${status(queue)}`)]
	}))
	.on('error', (e, queue, song) => {
		queue.textChannel.send(`⛔ | Erro: ${e.toString().slice(0, 1974)}`);
		console.log(e);
	})
	.on('empty', channel => channel.send({
		embeds: [new EmbedBuilder().setColor('#FF0000').setDescription('⛔ | O canal está vazio! A sair...')]
	}))
	.on('searchNoResult', (message, query) => message.channel.send({
		embeds: [new EmbedBuilder().setColor('#FF0000').setDescription(`⛔ | Nenhum resultado para: \`${query}\`!`)]
	}))
	.on('finish', queue => {
		queue.textChannel.send({
			embeds: [new EmbedBuilder().setColor('#FF0000').setDescription('🏁 | O queue acabou.')]
		});
	});

if (argv('dev')) client.dev = true;

client.login(client.config.token).then(() => {
	loadEvents(client);
	loadCommands(client);
}).catch(error => console.log(error));