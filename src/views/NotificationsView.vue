<template>
    <Banner title="Notificaties" subtitle="Uw account" banner-src="/banners/banner-1.jpg"/>
    <h3 class="mx-auto font-weight-light text-center my-8">Hier vind u notificaties over nieuwe challenges bij bedrijven die u volgt, updates over uw bedrijfsaanvraag en meer!</h3>
    <v-row>
        <v-col cols="12" class="d-flex justify-center mx-auto">
            <v-switch
                label="Stuur mij emails bij nieuwe notificaties"
                class="d-flex justify-center"
                :color="'green'"
                :loading="updatingEmailPreference"
                v-model="emailPreference"
                ></v-switch>
        </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>
    <v-row>
        <v-col v-if="notifications.length > 0" md="6" cols="12" class="mx-auto">
            <NotificationCard
                v-for="notification in notifications"
                :key="notification.id"
                :notification="notification"
                class="mr-4"
                @click="
                    notification.read = true;
                    //Remove notification from list
                    notifications = notifications.filter(
                        (n) => n.id !== notification.id,
                    );
                    API.setNotificationToRead(notification.id);
                "
            />
        </v-col>
        <v-col v-else>
            <p class="mx-auto font-weight-light text-center my-8">Geen ongelezen meldingen</p>
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

const user = ref() as Ref<User | null>;
const updatingEmailPreference = ref(false);
const emailPreference = ref(false);
const sessionStore = useSessionStore();
const notifications: Ref<Notification[]> = ref([]);

watch(emailPreference, () => {
    alert("Not implemented yet")
});

onMounted(async () => {
    user.value = await API.getCurrentUser();
    //Only get unread notifications
    if(!user.value){ return }
    
    notifications.value = user.value?.notifications.filter(
        (n) => n.read === false,
    );
});

function setEmailPreference() {
    // updatingEmailPreference.value = true;
    // API.setEmailPreference(!user.value?.allowedEmailNotifications).then(() => {
    //     updatingEmailPreference.value = false;
    //     user.value!.emailPreference = !user.value?.emailPreference;
    //     sessionStore.setUser(user.value!);
    // });
}

</script>
<style lang="css" scoped></style>
