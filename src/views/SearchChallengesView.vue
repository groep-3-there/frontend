<template>
  <h1 class="title">Challenges zoeken</h1>

  <div class="zoekbalk">
    <v-form class="d-flex justify-center align-center">
      <v-btn 
        class="filterknop"
        variant="outlined"
        prepend-icon="mdi-filter-variant"
        >
        Filters
      </v-btn>

      <v-text-field
        label="Zoekterm"
        variant="underlined"
        v-model="searchTerm"
      ></v-text-field>

      <!-- icon of a searchglass -->
      <v-btn 
        class="zoekknop" 
        prepend-icon="mdi-magnify" 
        > 
        zoek 
      </v-btn>
    </v-form>
  </div>

  <div class="aap d-flex justify-space-between w-100">
    <div>
      <p>{{ challenges.length }} resultaten</p>
    </div>
    <div class="sorteermanieren d-flex justify-space-between">
      <p class="sorteermanier">Einddatum dichtbij eerst</p>
      <p class="sorteermanier">Nieuwste eerst</p>
    </div>
  </div>

  <div v-for="challenge in challenges" :key="challenge.id">
    <ChallengeSearchResult :challenge="challenge"></ChallengeSearchResult>
  </div>

  <div>
    <v-pagination :length="4"></v-pagination>
  </div>
  <div>{{ searchTerm }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChallengeSearchResult from "@/components/ChallengeSearchResult.vue";
import API from "@/Api";
</script>

<script lang="ts">
let searchTerm = ref("");

let challenges = API.getFakeChallenges();
</script>

<style scoped>
.title {
  padding: 4rem 0 0 0;
}

.zoekbalk {
  padding: 2rem 0 0 0;
}

.filterknop {
  margin-right: 1rem;
}

.zoekknop {
  margin-left: 1rem;
}

.sorteermanieren :first-child {
  margin: 0 3rem 0 0;
}

</style>
