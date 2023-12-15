<template>
    <Banner
        title="Notificaties"
        subtitle="Uw account"
        banner-src="/banners/banner-1.jpg"
    />
    <h3 class="mx-auto font-weight-light text-center my-8">
        Hier vind u notificaties over nieuwe challenges bij bedrijven die u
        volgt, updates over uw bedrijfsaanvraag en meer!
    </h3>
    <v-row>
        <v-col cols="6" class="d-flex justify-center mx-auto">
            <v-switch
                label="Stuur mij emails bij nieuwe notificaties"
                class="d-flex justify-center"
                :color="'green'"
                :loading="updatingEmailPreference"
                v-model="emailPreference"
            ></v-switch>
        </v-col>
        <v-col cols="6" class="d-flex justify-center mx-auto align-center">
            <v-tooltip
                :text="'Alle notificaties verwijderen'"
                :location="'top'"
            >
                <template v-slot:activator="{ props }">
                    <v-icon
                        v-bind="props"
                        class="delete-notifications"
                        @click="clearNotifications"
                        color="red"
                        >mdi-delete</v-icon
                    >
                </template>
            </v-tooltip>
        </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>
    <v-row>
        <v-col v-if="notifications.length > 0" md="8" cols="11" class="mx-auto">
            <NotificationCard
                v-for="notification in notifications"
                :key="notification.id"
                :notification="notification"
                class="mt-3"
                @click="
                    notification.read = true;
                    //Remove notification from list
                    API.setNotificationToRead(notification.id);
                    notifications = notifications.filter(
                        (n) => n.id !== notification.id,
                    );
                "
            />
        </v-col>
        <v-col v-else>
            <p class="mx-auto font-weight-light text-center my-8">
                Geen ongelezen meldingen
            </p>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { Ref, computed, watch } from "vue";
import { ref } from "vue";
import { User } from "@/models/User";
import { onMounted } from "vue";
import API from "@/Api";
import { useSessionStore } from "@/store/sessionStore";
import { Notification } from "@/models/Notification";
import NotificationCard from "@/components/NotificationCard.vue";
import Banner from "@/components/Banner.vue";
import { useSnackbarStore } from "@/store/Snackbar";

const user = ref() as Ref<User | null>;
const updatingEmailPreference = ref(false);
const emailPreference = ref(false);
const sessionStore = useSessionStore();
const notifications: Ref<Notification[]> = ref([]);
const snackbarStore = useSnackbarStore();
watch(emailPreference, async() => {
    const result = await API.updateNotificationPreferences(user.value!, {
        email: emailPreference.value,
    });
    snackbarStore.createSimple(
        result.allowEmailNotifications
            ? "U ontvangt nu emails bij nieuwe notificaties"
            : "U ontvangt geen emails meer bij nieuwe notificaties", 
            "success"
    );
});

onMounted(async () => {
    user.value = await API.getCurrentUser();
    //Only get unread notifications
    if (!user.value) {
        return;
    }
    emailPreference.value = user.value.allowEmailNotifications;

    notifications.value = user.value?.notifications
        .reverse()
        .filter((n) => n.read === false);
});
function clearNotifications() {
    notifications.value.forEach((n) => {
        n.read = true;
        API.setNotificationToRead(n.id);
    });
    sessionStore.forceUpdate(); // for the sidebar
    notifications.value = [];
}

function setEmailPreference() {
    // updatingEmailPreference.value = true;
    // API.setEmailPreference(!user.value?.allowedEmailNotifications).then(() => {
    //     updatingEmailPreference.value = false;
    //     user.value!.emailPreference = !user.value?.emailPreference;
    //     sessionStore.setUser(user.value!);
    // });
}
</script>
<style lang="css" scoped>
.delete-notifications:hover {
    cursor: pointer;
}
</style>
