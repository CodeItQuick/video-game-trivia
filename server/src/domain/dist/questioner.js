"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Questioner = void 0;
const question_js_1 = require("./question.js");
// entity, has behaviour
class Questioner {
    pop = new Array();
    science = new Array();
    sports = new Array();
    rock = new Array();
    constructor() {
        for (let i = 0; i < 500; i++) {
            this.pop.push(new question_js_1.Question("Pop Question " + i));
            this.science.push(new question_js_1.Question("Science Question " + i));
            this.sports.push(new question_js_1.Question("Sports Question " + i));
            this.rock.push(new question_js_1.Question("Rock Question " + i));
        }
    }
    displayQuestion(playerBoardPosition) {
        if (playerBoardPosition % 4 === 0) {
            return this.pop.shift()?.message();
        }
        if (playerBoardPosition % 4 === 1) {
            return this.science.shift()?.message();
        }
        if (playerBoardPosition % 4 === 2) {
            return this.sports.shift()?.message();
        }
        if (playerBoardPosition % 4 === 3) {
            return this.rock.shift()?.message();
        }
    }
    displayCategory(playerBoardPosition) {
        if (playerBoardPosition % 4 === 0) {
            return "The category is Pop";
        }
        if (playerBoardPosition % 4 === 1) {
            return "The category is Science";
        }
        if (playerBoardPosition % 4 === 2) {
            return "The category is Sports";
        }
        if (playerBoardPosition % 4 === 3) {
            return "The category is Rock";
        }
        return "";
    }
}
exports.Questioner = Questioner;
