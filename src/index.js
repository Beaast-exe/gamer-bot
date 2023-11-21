const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { argv } = require('./utils');

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { loadEvents } = require('./handlers/eventHandler');
const { loadCommands } = require('./handlers/commandHandler');

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages],
	partials: [User, Message, GuildMember, ThreadMember, Channel]
});

client.dev = false;
client.config = require('./config');
client.owner = client.config.ownerID;
client.server = client.config.developerGuild;
client.emojis = client.config.emojis;
client.commands = new Collection();
client.contextCommands = new Collection();

if (argv('dev')) client.dev = true;

client.login(client.config.token).then(() => {
	loadEvents(client);
	loadCommands(client);
}).catch(error => console.log(error));