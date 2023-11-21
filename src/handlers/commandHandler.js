const { Client } = require('discord.js');
const ascii = require('ascii-table');
const fs = require('fs');

/**
 * 
 * @param {Client} client 
 */
async function loadCommands (client) {
	const table = new ascii().setHeading('Command', 'Status');

	const commandsArray = [];

	const commandsFolder = fs.readdirSync('./src/commands');
	for (const folder of commandsFolder) {
		const commandsFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));

		for (const file of commandsFiles) {
			const commandsFile = require(`../commands/${folder}/${file}`);

			if (commandsFile.context) {
				client.contextCommands.set(commandsFile.data.name, commandsFile);
				commandsArray.push(commandsFile.data.toJSON());
			} else {
				client.commands.set(commandsFile.data.name, commandsFile);
				if (commandsFile.json) {
					commandsArray.push(commandsFile.data);
				} else {
					commandsArray.push(commandsFile.data.toJSON());
				}
			}

			table.addRow(file, 'Loaded');
		}
	}

	await client.guilds.fetch();
	
	if (client.dev) {
		client.application.commands.set([]);
		client.guilds.cache.get(client.server).commands.set(commandsArray);
		client.guilds.cache.get('1122131768355602513').commands.set(commandsArray);
		client.guilds.cache.get('1119535148682194966').commands.set(commandsArray); // Galera dos Mods
	} else {
		client.application.commands.set(commandsArray);
		client.guilds.cache.get(client.server).commands.set([]);
		client.guilds.cache.get('1122131768355602513').commands.set([]);
		client.guilds.cache.get('1119535148682194966').commands.set([]); // Galera dos Mods
	}

	return console.log('Loaded Commands:', `\n${table.toString()}`);
}

module.exports = { loadCommands };