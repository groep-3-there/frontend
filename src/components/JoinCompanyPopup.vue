<template>
    <v-dialog v-model="opened" width="auto">
        <v-card class="dialog-card">
            <v-card-title class="text-h5">
                Sluit u aan bij een bedrijf
            </v-card-title>
            <div v-if="joinDepartment" class="d-flex header my-4">
                <img
                    class="invite-logo"
                    :src="
                        joinDepartment?.parentCompany?.getProfileOrDefaultImageUrl()
                    "
                    alt="logo"
                />
                <h2 class="text-center invite-title ml-2">
                    Uitnodiging van
                    {{ joinDepartment?.parentCompany?.name }}
                </h2>
            </div>
            <v-text-field
                :prepend-inner-icon="icon"
                label="Bedrijfscode"
                :color="joinDepartment ? 'green' : 'gray'"
                v-model="companyCode"
                type="text"
                class="mt-2"
                variant="outlined"
            >
            </v-text-field>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" @click="close">
                    Annuleren
                </v-btn>
                <v-btn color="green-darken-1" variant="text" @click="send">
                    Versturen
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import API from "@/Api";
import { Department } from "@/models/Department";
import { computed } from "vue";
import { Ref, watch } from "vue";
import { ref } from "vue";
const companyCode = ref("");
const emit = defineEmits(["onAcceptAndClose", "onClose"]);
const checkingInProgress = ref(false);

let _thresholdSearchDepartment: any = null;
const icon = computed(()=>{
    if(checkingInProgress.value){
        return "mdi-loading mdi-spin";
    }
    if(joinDepartment.value){
        return "mdi-check";
    }
    return "mdi-close";
});
watch(companyCode, async (newVal) => {
    if (!newVal) return;
    if (_thresholdSearchDepartment) {
        return;
    }
    checkingInProgress.value = true;

    _thresholdSearchDepartment = setTimeout(async () => {
        joinDepartment.value = null;
        _thresholdSearchDepartment = null;
        try {
            const department = await API.getDepartmentByCode(newVal as string);
            joinDepartment.value = department;
        } catch (err) {
            console.log("Invalid code");

        }
        finally{
            checkingInProgress.value = false;
        }
    }, 1000);
});

const opened = ref(true);

watch(opened, (newVal) => {
    if (!newVal) {
        close();
    }
});

const joinDepartment: Ref<Department | null> = ref(null);

function close() {
    emit("onClose");
}

async function send() {
    emit("onAcceptAndClose");
}
</script>
<style scoped>
.dialog-card {
    padding: 10px;
    min-width: 400px;
}
.invite-title {
    display: flex;
    align-items: center;
    font-weight: 400;
}
.invite-logo {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 100%;
}
</style>
