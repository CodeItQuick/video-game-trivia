"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleWrapper = void 0;
class ConsoleWrapper {
    _existingMessages;
    constructor(existingMessages = []) {
        this._existingMessages = existingMessages;
    }
    getMessages() {
        return this._existingMessages;
    }
    log(message) {
        console.log(message);
        this._existingMessages.push(message || '');
    }
}
exports.ConsoleWrapper = ConsoleWrapper;
