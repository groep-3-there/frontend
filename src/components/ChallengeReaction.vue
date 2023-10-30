<template>
    <v-container class="reaction" :class="{ 'chosen-reaction': props.challengeInput.isChosenAnswer }">
        <v-row v-if="props.challengeInput.isChosenAnswer">
            <v-icon class="ml-2 my-2">mdi-bookmark</v-icon> 
            <p class="d-flex align-center">Het gekozen antwoord door : {{ 'Company naam' }}</p>
            <v-divider></v-divider>
        </v-row>

        <v-row class="personalia">
            <v-col cols="6" class="image d-flex">
                <img width="64" height="64" src="https://randomuser.me/api/portraits/women/85.jpg" class="author-profile-picture">
                
                <div cols="2" class="name ml-2" justify-start>
                    <p>Author name</p>
                    <p>Author company</p>
                </div>
            </v-col>
            <v-col cols="6" class="reaction-tag d-flex justify-end" align-self="center">
                <Tag :tag-name="props.challengeInput.type" is-idea></Tag>
            </v-col>
        </v-row>
            
        <v-row class="reaction-content">
                <v-col cols="12">
                    <p>{{ props.challengeInput.text }}</p>
                </v-col>
            </v-row>

    </v-container>
</template>

<style>
.reaction {
    border: 1px solid blue;
}
.chosen-reaction{
    background-color: #8db7ff7c;
}
.author-profile-picture{
    border-radius: 100%;
}

</style>

<script setup lang="ts">
import { ChallengeInput } from '@/models/ChallengeInput';
import Tag from "@/components/Tag.vue"

const props = defineProps<{
    challengeInput: ChallengeInput
}>()


</script>