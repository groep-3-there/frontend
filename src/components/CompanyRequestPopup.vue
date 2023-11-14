<template>
    <div class="modal" v-if="companyRequest" @click="$emit('requestPopupClose')">
        <div class="popup" @click.stop>
            <h2>{{ companyRequest.name }}</h2>
            <h2>{{ companyRequest.ownerId }}</h2>
            <button @click="$emit('requestPopupClose')">Close</button>
        </div>        
    </div>
</template>

<style>
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
  max-width: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>

<script setup lang="ts">
import { CompanyRequests } from "@/models/CompanyRequests.js";

const props = defineProps({
    companyRequest: {
        type: CompanyRequests,
        required: true,
    },
});
</script>