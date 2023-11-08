<template>
  <v-app>
    <v-main>
      <SnackbarContent />
      <router-view v-if="ready">
      </router-view>
      <template v-else>
        Loading...
      </template>
    </v-main>
  </v-app>
</template>
<style>
.snack-item{
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 100;
}
</style>
<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { ref } from 'vue';
import { useSessionStore } from './store/sessionStore';
import { useSnackbarStore } from "./store/Snackbar"
import SnackbarContent from "./components/SnackbarContent.vue"
import API from './Api';
import { onMounted } from 'vue';

const sessionStore = useSessionStore()
const ready = ref(true)
  setInterval(()=>{
    sessionStore.forceUpdate();
  },10000)

const snackbar = useSnackbarStore();
onMounted(async ()=>{
  setInterval(async()=>{
    try{
      console.log(await API.pingServer())
    }
    catch(error : any){
      snackbar.createSimple("We konden de server niet bereiken", "error");
    }
  }, 10000)

})

</script>
