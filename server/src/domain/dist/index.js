"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_runner_js_1 = require("./game-runner.js");
game_runner_js_1.GameRunner.main().then(async function ([runner, game]) {
    await game_runner_js_1.GameRunner.createNewGame(runner, game);
    process.exit(0);
}).catch(console.error);
