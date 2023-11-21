const { Client } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
	name: 'ready',
	once: true,

	/**
	 * 
	 * @param {Client} client 
	 */
	async run (client) {
		const devPrefix = client.dev ? '[DEV] ' : '';

		await mongoose.connect(client.config.mongodb);
		if (!mongoose.connect) {
			console.log('[MONGOOSE] Houve um erro ao conectar ao MongoDB.');
		} else {
			console.log('[MONGOOSE] Conectado com sucesso ao MongoDB.');
		}

		console.log(`${devPrefix}Logado como: ${client.user.tag}`);
	}
};