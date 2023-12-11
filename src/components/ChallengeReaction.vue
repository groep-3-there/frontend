<template>
    <v-container
        :id="`reaction-${props.challengeInput.id}`"
        class="reaction mb-4"
        :class="{ 'chosen-reaction': challengeInput.isChosenAnswer }"
    >
        <v-row v-if="challengeInput.isChosenAnswer">
            <v-icon class="ml-2 my-2">mdi-bookmark</v-icon>
            <p class="d-flex align-center">
                Het gekozen antwoord door :
                {{ challengeInput.challenge.department.parentCompany.name }}
            </p>
            <v-divider></v-divider>
        </v-row>

        <v-row class="personalia">
            <v-col cols="9" md="6" class="image d-flex">
                
                <UserBubble
                    :user="challengeInput.author"
                    class="ml-2"
                    :size="64"
                ></UserBubble>
            </v-col>
            <v-col
                cols="3"
                md="6"
                class="reaction-tag d-flex justify-end"
                align-self="center"
            >
                <Tag :type="challengeInput.type">{{
                    challengeInput.getReactionTypeAsName()
                }}</Tag>
            </v-col>
        </v-row>

        <v-row class="reaction-content">
            <v-col cols="12">
                <p v-if="!readMore">
                    <span v-html="smallText"></span>
                    <span v-if="shortened">...</span>
                    <span
                        v-if="shortened"
                        class="text-hint"
                        @click="readMore = true"
                        >Meer lezen</span
                    >
                </p>

                <p v-if="readMore && shortened">
                    <span v-html="props.challengeInput.text"></span>
                    <span
                        v-if="readMore"
                        class="text-hint"
                        @click="readMore = false"
                        >Minder lezen</span
                    >
                </p>
            </v-col>
        </v-row>
        <template v-if="canMarkAnswer">
            <v-divider class="my-4"></v-divider>
            <v-row>
                <v-btn
                    @click="markSelectedPopup = true"
                    class="my-4 mx-4"
                    color="primary"
                    >Kies dit idee</v-btn
                >
                <AreYouSurePopup
                    v-if="markSelectedPopup"
                    @on-close="markSelectedPopup = false"
                    :accept-word="'Ja'"
                    @on-accept-and-close="markSelected()"
                    title="Dit idee markeren als gekozen?"
                    subtitle="U kunt maar één reactie markeren als gekozen."
                ></AreYouSurePopup>
            </v-row>
        </template>
    </v-container>
</template>

<style>
.reaction {
    /* border: 1px solid blue; */
    /* border-bottom: 1px solid blue; */
    box-shadow: 2px 2px 5px 0px darkgray;
    transition: box-shadow 0.2s;
}
.reaction:hover {
    box-shadow: 2px 2px 8px 0px darkgray;
}

.chosen-reaction {
    background-color: #8db7ff7c;
}
.author-profile-picture {
    border-radius: 100%;
}
.author-subtitle {
    color: grey;
}
.text-hint {
    color: rgb(0, 0, 0);
    font-weight: bolder;
    cursor: pointer;
}
.reaction-tag{
    min-width: fit-content;
    padding:0;
}
</style>

<script setup lang="ts">
import { ChallengeInput } from "@/models/ChallengeInput";
import Tag from "@/components/Tag.vue";
import API from "@/Api";
import { computed, onMounted, ref } from "vue";
import AreYouSurePopup from "./AreYouSurePopup.vue";
import UserBubble from "./UserBubble.vue";
import { useRoute } from "vue-router";
const scrollToParam = useRoute().query.scrollTo;
const scrollToId = Array.isArray(scrollToParam) ? Number(scrollToParam[0]) : Number(scrollToParam)

const props = defineProps({
    challengeInput: {
        type: ChallengeInput,
        required: true,
    },
    canMarkAnswer: {
        type: Boolean,
        required: false,
        default: false,
    },
});

onMounted(()=>{
    if(scrollToParam && scrollToId == props.challengeInput.id){
        const el = document.getElementById(`reaction-${props.challengeInput.id}`);
        if(el){
            el.scrollIntoView({behavior: "smooth"});
        }
    }
})

const emit = defineEmits(["updateChallenge" ,"setThisToSelectedAnswer"]);

const smallText = computed(() => props.challengeInput.text.substring(0, 1000));
const shortened = computed(
    () => smallText.value.length < props.challengeInput.text.length,
);
const readMore = ref(false);

const markSelectedPopup = ref(false);

async function markSelected() {
    markSelectedPopup.value = false;
    const updated = await API.markReactionAsChosen(props.challengeInput.id);
    emit("setThisToSelectedAnswer")
    emit("updateChallenge");
}
</script>
