<template>
    <template v-if="!challenge">
        Loading...
    </template>
    <template v-if="challenge">

        <v-row class="challenge-hero" no-gutters justify="center" align="center">
            <v-col cols="12" md="2" class="">
                <img width="196" src="https://randomuser.me/api/portraits/women/85.jpg" class="company-logo">
            </v-col>
            <v-col cols="12" md="6" class="d-flex hero-title flex-column justify-center align-start hero-text">
                <h3 class="white-text">Challenge</h3>
                <h1 class="white-text challenge-title">{{ challenge.title }}</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3" class="d-flex align-center justify-start">
                <v-icon>mdi-calendar-blank</v-icon> {{ new Date(challenge.createdAt).toLocaleDateString("nl-nl") }}
            </v-col>
            <v-col cols="6" class="d-flex justify-center">
                <div>
                    <Tag>Website</Tag>
                    <Tag>UI</Tag>
                </div>
            </v-col>
            <v-col cols="3" class="d-flex justify-end align-center">
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

                    {{ challenge.status }}
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
                    <h2 class="post-heading">Eind datum</h2>
                    <p><v-icon>mdi-calendar-blank</v-icon> {{ new Date(challenge.endDate).toLocaleDateString("nl-nl") }}</p>
                </section>

                <section>
                    <h2 class="post-heading">Afbeeldingen</h2>
                    <v-container>
                        <v-row>
                            <v-col cols="2">
                                <v-img src="https://www.salonhandel.nl/wp-content/uploads/salon-interieur.jpg" class="mb-4">
                                </v-img>
                            </v-col>
                            <v-col cols="2"><v-img src="https://www.salonhandel.nl/wp-content/uploads/salon-interieur.jpg"
                                    class="mb-4">
                                </v-img>
                            </v-col>

                        </v-row>
                    </v-container>
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

                <v-divider></v-divider>

                <!-- Custom component voor reacties -->
                <!-- <ChallengeReaction :challengeInput="reaction"></ChallengeReaction> -->

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
    font-size: 4em;
    font-weight: 1000;
}

.white-text {
    color: white;
}

.challenge-hero {
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("https://www.salonhandel.nl/wp-content/uploads/salon-interieur.jpg");
    background-size: cover;
    background-position: 0;
    height: 400px;
}

.company-logo {
    border-radius: 100%;
}
</style>
  
<script lang="ts" setup>
import ConcludeChallengePopup from '@/components/ConcludeChallengePopup.vue'
import AreYouSurePopup from '@/components/AreYouSurePopup.vue'

import { Ref, ref } from 'vue';
import { Challenge } from '@/models/Challenge';
import Tag from "@/components/Tag.vue"
import ChallengeReaction from "@/components/ChallengeReaction.vue"
import { ChallengeInput } from '@/models/ChallengeInput';

import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import API from '@/Api';

const concludePopup = ref(false)
const archivePopup = ref(false)
const challenge = ref(null) as Ref<Challenge | null>

onMounted(async () => {
    const idParam = useRoute().params.id
    let id = Array.isArray(idParam) ? idParam[0] : idParam
    challenge.value = await API.getChallengeById(parseInt(id))
})

function archive(){
    if(challenge.value){
        challenge.value.status = "GEACHRIVEERD"
        API.updateChallenge(challenge.value)
    }
}

// const reaction: Ref<ChallengeInput> = ref(API.getFakeChallengeInput())

</script>
  