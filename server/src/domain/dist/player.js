"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
/**
 * The current Player, able to move itself on the board (? should it be able to?) and determine if he's won
 */
class Player {
    name;
    purse = 0;
    place = 0;
    inPenaltyBox = false;
    constructor(name) {
        this.name = name;
    }
    attemptEscapePenaltyBox(roll) {
        if (this.inPenaltyBox) {
            this.inPenaltyBox = roll % 2 === 1;
        }
    }
    movePlayer(roll) {
        this.place = this.place + roll;
        if (this.place > 12) {
            this.place = this.place - 12;
        }
    }
    hasPlayerWon() {
        return this.purse === 6;
    }
}
exports.Player = Player;
