<template>
    <v-container class="challenge-card">
        <v-row class="d-flex justify-center align-start">
            <v-col cols="2" class="d-flex justify-center align-start">
                <img
                    class="image"
                    src="https://www.weertmagazine.com/wp-content/uploads/2019/11/D5D_0199.jpg"
                    alt="profielfoto van de challenger"
                />
            </v-col>

            <v-col cols="10">
                <v-row no-gutters>
                    <h3>{{ challenge?.title }}</h3>
                </v-row>

                <v-row v-if="challenge?.summary" no-gutters>
                    {{ challenge?.summary }}
                </v-row>

                <v-row no-gutters>
                    <v-col v-if="challenge?.endDate" cols="12" md="4">
                        <p>
                            Einddatum:
                            {{
                                new Date(challenge.endDate).toLocaleDateString(
                                    "nl-nl",
                                )
                            }}
                        </p>
                    </v-col>
                    <v-col v-if="challenge?.tags">
                        <Tag
                            v-for="tag in challenge?.tags.split(',')"
                            :key="tag"
                            >{{ tag }}</Tag
                        >
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
.challenge-card {
    border: 1px solid black;
    margin: 1rem 0 0 0;
    border-radius: 15px;
    box-shadow: 2px 2px darkgray;
}

.image {
    min-width: 3rem;
    background-color: #e0e0e0;
    border-radius: 50%;
    aspect-ratio: 1/1;
    object-fit: cover;
}
</style>
