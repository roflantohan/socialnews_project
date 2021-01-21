const db = require('../database/index');

const compareContent = async (new_content) => {
	const temp = new_content[0];
	let indicator;
	if (temp.title !== null) indicator = 'title';
	else if (temp.href != null) indicator = 'href';
	else if (temp.image != null) indicator = 'image';
	else if (temp.text != null) indicator = 'text';
	else if (temp.author != null) indicator = 'author';
	else return [];

	const old_content = await db.getContentUrl(temp.id_site, temp.time_record);

	return new_content.map((raw) => {
		old_content.map((old) => {
			if (raw[indicator] === old[indicator]) return raw;
		});
	});
};

module.exports = compareContent;
