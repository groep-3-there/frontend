<template>
    <template v-if="!sessionStore.loggedInUser">
        U bent niet ingelogd
    </template>
    <template v-else>
        <Banner
            :banner-src="
                sessionStore.loggedInUser?.department?.parentCompany.getBannerForCompany()
            "
            :logo-src="
                sessionStore.loggedInUser?.department?.parentCompany?.getProfileOrDefaultImageUrl()
            "
            :title="'Dashboard'"
            :subtitle="'Admin paneel'"
        >
        </Banner>

        <v-row>
            <v-col cols="9" md="6" class="d-flex justify-center">
                <v-btn
                    color="primary"
                    class="admin-action"
                    @click="$router.push('/admin/grade-companies')"
                    ><h2>Bedrijfsaanvragen</h2></v-btn
                >
            </v-col>
        </v-row>
    </template>
</template>

<style>
.admin-action {
    width: 80%;
    min-height: 100px;
}

.white-text {
    color: white;
}

.attachment-image {
    max-height: 200px;
    max-width: 100%;
}
</style>

<script lang="ts" setup>
import { useSessionStore } from "@/store/sessionStore";
import Banner from "@/components/Banner.vue";
const sessionStore = useSessionStore();
</script>
