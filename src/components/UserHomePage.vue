<template v-if="user">
    <v-spacer class="my-8"></v-spacer>
    <section v-if="user!.department" class="challenge-section animate-right">
        <h3>
            ⭐Nieuwste challenges van {{ user?.department.parentCompany.name }}
        </h3>
        <v-divider class="mb-2"></v-divider>
        <HorizontalScroll>
            <ChallengeCard
                v-for="challenge in companyChallenges"
                :key="challenge.id"
                :challenge="challenge"
                class="mr-4"
            />
        </HorizontalScroll>
    </section>
    <v-spacer class="my-12"></v-spacer>
    <section v-if="user!.department" class="challenge-section animate-right">
        <h3>🎇Nieuwste challenges op het platform</h3>
        <v-divider class="mb-2"></v-divider>
        <HorizontalScroll>
            <ChallengeCard
                v-for="challenge in newestChallenges"
                :key="challenge.id"
                :challenge="challenge"
                class="mr-4"
            />
        </HorizontalScroll>
    </section>
    <section class="cto">
        <v-parallax src="/homepage/windmill.jpg" class="cto-img mx-auto">
        </v-parallax>

        <div class="cto-overlay">
            <div class="cto-action">
                <h3 class="text-center">Challenge training nodig?</h3>
                <v-btn
                    color="primary"
                    width="200px"
                    height="40px"
                    @click="openEmail()"
                    >Inschrijven</v-btn
                >
            </div>
        </div>
    </section>

    <section class="end-text mx-auto">
        <h3 class="text-center">🙌De verbinding is de kracht tot success</h3>
        <p class="text-center">
            De impact van Matchmaker reikt verder dan de traditionele
            consultancy. Het bedrijf fungeert als een dynamische kracht die de
            weg vrijmaakt voor samenwerking en vooruitgang. Door het leggen van
            verbindingen tussen bedrijven, experts en innovatieve oplossingen,
            draagt Matchmaker bij aan de groei en succes van haar klanten.
        </p>
    </section>
    <v-spacer class="my-8"></v-spacer>
</template>

<script lang="ts" setup>
import router from "@/router";
import UserRegister2 from "./UserRegister2.vue";
import { Ref, computed, onMounted, ref } from "vue";
import LoginPopup from "./LoginPopup.vue";
import { useSessionStore } from "@/store/sessionStore";
import { Challenge } from "@/models/Challenge";
import API from "@/Api";
import { userInfo } from "os";
import ChallengeCard from "./ChallengeCard.vue";
import HorizontalScroll from "./HorizontalScroll.vue";
const horizontalScroll: Ref<HTMLElement | null> = ref(null);
const props = defineProps({
    user: Object,
});
const companyChallenges = ref<Challenge[]>([]);

const newestChallenges = ref<Challenge[]>([]);

function openEmail() {
    window.open("mailto:matchmakergroep3@gmail.nl");
}
onMounted(async () => {
    if (props.user?.department) {
        const res = await API.getAllChallengesForCompany(
            props.user.department.parentCompany.id,
        );
        companyChallenges.value = res;
    }
    const all = await API.getChallengesBySearch(
        undefined,
        undefined,
        undefined,
        "newest_first",
        1,
    );
    newestChallenges.value = all.content;
});
</script>
<style scoped>
.end-text {
    width: min(90%, 800px);
    font-size: 1.3em;
    font-weight: 400;
    padding-left: 40px;
    padding-right: 40px;
    margin-bottom: 100px;
}
.challenge-section {
    font-size: 1.3em;
    font-weight: 400;
    padding-left: 40px;
    padding-right: 40px;
    max-width: 70%;
    margin-left: auto;
    margin-right: auto;
}

.challenge-section > h3 {
    color: black;
    transition:
        color 0.5s ease-in-out,
        letter-spacing 0.2s ease-in-out;
    letter-spacing: 0px;
    margin-bottom: 10px;
}
.challenge-section:hover > h3 {
    letter-spacing: 1px;
}

/* Call to action */
.cto {
    position: relative;
    margin-top: 100px;
    margin-bottom: 100px;
    margin-left: auto;
    margin-right: auto;
    width: min(100%, 1200px);
}
.cto-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    background-color: rgba(0, 0, 0, 0.555);
}
.cto-action > h3 {
    transition: letter-spacing 0.2s ease-in-out;
}
.cto-overlay:hover > .cto-action > h3 {
    letter-spacing: 1px;
}

.cto-action {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 2em;
}
</style>
