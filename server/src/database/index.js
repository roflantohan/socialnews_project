const { Pool } = require('pg');

class DataBase {
	constructor() {
		this.pool = new Pool({
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false,
			},
		});
	}

	deleteSite = async (id_site) => {
		await this.pool
			.query(`DELETE FROM history WHERE id_site=${id_site}`)
			.catch((err) => {
				throw err;
			});
		await this.pool
			.query(`DELETE FROM sites WHERE id_site=${id_site}`)
			.catch((err) => {
				throw err;
			});
	};

	pushSite = async (data) => {
		const obj = JSON.parse(data);
		await this.pool
			.query(
				`INSERT INTO sites(name_site, url, dynamic_type, container, flex_box, title,href,image,text,author,date, status)
	       VALUES('${obj.name_site}','${obj.url}','${obj.dynamic}','${obj.container}','${obj.flex_box}','${obj.title}','${obj.href}','${obj.image}','${obj.text}','${obj.author}','${obj.date}', 'checking')`
			)
			.catch((err) => {
				throw err;
			});
	};

	pushAllContent = async (data) => {
		const array = [];
		data.map((elem) => {
			for (const i in elem) {
				array.push(elem[i]);
			}
		});

		const qr = 'INSERT INTO';
		const table = 'History';
		const attr = '(id_site, title, href, image, text, author, date, time_record)';
		let values = 'VALUES';

		for (let i = 0; i < array.length; i += 8) {
			values += `($${i + 1}, $${i + 2}, $${i + 3}, $${i + 4}, $${i + 5}, $${
				i + 6
			}, $${i + 7}, $${i + 8})`;
			if (i != array.length - 8) {
				values += ', ';
			}
		}
		const query = qr + ' ' + table + ' ' + attr + ' ' + values;
		await this.pool.query(query, array).catch((err) => {
			console.error(err);
		});
	};

	getContentUrl = async (url, date) => {
		const { rows } = await this.pool.query(
			`SELECT * FROM history WHERE url='${url} AND time_record='${date}'`
		);
		return rows;
	};

	getContentLimit = async (id_news, id_site) => {
		const { rows } = await this.pool.query(
			`SELECT * FROM history WHERE id_site=${id_site} AND id_record>${id_news} LIMIT 20`
		);
		return rows;
	};

	getAllSiteList = async () => {
		const { rows } = await this.pool.query(
			'SELECT id_site, name_site, url, status FROM sites'
		);
		return rows;
	};

	getOptionsAllSite = async (type_site) => {
		const { rows } = await this.pool.query(
			`SELECT * FROM sites WHERE dynamic_type=${type_site}`
		);
		return rows;
	};

	updateStatusSite = async (id_site, status) => {
		await this.pool
			.query(`UPDATE Sites SET status='${status}' WHERE id_site=${id_site}`)
			.catch((err) => {
				throw err;
			});
	};
}

const db = new DataBase();

module.exports = db;
