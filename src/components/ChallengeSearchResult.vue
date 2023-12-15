<template>
    <v-container class="challenge-card" :class="{'challenge-card-darkmode': theme.global.current.value.dark}">
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
                    <h3 class="challenge-title">{{ challenge?.title }}</h3>
                </v-row>

                <v-row v-if="challenge?.summary" no-gutters>
                    <p class="challenge-subtitle">
                        {{ challenge?.summary }}

                    </p>
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
                                v-for="tag in challenge?.getTagList()"
                                text="Tags van deze challenge"
                                :location="'top'"
                                :key="tag"
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
import { useTheme } from 'vuetify'

const theme = useTheme()
defineProps({
    challenge: Challenge,
});
</script>

<style scoped>
.challenge-title, .challenge-subtitle{
    max-width: 100%;
}
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
    transition: box-shadow 0.2s ease-in-out;
}
.challenge-card:hover {
    cursor: pointer;
    box-shadow: 4px 4px darkgray;
}
.challenge-card-darkmode{
    border: 1px solid black;
    margin: 1rem 0 0 0;
    border-radius: 15px;
    box-shadow: 2px 2px rgb(51, 51, 51);

}
.challenge-card-darkmode:hover{
    cursor: pointer;
    box-shadow: 2px 2px rgb(86, 86, 86);

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
