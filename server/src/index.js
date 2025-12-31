// Require the framework and instantiate it

// ESM
import Fastify from 'fastify'
import { GameRunner } from '../../domain/dist/game-runner.js'

const fastify = Fastify({
    logger: true
})

let gameRunner, game;
const runner = {
    names: [],
    numPlayers: [],
    answers: [],
    promptNames(_numberOfPlayers){
        return this.names;
    },
    promptNumber(_lowerBound, _upperBound, _queryName){
        return this.numPlayers.shift() || 1;
    },
    promptAnswer(_lowerBound, _upperBound, _queryName){
        return this.answers.shift();
    }
};

// Declare a route
fastify.get('/', async function (request, reply) {


    [gameRunner, game] = await GameRunner.main(console, runner);
    reply.send({ hello: 'world' })
})
// Declare a route
fastify.get('/create-new-game', async function (request, reply) {

    runner.names = ["Jeff", "Evan", "Chet"]
    runner.numPlayers = [3];

    await GameRunner.createNewGame(gameRunner, game);
    reply.send({ hello: 'world' })
})
// Declare a route
fastify.get('/take-turn-in', async function (request, reply) {
    runner.answers = [3];
    await GameRunner.takeTurnsIn(game, gameRunner);
    reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})