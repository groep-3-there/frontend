<template>
    <div
        class="modal"
        v-if="companyRequest"
        @click="$emit('requestPopupClose')"
    >
        <div class="popup" @click.stop>
            <v-container>
                <v-row>
                    <v-col cols="11" class="d-flex justify-center align-center">
                        <h1>{{ companyRequest.name }}</h1>
                    </v-col>
                    <v-col cols="1" class="d-flex align-center justify-end">
                        <button @click="$emit('requestPopupClose')">
                            <v-icon icon="mdi-close"></v-icon>
                        </button>
                    </v-col>
                </v-row>
                <v-row no-gutters
                    ><v-col cols="12" class="no-maringin-first-child"
                        ><Tag type="branch">
                            {{ companyRequest.branch.name }}</Tag
                        ></v-col
                    ></v-row
                >
                <v-row
                    ><v-col cols="12"
                        ><h3>Beheerder</h3>
                        <p>{{ companyRequest.owner.name }}</p>
                        <p>{{ companyRequest.owner.email }}</p></v-col
                    ></v-row
                >
                <v-row
                    ><v-col cols="12"><h3>Tags</h3></v-col></v-row
                >
                <v-row no-gutters
                    ><v-col cols="12" class="no-maringin-first-child"
                        ><Tag v-for="tag in companyRequest.tags.split(',')">
                            {{ tag }}
                        </Tag>
                    </v-col></v-row
                >
                <v-row
                    ><v-col cols="12" class="d-flex justify-space-around"
                        ><v-btn @click="rejectCompanyRequest" color="red"
                            ><v-icon icon="mdi-delete"></v-icon>Afwijzen</v-btn
                        ><v-btn @click="acceptCompanyRequest" color="green"
                            ><v-icon icon="mdi-check"></v-icon>Goedkeuren</v-btn
                        ></v-col
                    ></v-row
                >
            </v-container>
        </div>
    </div>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup {
    width: 80%;
    max-width: 35rem;
    background-color: white;
    border-radius: 5px;
}

.no-maringin-first-child :first-child {
    margin-left: 0;
}
</style>

<script setup lang="ts">
import { CompanyRequests } from "@/models/CompanyRequests.js";
import { defineEmits } from 'vue';
import API from "@/Api";
import Tag from "./Tag.vue";

const props = defineProps({
    companyRequest: {
        type: CompanyRequests,
        required: true,
    },
});

const emit = defineEmits(["requestPopupClose"]);

async function acceptCompanyRequest() {
    await API.acceptCompanyRequest(props.companyRequest.id);
    emit('requestPopupClose');
}

async function rejectCompanyRequest() {
    await API.rejectCompanyRequest(props.companyRequest.id);
    emit('requestPopupClose');
}
</script>
