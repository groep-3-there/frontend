<template>
    <v-container>
        <v-form ref="createCompanyRegistration" @submit.prevent>
            <v-row>
                <v-col cols="12">
                    <h1 class="my-2">Bedrijfsregistratie</h1>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="title"
                                label="Bedrijfsnaam"
                                :rules="[
                                    (v) => !!v || 'Dit veld is verplicht!',
                                ]"
                                required
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-autocomplete
                                clearable
                                chips
                                multiple
                                v-model="branches"
                                label="Branches"
                                :items="standardbranches.map((obj) => obj.name)"
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
                            @click="registerCompany"
                            size="large"
                            variant="elevated"
                            color="primary"
                            type="submit"
                        >
                            Registreren
                        </v-btn>
                    </v-row>

                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>
<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import Api from "@/Api";
import { Branch } from "@/models/Branch";
import { Tag } from "@/models/Tag";
import router from "@/router";

onMounted(async () => {
    standardTags.value = await Api.getTags();
});

const title = ref("");
const branches = ref([]);
const standardbranches: Ref<Branch[]> = ref([]);
/**
 * @type {string[]} - standard tags to choose from
 * API gets called on mounted, which fills this array
 */
const standardTags: Ref<Tag[]> = ref([]);
const tags: Ref<string[]> = ref([]);
const createCompanyRegistration = ref(null) as any;

async function registerCompany() {
    const { valid } = await createCompanyRegistration.value.validate();
    if (!valid || title.value == null || branches.value == null) {
        alert("Alle vereiste velden zijn nog niet ingevuld!");
        return;
    }

    let tagString = "";
    if (tags.value != null) {
        tags.value.forEach((tag: string) => {
            tagString += tag + ",";
        });
    }
    const company = {
        title: title.value,
        selectedBranches: branches.value,
        tags: tagString,
    };
    console.log("Registering Company", company);
    const created = await Api.registerCompany(company);

    router.push(`/Registercompany/${created?.id}`);
}
</script>
