<template>
    <v-card
        class=""
        max-width="500"
        :title="notification.title"
        :subtitle="notification.description"
        @click="$router.push(`${notification.link}`)"
    ></v-card>
</template>
<style>
.author-name {
    color: rgb(120, 120, 120);
    font-size: small;
}

.description {
    min-height: 100px;
}

.shorten-text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.company-logo-small {
    height: 36px;
    width: 36px;
    object-fit: cover;
    border-radius: 100%;
    margin-left: auto;
}

.card-actions {
    margin-left: 10px;
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
