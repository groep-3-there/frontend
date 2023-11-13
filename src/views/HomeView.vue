<template>
  <HelloWorld />

  <h2>Voor debug mogelijkheden kan hier ingelogd worden met verschillende accounts</h2>
  <v-btn @click="login(1)">Login als user 1</v-btn>
  <v-btn @click="login(2)">Login als user 1</v-btn>

  <v-btn @click="test()">test</v-btn>
</template>

<script lang="ts" setup>
  import API from '@/Api';
import HelloWorld from '@/components/HelloWorld.vue'
import { useSessionStore } from '@/store/sessionStore';
const sessionStore =useSessionStore()

async function login(name: number){
  const success = await sessionStore.logIn(`${name}@mm.com`, `mmuser${name}`) 
  console.log("Login success: " , success)
}
async function test(){
  const r = await API.test()
  console.log(r)
}
</script>
