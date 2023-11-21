const { multiply } = require('lodash');
const AnimeFightersConstants = require('./AnimeFightersConstants.json');

module.exports = {
	getStarPricesConstants: () => {
		const obj = JSON.parse(AnimeFightersConstants.starPrices);
		const keys = Object.keys(obj);

		for (let i = 0; i < keys.length; i++) {
			console.log(obj[keys[i]]);
		}

		console.log(obj[keys['Hero Village']]);
		console.log(`AYAYA: ${this.formatNumber(6000000000000000000, 1)}`);
		console.log(`AYAYA2: ${this.formatNumber(1980000000000000000, 3)}`);
	},

	formatNumber: function (number, digits) {
		const lookup = AnimeFightersConstants.numberAbbreviations;

		const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
		const item = lookup.slice().reverse().find(item => {
			return number >= item.value;
		});
		return item ? (number / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
	},

	getMaxOpensPerHour: function (timeStat, maxOpenGamePass) {
		const maxOpensPerHour = AnimeFightersConstants.maxOpensPerHour;
		const maxOpenPerHoursAfterTime = multiply(maxOpensPerHour, timeStat);
		if (maxOpenGamePass) {
			return multiply(maxOpenPerHoursAfterTime, 2);
		} 
			return maxOpenPerHoursAfterTime;
		
	},

	getStarInformation: function (star) {
		const object = AnimeFightersConstants.starPrices[star];

		const starInformation = {
			yen: object.yen,
			max: object.max
		};
		
		return starInformation;
	},

	checkBoolean: function (bool) {
		if (bool === 'yes') {
			return true;
		} else if (bool === 'no') {
			return false;
		}
	},

	getStarOpeningTime: function (fastOpen, starBoost) {
		let starOpeningTime = AnimeFightersConstants.starOpenTime;
		if (fastOpen) starOpeningTime -= AnimeFightersConstants.FastOpenGamepassTime;
		if (starBoost) starOpeningTime -= AnimeFightersConstants['50kBoostTime'];
		return starOpeningTime;
	},

	capitalize: function (text) {
		return text[0].toUpperCase() + text.slice(1).toLowerCase();
	},

	getConstants: function () {
		return AnimeFightersConstants;
	},

	getBooleanEmoji: function (bool) {
		if (bool === 'yes') {
			return '✅';
		} else if (bool === 'no') {
			return '❌';
		}
	}

};