<template>
    <v-container class="challenge-card">
        <v-row class="d-flex justify-center align-start">
            <v-col cols="2" class="d-flex justify-center align-start">
                <img
                    class="image"
                    :src="challenge?.department.parentCompany.getProfileOrDefaultImageUrl()"
                    alt="profielfoto van de challenger"
                />
            </v-col>

            <v-col cols="10" class="challenge-info">
                <v-row no-gutters>
                    <h3>{{ challenge?.title }}</h3>
                </v-row>

                <v-row v-if="challenge?.summary" no-gutters>
                    {{ challenge?.summary }}
                </v-row>

                <v-row no-gutters class="date-and-tags">
                    <v-col v-if="challenge?.endDate" cols="12" md="4" class="d-flex align-center">
                        <p>
                            <v-icon>mdi-calendar-blank</v-icon>

                            {{
                                new Date(challenge.endDate).toLocaleDateString(
                                    "nl-nl",
                                )
                            }}
                        </p>
                    </v-col>
                    <v-col>
                        <Tag v-if="challenge?.department.parentCompany.branch"
                            :type="'branch'"
                        >
                            {{ challenge.department.parentCompany.branch.name }}
                        </Tag>
                        <template v-if="challenge?.tags">
                            <Tag
                                v-for="tag in challenge?.tags.split(',')"
                                :key="tag"
                                >{{ tag }}</Tag
                            >
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

.date-and-tags{
    margin-top: 1rem;
}
.challenge-info{
    padding-bottom: 0;
}
.challenge-card {
    border: 1px solid black;
    margin: 1rem 0 0 0;
    border-radius: 15px;
    box-shadow: 2px 2px darkgray;
}
.challenge-card:hover{
    cursor: pointer;
    box-shadow: 4px 4px darkgray;
}

.image {
    min-width: 3rem;
    background-color: #e0e0e0;
    border-radius: 50%;
    aspect-ratio: 1/1;
    object-fit: cover;
    width:70%;
}
</style>
