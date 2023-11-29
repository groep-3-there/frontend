<template>
    <v-container>
        <v-row>
            <v-col>
                <p>
                    {{ props.user.name }}
                    <v-select
                        label="Select"
                        :items="roles.map((obj) => obj.name)"
                        v-model="selectedRole"
                        @update:model-value="(e) => updateRole(e)"
                    ></v-select>
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

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