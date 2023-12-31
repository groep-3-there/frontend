<template>
    <template v-if="notFound">
        <NotFound> Deze challenge bestaat niet </NotFound>
    </template>
    <template v-if="!challenge && !notFound">
        <div>
            <v-progress-circular indeterminate></v-progress-circular>
        </div>
    </template>
    <template v-if="challenge">
        <Banner
            :logo-src="
                challenge.department.parentCompany.getProfileOrDefaultImageUrl()
            "
            :banner-src="challenge.getBannerOrDefaultImageUrl()"
            :title="challenge.title"
            :subtitle="'Challenge'"
            :darken="true"
            :logo-click-src="`/company/${challenge.department.parentCompany.id}`"
        />

        <v-row>
            <v-col md="3" class="d-flex align-center justify-center">
                <v-icon>mdi-calendar-blank</v-icon>
                {{
                    challenge.createdAt.toLocaleDateString("nl-nl", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })
                }}
            </v-col>
            <v-col cols="12" md="6" class="">
                <div class="d-flex flex-wrap justify-center">
                    <template v-if="challenge.tags !== ''">
                    <Tag  v-for="tag in challenge.getTagList()" :key="tag">{{
                        tag
                    }}</Tag>
                    </template>
                        
                </div>
            </v-col>
            <v-col cols="12" md="3" class="d-flex justify-center align-center">
                <ConcludeChallengePopup
                    v-if="concludePopup"
                    @request-popup-close="concludePopup = false"
                    :challenge="challenge"
                ></ConcludeChallengePopup>
                <AreYouSurePopup
                    v-if="archivePopup"
                    @on-close="archivePopup = false"
                    @on-accept-and-close="
                        archive();
                        archivePopup = false;
                    "
                    :title="'Weet u zeker dat u de challenge wilt archiveren?'"
                    :subtitle="'De challenge is dan alleen nog zichtbaar voor beheerders van uw bedrijf.'"
                    :accept-word="'Archiveren'"
                ></AreYouSurePopup>
                <v-menu
                    v-if="
                        sessionStore.loggedInUser?.hasPermissionAtDepartment(
                            'CHALLENGE_MANAGE',
                            challenge?.department.id,
                        )
                    "
                >
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props" size="48"
                            >mdi-dots-horizontal</v-icon
                        >
                    </template>
                    <v-list>
                        <v-list-item
                            :value="1"
                            :key="1"
                            @click="
                                $router.push(`/challenge/${challenge?.id}/edit`)
                            "
                        >
                            <v-list-item-title
                                ><v-icon class="mr-1" size="24"
                                    >mdi-pencil</v-icon
                                >Bewerken</v-list-item-title
                            >
                        </v-list-item>
                        <v-list-item
                            :value="2"
                            :key="2"
                            @click="concludePopup = true"
                            v-if="challenge.status == 'IN_UITVOERING'"
                        >
                            <v-list-item-title
                                ><v-icon class="mr-1" size="24"
                                    >mdi-check-bold</v-icon
                                >Afronden</v-list-item-title
                            >
                        </v-list-item>
                        <v-list-item
                            :value="3"
                            :key="3"
                            @click="archivePopup = true"
                            v-if="challenge.status == 'AFGEROND'"
                        >
                            <v-list-item-title
                                ><v-icon class="mr-1" size="24"
                                    >mdi-archive</v-icon
                                >Archiveren</v-list-item-title
                            >
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="d-flex justify-center align-center">
                <UserBubble :size="36" :user="challenge.author"></UserBubble>
            </v-col>
        </v-row>
        <v-divider class="mt-4"></v-divider>

        <v-row>
            <v-col cols="10" class="mx-auto">
                <v-alert
                    class="my-8"
                    v-if="challenge.concludingRemarks"
                    type="success"
                    title="Challenge Voltooid"
                    :text="challenge.concludingRemarks"
                ></v-alert>
                <section>
                    <h2 class="post-heading">Samenvatting</h2>
                    <p>{{ challenge.summary }}</p>
                </section>
                <section>
                    <h2 class="post-heading">Beschrijving</h2>
                    <p v-html="challenge.description"></p>
                </section>

                <section v-if="challenge.contactInformation !== ''">
                    <h2 class="post-heading">Contact informatie</h2>
                    <p v-html="challenge.contactInformation"></p>
                </section>
                <section v-if="challenge.endDate">
                    <h2 class="post-heading">Einddatum</h2>
                    <p>
                        <v-icon>mdi-calendar-blank</v-icon>
                        {{
                            challenge.endDate.toLocaleDateString("nl-nl", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })
                        }}
                    </p>
                </section>
                <section v-if="challenge.imageAttachments.length > 0">
                    <h2 class="post-heading">Afbeeldingen</h2>
                    <v-row>
                        <v-col
                            cols="10"
                            md="4"
                            v-for="img in challenge.imageAttachments"
                            :key="img.id"
                        >
                            <img
                                class="attachment-image"
                                lazy-src="https://picsum.photos/id/11/100/60"
                                :src="img.getUrl()"
                                @click="openImage(img.getUrl())"
                            />
                        </v-col>
                    </v-row>
                    <v-divider class="my-4"></v-divider>
                </section>

                <section v-if="sessionStore.loggedInUser">
                    <h2 class="post-heading">Ideeënbus</h2>
                    <v-alert
                        type="info"
                        v-if="challenge.status == 'IN_UITVOERING'"
                        >U kunt geen reactie meer achterlaten, er is al een
                        antwoord gekozen.</v-alert
                    >
                    <ChallengeCreateReaction
                        v-if="challenge.status == 'OPEN_VOOR_IDEEEN'"
                        :targetChallenge="challenge"
                        @updateReactions="reactionPostedHandler"
                    />
                </section>
                <v-divider class="my-4"></v-divider>

                <!-- Custom component voor reacties -->
                <ChallengeReaction
                    v-for="input in challengeInputs"
                    :can-mark-answer="
                        !inputsHaveChosenAnswer && userCanMarkAnswer
                    "
                    :challengeInput="input"
                    :key="input.id"
                    @update-challenge="loadChallenge"
                    @setThisToSelectedAnswer="input.isChosenAnswer = true"
                >
                </ChallengeReaction>
                <div class="my-4" ref="pageEnd"></div>
            </v-col>
        </v-row>
    </template>
