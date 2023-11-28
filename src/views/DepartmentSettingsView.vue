<template>
    <h1>Rollen</h1>
    <template v-for="userInDepartment in users" :key="userInDepartment.id">
        <v-row v-if="!userInDepartment.role?.isDepartmentAdmin">
            <v-col cols="12" md="9" class="mx-auto">
                <RoleAssign
                    :user="userInDepartment"
                    :roles="assignableRoles"
                ></RoleAssign>
            </v-col>
        </v-row>
    </template>
</template>

<script lang="ts" setup>
import API from "@/Api";
import RoleAssign from "@/components/RoleAssign.vue";
import { useSessionStore } from "@/store/sessionStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { User } from "@/models/User";
import { Role } from "@/models/Role";

const idParam = useRoute().params.id;
let id = Array.isArray(idParam) ? idParam[0] : idParam;
const sessionStore = useSessionStore();

const users = ref<User[]>();
const assignableRoles = ref<Role[]>();

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

</script>