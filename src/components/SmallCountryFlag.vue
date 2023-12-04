<template>
    <div>
        <v-tooltip :text="country.name" :location="'top'">
            <template v-slot:activator="{ props }">
                <img
                    v-bind="props"
                    class="flag"
                    :src="country.getImageUrl()"
                    :alt="country.name"
                />
            </template>
        </v-tooltip>

    </div>
</template>
<style scoped>
.flag {
    width: v-bind(sizePx);
    height: v-bind(sizePx);
}
</style>
<script setup lang="ts">
import { Country } from "@/models/Country";
import { computed } from "vue";

const props = defineProps({
    country: {
        type: Country,
        required: true,
    },
    size: {
        type: Number,
        default: 30,
    },
});

const sizePx = computed(() => props.size + "px");
</script>
