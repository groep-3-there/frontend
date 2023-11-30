<template>
    <v-container>
        <v-row>
            <v-col class="d-flex align-center gap">
                <p>{{ props.user.name }}</p>
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
    </v-container>
</template>

<style>
.gap {
    gap: 10rem;
}
.custom-width-select {
    max-width: 30rem;
}

</style>

<script lang="ts" setup>

import { Role } from "@/models/Role";
import { User } from "@/models/User";
import { PropType, ref } from "vue";

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