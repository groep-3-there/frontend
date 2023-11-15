<template>
    <v-container>
        <v-form ref="createCompanyRegistration" @submit.prevent>
            <v-row>
                <v-dialog 
                    width="700"
                    ><template v-slot:activator="{ props }">
                        <v-btn v-bind="props" text="Registreer Bedrijf"></v-btn>
                    </template>
                    
                    <template v-slot:default="{ isActive }">
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Bedrijfsregistratie</span>
                            </v-card-title>
                        <v-col cols="11">
                        <v-row justify="center">
                            <v-col cols="12" md="7">
                                <v-text-field
                                    v-model="title"
                                    label="Bedrijfsnaam"
                                    :rules="[
                                        (v) => !!v || 'Dit veld is verplicht!'
                                    ]"
                                    required
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        
                        <v-row justify="center">
                            <v-col cols="12" md="7">
                                <v-autocomplete
                                    clearable
                                    chips
                                    multiple
                                    v-model="branches"
                                    label="Branches"
                                    :rules="[
                                        (v) => !!v || 'Dit veld is verplicht!'
                                    ]"
                                    :items="standardbranches.map((obj) => obj.name)"
                                    required
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>

                        <v-row justify="center">
                            <v-col cols="12" md="7">
                                <v-combobox
                                    label="Tags"
                                    v-model="tags"
                                    :items="standardTags.map((tag) => tag.name)"
                                    variant="outlined"
                                    multiple
                                    chips
                                    clearable
                                    :rules="[
                                        (v) => !!v || 'Dit veld is verplicht!',
                                        (v) =>
                                            !v.some((i: string) => {
                                                return i.includes(',');
                                            }) || 'Invoer ongeldig',
                                    ]"
                                    required
                                >
                                </v-combobox>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue-darken-1"
                                variant="text"
                                @click="isActive.value = false">
                                Close
                            </v-btn>
                            <v-btn
                                @click="registerCompany"
                                size="large"
                                variant="elevated"
                                color="blue-darken-1"
                                type="submit"
                            >
                                Registreren
                            </v-btn>
                        </v-card-actions>
                        </v-col>
                    </v-card>
                </template>
                </v-dialog>
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
    if (
        !valid ||
        title.value == null ||
        branches.value == null
    ) {
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