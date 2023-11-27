<template>
    <v-container>
        <v-row>
            <v-col class="d-flex justify-center align-center">
                <h1>Welkom bij Matchmaker</h1>
            </v-col>
        </v-row>
        <v-row class="row">
            <v-col cols="12" md="7">
                <h2>Wat is Matchmaker?</h2>
                <p>
                    Matchmaker is een innovatief bedrijf dat excelleert in het
                    verbinden van problemen met doeltreffende oplossingen. Met
                    een scherp oog voor detail en een diepgaand begrip van
                    diverse sectoren, heeft Matchmaker zich gevestigd als een
                    pionier op het gebied van probleemoplossing en innovatie.
                </p>
            </v-col>
            <v-col cols="12" md="5" class="d-flex align-center justify-center">
                <img
                    class="column-picture"
                    src="../assets/MatchmakerLogo.png"
                    alt="matchmaker logo"
                />
            </v-col>
        </v-row>
        <v-row class="impact-row row">
            <v-col cols="12" md="5" class="d-flex align-center justify-center">
                <img
                    class="column-picture"
                    src="../assets/Impactmaker.png"
                    alt="Belangerijke impactmaker"
                />
            </v-col>
            <v-col cols="12" md="7" class="pr-9">
                <h2>Waardevolle Impactmakers</h2>
                <p>
                    Wat Matchmaker onderscheidt, is de kunst van het koppelen.
                    Of het nu gaat om complexe zakelijke uitdagingen of
                    alledaagse obstakels, Matchmaker brengt de juiste
                    combinaties tot stand die leiden tot effectieve oplossingen.
                    Het bedrijf fungeert als een brug tussen bedrijven die
                    worstelen met problemen en de impactmakers die de perfecte
                    oplossingen kunnen bieden.
                </p>
            </v-col>
        </v-row>
        <v-row class="impact-row row">
            <v-col cols="12" md="7">
                <div class="pl-9">
                    <h2>De verbinding is de kracht tot succes</h2>
                    <p>
                        De impact van Matchmaker reikt verder dan de
                        traditionele consultancy. Het bedrijf fungeert als een
                        dynamische kracht die de weg vrijmaakt voor samenwerking
                        en vooruitgang. Door het leggen van verbindingen tussen
                        bedrijven, experts en innovatieve oplossingen, draagt
                        Matchmaker bij aan de groei en succes van haar klanten.
                    </p>
                </div>
            </v-col>
            <v-col cols="12" md="5" class="d-flex align-center justify-center"
                ><img
                    class="column-picture"
                    src="../assets/succes.jpg"
                    alt="succesvolle jonges"
                />
            </v-col>
        </v-row>
        <v-row class="row">
            <v-col cols="12" md="6" class="d-flex align-center justify-center">
                <h2>Hoe werkt het?</h2>
            </v-col>
            <v-col cols="12" md="6">
                <div>
                    <p>Stap 1: Vraag een bedrijf aan</p>
                    <p>Stap 2: Maak een nieuwe challenge</p>
                    <p>Stap 3: Wacht op reacties van de impactmakers</p>
                    <p>Stap 4: Kies de het beste antwoord</p>
                    <p>Stap 5: Voer de oplossing uit</p>
                    <p>Stap 6: Update de volgers</p>
                </div>
            </v-col>
        </v-row>
        <v-row class="impact-row row">
            <v-col cols="12" md="5" class="d-flex justify-center align-center">
                <img
                    class="column-picture"
                    src="../assets/Impactmaker2.jpg"
                    alt="mooie jongen"
                />
            </v-col>
            <v-col cols="12" md="7" class="d-flex align-center justify-center">
                <v-btn
                    color="primary"
                    size="x-large"
                    @click="router.push('/challenges')"
                >
                    Zoek nu naar challenges</v-btn
                >
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import router from "@/router";
</script>
<style scoped>
h1 {
    padding-top: 4rem;
}

.row {
    padding: 1rem 0 1rem 0;
}
.column-picture {
    max-height: 10rem;
}

.impact-row {
    background-color: rgba(8, 78, 107, 0.8);
}

.impact-row h2 {
    color: #fafafa;
}

.impact-row p {
    color: #fafafa;
}
</style>
