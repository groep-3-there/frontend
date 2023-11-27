<template>
    <v-tooltip :text="user.name" :location="'top'">
        <template v-slot:activator="{ props }">
            <img
                v-bind="props"
                :src="user.getAvatarOrDefaultUrl()"
                class="user-logo-small mx-1 my-1"
            />
        </template>
    </v-tooltip>
</template>
<style>
.user-logo-small {
    height: 64px;
    width: 64px;
    object-fit: cover;
    border-radius: 100%;
    margin-left: auto;
}
</style>
<script setup lang="ts">

import { defineProps } from "vue";
import { User } from "@/models/User";

const props = defineProps({
    user: {
        type: User,
        required: true,
    },
});
</script>
