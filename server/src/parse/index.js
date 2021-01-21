const { static_parse } = require('./parse_site');
const { dynamic_parse } = require('./parse_dynamic_site');

const db = require('../database/index');

const getContent = async () => {
	console.log(1);
	const options_static = await db.getOptionsAllSite(false);
	const options_dynamic = await db.getOptionsAllSite(true);
	const content_1 = await static_parse(options_static);
	const content_2 = await dynamic_parse(options_dynamic);
	const content = content_1.concat(content_2);
	if (content.length) db.pushAllContent(content);
	return;
};

getContent();
