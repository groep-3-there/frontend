<template>
  <v-container>
    <v-form ref="createChallengeForm" @submit.prevent>
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
                  <RichEditor/>
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
              <v-select
                v-model="visibility"
                variant="outlined"
                label="Zichtbaarheid"
                :items="visibilityItems"
                :item-props="visibilityProperties"
                class="date"
                :rules="[(v) => !!v || 'Dit veld is verplicht!']"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex justify-space-around">
              <v-tooltip v-model="showBanner" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn icon v-bind="props" class="tooltip" color="primary">
                    <v-icon color="secundary"> mdi-information-variant </v-icon>
                  </v-btn>
                </template>
                <span>
                  <p>Maximale groote banner: 10MB</p>
                  <p>Aangeraden aspect ratio: 16:9</p>
                </span>
              </v-tooltip>
              <v-file-input
                accept="image/png, image/jpeg, image/svg"
                label="Upload een banner"
                variant="outlined"
                chips
                show-size
                v-model="banner"
                :rules="[
                  (v) =>
                    v.length == 0 ||
                    (v.length == 1 && v[0].size < 10000000) ||
                    'De grootte van het bestand moet kleiner zijn dan 10MB!',
                ]"
              >
              </v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex justify-space-around">
              <v-tooltip v-model="showImages" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn icon v-bind="props" class="tooltip" color="primary">
                    <v-icon color="secundary"> mdi-information-variant </v-icon>
                  </v-btn>
                </template>
                <span>
                  <p>Maximaal 8 afbeeldingen</p>
                  <p>Maximale groote per afbeelding: 10MB</p>
                </span>
              </v-tooltip>
              <v-file-input
                accept="image/png, image/jpeg, image/svg"
                label="Upload afbeeldingen"
                variant="outlined"
                chips
                multiple
                counter
                show-size
                v-model="images"
                :rules="[(v) => (v.length < 9 && !v.some((i: any) => { return i.size > 10000000 })) || 'Er mogen maximaal 8 afbeeldingen van 10MB worden geüpload!']"
              >
              </v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-combobox
                label="Tags"
                v-model="tags"
                :items="standardTags.map((tag) => tag.name)"
                variant="outlined"
                multiple
                chips
                clearable
                :rules="[(v) => !v.some((i: string) => { return i.includes(',') }) || 'Invoer ongeldig']"
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
import { Ref, ref } from "vue";
import { onMounted } from "vue";
import Api from "@/Api";
import { Challenge } from "@/models/Challenge";


import router from "@/router";
import RichEditor from "@/components/RichEditor.vue";

import { Tag } from "@/models/Tag";

/**
 * funtion
 * */
onMounted(async () => {
  standardTags.value = await Api.getTags();
});



const createdChallenge = ref(null) as Ref<Challenge | null>;

const title = ref("");
const summary = ref("");
const description = ref("");
const contactInformation = ref("");
const visibilityItems = [
  {
    title: "Publiek",
    subtitle: "Iedereen, ook zonder account",
    codeName: "PUBLIC",
  },
  {
    title: "Intranet",
    subtitle: "Iedereen met een account",
    codeName: "INTRANET",
  },
  {
    title: "Intern",
    subtitle: "Iedereen van uw bedrijf",
    codeName: "INTERNAL",
  },
  {
    title: "Afdeling",
    subtitle: "Iedereen van uw afdeling",
    codeName: "DEPARTMENT",
  },
];
const visibility = ref(null);
const banner = ref([]);
const images = ref([]);
const tags = ref([]);

/**
 * @type {string[]} - standard tags to choose from
 * API gets called on mounted, which fills this array
 */
const standardTags: Ref<Tag[]> = ref([]);

const date = ref("");
function visibilityProperties(item: any) {
  return {
    title: item.title,
    subtitle: item.subtitle,
  };
}
function getVisibilityCodeName(title: string) {
  return visibilityItems.find((item) => item.title === title)?.codeName;
}
const createChallengeForm = ref(null) as any;


/**
 * show the tooltip for the banner
 * default is false
 */
const showBanner = ref(false);

/**
 * show the tooltip for the images
 * default is false
 */
const showImages = ref(false);

async function createChallenge() {
  const { valid } = await createChallengeForm.value.validate();
  if (!valid || visibility.value == null) {
    alert("Alle vereiste velden zijn nog niet ingevuld!");
    return;
  }

  let tagString = "";
  if (tags.value != null) {
    tags.value.forEach((tag: string) => {
      tagString += tag + ",";
    });
  }

  //upload banner
  let uploadedBannerId = null;
  if (banner.value?.length) {
    const response = await Api.uploadImage(banner.value[0]);
    uploadedBannerId = response.id;
  }

  //Upload attachments and get their ids
  const attachmentImages: number[] = [];
  for (const toUpload of images.value) {
    const img = await Api.uploadImage(toUpload);
    attachmentImages.push(img.id);
  }
  const challenge = {
    title: title.value,
    summary: summary.value,
    description: summary.value,
    bannerImageId: uploadedBannerId,
    contactInformation: contactInformation.value,
    status: "OPEN_VOOR_IDEEEN",
    endDate: date.value,
    imageAttachmentsIds: attachmentImages,
    tags: tagString,
    visibility: getVisibilityCodeName(visibility.value),
  };
  console.log("Creating challenge", challenge);
  const created = await Api.createChallenge(challenge);


  createdChallenge.value = created;
  console.log(createdChallenge.value);
  // router.push(`/challenge/${createdChallenge?.value?.id}`);
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

.tooltip {
  margin: 0 2rem 0 0;
}
</style>
