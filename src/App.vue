<template>
  <v-app>
    <v-main>
      
      <router-view v-if="ready">
      </router-view>
      <template v-else>
        Loading...
      </template>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import HelloWorld from '@/components/HelloWorld.vue'
  import { ref } from 'vue';
  import { useSessionStore } from './store/sessionStore';
  const sessionStore = useSessionStore()
  const ready = ref(true)
  setInterval(()=>{
    sessionStore.forceUpdate()
  },10000)

</script>
