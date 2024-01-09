<template>
  <div class="container mem">
    <div class="row">
      <h1>Debug</h1>
      <hr>
    </div>
    <div class="row"><h2 class="mt-5 mb-3">
      Voor debug mogelijkheden kan hier ingelogd worden met verschillende
      accounts
    </h2>
    </div>
    <div class="row">
      <v-btn class="mx-2" @click="loginAsMatchMaker">MatchMaker</v-btn>
    </div>
    <div class="row">
      <v-btn class="mx-2" @click="loginAsChallenger">Challenger Eline</v-btn>
    </div>
    <div class="row">
      <v-btn class="mx-2" @click="loginAsMedewerker">Medewerker Jelle</v-btn>
    </div>
    <hr class="mt-5 w-25">
    <div class="row">
      <v-btn class="mx-2" @click="loginAsSharryLacht">Sharry Lacht</v-btn>
    </div>
    <div class="row">
      <v-btn class="mx-2" @click="loginAsThijsVanLeeuwen">Thijs van Leeuwen</v-btn>
    </div>
    <hr class="mt-5 w-25">
    <div class="row">
      <div class="col">
        <h2 class="mt-5 mb-3">
          Firebase testdata ophalen
        </h2>
        <v-btn @click="test()">test</v-btn>
        <p>
          {{ whoami }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import API from "@/Api";
import {useSessionStore} from "@/store/sessionStore";
import {ref} from "vue";

const sessionStore = useSessionStore();

const whoami = ref({});

async function loginAsMedewerker() {
  sessionStore.logIn("medewerker@kapper.nl", "kapper123123");
}

async function loginAsChallenger() {
  sessionStore.logIn("challenger@kapper.nl", "kapper123123");
}

async function loginAsMatchMaker() {
  sessionStore.logIn("matchmaker@mail.com", "matchmaker");
}

async function loginAsSharryLacht() {
  sessionStore.logIn("sharry.lacht@email.nl", "!Nhlstenden10");
}

async function loginAsThijsVanLeeuwen() {
  sessionStore.logIn("thijsvanleeuwen@email.nl", "NHLStenden10");
}

async function test() {
  const r = await API.whoami();
  whoami.value = r;
}
</script>

<style scoped>
.mem>div {
  margin-top: 1rem;
}
</style>
