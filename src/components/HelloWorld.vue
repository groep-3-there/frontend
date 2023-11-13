<template>
    <v-row>
        <v-col>
            <h2>Snack bericht maken</h2>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <code>
                import { useSnackbarStore} from "@/store/Snackbar";<br />
                const snackbarStore = useSnackbarStore()<br />
                snackbar.createSimple("Test 1 2 3", "info");
            </code>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            Opties zijn "info", "error", "warning", "success"<br />
            Zie /store/Snackbar.ts voor verdere opties
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn @click="snackbarStore.createSimple('Test 1 2 3', 'error')">
                Test
            </v-btn>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
//
import { useSnackbarStore } from "@/store/Snackbar";
const snackbarStore = useSnackbarStore();
</script>
