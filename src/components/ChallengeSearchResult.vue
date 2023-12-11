<template>
    <v-container class="challenge-card">
        <v-row class="d-flex justify-center">
            <v-col
                cols="2"
                class="d-flex justify-center align-start image-section"
            >
                <img
                    class="image"
                    :src="
                        challenge?.department.parentCompany.getProfileOrDefaultImageUrl()
                    "
                    alt="profielfoto van de challenger"
                />
            </v-col>

            <v-col cols="10" class="challenge-info d-flex flex-column">
                <v-row no-gutters>
                    <h3>{{ challenge?.title }}</h3>
                </v-row>

                <v-row v-if="challenge?.summary" no-gutters>
                    {{ challenge?.summary }}
                </v-row>

                <v-row no-gutters class="date-and-tags align-self-end">
                    <v-col cols="12" md="4" class="d-flex align-center">
                        <template v-if="challenge?.endDate">
                            <p>
                                <v-icon>mdi-calendar-blank</v-icon>

                                {{
                                    new Date(
                                        challenge.endDate,
                                    ).toLocaleDateString("nl-nl", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })
                                }}
                            </p>
                        </template>
                    </v-col>
                    <v-col>
                        <template v-if="challenge?.status == 'AFGEROND'">
                            <v-tooltip
                                class="tooltip-marker"
                                text="De challenge is afgerond, maar u kunt het resultaat bekijken"
                                :location="'right'"
                            >
                                <template v-slot:activator="{ props }">
                                    <p v-bind="props" class="afgerond-marker">
                                        <Tag :type="'idea'">Afgerond</Tag>
                                    </p>
                                </template>
                            </v-tooltip>
                        </template>
                        <v-tooltip
                            text="Branch van het bedrijf"
                            :location="'top'"
                        >
                            <template v-slot:activator="{ props }">
                                <Tag
                                    v-bind="props"
                                    v-if="
                                        challenge?.department.parentCompany
                                            .branch
                                    "
                                    :type="'branch'"
                                >
                                    {{
                                        challenge.department.parentCompany
                                            .branch.name
                                    }}
                                </Tag>
                            </template>
                        </v-tooltip>
                        <template v-if="challenge?.tags">
                            <v-tooltip
                                v-for="tag in challenge?.tags.split(',')"
                                text="Tags van deze challenge"
                                :location="'top'"
                            >
                                <template v-slot:activator="{ props }">
                                    <Tag v-bind="props" :key="tag">{{
                                        tag
                                    }}</Tag>
                                </template>
                            </v-tooltip>
                        </template>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { Challenge } from "@/models/Challenge";
import Tag from "@/components/Tag.vue";

defineProps({
    challenge: Challenge,
});
</script>

<style scoped>
.image-section {
    position: relative;
}
.date-and-tags {
    margin-top: 1rem;
    width: 100%;
}
.challenge-info {
    padding-bottom: 0;
}
.challenge-card {
    border: 1px solid black;
    margin: 1rem 0 0 0;
    border-radius: 15px;
    box-shadow: 2px 2px darkgray;
}
.challenge-card:hover {
    cursor: pointer;
    box-shadow: 4px 4px darkgray;
}

.image {
    min-width: 3rem;
    background-color: #e0e0e0;
    border-radius: 50%;
    aspect-ratio: 1/1;
    object-fit: cover;
    width: 70%;
}
</style>
