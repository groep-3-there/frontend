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

  const ready = ref(true)
</script>
