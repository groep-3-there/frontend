<template>
    <v-row justify="center">
        <v-dialog v-model="opened" persistent width="1024">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Challenge Afronden</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-textarea
                            v-model="summary"
                            label="Nawoord van voltooide challenge"
                            required
                            variant="outlined"
                            auto-grow
                        ></v-textarea>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="close()"
                    >
                        Annuleer
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="send()">
                        Afronden
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <RouterLink :to="'/challenge' + challenge.id"> </RouterLink>
    </v-row>
</template>

<script setup lang="ts">
import API from "@/Api";
import { Challenge } from "@/models/Challenge";
import { watch } from "vue";
import { ref } from "vue";

const emit = defineEmits(["requestPopupClose"]);
const props = defineProps({
    challenge: {
        type: Challenge,
        required: true,
    },
});
const opened = ref(true);
const summary = ref("");

function close() {
    emit("requestPopupClose");
}

async function send() {
    props.challenge.concludingRemarks = summary.value;
    await API.updateChallenge(props.challenge);
    close();
}
</script>
