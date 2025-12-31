import {GameRunner} from "./game-runner.js";

GameRunner.main().then(async function ([runner, game])  {
    await GameRunner.createNewGame(runner, game);
    process.exit(0)
}).catch(console.error)