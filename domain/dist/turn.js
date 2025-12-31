"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turn = void 0;
const player_js_1 = require("./player.js");
/**
 * Responsibility: Keeps track of current turn, and the player whose turn it is, and the number of players in game
 */
class Turn {
    players = new Array();
    currentPlayer = 0;
    constructor() {
    }
    addPlayer(name) {
        this.players.push(new player_js_1.Player(name));
    }
    rotatePlayer() {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) {
            this.currentPlayer = 0;
        }
    }
    // code smell: exposing the player object so that it can be interacted with directly.
    // however, I wish there was a way to enforce the rule that only the public fields are allowed to be accessed.
    // and I'm not sure about when these methods are accessed should that behaviour exist on player
    retrieveCurrentPlayer() {
        return this.players[this.currentPlayer];
    }
    numberOfPlayers() {
        return this.players.length;
    }
}
exports.Turn = Turn;
