<template>
    <v-container>
        <v-row @click="showPopup = true">
            <v-col cols="12" md="6">
                <h2>{{ props.companyRequest.name }}</h2>
                <Tag type="branch">hallo</Tag>
            </v-col>
        </v-row>
        <CompanyRequestPopup
            v-if="showPopup"
            :companyRequest="props.companyRequest"
            @requestPopupClose="showPopup = false">
        </CompanyRequestPopup>
    </v-container>       
</template>

<style>
</style>

<script setup lang="ts">
import { CompanyRequests } from "@/models/CompanyRequests.js";
import CompanyRequestPopup from "./CompanyRequestPopup.vue";
import Tag from "./Tag.vue";
import { ref } from "vue";

const props = defineProps({
    companyRequest: {
        type: CompanyRequests,
        required: true,
    },
});

let showPopup = ref(false);
</script>