<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h1 class="my-2">Challenge maken</h1>
        <v-row>
          <v-col>
            <v-text-field
              v-model="titel"
              label="Titel"
              required
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
              v-model="samenvatting"
              label="Samenvatting"
              required
              variant="outlined"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
              v-model="beschrijving"
              label="Beschrijving"
              required
              variant="outlined"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-textarea
              v-model="contactinformatie"
              label="Contactinformatie"
              variant="outlined"
              required
            ></v-textarea>
          </v-col>
        </v-row>

        <div class="mb-4 text-subtitle-1">Zichtbaarheid*</div>
        <v-row class="mb-4">
          <v-btn-toggle
            v-model="zichtbaarheid"
            rounded="0"
            color="blue"
            variant="outlined"
            group
            mandatory
          >
            <v-btn value="publiek">Publiek</v-btn>
            <v-btn value="intranet">Intranet</v-btn>
            <v-btn value="intern">Intern</v-btn>
            <v-btn value="afdeling">Afdeling</v-btn>
          </v-btn-toggle>
        </v-row>

        <v-row>
          <v-col>
            <v-file-input
              accept="image/png, image/jpeg, image/svg"
              label="Upload een banner"
              variant="outlined"
              density="compact"
            >
              <v-tooltip slot="append" bottom></v-tooltip>
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
              :items="['Test1', 'Test2']"
              variant="outlined"
              multiple
              chips
              clearable
            >
              <template #selection="{ item }">
                <Tag :tagName="item.value"></Tag>
              </template>
            </v-combobox>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              type="date"
              label="Einddatum"
              variant="outlined"
              v-model="datum"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-end">
          <v-btn size="large" variant="elevated" color="primary" type="submit">
            Aanmaken
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import Tag from "@/components/Tag.vue";
import { Ref, ref } from "vue";

const titel = ref("");
const samenvatting = ref("");
const beschrijving = ref("");
const contactinformatie = ref("");
const zichtbaarheid = ref("");
const banner = ref("");
const images = ref("");
const tags = ref("");
const datum = ref("");
</script>
