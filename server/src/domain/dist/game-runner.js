"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompt = exports.GameRunner = void 0;
const node_readline_1 = __importDefault(require("node:readline"));
const game_js_1 = require("./game.js");
const gamePrompter = {
    async promptNames(numberOfPlayers) {
        let playerNames = [];
        let playerIdx = 0;
        while (playerNames.length < numberOfPlayers) {
            playerNames.push(await (0, exports.prompt)(`What is the name of the ${playerIdx + 1} player? `));
            playerIdx++;
        }
        return playerNames;
    },
    async promptNumber(lowerBound = 0, upperBound = 8, queryName = `players`) {
        let numberPrompt = NaN;
        while (isNaN(numberPrompt) || numberPrompt < lowerBound || numberPrompt > upperBound) {
            numberPrompt = await (0, exports.prompt)(`How many ${queryName}s in the game? Up to ${upperBound} ${queryName}s supported: `);
        }
        return numberPrompt;
    },
    async promptAnswer(lowerBound = 0, upperBound = 8, queryName = `answers`) {
        let numberPrompt = NaN;
        while (isNaN(numberPrompt) || numberPrompt < lowerBound || numberPrompt > upperBound) {
            numberPrompt = await (0, exports.prompt)(`Which ${queryName}s do you pick? from ${lowerBound} to ${upperBound} supported: `);
        }
        return numberPrompt;
    }
};
class GameRunner {
    static async main(consoleWrapper = console, runner = gamePrompter) {
        const game = new game_js_1.Game(consoleWrapper);
        console.log(runner);
        return [runner, game];
    }
    static async createNewGame(runner, game) {
        let numberOfPlayers = await runner.promptNumber(0, 4, `player`);
        let playerNames = await runner.promptNames(numberOfPlayers);
        for (const player of playerNames) {
            game.add(player);
        }
        return true;
    }
    static async takeTurnsIn(game, runner) {
        let winner = false;
        while (!winner) {
            const answerIdx = await runner.promptAnswer(0, 4, "answer");
            // exit the loop on undefined input since this is the end of the answers, keep the game running in the process
            if (!answerIdx) {
                break;
            }
            // checking to determine if they should or should not be removed from penalty box, more than just a bool check
            if (!game.checkPenaltyBox(Math.floor(Math.random() * 10))) {
                // asking the question, and then also determining if they answered correctly or not; also violates SRP
                game.askQuestion();
                console.log("ANSWER: ", answerIdx);
                if (+answerIdx === 3) {
                    game.correctAnswer();
                    winner = game.currentPlayerWon();
                    if (!winner) {
                        game.movePlayer(Math.floor(Math.random() * 10));
                    }
                }
                else {
                    game.wrongAnswer();
                }
            }
            winner = game.currentPlayerWon();
            if (!winner) {
                game.rotatePlayer();
            }
        }
        return winner;
    }
}
exports.GameRunner = GameRunner;
const rl = node_readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
exports.prompt = prompt;
