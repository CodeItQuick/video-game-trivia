const Fastify = require('fastify');
const cors = require('@fastify/cors');
const {GameRunner} = require('./domain/dist/game-runner.js');
const FastifyStatic = require('@fastify/static');


const fastify = Fastify({
    logger: true
})
fastify.register(cors, {
    origin: "https://video-game-trivia-codeitquicks-projects.vercel.app/"
})

// Determine the absolute path to your 'dist' folder
// Assuming your server.js is in the root directory
const distPath = __dirname + '/dist';

// Register the @fastify/static plugin
fastify.register(FastifyStatic, {
    root: distPath,
    prefix: '/', // serve the static files from the root URL
});



let gameRunner, game, winner = false, running;
const runner = () => ({
    names: [],
    numPlayers: [],
    answers: [],
    promptNames(_numberOfPlayers) {
        return this.names;
    },
    promptNumber(_lowerBound, _upperBound, _queryName) {
        return this.numPlayers.shift() || 1;
    },
    promptAnswer(_lowerBound, _upperBound, _queryName) {
        return this.answers.shift();
    }
});

// Declare a route
fastify.get('/api/', async function (request, reply) {
    [gameRunner, game] = await GameRunner.main(console, runner());
    gameRunner.names = [];
    gameRunner.numPlayers = 0;
    gameRunner.answers = [];
    winner = false;
    reply.send({gameInstanceMade: !!(gameRunner && game)})
})
// Declare a route
fastify.get('/api/create-new-game', async function (request, reply) {

    gameRunner.names = ["Jeff", "Evan", "Chet"]
    gameRunner.numPlayers = [3];

    const gameCreated = await GameRunner.createNewGame(gameRunner, game);
    reply.send({newGameCreated: !!gameCreated})
})
// Declare a route
fastify.get('/api/take-turn-in', async function (request, reply) {
    gameRunner.answers = [3];
    if (!winner) {
        winner = await GameRunner.takeTurnsIn(game, gameRunner);
    }
    reply.send({gameOver: winner})

});

// called directly i.e. "node app"
fastify.listen({port: 3000}, function (err, address) {
    if (err) {
        Fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
});
