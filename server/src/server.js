const fastify = require('fastify')({
	logger: true,
});
const path = require('path');

const port = process.env.PORT || 3000;
const TIMER = 5 * 60 * 1000;

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

const child_process = require('child_process');
let ex = path.join(__dirname, '/parse/index.js');

setInterval(() => {
	child_process.execFile(
		'node ' + ex,
		[],
		{
			shell: true,
		},
		(err) => {
			if (err) throw err;
		}
	);
}, TIMER);
