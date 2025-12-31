"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const turn_js_1 = require("./turn.js");
const questioner_js_1 = require("./questioner.js");
const displayMessages_js_1 = require("./displayMessages.js");
/**
 * Responsibility: Keeps track of the current game state
 */
class Game {
    turn = new turn_js_1.Turn();
    questioner = new questioner_js_1.Questioner();
    console;
    _displayMessages;
    constructor(consoleWrapper = console, displayMessages = new displayMessages_js_1.DisplayMessages()) {
        this.console = consoleWrapper;
        this._displayMessages = displayMessages;
    }
    add(name) {
        this.turn.addPlayer(name);
        this.console.log(name + " was added");
        this.console.log(this._displayMessages.displayPlayerNumber(this.turn.numberOfPlayers()));
    }
    movePlayer(roll) {
        this.console.log(this._displayMessages.displayRollPlayerMessage(roll));
        const currentPlayer = this.turn.retrieveCurrentPlayer();
        if (currentPlayer === undefined) {
            return;
        }
        currentPlayer?.movePlayer(roll);
        this.console.log(this._displayMessages.displayPlayerLocation(currentPlayer.name, currentPlayer.place));
    }
    wrongAnswer() {
        this.console.log('Question was incorrectly answered');
        // it seems confusing to make this a method on Player class?
        const currentPlayer = this.turn.retrieveCurrentPlayer();
        if (currentPlayer === undefined) {
            return;
        }
        currentPlayer.inPenaltyBox = true;
        this.console.log(this._displayMessages.displayPutPlayerInBox(currentPlayer.name));
    }
    correctAnswer() {
        this.console.log("Answer was correct!!!!");
        // it seems confusing to make this a method on Player class?
        const currentPlayer = this.turn.retrieveCurrentPlayer();
        if (currentPlayer === undefined) {
            return;
        }
        currentPlayer.purse++;
        this.console.log(this._displayMessages.displayRewardPlayer(currentPlayer.name, currentPlayer.purse));
    }
    askQuestion() {
        let currentPlayer = this.turn.retrieveCurrentPlayer();
        if (currentPlayer === undefined) {
            return false;
        }
        const playerBoardPosition = currentPlayer.place;
        this.console.log(this.questioner.displayCategory(playerBoardPosition));
        this.console.log(this.questioner.displayQuestion(playerBoardPosition));
        const correctlyAnsweredQuestion = Math.floor(Math.random() * 10) === 7;
        return correctlyAnsweredQuestion; // has to be moved
    }
    checkPenaltyBox(roll) {
        const currentPlayer = this.turn.retrieveCurrentPlayer();
        if (currentPlayer === undefined) {
            return false;
        }
        this.console.log(this._displayMessages.displayBeginTurn(currentPlayer.name));
        const startedInPenaltyBox = currentPlayer.inPenaltyBox;
        if (startedInPenaltyBox) {
            currentPlayer.attemptEscapePenaltyBox(roll);
            this.console.log(this._displayMessages.displayPenaltyBoxMessage(currentPlayer.name, currentPlayer.inPenaltyBox));
            return true;
        }
        return false;
    }
    // Code Smell: middleman - but moving it would be worse
    rotatePlayer() {
        this.turn.rotatePlayer();
    }
    // Code Smell: middleman - but moving it would be worse
    currentPlayerWon() {
        const currentPlayer = this.turn.retrieveCurrentPlayer();
        if (currentPlayer === undefined) {
            return false;
        }
        return currentPlayer.hasPlayerWon();
    }
}
exports.Game = Game;
