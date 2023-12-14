<template>
    <v-app>
        <v-main>
            <SnackbarContent />
            <router-view v-if="ready"> </router-view>
            <template v-else> Loading... </template>
        </v-main>
    </v-app>
</template>
<style scoped>
.snack-item {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 100;
}
</style>
<script setup lang="ts">
import { ref } from "vue";
import { useSessionStore } from "./store/sessionStore";
import { useSnackbarStore } from "./store/Snackbar";
import SnackbarContent from "./components/SnackbarContent.vue";
import API from "./Api";
import { onMounted } from "vue";
import { onBeforeMount } from "vue";
import { useTheme } from 'vuetify'
import { watch } from "fs";
const theme = useTheme()

onBeforeMount(()=>{
    //initialize theme
    const fromStorage = localStorage.getItem("theme");
    if (fromStorage) {
        theme.global.name.value = fromStorage;
    }

})
const sessionStore = useSessionStore();
const ready = ref(true);
setInterval(() => {
    sessionStore.forceUpdate();
}, 300000);

const snackbar = useSnackbarStore();

onMounted(async () => {
    setInterval(async () => {
        try {
            await API.pingServer();
        } catch (error: any) {
            snackbar.createSimple("We konden de server niet bereiken", "error");
        }
    }, 300000);
});
</script>
