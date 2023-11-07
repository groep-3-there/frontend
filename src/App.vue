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
import { useSnackbarStore } from "./store/Snackbar"
import SnackbarContent from "./components/SnackbarContent.vue"

const ready = ref(true)
</script>
