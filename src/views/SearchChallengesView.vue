<template>
  <h1 class="title">Challenges zoeken</h1>

  <div style="border: 1px solid red">
    <h3>debug info</h3>
    <p v-if="$route.query.query">query: {{ $route.query.query }}</p>
    <p v-for="company in $route.query.company_id?.split(',')" :key="company">
      company: {{ company }}
    </p>
    <p v-for="branch in $route.query.branche?.split(',')" :key="branch">
      branch: {{ branch }}
    </p>
    <p v-if="$route.query.sort">sort: {{ $route.query.sort }}</p>
  </div>

  <div class="zoekbalk">
    <v-form class="d-flex justify-center align-center">
      <v-btn
        class="filterknop"
        variant="outlined"
        prepend-icon="mdi-filter-variant"
        @click="showfilters = !showfilters"
      >
        Filters
      </v-btn>

      <v-text-field
        label="Zoekterm"
        variant="underlined"
        v-model="searchTerm"
      ></v-text-field>

      <v-btn
        class="zoekknop"
        prepend-icon="mdi-magnify"
        @click="search()"
        color="primary"
      >
        zoek
      </v-btn>
    </v-form>
  </div>

  <div
    v-if="showfilters"
    id="filters"
    class="d-flex justify-sm-space-around align-center"
  >
    <v-autocomplete
      clearable
      chips
      multiple
      v-model="selectedBranches"
      label="Branches"
      :items="['ICT', 'Horeca', 'Kantoor', 'Zorg', 'Onderwijs', 'Overheid']"
      variant="outlined"
    ></v-autocomplete>

    <v-autocomplete
      clearable
      chips
      multiple
      v-model="selectedCompanies"
      label="Bedrijven"
      :items="['Chippie', 'DUO', 'Mariene']"
      variant="outlined"
    ></v-autocomplete>
  </div>

  <div class="p-100 d-flex justify-space-between w-100">
    <div>
      <p>{{ challenges.length }} resultaten</p>
    </div>
    <div class="sorteermanieren d-flex justify-space-between">
      <v-radio-group inline v-model="sort">
        <v-radio label="Nieuwste eerst" value="newest_first"></v-radio>
        <v-radio
          label="Einddatum dichtbij eerst"
          value="deadline_closest_first"
        ></v-radio>
      </v-radio-group>
    </div>

    <!-- <p class="sorteermanier">Einddatum dichtbij eerst</p>
    <p class="sorteermanier">Nieuwste eerst</p> -->
  </div>

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
import router from "@/router"; // Replace with the actual path to your router configuration file
</script>

<script lang="ts">
//search term in search bar
let searchTerm = ref("");

//show or hide div with filters
let showfilters = ref(false);

//selected items in filters
let selectedBranches = ref([]);
let selectedCompanies = ref([]);

let sort = ref("newest_first");

//challenges to show
// let challenges = ref([]);
let challenges = API.getFakeChallenges();

function search() {
  // challenges.value = API.getFakeChallenges();

  router.push({
    path: "/search",
    query: {
      query: searchTerm.value,
      company_id: selectedCompanies.value.join(","),
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

.zoekbalk {
  padding: 2rem 0 0 0;
}

.filterknop {
  margin-right: 1rem;
}

.zoekknop {
  margin-left: 1rem;
}

/* .sorteermanieren :first-child {
  margin: 0 3rem 0 0;
} */

#filters {
  padding: 1rem;
  /* margin: 1rem;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: 2px 2px darkgray; */
}

#filters > * {
  max-width: 45%;
  /* margin: 0 2rem 0 0; */
}
</style>
