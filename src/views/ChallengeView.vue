<template>

<div class="challenge-hero">
    <h1>

    </h1>
</div>


</template>
  
<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'
import { Ref, ref } from 'vue';
import { Challenge } from '@/models/Challenge';

const challenge = ref({}) as Ref<Challenge | null>
    

</script>
  