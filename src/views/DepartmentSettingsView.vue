<template>
    <h1>Instellingen voor {{ sessionStore.loggedInUser?.department?.name }}</h1>
        <v-container>
            <v-row>
                <v-col>
                    <h3>Rollen aanpassen</h3>
                </v-col>
            </v-row>
            <template v-for="userInDepartment in users" :key="userInDepartment.id">
                <v-row>
                    <v-col md="9" cols="12">
                        <RoleAssign
                        @update="(e)=>addToUpdates(e.userId, e.roleId)"
                        :roles="assignableRoles || []"
                        :user="userInDepartment"
                        ></RoleAssign>
                    </v-col>
                </v-row>
            </template>
            
            <template v-if="updates.values.length === 0 && showError">
                <p style="color: red;">Er is geen rol geselecteerd om te updaten.</p>
            </template>
            
            <template v-if="showRoleError">
                <p style="color: red;">Een afdeling heeft altijd een beheerder nodig</p>
            </template>
            
            <v-row>
                <v-col>
                    <v-btn color="primary" variant="elevated" @click="updateRoles">Update Rollen</v-btn>
                </v-col>
            </v-row>
        </v-container>
</template>

<script lang="ts" setup>
import API from "@/Api";
import RoleAssign from "@/components/RoleAssign.vue";
import { useSessionStore } from "@/store/sessionStore";
import { Ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { User } from "@/models/User";
import { Role } from "@/models/Role";
import { useSnackbarStore } from "@/store/Snackbar";

const snackbar = useSnackbarStore();

const idParam = useRoute().params.id;
let id = Array.isArray(idParam) ? idParam[0] : idParam;
const sessionStore = useSessionStore();

let users = ref<User[]>();
const assignableRoles: Ref<Role[]> = ref([]);

let showError = ref(false);
let showRoleError = ref(false);

const updates: Ref<{ userId: number, roleId: number }[]> = ref([]);

function addToUpdates(userId: number, roleId: number) {
    const existingUpdate = updates.value.find(update => update.userId === userId);
    if (existingUpdate) {
        existingUpdate.roleId = roleId;
    } else {
        updates.value.push({ userId, roleId });
    }
}

onMounted(async () => {
    await LoadUsers();
    await LoadAssignableRoles();
});

async function LoadAssignableRoles() {
    assignableRoles.value = await API.LoadAssignableRoles();
}

async function LoadUsers() {
    users.value = await API.LoadUsersFromDepartment(sessionStore.loggedInUser?.department?.id ?? 0);
}

async function updateRoles() {
    showError.value = false;
    showRoleError.value = false;

    //checks if there are any updates
    if (updates.value.length === 0) {
        showError.value = true;
        updates.value = [];
        return;
    }

    //checks if there is a department admin in the update
    let hasDepartmentAdmin: boolean = false;
    for (const update of updates.value) {
        if (update.roleId === 3) {
            hasDepartmentAdmin = true;
            break;
        }
    }

    //if there is no department admin in the update, check if atleast 1 of the current admins is still an admin
    const currentAdmins = users.value?.filter(user => user.role?.id === 3) ?? [];
    if (!hasDepartmentAdmin) {
        for (const currentAdmin of currentAdmins) {
            if (!updates.value.some(update => update.userId === currentAdmin.id)) {
                hasDepartmentAdmin = true;
                break;
            }
        }
    }

    //stop if the department has no admin
    if (!hasDepartmentAdmin) {
        showRoleError.value = true;
        return;
    }

    //send to api
    try {
        await API.updateRoles(sessionStore.loggedInUser?.department?.id ?? 0, updates.value);
        snackbar.createSimple("De rollen zijn succesvol geupdate", "success");
    } catch (e) {
        snackbar.createSimple("Er is iets mis gegaan", "error");
    }

    //reset the updates
    await LoadUsers();
    updates.value = [];
}
</script>