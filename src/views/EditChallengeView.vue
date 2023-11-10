<template>
  <v-container>
    <v-form ref="editChallengeForm" @submit.prevent>
      <v-row>
        <v-col cols="12">
          <h1 class="my-2">Challenge bewerken</h1>
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
            <v-col>
              <v-file-input
                accept="image/png, image/jpeg, image/svg"
                label="Upload een nieuwe banner"
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

          <v-row v-if="originalChallenge?.bannerImageId !== null">
            <v-col>
              <div>
                <v-img class="banner" :src="showBanner()">
                  <v-btn
                    class="delete-image"
                    size="x-small"
                    icon="mdi-trash-can-outline"
                    @click="deleteImage"
                  ></v-btn>
                </v-img>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-file-input
                accept="image/png, image/jpeg, image/svg"
                label="Upload afbeeldingen"
                variant="outlined"
                chips
                multiple
                counter
                show-size
                v-model="images"
                :rules="[(v) => (v.length < 9 && !v.some((i:any) => {return i.size > 10000000 })) || 'Er mogen maximaal 8 afbeeldingen van 10MB worden geüpload!']"
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
                :rules="[(v) => !v.some((i:string)=>{return i.includes(',')}) || 'Invoer ongeldig']"
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
              @click="editChallenge"
              size="large"
              variant="elevated"
              color="primary"
              type="submit"
            >
              Bewerken
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Api from "@/Api";
import { Ref } from "vue";
import { Challenge } from "@/models/Challenge";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import router from "@/router";

const originalChallenge: Ref<Challenge | null> = ref(null);
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
const visibility = ref();
const banner = ref([]);
const images = ref([]);
const tags = ref([] as any);
const date = ref("");
const editChallengeForm = ref(null) as any;
const idParam = useRoute().params.id;
let id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);
function visibilityProperties(item: any) {
  return {
    title: item.title,
    subtitle: item.subtitle,
  };
}
function getVisibilityCodeName(title: string) {
  return visibilityItems.find((item) => item.title === title)?.codeName;
}

onMounted(async () => {
  originalChallenge.value = await Api.getChallengeById(id);
  title.value = originalChallenge.value.title;
  summary.value = originalChallenge.value.summary;
  description.value = originalChallenge.value.description;
  contactInformation.value = originalChallenge.value.contactInformation;
  visibility.value = visibilityItems.find((item) => {
    if (originalChallenge.value !== null) {
      return item.codeName === originalChallenge.value.visibility;
    }
  })?.title;
  //TODO images.value = originalChallenge.value.imageAttachmentsIds
  tags.value = originalChallenge.value.tags.split(",");
  date.value = originalChallenge.value.endDate.toString().slice(0, 10);
});

function showBanner() {
  return `${Api.BASEURL}image/${originalChallenge.value?.bannerImageId}`;
}

function deleteImage(){
  originalChallenge.value!.bannerImageId = null
}

async function editChallenge() {
  const { valid } = await editChallengeForm.value.validate();
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

  let uploadedBannerId = null;
  if (banner.value?.length) {
    const response = await Api.uploadImage(banner.value[0]);
    uploadedBannerId = response.id;
  }

  const attachmentImages: number[] = [];
  for (const toUpload of images.value) {
    const img = await Api.uploadImage(toUpload);
    attachmentImages.push(img.id);
  }

  const challenge = {
    id: id,
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
  await Api.updateChallenge(challenge);
  router.push(`/challenge/${id}`);
}
</script>
<style scoped>
.date {
  max-width: 11rem;
}

.banner {
  max-width: 10rem;
}

.delete-image {
  max-width: fit-content;
  max-height: 0;
}

h1 {
  padding: 4rem 0 0 0;
}
</style>