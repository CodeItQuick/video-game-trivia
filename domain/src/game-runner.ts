import readline from 'node:readline';

import {Game} from './game.js';
import {ConsoleWrapper} from "./consoleWrapper.js";


const gamePrompter = {
    async promptNames(numberOfPlayers: number) {
        let playerNames: string[] = [];
        let playerIdx = 0;
        while (playerNames.length < numberOfPlayers) {
            playerNames.push(await prompt(`What is the name of the ${playerIdx + 1} player? `) as string);
            playerIdx++;
        }
        return playerNames;
    },
    async promptNumber(lowerBound: number = 0, upperBound: number = 8, queryName: string = `players`) {
        let numberPrompt: number = NaN;
        while (isNaN(numberPrompt) || numberPrompt < lowerBound || numberPrompt > upperBound) {
            numberPrompt = await prompt(`How many ${queryName}s in the game? Up to ${upperBound} ${queryName}s supported: `) as number;
        }
        return numberPrompt;
    },
    async promptAnswer(lowerBound: number = 0, upperBound: number = 8, queryName: string = `answers`) {
        let numberPrompt: number = NaN;
        while (isNaN(numberPrompt) || numberPrompt < lowerBound || numberPrompt > upperBound) {
            numberPrompt = await prompt(`Which ${queryName}s do you pick? from ${lowerBound} to ${upperBound} supported: `) as number;
        }
        return numberPrompt;
    }

}

type RunnerType = {
    names: string[];
    numPlayers: number[];
    answers: number[];
    promptNames(_numberOfPlayers: number): string[];
    promptNumber(_lowerBound: number, _upperBound: number, _queryName: string): number;
    promptAnswer(_lowerBound: number, _upperBound: number, _queryName: string): number
} | {
    promptNames(numberOfPlayers: number): Promise<string[]>;
    promptNumber(lowerBound?: number, upperBound?: number, queryName?: string): Promise<number>;
    promptAnswer(lowerBound?: number, upperBound?: number, queryName?: string): Promise<number>
};

export class GameRunner {

    public static async main(consoleWrapper: ConsoleWrapper | typeof console = console,
                             runner: {
                                 names: string[];
                                 numPlayers: number[];
                                 answers: number[];
                                 promptNames(_numberOfPlayers: number): string[];
                                 promptNumber(_lowerBound: number, _upperBound: number, _queryName: string): number;
                                 promptAnswer(_lowerBound: number, _upperBound: number, _queryName: string): number;
                             } | typeof gamePrompter = gamePrompter ): Promise<([RunnerType, Game])>{
        const game = new Game(consoleWrapper);

        return [runner, game];
    }

    static async createNewGame(runner: RunnerType, game: Game) {
        let numberOfPlayers = await runner.promptNumber(0, 4, `player`);

        let playerNames = await runner.promptNames(numberOfPlayers);

        for (const player of playerNames) {
            game.add(player);
        }

        return true;
    }

    public static async takeTurnsIn(game: Game, runner: RunnerType) {
        let winner: boolean = false;
        while(!winner) {
            const answerIdx = await runner.promptAnswer(0, 4, "answer");
            // exit the loop on undefined input since this is the end of the answers, keep the game running in the process
            if (!answerIdx) {
                break;
            }
            // checking to determine if they should or should not be removed from penalty box, more than just a bool check
            if (!game.checkPenaltyBox(Math.floor(Math.random() * 10))) {
                // asking the question, and then also determining if they answered correctly or not; also violates SRP
                game.askQuestion();


                console.log("ANSWER: ", answerIdx)
                if (+answerIdx === 3) {
                    game.correctAnswer()
                    winner = game.currentPlayerWon();
                    if (!winner) {
                        game.movePlayer(Math.floor(Math.random() * 10))
                    }
                } else {
                    game.wrongAnswer();
                }
            }
            winner = game.currentPlayerWon();
            if (!winner) {
                game.rotatePlayer()
            }
        }

        return winner;
    }
}

const rl = readline.createInterface({input: process.stdin, output: process.stdout})
export const prompt = (query: string) =>
    new Promise((resolve) => rl.question(query, resolve));

  