<template>
    <v-container v-if="originalUser">
        <v-form ref="editUserForm" @submit.prevent>
            <v-row>
                <v-col cols="12">
                    <h1 class="my-2">Profiel bewerken</h1>
                    <v-row>
                        <v-col>
                            <div>
                                <v-card
                                    v-if="
                                        originalUser?.avatarImageId &&
                                        avatar.length == 0
                                    "
                                    class="avatar"
                                >
                                    <v-img
                                        :src="showAvatar()"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                        height="200px"
                                        cover
                                    >
                                    </v-img>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-card-text class=""
                                            >Huidige avatar</v-card-text
                                        >
                                        <v-btn
                                            size="small"
                                            color="surface-variant"
                                            variant="text"
                                            icon="mdi-trash-can-outline"
                                            @click="deleteAvatar"
                                        ></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </div>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-file-input
                                accept="image/png, image/jpeg, image/svg"
                                label="Upload een avatar"
                                variant="outlined"
                                chips
                                show-size
                                v-model="avatar"
                                :rules="[
                                    (v) =>
                                        v.length == 0 ||
                                        (v.length == 1 &&
                                            v[0].size < 10000000) ||
                                        'De grootte van het bestand moet kleiner zijn dan 10MB!',
                                ]"
                            >
                            </v-file-input>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="name"
                                label="Naam"
                                :rules="nameRules"
                                required
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="email"
                                label="E-mail"
                                :rules="emailRules"
                                required
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                            v-model="newPassword"
                            label="Nieuw wachtwoord"
                            variant="outlined"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            :rules="newPassword == '' ? [] : passwordRules"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="phoneNumber"
                                label="Telefoonnummer"
                                :rules="phoneNumberRules"
                                required
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <RichEditor
                                v-if="originalUser"
                                :initialize-with="originalUser.info"
                                @model-value-changed="(e) => (info = e)"
                            ></RichEditor>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-combobox
                                label="Tags"
                                v-model="tags"
                                :items="standardTags.map((tag) => tag.name)"
                                variant="outlined"
                                multiple
                                chips
                                clearable
                                :rules="[
                                    (v) =>
                                        !v.some((i: string) => {
                                            return i.includes(',');
                                        }) || 'Invoer ongeldig',
                                ]"
                            >
                            </v-combobox>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <h4>Publiek e-mailadres</h4>
                            <v-switch
                                label="Laat het e-mailadres op uw persoonlijke pagina zien"
                                v-model="isEmailPublic"
                                color="success"
                                hide-details
                            ></v-switch>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <h4>Publiek telefoonnummer</h4>
                            <v-switch
                                label="Laat het telefoonnummer op uw persoonlijke pagina zien"
                                v-model="isPhoneNumberPublic"
                                color="success"
                                hide-details
                            ></v-switch>
                        </v-col>
                    </v-row>

                    <v-row class="d-flex justify-end">
                        <v-btn
                            @click="editUser"
                            size="large"
                            variant="elevated"
                            color="primary"
                            type="submit"
                        >
                            Profiel bewerken
                        </v-btn>
                    </v-row>
                </v-col>
                <v-col></v-col>
            </v-row>
        </v-form>
    </v-container>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import Api from "@/Api";
import RichEditor from "@/components/RichEditor.vue";
import { Ref } from "vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import router from "@/router";
import { Tag } from "@/models/Tag";
import { User } from "@/models/User";
import { useSnackbarStore } from "@/store/Snackbar";
import API from "@/Api";
const snackbar = useSnackbarStore();
const originalUser: Ref<User | null> = ref(null);
const name = ref("");
const info = ref("");
const avatar = ref([]);
const isEmailPublic = ref();
const isPhoneNumberPublic = ref();
const email = ref("");
const newPassword = ref("");
const showPassword = ref(false);
const phoneNumber = ref("");
const standardTags: Ref<Tag[]> = ref([]);
const tags = ref([] as any);
const editUserForm = ref(null) as any;
const idParam = useRoute().params.id;
let id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);


