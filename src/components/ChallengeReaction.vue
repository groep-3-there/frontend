<template>
  <v-container
    class="reaction mb-4"
    :class="{ 'chosen-reaction': challengeInput.isChosenAnswer }"
  >
    <v-row v-if="challengeInput.isChosenAnswer">
      <v-icon class="ml-2 my-2">mdi-bookmark</v-icon>
      <p class="d-flex align-center">
        Het gekozen antwoord door : {{ challengeInput.challenge.company.name }}
      </p>
      <v-divider></v-divider>
    </v-row>

    <v-row class="personalia">
      <v-col cols="6" class="image d-flex">
        <img
          width="64"
          height="64"
          :src="challengeInput.author.getAvatarOrDefaultUrl()"
          class="author-profile-picture"
        />

        <div cols="2" class="name ml-2" justify-start>
          <p>{{ challengeInput.author.name }}</p>
          <p class="author-subtitle">
            {{ challengeInput.author.getSubtitle() }}
          </p>
        </div>
      </v-col>
      <v-col
        cols="6"
        class="reaction-tag d-flex justify-end"
        align-self="center"
      >
        <Tag :type="challengeInput.type">{{
          challengeInput.getReactionTypeAsName()
        }}</Tag>
      </v-col>
    </v-row>

    <v-row class="reaction-content">
      <v-col cols="12">
        <p v-if="!readMore">
          {{ smallText }}
          <span v-if="shortened">...</span>
          <span v-if="shortened" class="text-hint" @click="readMore = true">Meer lezen</span>
        </p>

        <p v-if="readMore && shortened">
          {{ props.challengeInput.text }}
          <span v-if="readMore" class="text-hint" @click="readMore = false">Minder lezen</span
          >
        </p>
      </v-col>
    </v-row>
    <template v-if="canMarkAnswer">
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-btn @click="markSelectedPopup = true" class="my-4 mx-4" color="primary">Kies dit idee</v-btn>
        <AreYouSurePopup v-if="markSelectedPopup" @on-close="markSelectedPopup = false" :accept-word="'Ja'" @on-accept-and-close="markSelected()" title="Dit idee markeren als gekozen?" subtitle="U kunt maar één reactie markeren als antwoord."></AreYouSurePopup>
      </v-row>

    </template>

  </v-container>
</template>

<style>

.reaction {
  /* border: 1px solid blue; */
  /* border-bottom: 1px solid blue; */
  box-shadow: 2px 2px 5px 0px darkgray;
  transition: box-shadow 0.2s;
}
.reaction:hover{
  box-shadow: 2px 2px 8px 0px darkgray;

}

.chosen-reaction {
  background-color: #8db7ff7c;
}
.author-profile-picture {
  border-radius: 100%;
}
.author-subtitle {
  color: grey;
}
.text-hint {
  color: rgb(0, 0, 0);
  font-weight: bolder;
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { ChallengeInput } from "@/models/ChallengeInput";
import Tag from "@/components/Tag.vue";
import API from "@/Api";
import { computed, ref } from "vue";
import AreYouSurePopup from "./AreYouSurePopup.vue";
const props = defineProps({
  challengeInput: {
    type: ChallengeInput,
    required: true
  },
  canMarkAnswer : {
    type: Boolean,
    required: false,
    default: false
  }
});

const smallText = computed(() => props.challengeInput.text.substring(0, 1000));
const shortened = computed(
  () => smallText.value.length < props.challengeInput.text.length
);
const readMore = ref(false);


const markSelectedPopup = ref(false);

function markSelected(){
  markSelectedPopup.value = false
}



</script>
