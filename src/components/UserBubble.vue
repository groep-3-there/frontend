<template>
    <v-tooltip :text="user.name" :location="'top'">
        <template v-slot:activator="{ props }">
            <div
                v-bind="props"
                class="d-flex flex-row justify-center align-center user-box"
                @click="$router.push('/user/' + user.id)"
            >
                <img
                    :src="user.getAvatarOrDefaultUrl()"
                    class="user-logo-small mr-2"
                />
                <div
                    v-if="withName"
                    class="d-flex flex-column author-info-text"
                >
                    <h2>
                        {{ user.name }}
                    </h2>
                    <p class="small-text text-coolgray">
                        {{ user.getSubtitle() }}
                    </p>
                </div>
            </div>
        </template>
    </v-tooltip>
</template>
<style>
.user-logo-small {
    height: v-bind(sizePx);
    object-fit: cover;
    border-radius: 100%;
    margin-left: auto;
    aspect-ratio: 1/1;
}
.user-box {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid transparent;
}
.user-box:hover {
    cursor: pointer;
    border-bottom: 1px solid #c4c4c4;
}
</style>
<script setup lang="ts">
import { computed, defineProps } from "vue";
import { User } from "@/models/User";

const props = defineProps({
    user: {
        type: User,
        required: true,
    },
    size: {
        type: Number,
        default: 64,
    },
    withName: {
        type: Boolean,
        default: true,
    },
});

const sizePx = computed(() => {
    return props.size.toString() + "px";
});
</script>
