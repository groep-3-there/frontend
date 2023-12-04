<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" class="d-flex justify-center align-center">
                <user-bubble v-bind:user="props.user" :with-name="true" :size="48" :with-subtitle="false"></user-bubble>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-center align-center">
                <v-select
                    label="Rol" 
                    :items="roles.map((obj) => obj.name)" 
                    v-model="selectedRole" 
                    density="comfortable"
                    @update:model-value="(e) => updateRole(e)"
                    class="custom-width-select">
                </v-select>
            </v-col>
        </v-row>
        <hr>
    </v-container>
</template>

<style>

</style>

<script lang="ts" setup>

import { Role } from "@/models/Role";
import { User } from "@/models/User";
import { PropType, ref } from "vue";
import UserBubble from "./UserBubble.vue";

const props = defineProps({
    user: {
        type: User,
        required: true,
    },
    roles: {
        type: Array as () => Role[],
        required: true,
    },
});

const selectedRole = ref<string | null>(props.user.role?.name || null);
const emit = defineEmits(["update"]);

function updateRole(newRole : any){
    console.log(newRole)
    const roleId = props.roles.find((obj) => obj.name === newRole)?.id
    emit("update", { userId: props.user.id, roleId: roleId })
}

</script>