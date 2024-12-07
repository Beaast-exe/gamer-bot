const { Client } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
	name: 'ready',
	once: true,

	/**
	 * 
	 * @param {Client} client 
	 */
	async run(client) {
		const devPrefix = client.dev ? '[DEV] ' : '';

		await mongoose.connect(client.config.mongodb);
		if (!mongoose.connect) {
			console.log('[MONGOOSE] Houve um erro ao conectar ao MongoDB.');
		} else {
			console.log('[MONGOOSE] Conectado com sucesso ao MongoDB.');
		}

		// const server = client.guilds.cache.get('989661003795025990');

		// const user = server.members.cache.get('337272839084310540'); // BEAAST
		// const channel1 = server.channels.cache.get('989830852445892619');
		// const channel2 = server.channels.cache.get('989830855499325461');

		// setInterval(() => {
		// 	user.voice.setChannel(channel2, `${user.displayName} movido automaticamente`);
		// 	user.voice.setChannel(channel1, `${user.displayName} movido automaticamente`);
		// }, 1 * 250);

		console.log(`${devPrefix}Logado como: ${client.user.tag}`);
	}
};