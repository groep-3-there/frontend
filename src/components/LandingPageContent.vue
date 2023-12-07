<template>
    <section class="about-section animate-right">
        <h3>⭐Wat is MatchMaker?</h3>
        <p>
            Matchmaker is een innovatief bedrijf dat excelleert in het verbinden
            van problemen met doeltreffende oplossingen. Met een scherp oog voor
            detail en een diepgaand begrip van diverse sectoren, heeft
            Matchmaker zich gevestigd als een pionier op het gebied van
            probleemoplossing en innovatie.
        </p>
        <v-divider class="my-8"></v-divider>
    </section>
    <section class="about-section ml-md-auto animate-left">
        <h3 class="text-right">🦾Waardevolle Impactmakers</h3>
        <p class="text-right">
            Wat Matchmaker onderscheidt, is de kunst van het koppelen. Of het nu
            gaat om complexe zakelijke uitdagingen of alledaagse obstakels,
            Matchmaker brengt de juiste combinaties tot stand die leiden tot
            effectieve oplossingen. Het bedrijf fungeert als een brug tussen
            bedrijven die worstelen met problemen en de impactmakers die de
            perfecte oplossingen kunnen bieden.
        </p>
    </section>
    <section class="cto">
        <v-parallax src="/homepage/windmill.jpg" class="cto-img mx-auto">
        </v-parallax>

        <div class="cto-overlay">
            <div class="cto-action">
                <h3 class="text-center">Waar wacht je nog op?</h3>
                <v-btn
                    color="primary"
                    width="200px"
                    height="40px"
                    @click="$router.push('/challenges')"
                    >Ga naar challenges</v-btn
                >
            </div>
        </div>
    </section>
    <section class="about-section mx-auto">
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
import { Ref, ref } from "vue";
import LoginPopup from "./LoginPopup.vue";
</script>
<style scoped>
.about-section {
    width: min(90%, 900px);
    font-size: 1.3em;
    font-weight: 400;
    padding-left: 40px;
    padding-right: 40px;
}
@media screen and (max-width: 600px) {
    .about-section > * {
        text-align: left !important;
    }
    .cto-action {
        font-size: 1em !important;
        letter-spacing: 1px;
    }
}
.about-section > h3 {
    color: black;
    transition:
        color 0.5s ease-in-out,
        letter-spacing 0.2s ease-in-out;
    letter-spacing: 0px;
    margin-bottom: 10px;
}
.about-section:hover > h3 {
    color: #1976d2;
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
