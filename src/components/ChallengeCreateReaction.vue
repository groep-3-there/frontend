<template>
    <RichEditor
        @model-value-changed="(c: string) => (newReactionContent = c)"
        :placeholder="`Uw reactie`"
    ></RichEditor>
    <v-spacer class="my-4"></v-spacer>
    <v-row class="d-flex justify-end align-center">
        <v-col cols="8" md="4">
            <div class="reaction-options">
                <div class="reaction-type-selector d-flex justify-center align-center">
                    <v-select
                        variant="outlined"
                        v-model="newReactionType"
                        label="Type Reactie"
                        :items="['Idee', 'Vraag', 'Feedback']"
                        >Type</v-select
                    >
                </div>
            </div>
        </v-col>
        <div class="d-flex justify-center align-center">
            <v-btn @click="postReaction" color="primary">Plaatsen</v-btn>
        </div>
    </v-row>
</template>

<script setup lang="ts">
import API from "@/Api";
import { Challenge } from "@/models/Challenge";
import RichEditor from "@/components/RichEditor.vue";
import { ref, computed } from "vue";

const newReactionType = ref("Idee");
const newReactionContent = ref("");

//The backend understands this one (english and capitalised)
const newReactionTypedFormatted = computed(() => {
        if(newReactionType.value === "Idee") return "IDEA"
        if(newReactionType.value === "Vraag") return "QUESTION"
        if(newReactionType.value === "Feedback") return "FEEDBACK"
        return "IDEA"
});

const props = defineProps({
    targetChallenge: {
        type: Challenge,
        required: true,
    },
});

const emit = defineEmits(["updateReactions"]);

async function postReaction() {
    await API.postReaction(
        {
            id: 1,
            type: newReactionTypedFormatted.value,
            text: newReactionContent.value,
            isChosenAnswer: false,
        },
        props.targetChallenge.id,
    );
    emit("updateReactions");
    newReactionContent.value = "";
}
</script>
