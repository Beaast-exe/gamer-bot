const { Client, EmbedBuilder, GuildMember, AttachmentBuilder } = require('discord.js');
const WelcomeSchema = require('../../models/Welcome');

module.exports = {
	name: 'guildMemberAdd',

	/**
	 * 
	 * @param {GuildMember} member 
	 * @param {Client} client 
	 * @returns 
	 */
	async run (member, client) {
		try {
			const data = await WelcomeSchema.findOne({ Guild: member.guild.id });

			if (!data) return;
			
			const channel = data.Channel;
			let Message = data.Message || '';
			const Role = data.Role;
			let Title = data.Title;
			const Image = data.Image;

			const { user, guild } = member;
			const welcomeChannel = member.guild.channels.cache.get(channel);

			Title = Title.replaceAll('%guild_name%', `${guild.name}`);
			Message = Message.replaceAll('%member_name%', `${member.user.username}`);
			Message = Message.replaceAll('%member_mention%', `<@${member.user.id}>`);

			const welcomeEmbed = new EmbedBuilder()
				.setColor('#ff0000')
				.setTitle(`${Title}`)
				.setDescription(Message);
			if (Image !== 'None') welcomeEmbed.setImage(Image);

			welcomeChannel.send({ embeds: [welcomeEmbed] });
			member.roles.add(Role);
		} catch (error) {
			console.log(error);
		}

		/*
		if (member.guild.id !== client.server) return;

		const welcomeChannel = member.guild.channels.cache.get('989830856669532191');
		const welcomeMessage = `Bem-vindo, <@${member.id}>`;
		const memberRole = '1019138951426089000';

		const welcomeImage = new AttachmentBuilder('src/assets/welcome.gif');
		const welcomeEmbed = new EmbedBuilder()
			.setColor('#ff0000')
			.setTitle(`${member.guild.name}`)
			.setDescription(welcomeMessage)
			.setImage('attachment://welcome.gif')
			.setFooter({
				text: `Membros Totais: ${member.guild.memberCount}`,
				iconURL: `${member.guild.iconURL({ dynamic: true })}`
			})
			.setTimestamp();

		welcomeChannel.send({ embeds: [welcomeEmbed], files: [welcomeImage] });
		member.roles.add(memberRole);
		*/
	}
};