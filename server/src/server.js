const fastify = require('fastify')({
	logger: true,
});
const path = require('path');

const port = process.env.port || 3000;
//const TIMER = 0.5 * 60 * 1000;

fastify.register(require('./routes/api'));
fastify.register(require('fastify-static'), {
	root: path.join(__dirname, '../../client/build'),
});
fastify.get('/', (req, reply) => {
	return reply.sendFile('index.html');
});

fastify.listen(port, () => {
	fastify.log.info(`server listening on ${port}`);
});
