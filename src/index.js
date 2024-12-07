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
					'expirationDate': 1766164960.94132,
					'hostOnly': false,
					'httpOnly': false,
					'name': '__Secure-1PAPISID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': '9cX380Y6fdbFGjSB/ASFkA0nCQHunCGi8j',
					'id': 1
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1766164960.941243,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-1PSID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'g.a000qQh48bRhje_W9PTW5VRNgo-pZgBub2UnY02I8mUqLTczdcSpDQ_g-1OhZXv18lNZJeJVxgACgYKAeASARESFQHGX2MidlXxq1fSPhFHiJJ2TKW-cxoVAUF8yKo84LC86ckFlSt1lyCAFXID0076',
					'id': 2
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1763978478.468244,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-1PSIDCC',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'AKEyXzUGKZ2bvdbLyl3OtMDQXXMT3Nb4d0mwrACbHq_Kr5mPUo9Lh4iKp0079zI5-jfV0hC-zA',
					'id': 3
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1763978202.447009,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-1PSIDTS',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'sidts-CjEBQT4rX1UWDVTOP6R56gfNFT9f7VuyAm2MY-YnTikPV_GSEWLltqiedtoFWdKQypp9EAA',
					'id': 4
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1766164960.941332,
					'hostOnly': false,
					'httpOnly': false,
					'name': '__Secure-3PAPISID',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': '9cX380Y6fdbFGjSB/ASFkA0nCQHunCGi8j',
					'id': 5
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1766164960.941257,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-3PSID',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'g.a000qQh48bRhje_W9PTW5VRNgo-pZgBub2UnY02I8mUqLTczdcSpcs1VnsXFfRogS9Y_QFeiiAACgYKAQkSARESFQHGX2MiQ7P52uCys26IPOLIScgHnhoVAUF8yKruJFziRXcNVrNoTtD4bPOL0076',
					'id': 6
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1763978478.46828,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-3PSIDCC',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'AKEyXzU_cXwom2gfWNKi_jZJ_hPsKNO9Nj7v5IJ8lT6bQh_Z0fa3HRcaoMmMPmYa2G9CnMyMDtI',
					'id': 7
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1763978202.44708,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-3PSIDTS',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'sidts-CjEBQT4rX1UWDVTOP6R56gfNFT9f7VuyAm2MY-YnTikPV_GSEWLltqiedtoFWdKQypp9EAA',
					'id': 8
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1765732118.433525,
					'hostOnly': false,
					'httpOnly': true,
					'name': '__Secure-YEC',
					'path': '/',
					'sameSite': 'lax',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'CgtMQ05RNmhLanh6SSiv2ou6BjIiCgJQVBIcEhgSFhMLFBUWFwwYGRobHB0eHw4PIBAREiEgJw%3D%3D',
					'id': 9
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1766164960.941295,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'APISID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'DuxQLa3Qmz5HcVka/Ab7Feom-0oBxubNSP',
					'id': 10
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1766164960.941272,
					'hostOnly': false,
					'httpOnly': true,
					'name': 'HSID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'AzNKUpO6Y8pR8Tb4P',
					'id': 11
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1767002472.844039,
					'hostOnly': false,
					'httpOnly': true,
					'name': 'LOGIN_INFO',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'AFmmF2swRQIgPzHiN56q8eTcBAX-f4l0vEeMwBQ_iL14EqbA2iL-i6UCIQDkckN6fW07uATxg97QWl2DWLYjKRZ1JDLktBjJ9_VUHw:QUQ3MjNmeENMTUVVaFV6U2hkY09NdEdLSWJjM2pPanA4endjbFQ5SUhoTGRTT2NtTmJTZWFZVlRDRmJzalhRQVpOSlJKTTVrSFdPdGFjb21lSlRsR19rZFJsV0hjWGhYbVhwV01sSnlEbENRR013UUhkNkpVa0J5Vy1iUlEyQ3RNQTJIRTYxcENwdFdhM1ZDbDROcFJzejExZzVvREVxRFZ3',
					'id': 12
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1767002475.723126,
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
					'expirationDate': 1766164960.941307,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'SAPISID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': '9cX380Y6fdbFGjSB/ASFkA0nCQHunCGi8j',
					'id': 14
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1766164960.941152,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'SID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'g.a000qQh48bRhje_W9PTW5VRNgo-pZgBub2UnY02I8mUqLTczdcSp2K77vbSdcO77b4ZvocfElwACgYKATgSARESFQHGX2MixR1h9BPFij3N_3h4QfGskxoVAUF8yKpd1563f-DPVl30Tb9CMbC80076',
					'id': 15
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1763978478.468217,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'SIDCC',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'AKEyXzUrfXXQbfvrJ2FQI9u0e2_JXQk2fhU2oJ4C-DcCXKe9MoiMUqP70CnYNgtJXu5ahpp_aA',
					'id': 16
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1766164960.941284,
					'hostOnly': false,
					'httpOnly': true,
					'name': 'SSID',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'Aoq9Qt4P8_gl3vhye',
					'id': 17
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1732442481,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'ST-l3hjtt',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'session_logininfo=AFmmF2swRQIgPzHiN56q8eTcBAX-f4l0vEeMwBQ_iL14EqbA2iL-i6UCIQDkckN6fW07uATxg97QWl2DWLYjKRZ1JDLktBjJ9_VUHw%3AQUQ3MjNmeENMTUVVaFV6U2hkY09NdEdLSWJjM2pPanA4endjbFQ5SUhoTGRTT2NtTmJTZWFZVlRDRmJzalhRQVpOSlJKTTVrSFdPdGFjb21lSlRsR19rZFJsV0hjWGhYbVhwV01sSnlEbENRR013UUhkNkpVa0J5Vy1iUlEyQ3RNQTJIRTYxcENwdFdhM1ZDbDROcFJzejExZzVvREVxRFZ3',
					'id': 18
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1732442480,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'ST-tladcw',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'session_logininfo=AFmmF2swRQIgPzHiN56q8eTcBAX-f4l0vEeMwBQ_iL14EqbA2iL-i6UCIQDkckN6fW07uATxg97QWl2DWLYjKRZ1JDLktBjJ9_VUHw%3AQUQ3MjNmeENMTUVVaFV6U2hkY09NdEdLSWJjM2pPanA4endjbFQ5SUhoTGRTT2NtTmJTZWFZVlRDRmJzalhRQVpOSlJKTTVrSFdPdGFjb21lSlRsR19rZFJsV0hjWGhYbVhwV01sSnlEbENRR013UUhkNkpVa0J5Vy1iUlEyQ3RNQTJIRTYxcENwdFdhM1ZDbDROcFJzejExZzVvREVxRFZ3',
					'id': 19
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1732442481,
					'hostOnly': false,
					'httpOnly': false,
					'name': 'ST-xuwub9',
					'path': '/',
					'sameSite': 'unspecified',
					'secure': false,
					'session': false,
					'storeId': '0',
					'value': 'session_logininfo=AFmmF2swRQIgPzHiN56q8eTcBAX-f4l0vEeMwBQ_iL14EqbA2iL-i6UCIQDkckN6fW07uATxg97QWl2DWLYjKRZ1JDLktBjJ9_VUHw%3AQUQ3MjNmeENMTUVVaFV6U2hkY09NdEdLSWJjM2pPanA4endjbFQ5SUhoTGRTT2NtTmJTZWFZVlRDRmJzalhRQVpOSlJKTTVrSFdPdGFjb21lSlRsR19rZFJsV0hjWGhYbVhwV01sSnlEbENRR013UUhkNkpVa0J5Vy1iUlEyQ3RNQTJIRTYxcENwdFdhM1ZDbDROcFJzejExZzVvREVxRFZ3',
					'id': 20
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1747992016.206658,
					'hostOnly': false,
					'httpOnly': true,
					'name': 'VISITOR_INFO1_LIVE',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': '30K9zYdSJQY',
					'id': 21
				},
				{
					'domain': '.youtube.com',
					'expirationDate': 1747994478.468148,
					'hostOnly': false,
					'httpOnly': true,
					'name': 'VISITOR_PRIVACY_METADATA',
					'path': '/',
					'sameSite': 'no_restriction',
					'secure': true,
					'session': false,
					'storeId': '0',
					'value': 'CgJQVBIcEhgSFhMLFBUWFwwYGRobHB0eHw4PIBAREiEgQA%3D%3D',
					'id': 22
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
					'id': 23
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
					'value': 'fPpd-WvzZ6s',
					'id': 24
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