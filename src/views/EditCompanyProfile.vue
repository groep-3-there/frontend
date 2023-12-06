<template>
    <v-container v-if="originalCompany">
        <v-form ref="editCompanyForm" @submit.prevent>
            <v-row>
                <v-col cols="12">
                    <h1 class="my-2">Bedrijfsprofiel bewerken</h1>
                    <v-row>
                        <v-col>
                            <div>
                                <v-card
                                    v-if="
                                        originalCompany?.profileImageId &&
                                        profileImage.length == 0
                                    "
                                    class="avatar"
                                >
                                    <v-img
                                        :src="showProfileImage()"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                        height="200px"
                                        cover
                                    >
                                    </v-img>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-card-text class="text-black"
                                            >Huidig bedrijfsprofiel foto</v-card-text
                                        >
                                        <v-btn
                                            size="small"
                                            color="surface-variant"
                                            variant="text"
                                            icon="mdi-trash-can-outline"
                                            @click="deleteProfileImage"
                                        ></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </div>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-file-input
                                accept="image/png, image/jpeg, image/svg"
                                label="Upload een bedrijfsprofiel foto"
                                variant="outlined"
                                chips
                                show-size
                                v-model="profileImage"
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
                        <v-col>
                            <v-text-field
                                v-model="name"
                                label="Naam"
                                :rules="nameRules"
                                required
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <RichEditor
                                v-if="originalCompany"
                                :initialize-with="originalCompany.info"
                                @model-value-changed="(e) => (info = e)"
                            ></RichEditor>
                        </v-col>
                    </v-row>

                    <v-row>
                            <v-col cols="12" md="11">
                                <v-autocomplete
                                    v-model="branch"
                                    label="Branch"
                                    :items="
                                        standardBranches.map((obj) => obj.name)
                                    "
                                    :rules="[
                                        (v) => !!v || 'Dit veld is verplicht!',
                                    ]"
                                    required
                                    variant="outlined"
                                ></v-autocomplete>
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

                    <v-row class="d-flex justify-end">
                        <v-btn
                            @click="editCompany"
                            size="large"
                            variant="elevated"
                            color="primary"
                            type="submit"
                        >
                            Profiel bewerken
                        </v-btn>
                    </v-row>
                </v-col>
                <v-col></v-col>
            </v-row>
        </v-form>
    </v-container>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import Api from "@/Api";
import RichEditor from "@/components/RichEditor.vue";
import { Ref } from "vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import router from "@/router";
import { Tag } from "@/models/Tag";
import { useSnackbarStore } from "@/store/Snackbar";
import { Company } from "@/models/Company";
import { Branch } from "@/models/Branch";
const snackbar = useSnackbarStore();
const originalCompany: Ref<Company | null> = ref(null);
const name = ref("");
const info = ref("");
const profileImage = ref([]);
const standardTags: Ref<Tag[]> = ref([]);
const standardBranches: Ref<Tag[]> = ref([]);
const tags = ref([] as any);
const branch = ref(null as String | null);
const editCompanyForm = ref(null) as any;
const idParam = useRoute().params.id;
let id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);

function showProfileImage() {
    return `${Api.BASEURL}image/${originalCompany.value?.profileImageId}`;
}
function deleteProfileImage() {
    originalCompany.value!.profileImageId = null;
}
const nameRules = [
    (v: string) => !!v || "Naam is verplicht",
    (v: string) => v.length >= 2 || "Naam moet minimaal 2 tekens lang zijn",
];

onMounted(async () => {
    standardTags.value = await Api.getTags();
    standardBranches.value = await Api.getBranches();
    originalCompany.value = await Api.getCompany(id);
    name.value = originalCompany.value.name;
    info.value = originalCompany.value.info;
    tags.value = originalCompany.value.tags == "" ? [] : originalCompany.value.tags.split(",");
    branch.value = originalCompany.value.branch.name;
});

async function editCompany() {
    const { valid } = await editCompanyForm.value.validate();
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

    let uploadedProfileId = null;
    if (profileImage.value?.length) {
        const response = await Api.uploadImage(profileImage.value[0]);
        uploadedProfileId = response.id;
    } else {
        uploadedProfileId = originalCompany.value!.profileImageId;
    }

    const company = {
        id: id,
        name: name.value,
        info: info.value,
        tags: tagString,
        branch: standardBranches.value.find((b: Branch) => b.name == branch.value),
        profileImageId: uploadedProfileId,
    };
    try {
        await Api.updateCompany(company);
    } catch (e) {
        snackbar.createSimple("Er is iets mis gegaan", "error");
        return;
    }
    snackbar.createSimple("Het bedrijfsprofiel is succesvol bijgewerkt", "success");
    router.push(`/company/${id}`);
}
</script>
<style scoped>
.avatar {
    max-width: 12rem;
}
</style>