const passwordRules = [
    (v: string) => !!v || "Wachtwoord is verplicht",
    (v: string) =>
        v.length >= 8 || "Wachtwoord moet minimaal 8 tekens lang zijn",
    (v: string) =>
        /[A-Z]/.test(v) || "Wachtwoord moet minimaal 1 hoofdletter bevatten",
    (v: string) =>
        /[a-z]/.test(v) || "Wachtwoord moet minimaal 1 kleine letter bevatten",
    (v: string) =>
        /[0-9]/.test(v) || "Wachtwoord moet minimaal 1 cijfer bevatten",
];

const emailRules = [
    (v: string) => !!v || "E-mail is verplicht",
    (v: string) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail moet geldig zijn",
    (v: string) => !emailIsTaken.value || "E-mail is al in gebruik"
];
let _throttleEmailExist: any = null;
const emailIsTaken = ref(false);
watch(email, async () => {
    if (!email.value) {
        return;
    }
    if (!emailRules[1](email.value)) {
        return;
    }
    if (_throttleEmailExist) {
        return;
    }
    _throttleEmailExist = setTimeout(async () => {
        _throttleEmailExist = null;
        emailIsTaken.value = false;

        const result = await Api.isEmailRegistered(email.value);
        if (result && originalUser.value!.email != email.value) {
            console.log("taken");
            emailIsTaken.value = true;
        }
    }, 500);
});
const phoneNumberRules = [
    (v: string) => !!v || "Telefoonnummer is verplicht",
    (v: string) =>
        /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/.test(v) ||
        "Telefoon moet geldig zijn"
];
function showAvatar() {
    return `${Api.BASEURL}image/${originalUser.value?.avatarImageId}`;
}
function deleteAvatar() {
    originalUser.value!.avatarImageId = null;
}
const nameRules = [
    (v: string) => !!v || "Naam is verplicht",
    (v: string) => v.length >= 2 || "Naam moet minimaal 2 tekens lang zijn",
];

onMounted(async () => {
    standardTags.value = await Api.getTags();
    originalUser.value = await Api.getUserById(id);
    name.value = originalUser.value.name;
    info.value = originalUser.value.info;
    email.value = originalUser.value.email;
    phoneNumber.value = originalUser.value.phoneNumber;
    tags.value = originalUser.value.tags.split(",");
    isEmailPublic.value = originalUser.value.isEmailPublic;
    isPhoneNumberPublic.value = originalUser.value.isPhoneNumberPublic;
});

async function editUser() {
    const { valid } = await editUserForm.value.validate();
    if (!valid) {
        alert("Alle vereiste velden zijn nog niet ingevuld!");
        return;
    }

    let tagString = "";
    if (tags.value != null) {
        tags.value.forEach((tag: string) => {
            tagString += tag + ",";
        });
    }

    let uploadedAvatarId = null;
    if (avatar.value?.length) {
        const response = await Api.uploadImage(avatar.value[0]);
        uploadedAvatarId = response.id;
    } else {
        uploadedAvatarId = originalUser.value!.avatarImageId;
    }
    if(email.value !== originalUser.value?.email){
        const success = await API.changeEmail(email.value)
        if(!success){
            snackbar.createSimple("Email kon niet worden bijgewerkt", "error");
            return;
        }
    }
    if(newPassword.value){
        const success = await API.changePassword(newPassword.value)
        if(!success){
            snackbar.createSimple("Wachtwoord kon niet worden bijgewerkt", "error");
            return;
        }
    }

    const user = {
        id: id,
        name: name.value,
        info: info.value,
        tags: tagString,
        isEmailPublic: isEmailPublic.value,
        isPhoneNumberPublic: isPhoneNumberPublic.value,
        avatarImageId: uploadedAvatarId,
        email: email.value,
        phoneNumber: phoneNumber.value,
    };
    try {
        await Api.updateUser(user);
    } catch (e) {
        snackbar.createSimple("Er is iets mis gegaan", "error");
        return;
    }
    snackbar.createSimple("Uw profiel is succesvol bijgewerkt", "success");
    router.push(`/user/${id}`);
}
</script>
<style scoped>
.avatar {
    max-width: 12rem;
}
</style>
