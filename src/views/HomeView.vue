<template>
    <v-carousel height="500" hide-delimiters show-arrows="hover" cycle>
        <div class="carousel-permanent-text">
            <h1 class="website-title animate-split-letters">MatchMakers</h1>
            <p class="website-subtitle">
                Verbinden van Talenten, Oplossen van Uitdagingen: Jouw
                Matchmaker voor Bedrijfsinnovatie!
            </p>
        </div>
        <v-carousel-item v-for="(slide, i) in carouselInfo" :key="i">
            <v-sheet height="100%">
                <!-- Permanent overlay -->
                <img class="carousel-img" :src="slide.bannerImage" />
                <div class="carousel-img-overlay">
                    <div
                        class="carousel-item-info d-flex align-center"
                        @click="router.push(slide.actionUrl)"
                    >
                        <img class="info-img" :src="slide.infoImage" />
                        <p class="info-text ml-2">{{ slide.text }}</p>
                    </div>
                </div>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
    <v-spacer class="my-8"></v-spacer>
    <div v-if="!sessionStore.loggedInUser">
        <LandingPageContent />
    </div>
    <div v-else-if="sessionStore.loggedInUser">
        <UserHomePage :user="sessionStore.loggedInUser" />
    </div>
</template>

<script lang="ts" setup>
import { useSessionStore } from "@/store/sessionStore";
import LandingPageContent from "@/components/LandingPageContent.vue";
import router from "@/router";
import { Ref, ref } from "vue";
import UserHomePage from "@/components/UserHomePage.vue";
import { useSnackbarStore } from "@/store/Snackbar";

const sessionStore = useSessionStore();
const param = router.currentRoute.value.query["emailVerified"]
const verified = Array.isArray(param) ? param[0] : param;
if(Number(verified) === 1){
    useSnackbarStore().createSimple("Email is geverifieerd!", "success");
}
const carouselInfo: Ref<
    {
        infoImage: string;
        text: string;
        bannerImage: string;
        actionUrl: string;
    }[]
> = ref([
    {
        bannerImage: "/homepage/duurzaam.jpg",
        infoImage: "/homepage/florijn.jpg",
        text: "Met AI werken we aan een duurzame toekomst",
        // TODO: Add action url
        actionUrl: "/challenges",
    },
    {
        bannerImage: "/homepage/kapsalon.jpg",
        infoImage: "/homepage/eline.jpg",
        text: "Hoe Eline haar kapsalon innoveerde met de nieuwste technologie",
        // TODO: Add action url
        actionUrl: "/challenges",
    },
    {
        bannerImage: "/homepage/timessquare.jpg",
        infoImage: "/homepage/josie.jpg",
        text: "Vanuit Friesland een advertentie platform bouwen voor New York? Met Matchmaker kan het!",
        // TODO: Add action url
        actionUrl: "/challenges",
    },
]);
</script>
<style scoped>
.info-img {
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 100%;
}
.info-text {
    font-size: 1.2em;
    font-weight: 300;
    width: min(100%, 600px);
}
.carousel-item-info {
    z-index: 3 !important;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 15%;
    margin-left: 10px;
    margin-bottom: 10px;
}
.carousel-item-info:hover {
    cursor: pointer;
}

.carousel-permanent-text {
    margin-top: 2em;
    text-align: center;
    position: absolute;
    z-index: 100;
    width: 100%;
    color: white;
}
.website-title {
    font-size: 4em;
    font-weight: 500;
}

.website-subtitle {
    font-size: 1.2em;
    font-weight: 400;
    letter-spacing: 2px;
    width: min(90%, 600px);
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    opacity: 0;
    animation: fade-in-down 1s ease-out 0ms 1 forwards;
}
@media screen and (max-width: 1000px) {
    .website-title {
        font-size: 2.5em;
    }
    .website-subtitle{
        font-size:0.8em;
    }
    
}
.carousel-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.carousel-img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fafafa;
}
</style>
