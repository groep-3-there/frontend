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
          :items="standardbranches.map(obj => obj.name)"
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
        <p v-if="challenges?.totalElements === 1">1 resultaat</p>
        <p v-else-if="challenges?.totalElements as number > 1">
          {{ challenges?.totalElements as number }} resultaten
        </p>
        <p v-else-if="challenges?.totalElements == 0">Geen resultaten</p>
        <p v-else>Er is iets fout gegaan</p>
      </v-col>
    </v-row>
  </v-container>

  <hr />

  <div v-for="challenge in challenges?.content" :key="challenge.id">
    <ChallengeSearchResult
      @click="() => router.push(`/challenge/${challenge.id}`)"
      :challenge="(challenge as Challenge)"
    ></ChallengeSearchResult>
  </div>

  <div>
    page {{ page }}
    <v-pagination
      :length="challenges?.totalPages"
      :total-visible="7"
      v-model="page"
      @click="getPage()"
    ></v-pagination>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import API from "@/Api";
import ChallengeSearchResult from "@/components/ChallengeSearchResult.vue";
import { Challenge } from "@/models/Challenge";
import { ChallengeSearchResults } from "@/models/ChallengeSearchResults";
import router from "@/router";
import { onMounted } from "vue";
import { Branch } from "@/models/Branch";

const standardbranches: Ref<Branch[]> = ref([]);
/**
 * @type {string} - search term in search bar
 * empty string is default
 */
const searchTerm = ref("");

/**
 * show (true) or hide (false) the div with filters,
 * hide is default
 */
const showfilters = ref(false);

/**
 * @type {string[]} - selected branches to filter on
 * empty array is default
 */
const selectedBranches = ref([]);

/**
 * @type {string[]} - selected companies to filter on
 * empty array is default
 */
const selectedCompanies = ref([]);

/**
 * @type {string} - sort order for challenges, newest_first is default
 * choose between newest_first or deadline_closest_first
 */
const sort = ref("newest_first");

/**
 * @type {ChallengeSearchResults} - challenges[] + total pages + total elements
 */
const challenges = ref<ChallengeSearchResults>();

/**
 * @type {number} - current page
 * 1 is default
 * important to subtract 1 when calling the API,
 * because the API starts counting at 0 for pages and Vue starts counting at 1
 */
const page = ref(1);

onMounted(async () => {
  let query = router.currentRoute.value.query;
  
  let searchTerm = query?.query as string;
  let companiesAsString = query?.company as string;
  let companies = companiesAsString?.split(",") as string[];
  let branchesAsString = query?.branche as string;
  let branches = branchesAsString?.split(",") as string[];
  let sort = query?.sort as string;

  challenges.value = await API.getChallengesBySearch(
    searchTerm,
    companies,
    branches,
    sort,
    page.value - 1 // subtract 1 because the API starts counting at 0 for pages and Vue starts counting at 1
  );

  standardbranches.value = await API.getBranches(
  );
});

/**
 * This function builds the query for the url
 * Returns an object with the query parameters
 * If a parameter is not set, it will not be included in the object
 */
function buildQuery() {
  const query: any = {};

  if (searchTerm.value) {
    query.query = searchTerm.value;
  }
  if (selectedCompanies.value.length) {
    query.company = selectedCompanies.value.join(",");
  }
  if (selectedBranches.value.length) {
    query.branche = selectedBranches.value.join(",");
  }
  if (sort.value) {
    query.sort = sort.value;
  }
  if (page.value) {
    query.page = page.value;
  }

  return query;
}

/**
 * This function gets called when the search button is clicked
 * It will update the url with the search parameters
 * It will also call the API to get the challenges
 * challenges.value will be updated with the new challenges
 * page.value will be set to 1
 */
async function search() {
  const query = buildQuery();
  query.page = 1;
  router.push({
    path: "/challenges",
    query,
  });

  challenges.value = await API.getChallengesBySearch(
    searchTerm.value,
    selectedCompanies.value,
    selectedBranches.value,
    sort.value,
    page.value - 1 // subtract 1 because the API starts counting at 0 for pages and Vue starts counting at 1
  );
}

/**
 * This function gets called when the pagination is clicked
 * It will update the url with the new page
 * It will also call the API to get the challenges
 * challenges.value will be updated with the new challenges
 */
async function getPage() {
  // update the front-end url with the new page
  const query = buildQuery();
  router.push({
    path: "/challenges",
    query,
  });

  // get the challenges from the API
  challenges.value = await API.getChallengesBySearch(
    searchTerm.value,
    selectedCompanies.value,
    selectedBranches.value,
    sort.value,
    page.value - 1 // subtract 1 because the API starts counting at 0 for pages and Vue starts counting at 1
  );
}
</script>

<style scoped>
.title {
  padding: 4rem 0 0 0;
}
</style>