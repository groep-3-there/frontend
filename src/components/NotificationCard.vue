<template>
    <v-card
        class="notification"
        @click="$router.push(`${notification.link}`)"
    >
    <div class="content">
        <h3>
            {{ notification.title }}
        </h3>
        <p class="text-coolgray">
            {{ notification.description }}
        </p>

    </div>
  </v-card>
</template>
<style>
.content{
    width: 100%;
    padding: 10px;
}
</style>
<script setup lang="ts">
import { defineProps } from "vue";
import { Notification } from "@/models/Notification";
import { useRoute } from "vue-router";

const props = defineProps({
    notification: {
        type: Notification,
        required: true,
    },
});

const idParam = useRoute().params.id;
let id = Array.isArray(idParam) ? idParam[0] : idParam;
</script>
