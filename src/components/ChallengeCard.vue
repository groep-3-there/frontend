<template>
    <v-card class="mx-auto" max-width="344">
        <v-img
            :src="challenge.getBannerOrDefaultImageUrl()"
            height="200px"
            cover
        ></v-img>

        <v-card-title>
            {{ challenge.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ company.branch.name }}
        </v-card-subtitle>

        <v-card-actions>
            <v-btn
                color="blue"
                variant="text"
                @click="() => $router.push(`/challenge/${challenge.id}`)"
            >
                Bekijken
            </v-btn>

            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Challenge } from "@/models/Challenge";
import { Company } from "@/models/Company";

const props = defineProps({
    challenge: {
        type: Challenge,
        required: true,
    },
    company: {
        type: Company,
        required: true,
    },
});
</script>
