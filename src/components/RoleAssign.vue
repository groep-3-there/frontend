<template>
    <v-container>
        <v-row>
            <v-col>
                <p>
                    {{ props.user.name }}
                    <v-select
                        label="Select"
                        :items="props.roles"
                        v-model=selectedRole
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
        type: Role[],
        required: true,
    },
});

const selectedRole = ref<string | null>(props.user.role?.name || null);


</script>