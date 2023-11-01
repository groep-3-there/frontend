<template>
  <v-container class="challengekaart">
    <v-row>
      <v-col-3 class="d-flex justify-center align-center">
        <img
          class="afbeelding"
          src="https://www.weertmagazine.com/wp-content/uploads/2019/11/D5D_0199.jpg"
          alt="afbeelding van jeroen"
        />
      </v-col-3>

      <v-col>
        <div class="challengetekst">
          <h3>{{ challenge?.title }}</h3>
          <p>{{ challenge?.description }}</p>
        </div>

        <div class="challengedata d-flex justify-space-between">
          <div>
            <p>Einddatum: {{ challenge?.endDate.getUTCFullYear() }}</p>
          </div>
          <div class="tags d-flex" style="border: 1px solid red">
            <v-chip v-for="tag in challenge?.tags" :key="tag">{{ tag }}</v-chip>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Challenge } from "@/models/Challenge";

defineProps({
  challenge: Challenge,
});
</script>

<style scoped>
.challengekaart {
  border: 1px solid black;
  padding: 1rem;
  margin: 2rem 0 0 0;
  border-radius: 15px;
  box-shadow: 2px 2px darkgray;
}

.afbeelding {
  width: 100px;
  height: 100px;
  background-color: #e0e0e0;
  border-radius: 50%;
  margin: 1rem;
}

.challengedata {
  margin-top: 1rem;
}
</style>
