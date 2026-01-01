<script setup lang="ts">

import {ref} from "vue";

defineProps<{ msg: string }>()

const gameInstance = ref(false);
const playersAdded = ref(false);
const gameOver = ref(false);

const hostAddress = process.env === 'dev' ? 'http://localhost:5187': '';

const requestNewInstance = async () => {
  const gameInstanceResponse = await fetch(`${hostAddress}/api/`).then(x => x.json())
  playersAdded.value = false;
  gameOver.value = false;
  console.log(gameInstanceResponse)
  gameInstance.value =  gameInstanceResponse?.gameInstanceMade || false;
}

const addPlayers = async () => {
  const playersAddedResponse = await fetch("/api/create-new-game").then(x => x.json())
  console.log(playersAddedResponse)
  playersAdded.value =  playersAddedResponse?.newGameCreated || false;
}
const takeTurn = async () => {
  const turnTakenResponse = await fetch("/api/take-turn-in").then(x => x.json())
  console.log(turnTakenResponse)
  gameOver.value =  turnTakenResponse?.gameOver || false;
}
console.log(gameInstance)
console.log(playersAdded)
console.log(gameOver)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <h1 v-if="!gameInstance && !playersAdded && !gameOver">{{ gameInstance ? 'Games Lobby': '' }}</h1>
    <h1 v-if="gameInstance && !playersAdded && !gameOver">{{ gameInstance ? 'Game Lobby': '' }}</h1>
    <h1 v-if="gameInstance && playersAdded && !gameOver">{{ gameInstance ? 'Current Game': '' }}</h1>
    <button type="button" v-if="!gameInstance && !playersAdded" @click="requestNewInstance">Create New Game</button>
    <button type="button" v-if="gameInstance && !playersAdded" @click="addPlayers">Add Players</button>
    <button type="button" v-if="gameInstance && playersAdded && !gameOver" @click="takeTurn">Take Turn</button>
    <div v-if="gameInstance && playersAdded && !gameOver">Currently playing, take another turn</div>
    <div v-if="gameInstance && playersAdded && gameOver">Game is over!</div>
    <button type="button" v-if="gameInstance && playersAdded && gameOver" @click="requestNewInstance">Create New Game</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
