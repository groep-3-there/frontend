<template>
  <RichEditor
    @model-value-changed="(c : string) => (newReactionContent = c)"
    :placeholder="`Uw reactie`"
  ></RichEditor>
  <div class="reaction-options">
    <div class="reaction-type-selector d-flex justify-center align-center">
      <v-select
        variant="outlined"
        v-model="newReactionType"
        label="Type Reactie"
        :items="['Idee', 'Question', 'Feedback']"
        >Type</v-select
      >
    </div>
    <div class="d-flex justify-center align-center">
      <v-btn @click="postReaction" color="primary">Plaatsen</v-btn>
    </div>
  </div>
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
  switch (newReactionType.value) {
    case "Idee":
      return "IDEA";
    case "Question":
      return "QUESTION";
    case "Feedback":
      return "FEEDBACK";
  }
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
    props.targetChallenge.id
  );
  emit("updateReactions");
  newReactionContent.value = ""
}
</script>
