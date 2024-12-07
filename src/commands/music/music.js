const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, VoiceChannel, Client, ChatInputCommandInteraction, GuildEmoji } = require('discord.js');
const { defaultFilters } = require('distube');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music')
		.setDescription('Sistema de música')
		.addSubcommand(subCommand => subCommand
			.setName('play')
			.setDescription('Toca uma música')
			.addStringOption(option => option
				.setName('query')
				.setDescription('Nome ou URL da música')
				.setRequired(true)))
		.addSubcommand(subCommand => subCommand
			.setName('volume')
			.setDescription('Ajusta o volume da música')
			.addNumberOption(option => option
				.setName('percentage')
				.setDescription('Porcentagem de volume (10 = 10%)')
				.setMinValue(1)
				.setMaxValue(100)
				.setRequired(true)))
		.addSubcommand(subCommand => subCommand
			.setName('queue')
			.setDescription('Ver o que está no queue'))
		.addSubcommand(subCommand => subCommand
			.setName('skip')
			.setDescription('Passa a música atual à frente'))
		.addSubcommand(subCommand => subCommand
			.setName('stop')
			.setDescription('Parar de tocar música e sair do canal'))
		.addSubcommand(subCommand => subCommand
			.setName('pause')
			.setDescription('Pausar a música atual'))
		.addSubcommand(subCommand => subCommand
			.setName('resume')
			.setDescription('Remove a pausa da música atual'))
		.addSubcommand(subCommand => subCommand
			.setName('seek')
			.setDescription('Passar alguns segundos à frente na música')
			.addIntegerOption(option => option
				.setName('tempo')
				.setDescription('Quantidade de segundos para passar')
				.setMinValue(0)
				.setRequired(true)))
		.addSubcommand(subCommand => subCommand
			.setName('rewind')
			.setDescription('Passar alguns segundos para trás na música')
			.addIntegerOption(option => option
				.setName('tempo')
				.setDescription('Quantidade de segundos para passar')
				.setMinValue(0)
				.setRequired(true)))
		.addSubcommand(subCommand => subCommand
			.setName('nowplaying')
			.setDescription('Mostrar qual música está atualmente a tocar'))
		.addSubcommand(subCommand => subCommand
			.setName('shuffle')
			.setDescription('Mistura as músicas no queue'))
		.addSubcommand(subCommand => subCommand
			.setName('filter')
			.setDescription('Seta o filtro/efeito de audio')
			.addStringOption(option => option
				.setName('filtro')
				.setDescription('Filtro/efeito para setar')
				.setRequired(true)
				.addChoices(...Object.keys(defaultFilters).map(key => ({ name: key, value: key })))))
		.addSubcommand(subCommand => subCommand
			.setName('loop')
			.setDescription('Define o modo de loop')
			.addStringOption(option => option
				.setName('modo')
				.setDescription('Seleciona um modo do loop')
				.setRequired(true)
				.addChoices(
					{ name: 'Desligado', value: 'off' },
					{ name: 'Música', value: 'song' },
					{ name: 'Queue', value: 'queue' }
				))),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async run(interaction, client) {
		const { options, member, guild, channel } = interaction;
		const subCommand = options.getSubcommand();
		const voiceChannel = member.voice.channel;

		const embed = new EmbedBuilder().setColor('#FF0000');

		if (!voiceChannel) {
			embed.setDescription('Não estás conectado num canal de voz.');
			return interaction.reply({ embeds: [embed] });
		}

		if (!member.voice.channelId === guild.members.me.voice.channelId) {
			embed.setDescription(`Já estou a tocar noutro canal de voz (<#${guild.members.me.voice.channelId}>)`);
			return interaction.reply({ embeds: [embed] });
		}

		try {
			switch (subCommand) {
				case 'play': {
					const query = options.getString('query');

					client.distube.play(voiceChannel, query, { textChannel: channel, member });
					return interaction.reply({ embeds: [embed.setDescription('✅ | Pedido recebido')] });
				}

				case 'volume': {
					const volume = options.getNumber('percentage');

					client.distube.setVolume(voiceChannel, volume);
					return interaction.reply({ embeds: [embed.setDescription(`🔊 | Volume alterado para: ${volume}%`)] });
				}

				case 'queue': {
					const queue = await client.distube.getQueue(voiceChannel);
					if (!queue) return interaction.reply({ embeds: [embed.setDescription('Não estou a tocar nada')] });

					return interaction.reply({ embeds: [embed.setDescription(`${queue.songs.map((song, id) => `\n**${id + 1}.** ${song.name} - \`${song.formattedDuration}\``)}`)] });
				}

				case 'skip': {
					const queue = await client.distube.getQueue(voiceChannel);
					if (!queue) return interaction.reply({ embeds: [embed.setDescription('Não estou a tocar nada')] });

					await queue.skip(voiceChannel);
					return interaction.reply({ embeds: [embed.setDescription('⏭️ | Música skipada.')] });
				}

				case 'stop': {
					const queue = await client.distube.getQueue(voiceChannel);
					if (!queue) return interaction.reply({ embeds: [embed.setDescription('Não estou a tocar nada')] });

					await queue.stop(voiceChannel);
					await queue.voice.leave();
					return interaction.reply({ embeds: [embed.setDescription('⏹️ | A parar de tocar.')] });
				}

				case 'pause': {
					const queue = await client.distube.getQueue(voiceChannel);
					if (!queue) return interaction.reply({ embeds: [embed.setDescription('Não estou a tocar nada')] });

					await queue.pause(voiceChannel);
					return interaction.reply({ embeds: [embed.setDescription('⏸️ | Música pausada')] });
				}

				case 'resume': {
					const queue = await client.distube.getQueue(voiceChannel);
					if (!queue) return interaction.reply({ embeds: [embed.setDescription('Não estou a tocar nada')] });

					await queue.resume(voiceChannel);
					return interaction.reply({ embeds: [embed.setDescription('▶️ | Música despausada')] });
				}

				case 'seek': {
					const queue = await client.distube.getQueue(voiceChannel);
					if (!queue) return interaction.reply({ embeds: [embed.setDescription('Não estou a tocar nada')] });

					const seconds = options.getInteger('tempo');
					await queue.seek(queue.currentTime + seconds);

					return interaction.reply({ embeds: [embed.setDescription(`⏩ | Passados \`${seconds}\` segundos à frente.`)] });
				}

				case 'rewind': {
					const queue = await client.distube.getQueue(voiceChannel);
					if (!queue) return interaction.reply({ embeds: [embed.setDescription('Não estou a tocar nada')] });

					const seconds = options.getInteger('tempo');
					await queue.seek(queue.currentTime - seconds);

					return interaction.reply({ embeds: [embed.setDescription(`⏪ | Passados \`${seconds}\` segundos para trás.`)] });
				}

				case 'nowplaying': {
					const queue = await client.distube.getQueue(voiceChannel);
					if (!queue) return interaction.reply({ embeds: [embed.setDescription('Não estou a tocar nada')] });

					const song = queue.songs[0];
					return interaction.reply({ embeds: [embed.setDescription(`🎶 | Atualmente a tocar: **[${song.name}](${song.url})** - \`${song.formattedDuration}\`\n\n`).setImage(song.thumbnail)] });
				}

				case 'shuffle': {
					const queue = await client.distube.getQueue(voiceChannel);
					if (!queue) return interaction.reply({ embeds: [embed.setDescription('Não estou a tocar nada')] });

					await queue.shuffle();
					return interaction.reply({ embeds: [embed.setDescription('✅ | Músicas misturadas no queue.')] });
				}

				case 'filter': {
					const queue = await client.distube.getQueue(voiceChannel);
					if (!queue) return interaction.reply({ embeds: [embed.setDescription('Não estou a tocar nada')] });

					const filter = options.getString('filtro');
					const filters = await queue.filters;

					if (filters.has(filter)) {
						await filters.remove(filter);
					} else {
						await filters.add(filter);
					}

					return interaction.reply({ embeds: [embed.setDescription(`**Filtro Atual:** \`${filters.names.join(', ') || 'Off'}\``)] });
				}

				case 'loop': {
					const queue = await client.distube.getQueue(voiceChannel);
					if (!queue) return interaction.reply({ embeds: [embed.setDescription('Não estou a tocar nada')] });

					const loopMode = options.getString('modo');

					switch (loopMode) {
						case 'off': {
							await client.distube.setRepeatMode(interaction, 0);
							embed.setDescription('`🔁` | **O modo loop está agora:** `OFF`');
							return interaction.reply({ embeds: [embed] });
						}

						case 'song': {
							await client.distube.setRepeatMode(interaction, 1);
							embed.setDescription('`🔁` | **O modo loop está agora em:** `MÚSICA`');
							return interaction.reply({ embeds: [embed] });
						}

						case 'queue': {
							await client.distube.setRepeatMode(interaction, 2);
							embed.setDescription('`🔁` | **O modo loop está agora em:** `QUEUE`');
							return interaction.reply({ embeds: [embed] });
						}
					}
				}
			}
		} catch (error) {
			console.log(error);
			embed.setDescription('Aconteceu um erro ao usar o comando.');
			return interaction.reply({ embeds: [embed], ephemeral: true });
		}
	}
};