<template>
    <v-dialog max-width="50rem">
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                text="Registreer een account"
                prepend-icon="mdi-account"
            >
            </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <UserRegister></UserRegister>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import UserRegister from "@/components/UserRegister.vue";
</script>
