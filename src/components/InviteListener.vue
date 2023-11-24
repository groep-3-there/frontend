<template>
        <v-row justify="center" v-if="allowInvitePopup">
        <v-dialog v-model="queryContainsInvite" persistent width="auto">
            <v-card>
                <img class="invite-banner" :src="department?.parentCompany?.getBannerForCompany()" alt="logo">
                <div class="d-flex header">
                    <img class="invite-logo" :src="department?.parentCompany?.getProfileOrDefaultImageUrl()" alt="logo">
                    <v-card-title class="text-center title">
                        Uitnodiging van {{ department?.parentCompany?.name  }}
                    </v-card-title>

                </div>
                <v-card-text>Bij afdeling: {{ department?.name }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1"  variant="text" @click="close">
                        Annuleren
                    </v-btn>
                    <v-btn color="green-darken-1" variant="outlined" @click="accept">
                        Accepteren
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<style scoped>
.header{
    padding: 10px;
}
.title{
    display: flex;
    align-items: center;
}
.invite-banner {
    width: 100%;
    height: 128px;
    object-fit: cover;
}
.invite-logo{
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 100%;
}
</style>
<script setup lang="ts">
import API from '@/Api';
import { Department } from '@/models/Department';
import { computed } from 'vue';
import { Ref } from 'vue';
import { onMounted, ref } from 'vue';
import { useSessionStore } from '@/store/sessionStore';
import { useRoute } from 'vue-router';
const queryContainsInvite = ref(false);
const department : Ref<Department | null> = ref(null);
const codeParam = useRoute().query.invite;
const sessionStore = useSessionStore();

const allowInvitePopup = computed(()=>{
    return queryContainsInvite.value && department.value != null && !sessionStore.loggedInUser?.department;
});

onMounted(async() => {
    console.log(codeParam);
    if(!codeParam) {
        return;
    }
    let code = Array.isArray(codeParam) ? codeParam[0] as string : codeParam as string;
    department.value = await API.getDepartmentByCode(code);
    queryContainsInvite.value = true;
});

function close(){
    queryContainsInvite.value = false;
}
async function accept(){
    let code = Array.isArray(codeParam) ? codeParam[0] as string : codeParam as string;
    await API.joinDepartment(code);
    queryContainsInvite.value = false;
}
</script>