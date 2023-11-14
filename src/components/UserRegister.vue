<template>
    <v-dialog transition="dialog-bottom-transition" width="auto">
        <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">registreer</v-btn>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card>
                <v-stepper alt-labels :items="registratieStappen">
                    <template v-slot="item.1">
                        <v-card title="Step One" flat>...</v-card>
                    </template>
                    <template v-slot="item.2">
                        <v-card title="Step twee" flat>...</v-card>
                    </template>
                    <template v-slot="item.3">
                        <v-card title="Step drie" flat>...</v-card>
                    </template>
                </v-stepper>
                <v-card-actions class="justify-end">
                    <v-btn variant="text" @click="isActive.value = false"
                        >Close</v-btn
                    >
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
const registratieStappen = ["Account gegevens", "Naam", "Bedrijfscode"];
console.log(registratieStappen[1]);
</script>
