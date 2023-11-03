<template>
  <v-container>
    <v-form ref="createChallengeForm" fast-fail @submit.prevent>
      <v-row>
        <v-col cols="12">
          <h1 class="my-2">Challenge maken</h1>
          <v-row>
            <v-col>
              <v-text-field
                v-model="title"
                label="Titel"
                :rules="[(v) => !!v || 'Dit veld is verplicht!']"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-textarea
                v-model="summary"
                label="Samenvatting"
                :rules="[(v) => !!v || 'Dit veld is verplicht!']"
                required
                variant="outlined"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-textarea
                v-model="description"
                label="Beschrijving"
                :rules="[(v) => !!v || 'Dit veld is verplicht!']"
                required
                variant="outlined"
                auto-grow
                rows="10"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-textarea
                v-model="contactInformation"
                label="Contactinformatie"
                :rules="[(v) => !!v || 'Dit veld is verplicht!']"
                variant="outlined"
                required
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row class="fit-buttons make-high">
            <v-col>
              <v-select variant="outlined" label="Zichtbaarheid" :items="visibilityItems" :item-props="visibilityProperties" class="date"></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-file-input
                accept="image/png, image/jpeg, image/svg"
                label="Upload een banner"
                variant="outlined"
                density="compact"
              >
              </v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-file-input
                accept="image/png, image/jpeg, image/svg"
                label="Upload afbeeldingen"
                variant="outlined"
                multiple
                density="compact"
              >
              </v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-combobox
                label="Tags"
                v-model="tags"
                :items="['Item1', 'Item2']"
                variant="outlined"
                multiple
                chips
                clearable
              >
              </v-combobox>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                type="date"
                label="Einddatum"
                :rules="[(v) => !!v || 'Dit veld is verplicht!']"
                variant="outlined"
                required
                v-model="date"
                class="date"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="d-flex justify-end">
            <v-btn
              @click="createChallenge"
              size="large"
              variant="elevated"
              color="primary"
              type="submit"
            >
              Aanmaken
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="createdChallenge !== null">
        <RouterLink :to="'/challenge/' + createdChallenge.id"
          >Ga naar challenge</RouterLink
        >
        <h2>Challenge gemaakt</h2>
        {{ createdChallenge.id }}
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Api from "@/Api";
import { Ref } from "vue";
import { Challenge } from "@/models/Challenge";
import router from "@/router";
const createdChallenge = ref(null) as Ref<Challenge | null>;

const title = ref("");
const summary = ref("");
const description = ref("");
const contactInformation = ref("");
const visibilityItems = [{title:'Publiek', subtitle:'Iedereen, ook zonder account', codeValue: "PUBLIC"}, {title:'Intranet', subtitle:'Iedereen met een account', codeValue: "INTRANET"}, {title:'Intern', subtitle:'Iedereen van uw bedrijf', codeValue:"INTERN"}, {title:'Afdeling', subtitle: 'Iedereen van uw afdeling', codeName:"DEPARTMENT"}]
const visibility = ref(visibilityItems[0]);
const banner = ref("");
const images = ref("");
const tags = ref();
const date = ref("");
function visibilityProperties (item : any) {
        return {
          title: item.title,
          subtitle: item.subtitle,
        }
      }
const createChallengeForm = ref(null) as any;
async function createChallenge() {
  const { valid } = await createChallengeForm.value.validate();
  if (!valid) {
    alert("Alle vereiste velden zijn nog niet ingevuld!");
    return;
  }

  let tagString = "";
  if (tags.value != null) {
    tags.value.forEach((tag: string) => {
      tagString += tag + ",";
    });
  }
  
  
  

  const challenge = {
    title: title.value,
    summary: summary.value,
    description: summary.value,
    banner: banner.value,
    contactInformation: contactInformation.value,
    status: "OPEN_VOOR_IDEEEN",
    endDate: date.value,
    tags: tagString,
    visiblity: visibility.value.codeName,
  };
  createdChallenge.value = await Api.createChallenge(challenge);
  console.log("sent new challenge");
  router.push(`/challenge/${createdChallenge?.value?.id}`);
}
</script>

<style scoped>

.date {
  max-width: 11rem;
}

.dropdown {
  max-width: fit-content;
}

h1 {
  padding: 4rem 0 0 0;
}
</style>
