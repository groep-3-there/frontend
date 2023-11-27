<template>
    <v-row>
        <v-col class="d-flex align-center">
            <h2>Nieuwste challenges van {{ props.company?.name }}</h2>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <div class="d-flex flex-row">
                <ChallengeCard
                    v-for="challenge in challenges"
                    :key="challenge.id"
                    :challenge="challenge"
                    :company="company!"
                />
            </div>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import API from "@/Api";
import { Challenge } from "@/models/Challenge";
import { Company } from "@/models/Company";
import { ref, onMounted } from "vue";
import ChallengeCard from "./ChallengeCard.vue";

const props = defineProps({
    company: Company,
});

const challenges = ref<Challenge[]>([]);

onMounted(async () => {
    // const NewestChallenges = await API.getAllChallengesForCompany(
    //     props.company!.id,
    // );
    // challenges.value = NewestChallenges;

    await API.getAllChallengesForCompany(props.company!.id).then(
        (response) => (challenges.value = response),
    );
});
</script>

<style scoped></style>
