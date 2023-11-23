<template>
    <v-dialog density="compact" width="500" v-model="showPopUp">
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
                                    v-model="companyName"
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
                            <v-col cols="12" md="11">
                                <v-autocomplete
                                    clearable
                                    v-model="branchString"
                                    label="Branch"
                                    :items="
                                        standardbranches.map((obj) => obj.name)
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
                            <v-col cols="12" md="11">
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

                        <v-card-actions>
                            <v-btn @click="close">Terug</v-btn>
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
    </v-dialog>
</template>
<script setup lang="ts">
import { Ref, onMounted, ref, watch } from "vue";
import Api from "@/Api";
import { Branch } from "@/models/Branch";
import { Tag } from "@/models/Tag";
import router from "@/router";
import { useSnackbarStore } from "@/store/Snackbar";

const snackStore = useSnackbarStore();
const companyName = ref("");
const branchString: Ref<string | null> = ref("");
const standardbranches: Ref<Branch[]> = ref([]);
const showPopUp = ref(true)
const emit = defineEmits(["onClose"]);

/**
 * @type {string[]} - standard tags to choose from
 * API gets called on mounted, which fills this array
 */
const standardTags: Ref<Tag[]> = ref([]);
const tags: Ref<string[]> = ref([]);
const createCompanyRegistration = ref(null) as any;

function close(){
    emit("onClose");
}

onMounted(async () => {
    standardTags.value = await Api.getTags();
    standardbranches.value = await Api.getBranches();
});


watch(showPopUp, ()=>{
    if(!showPopUp.value){
        close();
    }
})

async function registerCompany() {
    const branch = standardbranches.value.find(
        (b) => b.name == branchString.value,
    );
    const { valid } = await createCompanyRegistration.value.validate();
    if (!valid || !companyName.value || !branch) {
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
        name: companyName.value,
        branch: branch,
        tags: tagString,
    };
    console.log("Registering Company", company);
    try {
        const created = await Api.registerCompany(company);
    } catch (e) {
        snackStore.createSimple("U heeft al een aanvraag ingediend", "error");
        emit("onClose");
        return;
    }
    snackStore.createSimple("Bedrijf registratie ingediend", "success");
    emit("onClose");
}
</script>
