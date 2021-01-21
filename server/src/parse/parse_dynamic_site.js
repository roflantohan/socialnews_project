const { chromium } = require('playwright');
const cheerio = require('cheerio');

const dynamic_parse = async (options, db) => {
	const time = new Date();
	const time_rec =
		time.getFullYear() +
		'.' +
		(time.getMonth() + 1 < 10
			? '0' + (time.getMonth() + 1)
			: time.getMonth() + 1) +
		'.' +
		(time.getDay() < 10 ? '0' + time.getDay() : time.getDay());

	const content = [];

	const browser = await chromium.launch({
		headless: true,
		slowMo: 0,
	});

	const page = await browser.newPage();

	for (const option of options) {
		await page.goto(option.url);
		await page.waitForSelector(option.container);
		await page.evaluate((option) => {
			document.body.style.zoom = '30%';
			const scroll = document.querySelector(option.flex_box);
			for (let i = 0; i < 3; i++) {
				scroll.scrollTop += scroll.scrollHeight * 0.5;
			}
		}, option);
		await page.waitForSelector(option.container);
		const data = await page.content();

		const $ = cheerio.load(data, { xmlMode: true, decodeEntities: false });

		const container = $(option.container);

		$(container).each((i, element) => {
			const title = $(element).find(option.title).text().trim();
			const href = $(element).find(option.href).attr('href');
			const image = $(element).find(option.image).attr('src');
			const text = $(element).find(option.text).text().trim();
			const author = $(element).find(option.author).text().trim();
			const date = $(element).find(option.date).text().trim();

			content.push({
				id_site: 1,
				title: title,
				href: href,
				image: image,
				text: text,
				author: author,
				date: date,
				time_record: time_rec,
			});
		});
		if (
			(option.status === 'checking' || option.status === 'break') &&
			content.length
		)
			db.updateStatusSite(option.id_site, 'work');
		else if (!content.length) db.updateStatusSite(option.id_site, 'break');
	}
	await browser.close();
	return content;
};

module.exports = { dynamic_parse };
