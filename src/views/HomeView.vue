<template>
    <HelloWorld />

    <h2>
        Voor debug mogelijkheden kan hier ingelogd worden met verschillende
        accounts
    </h2>
    <v-btn class="mx-2" @click="loginAsChallenger"
        >Login als user Challenger Eline</v-btn
    >
    <br />
    <br />
    <v-btn class="mx-2" @click="loginAsMedewerker"
        >Login als user Medewerker Jelle</v-btn
    >
    <br />
    <br />

    <v-btn @click="test()">test</v-btn>
    <br />
    {{ whoami }}
    <CompanyRegistrationPopUp />
</template>

<script lang="ts" setup>
import API from "@/Api";
import HelloWorld from "@/components/HelloWorld.vue";
import CompanyRegistrationPopUp from "@/components/CompanyRegistrationPopUp.vue";
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
async function test() {
    const r = await API.whoami();
    whoami.value = r;
}
</script>
