const { ContextMenuCommandBuilder, UserContextMenuCommandInteraction, ApplicationCommandType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { profileImage } = require('discord-arts');

const { addSuffix, addBadges } = require('../../utils/userinfo');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('userinfo')
		.setType(ApplicationCommandType.User)
		.setDMPermission(false),
	context: true,
	/**
	 * 
	 * @param {UserContextMenuCommandInteraction} interaction 
	 */
	async run (interaction, client) {
		await interaction.deferReply({ ephemeral: true });

		const target = interaction.targetMember;

		if (target.user.bot) {
			return interaction.editReply({
				embeds: [new EmbedBuilder().setDescription('This command is not supported for bot users.')]
			});
		}

		try {
			const fetchedMembers = await interaction.guild.members.fetch();

			const profileBuffer = await profileImage(target.user.id);
			const imageAttachment = new AttachmentBuilder(profileBuffer, { name: 'profile.png' });

			const joinPosition = Array.from(fetchedMembers
				.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
				.keys())
				.indexOf(target.user.id) + 1;

			const topRoles = target.roles.cache
				.sort((a, b) => b.position - a.position)
				.map(role => role)
				.slice(0, 3);

			const userBadges = target.user.flags.toArray();

			const joinTime = parseInt(target.joinedTimestamp / 1000);
			const createTime = parseInt(target.user.createdTimestamp / 1000);

			const booster = target.premiumSince ? '<:discordboost7:1101775910308417546>' : 'X';
			await target.user.fetch();

			const embed = new EmbedBuilder()
				.setAuthor({ name: `${target.user.tag} | General Information`, iconURL: target.displayAvatarURL() })
				.setColor(target.displayColor)
				.setDescription(`On <t:${joinTime}:D>, ${target.user.username} joined as the **${addSuffix(joinPosition)}** member of this server.`)
				.setImage('attachment://profile.png')
				.addFields([
					{ name: 'Badges', value: `${addBadges(userBadges).join(' ')}`, inline: true },
					{ name: 'Booster', value: `${booster}`, inline: true },
					{ name: 'Top Roles', value: `${topRoles.join(' ').replace(`<@${interaction.guildId}>`)}`, inline: false },
					{ name: 'Created', value: `<t:${createTime}:R>`, inline: true },
					{ name: 'Joined', value: `<t:${joinTime}:R>`, inline: true },
					{ name: 'Identifier', value: `${target.id}`, inline: false },
					{ name: 'Avatar', value: `[Link](${target.displayAvatarURL()})`, inline: true },
					{ name: 'Banner', value: target.user.bannerURL ? `[Link](${target.user.bannerURL()})` : '`User has no banner`', inline: true }
				]);

			return interaction.editReply({ embeds: [embed], files: [imageAttachment] });
		} catch (error) {
			console.log(error);
			return interaction.editReply({ content: `An error occurred: Contact <@${client.owner}>` });
		}
	}
};