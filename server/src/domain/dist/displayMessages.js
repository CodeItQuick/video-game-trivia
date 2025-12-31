"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayMessages = void 0;
/**
 * Responsibility: Given domain information, turns these into display information
 */
class DisplayMessages {
    displayPlayerLocation(playerName, playerPlace) {
        return playerName + "'s new location is " + playerPlace;
    }
    displayPenaltyBoxMessage(playerName, isInPenaltyBox) {
        return isInPenaltyBox ?
            playerName + " is not getting out of the penalty box" :
            playerName + " is getting out of the penalty box";
    }
    displayPutPlayerInBox(playerName) {
        return playerName + " was sent to the penalty box";
    }
    displayRewardPlayer(playerName, coins) {
        return playerName + " now has " + coins + " Gold Coins.";
    }
    displayBeginTurn(playerName) {
        return playerName + " is the current player";
    }
    displayRollPlayerMessage(roll) {
        return "They have rolled a " + roll;
    }
    displayPlayerNumber(playerNumber) {
        return "They are player number " + playerNumber;
    }
}
exports.DisplayMessages = DisplayMessages;
