<template>
    <v-card
        @click="$router.push(`/challenge/${challenge.id}`)"
        class="mx-2 card"
        hover
    >
        <v-img
            :src="challenge.getBannerOrDefaultImageUrl()"
            height="150px"
            cover
        ></v-img>

        <v-card-title>
            {{ challenge.title }}
        </v-card-title>

        <v-card-text class="shorten-text description">
            {{ challenge.summary }}
        </v-card-text>

        <v-card-actions class="card-actions">
            <p class="author-name">
                {{ challenge.department.name }} |
                {{ challenge.department.parentCompany.name }}
            </p>
            <img
                :src="
                    challenge.department.parentCompany.getProfileOrDefaultImageUrl()
                "
                class="company-logo-small"
            />
        </v-card-actions>
    </v-card>
</template>
<style>
.card{
    min-width: min(60vw,350px);
    width: min(60vw, 350px);
}
.author-name {
    color: rgb(120, 120, 120);
    font-size: small;
}

.description {
    min-height: 100px;
}

.shorten-text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.company-logo-small {
    height: 36px;
    width: 36px;
    object-fit: cover;
    border-radius: 100%;
    margin-left: auto;
}

.card-actions {
    margin-left: 10px;
}
</style>
<script setup lang="ts">
import { defineProps } from "vue";
import { Challenge } from "@/models/Challenge";
import { Company } from "@/models/Company";

const props = defineProps({
    challenge: {
        type: Challenge,
        required: true,
    },
});
</script>
