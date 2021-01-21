const db = require('../database/index');

const handlerDeleteSite = (req, res) => {
	const param = req.query;
	const id_site = JSON.parse(param.id_site);
	if (id_site !== undefined && typeof id_site === 'number' && id_site !== null)
		db.deleteSite(id_site);
	return (res.sendCode = 200);
};

const handlerGetSites = async (req, res) => {
	const data = await db.getAllSiteList();
	return res.send(data);
};

const handlerAddSite = async (req, res) => {
	if (!req.body) return (res.sendCode = 400);
	const data = req.body;
	db.pushSite(data);
	return res.send(true);
};

const handlerGetContent = async (req, res) => {
	if (!req.body) return (res.sendCode = 400);
	const data = JSON.parse(req.body);
	const content = await db.getContentLimit(data.id_post, data.id_site);
	return res.send(content);
};

module.exports = (fastify, opts, done) => {
	fastify.get('/delete-site', handlerDeleteSite);
	fastify.get('/get-site', handlerGetSites);
	fastify.post('/add-site', handlerAddSite);
	fastify.post('/get-content', handlerGetContent);
	done();
};
