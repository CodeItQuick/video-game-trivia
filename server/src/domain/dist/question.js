"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
// value type
class Question {
    _message;
    constructor(message) {
        this._message = message;
    }
    message() {
        return this._message;
    }
}
exports.Question = Question;
