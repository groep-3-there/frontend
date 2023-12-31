<template>
    <Banner
        v-if="originalChallenge"
        :title="'Bewerk challenge'"
        :subtitle="'Maak aanpassingen naar wens'"
        :banner-src="'/banners/werkplaats.jpg'"
        :darken="true"
        :logo-src="
            originalChallenge.department.parentCompany.getProfileOrDefaultImageUrl()
        "
    />
    <v-container v-if="originalChallenge">
        <v-form ref="editChallengeForm" @submit.prevent>
            <v-row>
                <v-col cols="12">
                    <h1 class="my-2">Challenge bewerken</h1>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="title"
                                label="Titel"
                                :rules="[
                                    (v) => !!v || 'Dit veld is verplicht!',
                                ]"
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
                                :rules="[
                                    (v) => !!v || 'Dit veld is verplicht!',
                                ]"
                                required
                                variant="outlined"
                                auto-grow
                            ></v-textarea>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <RichEditor
                                v-if="originalChallenge"
                                :initialize-with="originalChallenge.description"
                                @model-value-changed="(e) => (description = e)"
                            ></RichEditor>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <RichEditor
                                v-if="originalChallenge"
                                :initialize-with="
                                    originalChallenge.contactInformation
                                "
                                @model-value-changed="
                                    (e) => (contactInformation = e)
                                "
                            ></RichEditor>
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
                                :rules="[
                                    (v) => !!v || 'Dit veld is verplicht!',
                                ]"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <div>
                                <v-card
                                    v-if="
                                        originalChallenge?.bannerImageId &&
                                        banner.length == 0
                                    "
                                    class="banner"
                                >
                                    <v-img
                                        :src="showBanner()"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                        height="200px"
                                        cover
                                    >
                                    </v-img>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-card-text class=""
                                            >Huidige banner</v-card-text
                                        >
                                        <v-btn
                                            size="small"
                                            color="surface-variant"
                                            variant="text"
                                            icon="mdi-trash-can-outline"
                                            @click="deleteBanner"
                                        ></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex justify-space-around">
                            <v-tooltip v-model="showBannerTip" location="top">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        icon
                                        v-bind="props"
                                        class="tooltip"
                                        color="primary"
                                        @click="showBannerTip = !showBannerTip"
                                    >
                                        <v-icon color="secundary">
                                            mdi-information-variant
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>
                                    <p>Maximale groote banner: 10MB</p>
                                    <p>Aangeraden aspect ratio: 16:9</p>
                                </span>
                            </v-tooltip>
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
                                        (v.length == 1 &&
                                            v[0].size < 10000000) ||
                                        'De grootte van het bestand moet kleiner zijn dan 10MB!',
                                ]"
                            >
                            </v-file-input>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col class="d-flex justify-space-around">
                            <v-tooltip v-model="showImagesTip" location="top">
                                <template v-slot:activator="{ props }">
                                    <v-btn
                                        icon
                                        v-bind="props"
                                        class="tooltip"
                                        color="primary"
                                        @click="showImagesTip = !showImagesTip"
                                    >
                                        <v-icon color="secundary">
                                            mdi-information-variant
                                        </v-icon>
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
                                :rules="[
                                    (v) =>
                                        (v.length < 9 &&
                                            !v.some((i: any) => {
                                                return i.size > 10000000;
                                            })) ||
                                        'Er mogen maximaal 8 afbeeldingen van 10MB worden geüpload!',
                                ]"
                            >
                            </v-file-input>
                        </v-col>
                    </v-row>

                    <v-row v-if="originalChallenge?.imageAttachments !== null">
                        <v-col class="d-flex flex-wrap">
                            <div
                                v-for="img in originalChallenge?.imageAttachments"
                                :key="img.id"
                            >
                                <v-card class="attatchment-image-card">
                                    <v-img
                                        :src="img.getUrl()"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                        class="attatchment-image"
                                        cover
                                    >
                                    </v-img>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-card-text> Bijlage </v-card-text>
                                        <v-btn
                                            size="big"
                                            color="surface-variant"
                                            icon="mdi-trash-can-outline"
                                            @click="deleteImage(img)"
                                        ></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </div>
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
                                closable-chips
                                :rules="[
                                    (v) =>
                                        !v.some((i: string) => {
                                            return i.includes(',');
                                        }) || 'Invoer ongeldig',
                                ]"
                            >
                            </v-combobox>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field
                                type="date"
                                label="Einddatum"
                                variant="outlined"
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
                <v-col></v-col>
            </v-row>
        </v-form>
    </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Api from "@/Api";
import RichEditor from "@/components/RichEditor.vue";
import { Ref } from "vue";
import { Challenge } from "@/models/Challenge";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import router from "@/router";
import { Tag } from "@/models/Tag";
import Banner from "@/components/Banner.vue";
import { useSnackbarStore } from "@/store/Snackbar";
const snackbar = useSnackbarStore();
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
const standardTags: Ref<Tag[]> = ref([]);
const banner = ref([]);
const images = ref([]);
const tags = ref([] as any);
const date : Ref<string | null> = ref(null);
const editChallengeForm = ref(null) as any;
const showImagesTip = ref(false);
const showBannerTip = ref(false);

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
    console.log(originalChallenge.value)
    title.value = originalChallenge.value.title;
    summary.value = originalChallenge.value.summary;
    description.value = originalChallenge.value.description;
    contactInformation.value = originalChallenge.value.contactInformation;
    visibility.value = visibilityItems.find((item) => {
        if (originalChallenge.value !== null) {
            return item.codeName === originalChallenge.value.visibility;
        }
    })?.title;
    tags.value = originalChallenge.value.getTagList();
    date.value = originalChallenge.value.endDate?.toISOString().slice(0, 10) || null;
    standardTags.value = await Api.getTags();
});

function showBanner() {
    return `${Api.BASEURL}image/${originalChallenge.value?.bannerImageId}`;
}

function deleteBanner() {
    originalChallenge.value!.bannerImageId = null;
}

function deleteImage(img: any) {
    originalChallenge.value!.imageAttachments =
        originalChallenge.value!.imageAttachments.filter(
            (item) => item !== img,
        );
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
    } else {
        uploadedBannerId = originalChallenge.value!.bannerImageId;
    }

    const attachmentImages: number[] = [];
    for (const toUpload of images.value) {
        const img = await Api.uploadImage(toUpload);
        attachmentImages.push(img.id);
    }

    const attachmentsWithPreviousImages = originalChallenge
        .value!.imageAttachments.map((i) => {
            return i.id;
        })
        .concat(attachmentImages);
    const challenge = {
        id: id,
        title: title.value,
        summary: summary.value,
        description: description.value,
        bannerImageId: uploadedBannerId,
        contactInformation: contactInformation.value,
        status: originalChallenge.value!.status,
        endDate: date.value,
        imageAttachmentsIds: attachmentsWithPreviousImages,
        tags: tagString,
        visibility: getVisibilityCodeName(visibility.value),
    };
    try {
        await Api.updateChallenge(challenge);
    } catch (e) {
        snackbar.createSimple("Er is iets mis gegaan", "error");
        return;
    }
    snackbar.createSimple("De challenge is succesvol bijgewerkt", "success");
    router.push(`/challenge/${id}`);
}
</script>
<style scoped>
.date {
    max-width: 11rem;
}

.banner {
    max-width: 12rem;
}

.delete-image {
    max-width: fit-content;
    max-height: 0;
}

.attatchment-image-card {
    width: 12rem;
    margin: 1rem;
}

.attatchment-image {
    max-height: fit-content;
}
</style>