</template>

<style scoped>
.small-text {
    font-size: 0.8em;
}
.author-info-text {
    line-height: 1.3em;
}
.reaction-type-selector {
    max-width: 200px !important;
    width: 200px;
    margin-right: 10px;
    margin-top: auto;
}

.reaction-options {
    display: flex;
    flex-direction: row;
    justify-content: end;
    flex-wrap: wrap;
    align-items: center;
    height: 100px;
}

.reaction-options > v-select {
    max-width: 100px;
}

.new-reaction-input {
    width: 100%;
    min-height: 200px;
    border: 2px solid black;
}

.post-heading {
    font-size: 1.6em;
    margin-top: 1em;
    margin-bottom: 1em;
}

.white-text {
    color: white;
}
.attachment-image {
    max-height: 200px;
    max-width: 100%;
}

@media screen and (max-width: 1000px) {
    .challenge-title {
        font-size: 2.5rem;
    }
}
</style>

<script lang="ts" setup>
import ConcludeChallengePopup from "@/components/ConcludeChallengePopup.vue";
import AreYouSurePopup from "@/components/AreYouSurePopup.vue";
import { Ref, computed, ref } from "vue";
import { Challenge } from "@/models/Challenge";
import Tag from "@/components/Tag.vue";
import ChallengeReaction from "@/components/ChallengeReaction.vue";
import ChallengeCreateReaction from "@/components/ChallengeCreateReaction.vue";
import { ChallengeInput } from "@/models/ChallengeInput";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import API from "@/Api";
import { useSessionStore } from "@/store/sessionStore";
import NotFound from "@/components/NotFound.vue";
import Banner from "@/components/Banner.vue";
import UserBubble from "@/components/UserBubble.vue";
const pageEnd : Ref<HTMLElement | null> = ref(null);
const sessionStore = useSessionStore();

const concludePopup = ref(false);
const archivePopup = ref(false);
const challenge: Ref<Challenge | null> = ref(null);
const notFound = ref(false);

const challengeInputs: Ref<ChallengeInput[]> = ref([]);
const inputsHaveChosenAnswer = computed(() =>
    challengeInputs.value.some((input) => input.isChosenAnswer),
);
const userCanMarkAnswer = computed(() =>
    sessionStore.loggedInUser?.hasPermissionAtDepartment(
        "CHALLENGE_MANAGE",
        challenge.value?.department.id,
    ),
);

const idParam = useRoute().params.id;
let id = Array.isArray(idParam) ? idParam[0] : idParam;

onMounted(async () => {
    await loadChallenge();
    await updateReactions();
});

async function loadChallenge() {
    try {
        challenge.value = await API.getChallengeById(parseInt(id));
    } catch (e) {
        notFound.value = true;
    }
}

async function updateReactions() {
    challengeInputs.value = await API.getChallengeInputs(parseInt(id));
}

async function reactionPostedHandler(){
    await updateReactions();
    setTimeout(() => {
        scrollToBottom();
        
    }, 100);
}
function archive() {
    if (challenge.value) {
        challenge.value.status = "GEARCHIVEERD";
        API.updateChallenge(challenge.value);
    }
}

function openImage(imageUrl: string) {
    window.open(imageUrl, "_blank");
}
function scrollToBottom(){
    console.log(pageEnd.value)
    pageEnd.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>
