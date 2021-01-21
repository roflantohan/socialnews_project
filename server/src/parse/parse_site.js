const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../database/index');
//const compareContent = require('./helpers');

const static_parse = async (options) => {
	const time = new Date();
	const time_rec =
		(time.getMonth() + 1 < 10
			? '0' + (time.getMonth() + 1)
			: time.getMonth() + 1) +
		'.' +
		(time.getDay() < 10 ? '0' + time.getDay() : time.getDay()) +
		'.' +
		time.getFullYear();
	let content = [];
	const new_content = [];
	for (const option of options) {
		try {
			const str = await axios.get(option.url);

			const $ = cheerio.load(str.data, { xmlMode: true, decodeEntities: false });

			const container = $(option.container);

			$(container).each((i, element) => {
				const title = $(element).find(option.title).text().trim();
				const href = $(element).find(option.href).attr('href');
				let image = $(element).find(option.image).attr('src');
				if (option.url.indexOf('rss') !== -1) {
					image = $(element).find(option.image).attr('url');
				}

				const text = $(element).find(option.text).text().trim();
				const author = $(element).find(option.author).text().trim();
				const date = $(element).find(option.date).text().trim();

				new_content.push({
					id_site: option.id_site,
					title: title,
					href: href,
					image: image,
					text: text,
					author: author,
					date: date,
					time_record: time_rec,
				});
			});
		} finally {
			if (new_content.length) {
				//content = await compareContent(new_content);
				content = new_content;
			}
			if (
				(option.status === 'checking' || option.status === 'break') &&
				content.length &&
				new_content.length
			)
				db.updateStatusSite(option.id_site, 'work');
			else if (!content.length) db.updateStatusSite(option.id_site, 'break');
		}
	}
	return content;
};

module.exports = { static_parse };
