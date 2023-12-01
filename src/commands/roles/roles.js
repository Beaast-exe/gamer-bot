const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, Client, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const reactionRolesSchema = require('../../models/ReactionRoles');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Comando geral de cargo por reação')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
		.addSubcommand(subCommand => subCommand
			.setName('add')
			.setDescription('Adiciona um novo cargo por reação ao servidor')
			.addRoleOption(option => option
				.setName('cargo')
				.setDescription('Cargo a ser adicionado')
				.setRequired(true))
			.addStringOption(option => option
				.setName('descrição')
				.setDescription('Descrição do cargo por reação')
				.setRequired(false))
			.addStringOption(option => option
				.setName('emoji')
				.setDescription('Emoji do cargo por reação')
				.setRequired(false)))
		.addSubcommand(subCommand => subCommand
			.setName('remove')
			.setDescription('Remove um cargo por reação ao servidor')
			.addRoleOption(option => option
				.setName('cargo')
				.setDescription('Cargo a ser removido')
				.setRequired(true)))
		.addSubcommand(subCommand => subCommand
			.setName('painel')
			.setDescription('Cria o painel de cargos por reação')),

	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async run (interaction, client) {
		const { options, member, guild, channel, guildId } = interaction;

		try {
			switch (options.getSubcommand()) {
				case 'add': {
					const role = options.getRole('cargo');
					const description = options.getString('descrição');
					const emoji = options.getString('emoji');

					try {
						if (role.position >= member.roles.highest.position) return interaction.reply({ content: 'Não podes criar um cargo acima de ti.', ephemeral: true });
						if (role.position >= interaction.guild.members.me.roles.highest.position) return interaction.reply({ content: 'Não posso criar um cargo acima de mim', ephemeral: true });

						const data = await reactionRolesSchema.findOne({ guild_id: guildId });

						const newRoleData = {
							roleId: role.id,
							roleDescription: description || 'Nenhuma Descrição.',
							roleEmoji: emoji || ''
						};

						if (data) {
							let roleData = data.roles.find(x => x.roleId === role.id);

							if (roleData) {
								roleData = newRoleData;
							} else {
								data.roles = [...data.roles, newRoleData];
							}

							await data.save();
						} else {
							await reactionRolesSchema.create({
								guild_id: guildId,
								roles: newRoleData
							});
						}

						return interaction.reply({ content: `Cargo por reação **\`${role.name}\`** criado com sucesso`, ephemeral: true });
					} catch (error) {
						console.log(error);
						return interaction.reply({ content: 'Houve um erro ao usar o comando:', ephemeral: true });
					}
				}

				case 'remove': {
					const role = options.getRole('cargo');
					
					try {
						if (role.position >= member.roles.highest.position && interaction.guild.ownerId !== member.id) return interaction.reply({ content: 'Não podes remover um cargo acima de ti.', ephemeral: true });
						if (role.position >= interaction.guild.members.me.roles.highest.position && interaction.guild.ownerId !== member.id) return interaction.reply({ content: 'Não posso remover um cargo acima de mim', ephemeral: true });

						const data = await reactionRolesSchema.findOne({ guild_id: guildId });
						if (!data) return interaction.reply({ content: 'Não encontrei um cargo por reação neste servidor.', ephemeral: true });

						const roles = data.roles;
						const findRole = roles.find(r => r.roleId === role.id);
						if (!findRole) return interaction.reply({ content: 'Esse cargo não é um cargo por reação', ephemeral: true });

						const filteredRoles = roles.filter(r => r.roleId !== role.id);
						data.roles = filteredRoles;

						await data.save();

						return interaction.reply({ content: `Cargo por reação **\`${role.name}\`** removido com sucesso`, ephemeral: true });
					} catch (error) {
						console.log(error);
						return interaction.reply({ content: 'Houve um erro ao usar o comando:', ephemeral: true });
					}
				}

				case 'painel': {
					try {
						const data = await reactionRolesSchema.findOne({ guild_id: guildId });
						if (!data.roles.length > 0) return interaction.reply({ content: 'Não encontrei um cargo por reação neste servidor.', ephemeral: true });

						const panelEmbed = new EmbedBuilder()
							.setColor('#ff0000')
							.setDescription('Seleciona um cargo abaixo para o receberes.');
						
						const options = data.roles.map(x => {
							const role = interaction.guild.roles.cache.get(x.roleId);

							return {
								label: role.name,
								value: role.id,
								description: x.roleDescription,
								emoji: x.roleEmoji || undefined
							};
						});

						const menuComponents = [
							new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
									.setCustomId('reaction-roles')
									.setMaxValues(options.length)
									.addOptions(options))
						];

						channel.send({ embeds: [panelEmbed], components: menuComponents });
						return interaction.reply({ content: 'Painel de cargos por reação criado com sucesso.', ephemeral: true });
					} catch (error) {
						console.log(error);
						return interaction.reply({ content: 'Houve um erro ao criar o painel de cargos por reação.', ephemeral: true });
					}

					break;
				}
			}
		} catch (error) {
			console.log(error);
			return interaction.reply({ content: 'Houve um erro ao usar o comando:', ephemeral: true });
		}
	}
};