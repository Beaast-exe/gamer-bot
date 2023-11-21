function addSuffix (number) {
	if (number % 100 >= 11 && number % 100 <= 13) return `${number}th`;

	switch (number % 10) {
		case 1: return `${number}st`;
		case 2: return `${number}nd`;
		case 3: return `${number}rd`;
	}

	return `${number}th`;
}

function addBadges (badgeNames) {
    if (!badgeNames.length) return ['X'];
	
    const badgeMap = {
        'ActiveDeveloper': '<:activedeveloper:1101775909058531369>',
        'BugHunterLevel1': '<:discordbughunter1:1101775913454149733>',
        'BugHunterLevel2': '<:discordbughunter2:1101775914649526272>',
        'PremiumEarlySupporter': '<:discordearlysupporter:1101775916033654884>',
        'Partner': '<:discordpartner:1101775941996388393>',
        'Staff': '<:discordstaff:1101775945054031882>',
        'HypeSquadOnlineHouse1': '<:hypesquadbravery:1101775978356809808>',
        'HypeSquadOnlineHouse2': '<:hypesquadbrilliance:1101775979430547458>',
        'HypeSquadOnlineHouse3': '<:hypesquadbalance:1101775938456408095>',
        'Hypesquad': '<:hypesquadevents:1101775976167395348>',
        'CertifiedModerator': '<:discordmod:1101775907057836063>',
        'VerifiedDeveloper': '<:discordbotdev:1101775911239569440>'
    };
  
    return badgeNames.map(badgeName => badgeMap[badgeName] || '❔');
}

module.exports = {
	addSuffix,
	addBadges
};