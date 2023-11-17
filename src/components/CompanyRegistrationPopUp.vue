<template>
    <v-dialog density="compact" persistent width="500">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" prepend-icon="mdi-account"
                >Bedrijfsregistratie</v-btn
            >
        </template>
        <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-title>
                    <h2 class="my-2">Bedrijfsregistratie</h2>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="createCompanyRegistration" @submit.prevent>
                            <v-row>
                                <v-col cols="12" md="11">
                                    <v-text-field
                                        v-model="title"
                                        label="Bedrijfsnaam"
                                        :rules="[
                                            (v) =>
                                                !!v || 'Dit veld is verplicht!',
                                        ]"
                                        required
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" md="11">
                                    <v-autocomplete
                                        clearable
                                        chips
                                        multiple
                                        v-model="branches"
                                        label="Branches"
                                        :items="
                                            standardbranches.map(
                                                (obj) => obj.name,
                                            )
                                        "
                                        :rules="[
                                            (v) =>
                                                !!v || 'Dit veld is verplicht!',
                                        ]"
                                        required
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" md="11">
                                    <v-combobox
                                        label="Tags"
                                        v-model="tags"
                                        :items="
                                            standardTags.map((tag) => tag.name)
                                        "
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

                            <v-card-actions>
                                <v-btn @click="isActive.value = false"
                                    >Terug</v-btn
                                >
                                <v-row class="d-flex justify-end">
                                    <v-btn
                                        @click="registerCompany"
                                        size="large"
                                        variant="elevated"
                                        color="primary"
                                        type="submit"
                                        >Registreren</v-btn
                                    >
                                </v-row>
                            </v-card-actions>
                        </v-form>
                    </v-container>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>
<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import Api from "@/Api";
import { Branch } from "@/models/Branch";
import { Tag } from "@/models/Tag";
import router from "@/router";

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

onMounted(async () => {
    standardTags.value = await Api.getTags();
});

async function registerCompany() {
    const { valid } = await createCompanyRegistration.value.validate();
    console.log(branches.value.length);
    if (!valid || !title.value || branches.value.length == 0) {
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
