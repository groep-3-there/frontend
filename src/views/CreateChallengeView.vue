<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="my-2">Challenge maken</h1>
        <v-row>
          <v-col>
            <v-text-field v-model="title" label="Titel" required variant="outlined"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea v-model="summary" label="Samenvatting" required variant="outlined" auto-grow></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea v-model="description" label="Beschrijving" required variant="outlined" auto-grow
              rows="10"></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea v-model="contactInformation" label="Contactinformatie" variant="outlined" required
              auto-grow></v-textarea>
          </v-col>
        </v-row>

        <div class="text-subtitle-1">Zichtbaarheid*</div>
        <v-row>
          <v-col>
            <v-btn-toggle v-model="visibility" rounded=0 color="blue" class="d-inline-flex flex-wrap" group mandatory>
              <v-btn min-width="100" min-height="40" class="mx-1 my-1" value="PUBLIC">Publiek</v-btn>
              <v-btn min-width="100" min-height="40" class="mx-1 my-1" value="INTRANET">Intranet</v-btn>
              <v-btn min-width="100" min-height="35" class="mx-1 my-1" value="INTERNAL">Intern</v-btn>
              <v-btn min-width="100" min-height="35" class="mx-1 my-1" value="DEPARTMENT">Afdeling</v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-file-input accept="image/png, image/jpeg, image/svg" label="Upload een banner" variant="outlined"
              density="compact">
              <v-tooltip slot="append" bottom></v-tooltip>
            </v-file-input>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-file-input accept="image/png, image/jpeg, image/svg" label="Upload afbeeldingen" variant="outlined"
              multiple density="compact">
            </v-file-input>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-combobox label="Tags" :items="['Test1', 'Test2']" variant="outlined" multiple chips clearable>
              <template #selection="{ item }">
                <Tag :tagName="item.value"></Tag>
              </template>
            </v-combobox>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field type="date" label="Einddatum" variant="outlined" required v-model="date"></v-text-field>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-end">
          <v-btn @click="createChallenge" size="large" variant="elevated" color="primary" type="submit">
            Aanmaken
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import Tag from "@/components/Tag.vue";
import { ref } from "vue";
import Api from "@/Api"

const title = ref("");
const summary = ref("");
const description = ref("");
const contactInformation = ref("");
const visibility = ref("");
const banner = ref("");
const images = ref("");
const tags = ref("");
const date = ref("");

function createChallenge() {
  const challenge = {
    "contactInformation": contactInformation.value,
    "title": title.value,
    "description": summary.value,
    "banner": banner.value,
    "summary": summary.value,
    "status": "OPEN_VOOR_IDEEEN",
    "endDate": date.value,
    "tags": "tag1,tag2",
    "visiblity": visibility.value
  }
  Api.createChallenge(challenge)
}
</script>
