<template>
    <div>
        <h1>Notifications</h1>
        <div>
            <NotificationCard
                v-for="notification in notifications"
                :key="notification.id"
                :notification="notification"
                class="mr-4"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { Ref, computed } from "vue";
import { ref } from "vue";
import { User } from "@/models/User";
import { onMounted } from "vue";
import API from "@/Api";
import { useSessionStore } from "@/store/sessionStore";
import { Notification } from "@/models/Notification";
import NotificationCard from "@/components/NotificationCard.vue";

const user = ref() as Ref<User | null>;

const sessionStore = useSessionStore();
const notifications: Ref<Notification[] | []> = ref([]);

onMounted(async () => {
    user.value = await API.getCurrentUser();
    notifications.value = user.value?.notifications || [];
});
</script>
<style lang="css" scoped></style>
