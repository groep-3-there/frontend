<template>
    <v-container>
        <h1 class="title d-flex justify-center justify-md-start">
            Bedrijfsaanvragen
        </h1>
        
        <div v-for="companyRequest in requests">
            <CompanyRequest :companyRequest="companyRequest" class="border"
                
            ></CompanyRequest>
        </div>
    </v-container>
</template>

<style>
.border {
    border: 1px solid black;
}
</style>

<script setup lang="ts">
import API from "@/Api";
import CompanyRequest from "@/components/CompanyRequest.vue";
import { CompanyRequests } from "@/models/CompanyRequests.js";
import { onMounted } from "vue";
import { Ref, ref } from "vue";

const requests: Ref<CompanyRequests[] | null> = ref([]);

onMounted(async () => {
    await loadRequests();
});

async function loadRequests() {
    console.log("loading requests");
    requests.value = await API.getCompanyRequests();
}
</script>