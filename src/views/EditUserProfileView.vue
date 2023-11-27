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
                                        <v-card-text class="text-black"
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
                                :rules="[
                                    (v) => !!v || 'Dit veld is verplicht!',
                                ]"
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
                                :rules="[
                                    (v) => !!v || 'Dit veld is verplicht!',
                                ]"
                                required
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="phoneNumber"
                                label="Telefoonnummer"
                                :rules="[
                                    (v) => !!v || 'Dit veld is verplicht!',
                                ]"
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
                            <v-switch
                                label="Publiek e-mail"
                                v-model="isEmailPublic"
                                color="primary"
                                hide-details
                            ></v-switch>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-switch
                                label="Publiek telefoon nummer"
                                v-model="isPhoneNumberPublic"
                                color="primary"
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
            </v-row>
        </v-form>
    </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Api from "@/Api";
import RichEditor from "@/components/RichEditor.vue";
import { Ref } from "vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import router from "@/router";
import { Tag } from "@/models/Tag";
import { User } from "@/models/User";
const originalUser: Ref<User | null> = ref(null);
const name = ref("");
const info = ref("");
const avatar = ref([]);
const isEmailPublic = ref();
const isPhoneNumberPublic = ref();
const email = ref("");
const phoneNumber = ref("");
const standardTags: Ref<Tag[]> = ref([]);
const tags = ref([] as any);
const editUserForm = ref(null) as any;
const idParam = useRoute().params.id;
let id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);

function showAvatar() {
    return `${Api.BASEURL}image/${originalUser.value?.avatarImageId}`;
}

function deleteAvatar() {
    originalUser.value!.avatarImageId = null;
}

onMounted(async () => {
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
    await Api.updateUser(user);
    router.push(`/user/${id}`);
}
</script>
<style scoped>
.avatar {
    max-width: 12rem;
}
</style>
