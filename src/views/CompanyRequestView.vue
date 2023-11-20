<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="9">
                <h1 class="title d-flex justify-center">
                    Bedrijfsaanvragen
                </h1>
            </v-col>
        </v-row>
        
        <div v-for="companyRequest in requests?.content">
            <div class="padding-around">
                <v-row>
                    <v-col cols="12" md="9">
                        <CompanyRequest :companyRequest="companyRequest" @requestUpdateRequests="loadRequests" class="border"
                            
                        ></CompanyRequest>
                    </v-col>
                
                </v-row>
            </div>
        </div>
        <v-row>
            <v-col cols="12" md="9">
                <v-pagination
                    v-if="requests"
                    v-model="page"
                    :length="requests.totalPages"
                    @input="loadRequests"
                    :totalVisible="7"
                ></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
.border {
    border: 1px solid black;
    border-radius: 10px;
}

.padding-around {
    padding: 10px;
}
</style>

<script setup lang="ts">
import API from "@/Api";
import CompanyRequest from "@/components/CompanyRequest.vue";
import { CompanyRequests } from "@/models/CompanyRequests.js";
import { CompanyRequestsResults } from "@/models/CompanyRequestsResults";
import { onMounted } from "vue";
import { Ref, ref } from "vue";

const requests = ref<CompanyRequestsResults>();

onMounted(async () => {
    await loadRequests();
});

async function loadRequests() {
    console.log("loading requests");
    requests.value = await API.getCompanyRequests();
}

const page = ref(1);
</script>