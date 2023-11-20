<template>
    <HelloWorld />
    <h2>
        Voor debug mogelijkheden kan hier ingelogd worden met verschillende
        accounts
    </h2>
    <v-btn class="mx-2" @click="loginAsChallenger">Challenger Eline</v-btn>
    <v-btn class="mx-2" @click="loginAsMedewerker">Medewerker Jelle</v-btn>
    <v-btn class="mx-2" @click="loginAsMatchMaker">MatchMaker</v-btn>
    <br />
    <br />
    <h3>Firebase testdata ophalen</h3>
    <v-btn @click="test()">test</v-btn>
    <br />
    {{ whoami }}
    <h3>Bedrijf registreren test</h3>
    <CompanyRegistrationPopUp />

    <h3>gebruiker registreren test</h3>
    <UserRegisterPopup />
</template>

<script lang="ts" setup>
import API from "@/Api";
import HelloWorld from "@/components/HelloWorld.vue";
import CompanyRegistrationPopUp from "@/components/CompanyRegistrationPopUp.vue";
import LoginPopup from "@/components/LoginPopup.vue";
import UserRegisterPopup from "@/components/UserRegisterPopup.vue";
import { useSessionStore } from "@/store/sessionStore";
import { ref } from "vue";
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
async function test() {
    const r = await API.whoami();
    whoami.value = r;
}
</script>
