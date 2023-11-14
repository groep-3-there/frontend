<template>
  <HelloWorld />

  <h2>Voor debug mogelijkheden kan hier ingelogd worden met verschillende accounts</h2>
  <v-btn class="mx-2" @click="login(1)">Login als user Jan Bakker</v-btn>

  <v-btn @click="test()">test</v-btn>
  <br>
  {{ whoami }}
</template>

<script lang="ts" setup>
import API from '@/Api';
import HelloWorld from '@/components/HelloWorld.vue'
import { useSessionStore } from '@/store/sessionStore';
import { ref } from 'vue';
const sessionStore =useSessionStore()
const whoami = ref({})
async function login(name: number){
  const success = await sessionStore.logIn(`${name}@mm.com`, `mmuser${name}`) 
  console.log("Login success: " , success)
}
async function test(){
  const r = await API.whoami()
  whoami.value = r
}
</script>
