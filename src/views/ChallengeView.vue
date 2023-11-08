<template>
    <template v-if="!challenge">
        Loading...
    </template>
    <template v-if="challenge">

        <v-row class="challenge-hero" :style="banner()" no-gutters justify="center" align="center">
            <v-col cols="6" md="3" class="d-flex justify-center">
                <img :src="challenge.company.getProfileOrDefaultImageUrl()" class="company-logo">
            </v-col>
            <v-col cols="10 " md="8" class="d-flex hero-title flex-column justify-center align-start hero-text ml-4">
                <h3 class="white-text">Challenge</h3>
                <h1 class="white-text challenge-title">{{ challenge.title }}</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col md="3" class="d-flex align-center justify-center">
                <v-icon>mdi-calendar-blank</v-icon> {{ challenge.createdAt.toLocaleDateString("nl-nl") }}
            </v-col>
            <v-col cols="12"  md="6" class="">
                <div class="d-flex flex-wrap justify-center">
                    <Tag v-for="tag in challenge.tags.split(',')" :key="tag">{{ tag }}</Tag>
                </div>
            </v-col>
            <v-col cols="12" md="3" class="d-flex justify-center align-center">
                <ConcludeChallengePopup v-if="concludePopup" @request-popup-close="concludePopup = false"
                    :challenge="challenge"></ConcludeChallengePopup>
                <AreYouSurePopup v-if="archivePopup" 
                    @on-close="archivePopup = false" 
                    @on-accept-and-close="archive(); archivePopup = false"
                    :title="'Weet u zeker dat u de challenge wilt archiveren?'"
                    :subtitle="'De challenge is dan alleen nog zichtbaar voor beheerders van uw bedrijf.'"
                    :accept-word="'Archiveren'"
                ></AreYouSurePopup>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props" size="48">mdi-dots-horizontal</v-icon>
                    </template>
                    <v-list>
                        <v-list-item :value="1" :key="1">
                            <v-list-item-title><v-icon class="mr-1"
                                    size="24">mdi-pencil</v-icon>Bewerken</v-list-item-title>
                        </v-list-item>
                        <v-list-item :value="2" :key="2" @click="concludePopup = true">
                            <v-list-item-title><v-icon class="mr-1"
                                    size="24">mdi-check-bold</v-icon>Afronden</v-list-item-title>
                        </v-list-item>
                        <v-list-item :value="3" :key="3" @click="archivePopup = true">
                            <v-list-item-title><v-icon class="mr-1"
                                    size="24">mdi-archive</v-icon>Archiveren</v-list-item-title>
                        </v-list-item>

                    </v-list>
                </v-menu>
            </v-col>

        </v-row>

        <v-divider class="mt-4"></v-divider>

        <v-row>
            <v-col cols="10" class="mx-auto">

                <v-alert class="my-8" v-if="challenge.concludingRemarks" type="success" title="Challenge Voltooid"
                    :text="challenge.concludingRemarks"></v-alert>
                <section>
                    <h2 class="post-heading">Samenvatting</h2>
                    <p>{{ challenge.summary }}</p>
                </section>
                <section>
                    <h2 class="post-heading"> Beschrijving</h2>
                    <p>{{ challenge.description }}</p>
                </section>

                <section v-if="challenge.contactInformation !== ''">
                    <h2 class="post-heading">Contact informatie</h2>
                    <p>{{ challenge.contactInformation }}</p>
                </section>

                <section v-if="challenge.endDate">
                    <h2 class="post-heading">Einddatum</h2>
                    <p><v-icon>mdi-calendar-blank</v-icon> {{ challenge.endDate.toLocaleDateString("nl-nl") }}</p>
                </section>

                <section v-if="challenge.imageAttachments.length > 0">
                    <h2 class="post-heading">Afbeeldingen</h2>
                        <v-row>
                            <v-col cols="10" md="4" v-for="img in challenge.imageAttachments" :key="img.id">
                                <img 
                                class="attachment-image"
                                lazy-src="https://picsum.photos/id/11/100/60"
                                :src="img.getUrl()"
                                @click="openImage(img.getUrl())"
                                >
                                
                            </v-col>
                        </v-row>
                </section>

                <v-divider class="my-4"></v-divider>

                <section>
                    <h2 class="post-heading">Ideeënbus</h2>
                    <input class="new-reaction-input">
                    <div class="reaction-options">
                        <v-select>Type</v-select>
                        <v-btn>Reageer</v-btn>

                    </div>
                </section>

                <v-divider class="my-4"></v-divider>

                <!-- Custom component voor reacties -->
                <ChallengeReaction v-for="input in challengeInputs" :can-mark-answer="!inputsHaveChosenAnswer && userCanMarkAnswer" :challengeInput="input" :key="input.id"></ChallengeReaction>

            </v-col>
        </v-row>
    </template>
</template>

<style scoped>
.reaction-options {
    display: flex;
    flex-direction: row;
}

.reaction-options>v-select {
    max-width: 100px;
}

.new-reaction-input {
    width: 100%;
    min-height: 200px;
    border: 2px solid black;
}

.post-heading {
    font-size: 1.4em;
    margin-top: 1em;
    margin-bottom: 1em;
}

.challenge-title {
    font-size: 4rem;
    font-weight: 1000;
}
.white-text {
    color: white;
}

.challenge-hero {
    
    background-size: cover;
    background-position: 0;
    min-height: 400px;
    max-height: fit-content;
}

.company-logo {
    max-width: min(80%, 25vw);
    border-radius: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
}
.attachment-image{
    max-height: 200px;
    max-width: 100%;
}


@media screen and (max-width: 1000px) {
    .challenge-title{
        font-size: 2.5rem;

    }
}



</style>
  
<script lang="ts" setup>
import ConcludeChallengePopup from '@/components/ConcludeChallengePopup.vue'
import AreYouSurePopup from '@/components/AreYouSurePopup.vue'

import { Ref, computed, ref } from 'vue';
import { Challenge } from '@/models/Challenge';
import Tag from "@/components/Tag.vue"
import ChallengeReaction from "@/components/ChallengeReaction.vue"
import { ChallengeInput } from '@/models/ChallengeInput';

import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import API from '@/Api';
import { Image } from '@/models/Image';
import { useSessionStore } from '@/store/sessionStore';

const sessionStore = useSessionStore()

const concludePopup = ref(false)
const archivePopup = ref(false)
const challenge : Ref<Challenge | null> = ref(null)

const challengeInputs : Ref<ChallengeInput[]> = ref([])
const inputsHaveChosenAnswer = computed(() => challengeInputs.value.some(input => input.isChosenAnswer))
const userCanMarkAnswer = computed(() => sessionStore.loggedInUser!.hasPermissionAtCompany("MANAGE_CHALLENGE", challenge.value?.company.id))


onMounted(async () => {
    const idParam = useRoute().params.id
    let id = Array.isArray(idParam) ? idParam[0] : idParam
    challenge.value = await API.getChallengeById(parseInt(id))
    console.log(challenge.value)
    challengeInputs.value = await API.getChallengeInputs(parseInt(id))
    })

function archive(){
    if(challenge.value){
        challenge.value.status = "GEACHRIVEERD"
        API.updateChallenge(challenge.value)
    }
}

function banner(){
    return {"background-image":`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("${challenge.value?.getBannerOrDefaultImageUrl()}")`}
}


function openImage(imageUrl : string) {
    window.open(imageUrl, '_blank');
}

</script>
  