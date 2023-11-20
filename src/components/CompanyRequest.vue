<template>
    <v-container>
        <v-row @click="showPopup = true">
            <v-col cols="12" md="6">
                <h2 class="padding-left">{{ props.companyRequest.name }}</h2>
                <Tag type="branch">{{ props.companyRequest.branch.name }}</Tag>
            </v-col>
            <v-col cols="12" md="6" class="text-right">
                <v-icon
                    size="50"
                    icon="mdi-thumbs-up-down"
                    class="border-icon"
                ></v-icon>
            </v-col>
        </v-row>
        <CompanyRequestPopup
            v-if="showPopup"
            :companyRequest="props.companyRequest"
            @requestPopupClose="closePopup"
        >
        </CompanyRequestPopup>
    </v-container>
</template>

<style>
.padding-left {
    padding-left: 10px;
}

.border-icon {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 30px;
    background-color: rgb(232, 232, 232);
    margin: 10px;
}
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
const emit = defineEmits(["requestUpdateRequests"]);

let showPopup = ref(false);
function closePopup() {
    showPopup.value = false;
    emit("requestUpdateRequests");
}
</script>
