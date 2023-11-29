<template>
    <h1>Rollen</h1>
    {{ updates }}
    <template v-for="userInDepartment in users" :key="userInDepartment.id">
        <v-row v-if="!userInDepartment.role?.isDepartmentAdmin">
            <v-col cols="12" md="9" class="mx-auto">
                <RoleAssign
                    @update="(e)=>addToUpdates(e.userId, e.roleId)"
                    :roles="assignableRoles || []"
                    :user="userInDepartment"
                ></RoleAssign>
            </v-col>
        </v-row>
    </template>
    
    <v-row>
        <v-col>
            <v-btn @click="updateRoles">Update Roles</v-btn>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import API from "@/Api";
import RoleAssign from "@/components/RoleAssign.vue";
import { useSessionStore } from "@/store/sessionStore";
import { PropType, Ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { User } from "@/models/User";
import { Role } from "@/models/Role";
import App from "@/App.vue";

const idParam = useRoute().params.id;
let id = Array.isArray(idParam) ? idParam[0] : idParam;
const sessionStore = useSessionStore();

const users = ref<User[]>();
const assignableRoles: Ref<Role[]> = ref([]);

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
    await API.updateRoles(sessionStore.loggedInUser?.department?.id ?? 0, updates.value);
}

</script>