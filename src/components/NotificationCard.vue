<template>
    <v-card
        class="mx-2 card-outter"
        min-width="350"
        width="350"
        height="350"
        hover
    >
        <v-card-title>
            {{ notification.title }}
        </v-card-title>

        <v-card-text class="shorten-text description">
            {{ notification.description }}
        </v-card-text>

        <v-card-actions class="card-actions">
            <p class="author-name">{{ notification.link }} |</p>
        </v-card-actions>
    </v-card>
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

const props = defineProps({
    notification: {
        type: Notification,
        required: true,
    },
});
</script>
