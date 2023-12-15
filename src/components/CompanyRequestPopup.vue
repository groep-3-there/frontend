<template>
    <v-row class="d-flex justify-center">
        <v-dialog
            v-model="opened"
            class="modal"
            v-if="companyRequest"
            @click="close()"
        >
            <div class="popup mx-auto" :class="{'bg-menugray':isDarkmode, 'bg-white':!isDarkmode}" @click.stop>
                <v-container class="">
                    <v-row class="">
                        <v-col cols="12" md="12" class="d-flex justify-center align-center">
                            <h1>{{ companyRequest.name }}</h1>
                        </v-col>
                        <div class="exit-btn">
                            <button @click="$emit('requestPopupClose')">
                                <v-icon icon="mdi-close"></v-icon>
                            </button>

                        </div>
                    </v-row>
                    <v-row no-gutters
                        ><v-col cols="12" class="d-flex justify-center align-center"
                            ><Tag type="branch">
                                {{ companyRequest.branch.name }}</Tag
                            ></v-col
                        ></v-row
                    >
                    <v-divider class="my-4"></v-divider>
                    <div class="mx-auto content">
                        <v-row no-gutters class="">
                        <v-icon>mdi-calendar-blank</v-icon>
                        {{
                            new Date(
                                $props.companyRequest.requestedAt,
                            ).toLocaleDateString("nl-nl", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })
                        }}
                    </v-row>
                    <v-row
                        ><v-col cols="12"
                            ><h3>Beheerder</h3>
                            <p>{{ companyRequest.owner.name }}</p>
                            <p>{{ companyRequest.owner.email }}</p></v-col
                        ></v-row
                    >
                    <v-row
                        ><v-col cols="12 mt-2"><h3>Tags</h3></v-col></v-row
                    >
                    <v-row no-gutters
                        ><v-col cols="12" class="no-maringin-first-child"
                            ><Tag v-for="tag in companyRequest.getTagList()" :key="tag">
                                {{ tag }}
                            </Tag>
                        </v-col></v-row
                    >
                    <v-row no-gutters>
                        <v-col cols="12 mt-2"><h3>Land</h3></v-col>
    
                    </v-row>
                    <v-row no-gutters
                        ><v-col cols="12" class="no-maringin-first-child d-flex align-center"
                            ><SmallCountryFlag
                                class="mr-2"
                                :country="companyRequest.country"
                            ></SmallCountryFlag> 
                            {{ companyRequest.country.name}}</v-col>
                    </v-row>
                    
                </div>
                <v-row
                class="mt-4"
                    ><v-col cols="12" class="d-flex justify-space-around flex-wrap"
                        ><v-btn @click="rejectCompanyRequest" color="red"
                            ><v-icon icon="mdi-delete"></v-icon>Afwijzen</v-btn
                        ><v-btn @click="acceptCompanyRequest" color="green"
                            ><v-icon icon="mdi-check"></v-icon>Goedkeuren</v-btn
                        ></v-col
                    ></v-row
                >
                    
                </v-container>
            </div>
    </v-dialog>
    </v-row>

</template>

<style scoped>
.exit-btn{
    position: absolute;
    right: 0;
    top: 0;
    margin: 1rem;
}
.content{
    width: 80%;
}

.popup {
    position: relative;
    width: min(100%, 700px);
    border-radius: 10px;
}

.no-maringin-first-child :first-child {
    margin-left: 0;
}
</style>

<script setup lang="ts">
import { CompanyRequests } from "@/models/CompanyRequests.js";
import SmallCountryFlag from "@/components/SmallCountryFlag.vue";
import API from "@/Api";
import Tag from "./Tag.vue";
import { useTheme } from 'vuetify'
import { computed, ref, watch } from "vue";
const opened= ref(true)
const theme = useTheme()
const isDarkmode = computed(()=>{
    return theme.global.name.value === 'dark'
})
const props = defineProps({
    companyRequest: {
        type: CompanyRequests,
        required: true,
    },
});
watch(opened, (newVal) => {
    if (newVal == false) {
        close();
        opened.value = true;
    }
});
function close(){
    emit("requestPopupClose");
}
const emit = defineEmits(["requestPopupClose"]);

async function acceptCompanyRequest() {
    await API.acceptCompanyRequest(props.companyRequest.id);
    emit("requestPopupClose");
}

async function rejectCompanyRequest() {
    await API.rejectCompanyRequest(props.companyRequest.id);
    emit("requestPopupClose");
}
</script>
