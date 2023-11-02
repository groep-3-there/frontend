<template>
  <v-container>
    <h1 class="title d-flex justify-center justify-md-start">
      Challenges zoeken
    </h1>

    <v-row class="align-center">
      <v-col cols="10" md="8">
        <v-text-field
          label="Zoekterm"
          variant="underlined"
          v-model="searchTerm"
        ></v-text-field>
      </v-col>
      <v-col cols="2"
        ><v-btn
          class="zoekknop"
          prepend-icon="mdi-magnify"
          @click="search()"
          color="primary"
        >
          zoek
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        md="2"
        offset-md="0"
        order-md="first"
        class="d-flex justify-center"
      >
        <v-btn
          class="filterknop"
          variant="outlined"
          prepend-icon="mdi-filter-variant"
          @click="showfilters = !showfilters"
        >
          Filters
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="showfilters">
      <v-col cols="12" md="6">
        <v-autocomplete
          clearable
          chips
          multiple
          v-model="selectedBranches"
          label="Branches"
          :items="['ICT', 'Horeca', 'Kantoor', 'Zorg', 'Onderwijs', 'Overheid']"
          variant="outlined"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <v-autocomplete
          clearable
          chips
          multiple
          v-model="selectedCompanies"
          label="Bedrijven"
          :items="['Chippie', 'DUO', 'Mariene']"
          variant="outlined"
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-radio-group
          inline
          v-model="sort"
          class="d-flex justify-center justify-md-end"
        >
          <v-radio label="Nieuwste eerst" value="newest_first"></v-radio>
          <v-radio
            label="Einddatum dichtbij eerst"
            value="deadline_closest_first"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-col
        cols="12"
        md="6"
        order-md="first"
        class="d-flex justify-md-start justify-center"
      >
        <p>2 resultaten</p>
      </v-col>
    </v-row>
  </v-container>

  <div v-for="challenge in challenges" :key="challenge.id">
    <ChallengeSearchResult
      :challenge="(challenge as Challenge)"
    ></ChallengeSearchResult>
  </div>

  <!-- <div>
    <v-pagination :length="4"></v-pagination>
  </div> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChallengeSearchResult from "@/components/ChallengeSearchResult.vue";
import API from "@/Api";
import { Challenge } from "@/models/Challenge";
import router from "@/router";

const challenges = ref();
challenges.value = API.getChallengesBySearch();
console.log("challenges: " + challenges.value);
</script>

<script lang="ts">
//search term in search bar
const searchTerm = ref("");

//show or hide div with filters, hide is standard
const showfilters = ref(false);

//selected items in filters
const selectedBranches = ref([]);
const selectedCompanies = ref([]);

//sort order, newest_first or deadline_closest_first, newest_first is standard
const sort = ref("newest_first");

//challenges to show
// let challenges = ref([]);
// let challenges = API.getFakeChallenges();

function search() {
  // challenges.value = API.getFakeChallenges();

  router.push({
    path: "/challenges",
    query: {
      query: searchTerm.value,
      company: selectedCompanies.value.join(","),
      branche: selectedBranches.value.join(","),
      sort: sort.value,
    },
  });
}
</script>

<style scoped>
.title {
  padding: 4rem 0 0 0;
}
</style>
