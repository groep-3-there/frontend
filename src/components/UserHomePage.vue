<template v-if="user">
    
    <v-spacer class="my-8"></v-spacer>
    <section v-if="user!.department" class="about-section animate-right">
        <h3>⭐Nieuwste challenges van {{ user?.department.parentCompany.name }}</h3>
        <v-divider class="mb-2"></v-divider>
        <div class="horizontal-scroll">
            <HorizontalScroll :hide-scrollbar="true" :disable-mouse-wheel="true">
                <ChallengeCard
                    v-for="challenge in companyChallenges"
                    :key="challenge.id"
                    :challenge="challenge"
                    class="mr-4"
                />
                <ChallengeCard
                    v-for="challenge in companyChallenges"
                    :key="challenge.id"
                    :challenge="challenge"
                    class="mr-4"
                />
                <ChallengeCard
                    v-for="challenge in companyChallenges"
                    :key="challenge.id"
                    :challenge="challenge"
                    class="mr-4"
                />
                <ChallengeCard
                    v-for="challenge in companyChallenges"
                    :key="challenge.id"
                    :challenge="challenge"
                    class="mr-4"
                />
            </HorizontalScroll>
            
        </div>
    </section>
    <v-spacer class="my-12"></v-spacer>
    <section v-if="user!.department" class="about-section animate-right">
        <h3>⭐Nieuwste challenges op het platform</h3>
        <v-divider class="mb-2"></v-divider>
        <div class="horizontal-scroll">
            <HorizontalScroll disableMouseWheel>
                <ChallengeCard
                    v-for="challenge in companyChallenges"
                    :key="challenge.id"
                    :challenge="challenge"
                    class="mr-4"
                />
                <ChallengeCard
                    v-for="challenge in companyChallenges"
                    :key="challenge.id"
                    :challenge="challenge"
                    class="mr-4"
                />
                <ChallengeCard
                    v-for="challenge in companyChallenges"
                    :key="challenge.id"
                    :challenge="challenge"
                    class="mr-4"
                />
                <ChallengeCard
                    v-for="challenge in companyChallenges"
                    :key="challenge.id"
                    :challenge="challenge"
                    class="mr-4"
                />
            </HorizontalScroll>
            
        </div>
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
const horizontalScroll :Ref<HTMLElement | null> = ref(null);
const props = defineProps({
    user: Object,
});
const companyChallenges = ref<Challenge[]>([]);



onMounted(async ()=>{
    if(props.user?.department){
        await API.getAllChallengesForCompany(props.user.department.parentCompany.id).then(
            (response) => (companyChallenges.value = response),
        );
    }
    
})

</script>
<style scoped>
.about-section{
    font-size: 1.3em;
    font-weight: 400;
    padding-left:40px;
    padding-right: 40px;
}

.about-section > h3{
    color:black;
    transition: color 0.5s ease-in-out, letter-spacing 0.2s ease-in-out;
    letter-spacing: 0px;
    margin-bottom: 10px;
}
.about-section:hover > h3{
    letter-spacing: 1px;
}


</style>
