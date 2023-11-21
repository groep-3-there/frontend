<template>
    <v-row justify="center">
        <v-dialog v-model="opened" class="dialog">
            <v-card class="rounded-4 card-dialog">
                <v-card-title class="text-h5 mx-auto my-2">
                    Afdeling toevoegen
                </v-card-title>

                <v-form ref="form" class="my-6">
                    <v-alert
                        v-if="error"
                        type="error"
                        class="mx-auto my-4 error-alert"
                        dismissible
                    >
                        {{ error }}
                    </v-alert>
                    <v-text-field
                        v-model="newDepartmentName"
                        variant="underlined"
                        class="text-field mx-auto"
                        :rules="[
                            (v: string) =>
                                (v.length > 1) ||
                                'Vul alstublieft een naam in',
                        ]"
                        label="Afdeling naam"
                        prepend-icon="mdi-book-multiple-outline"
                        required
                    >
                    </v-text-field>
                    <v-autocomplete
                        class="text-field mx-auto mt-4"
                        @update:model-value="(e:any)=>selectMember(e)"
                        :items="companyMembersFiltered"
                        chips
                        variant="underlined"
                        prepend-icon="mdi-account"
                        closable-chips
                        color="blue-grey-lighten-2"
                        item-title="name"
                        item-value="id"
                        label="Beheerder van de nieuwe afdeling"
                        >
                        <template v-slot:chip="{ props, item }">
                            <v-chip
                            v-bind="props"
                            :prepend-avatar="item.raw.getAvatarOrDefaultUrl()"
                            :text="item.raw.name"
                            ></v-chip>
                        </template>

                        <template v-slot:item="{ props, item }">
                            <v-list-item
                            v-bind="props"
                            :prepend-avatar="item?.raw?.getAvatarOrDefaultUrl()"
                            :title="item?.raw?.name"
                            :is="item?.raw?.id"
                            :subtitle="`Huidige afdeling: ${item?.raw?.department?.name}`"
                            ></v-list-item>
                        </template>
                </v-autocomplete>
                    
                </v-form>
                <v-spacer class="my-2"></v-spacer>

                <v-btn
                    :color="success ? 'green' : 'primary'"
                    variant="elevated"
                    class="action-button login-button mx-auto"
                    @click="createDepartment"
                >
                    <template v-if="!loading"> Afdeling maken </template>
                    <template v-else>
                        <v-progress-circular
                            indeterminate
                        ></v-progress-circular>
                    </template>
                </v-btn>
                <p @click="close" class="register mx-auto mb-2">
                    Annuleren
                    
                </p>
            </v-card>
            <v-card> </v-card>
        </v-dialog>
    </v-row>
</template>
<style>
.dialog {
    max-width: 600px;
    min-width: 200px;
}

.card-dialog {
    max-height: 500px;
}

.action-button {
    width: 200px;
}
.login-button {
    transition: background-color 0.2s;
}

.text-field {
    width: 80%;
}

.register {
    color: rgb(93, 93, 238);
}

.register:hover {
    cursor: pointer;
    text-decoration: underline;
}
.error-alert {
    width: 80%;
}
</style>

<script setup lang="ts">
import API from "@/Api";
import { Ref, computed, onMounted, watch } from "vue";
import { ref } from "vue";
import UserRegisterPopup from "./UserRegisterPopup.vue";
import { useSessionStore } from "@/store/sessionStore";
import { User } from "@/models/User";
const sessionStore = useSessionStore();
const emit = defineEmits(["onClose", "requestUpdateDepartments"]);

const newDepartmentName = ref("");
const targetAdminId = ref(-1);

const companyMembers : Ref<User[]> = ref([]); //everyone in the company

//filter out yourself and department admins (they can't be transfered to another department, since its current department will not have a admin anymore)
const companyMembersFiltered = computed(() => {
    return companyMembers.value.filter((member) => {
        return member.id != sessionStore.loggedInUser?.id && member.role?.isDeparmentAdmin == false;
    });
});

const opened = ref(true);
const error = ref("");
const loading = ref(false);

const success = ref(false);

watch(opened, (newVal) => {
    console.log(opened.value);
    if (newVal == false) {
        close();
        console.log("closing");
        opened.value = true;
    }
});
function close() {
    emit("onClose");
}

function selectMember(e:any){
    targetAdminId.value = e;
}


onMounted(()=>{
    getCompanyMembers();
})
async function getCompanyMembers(){
    if(!sessionStore.loggedInUser?.department){
        console.warn("User has no department, and should not be here");
        return;
    }
    companyMembers.value = await API.getCompanyMembersByCompanyId(sessionStore.loggedInUser.department.parentCompany.id)
}
async function createDepartment() {
    loading.value = true;
    error.value = "";
    const result = await API.departmentExists(sessionStore.loggedInUser!.department!.parentCompany.id, newDepartmentName.value)
    if(targetAdminId.value == -1){
        error.value = "Selecteer een beheerder";
    }
    if(result){
        error.value = "Die afdeling naam bestaat al";
    }
    if(error.value != ""){
        loading.value = false;
        return;
    }
    //No errors
    try{
        const newDepartment = await API.createDepartment(
            newDepartmentName.value,
            targetAdminId.value
        );
        if(!newDepartment){
            error.value = "Er is iets misgegaan";
            loading.value = false;
            return;
        }
    }
    catch(e){
        console.log(e)
        error.value = "Er is iets misgegaan";
        loading.value = false;
        return;
    }
    loading.value = false;
    success.value = true;
    emit("requestUpdateDepartments");
    setTimeout(() => {
        close();
    }, 500);


}
</script>
