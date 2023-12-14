<template>
    <v-row justify="center">
        <v-dialog v-model="opened" class="dialog">
            <v-card class="rounded-4 card-dialog">
                <v-card-title class="text-h5 mx-auto my-2">
                    Wachtwoord vergeten
                </v-card-title>

                <v-form ref="form" class="my-6">
                    
                    <v-text-field
                        v-model="email"
                        variant="underlined"
                        class="text-field mx-auto"
                        :rules="[
                            (v: string) =>
                                (v.includes('@') && v.includes('.')) ||
                                'Vul alstublieft een email adres in',
                        ]"
                        label="Email"
                        placeholder="naam@email.com"
                        prepend-icon="mdi-email"
                        required
                    >
                    </v-text-field>
                    
                </v-form>
                <v-alert
                        v-if="done"
                        type="info"
                        class="mx-auto mb-2 error-alert"
                        dismissible
                    >
                        Email is verstuurd indien dit account bestaat
                    </v-alert>
                <v-btn
                    :color="'green'"
                    variant="elevated"
                    class="action-button login-button mx-auto mb-4"
                    :disabled="done"
                    @click="submit"
                >
                Versturen                    
                </v-btn>
            </v-card>
            <v-card> </v-card>
        </v-dialog>
    </v-row>
</template>
<style scoped>
.dialog {
    max-width: 600px;
    min-width: 200px;
}

.card-dialog {
    max-height: 500px;
}

.action-button {
    width: 200px;
}
.login-button {
    transition: background-color 0.2s;
}

.text-field {
    width: 80%;
}

.register {
    color: rgb(93, 93, 238);
}

.register:hover {
    cursor: pointer;
    text-decoration: underline;
}
.error-alert {
    width: 80%;
}
</style>

<script setup lang="ts">
import API from "@/Api";
import { onMounted, watch } from "vue";
import { ref } from "vue";
import UserRegisterPopup from "./UserRegisterPopup.vue";
import { useSessionStore } from "@/store/sessionStore";
import ForgotPassword from "./ForgotPassword.vue";
const sessionStore = useSessionStore();
const emit = defineEmits(["onClose"]);
const email = ref("");
const opened = ref(true);
const done = ref(false);


watch(opened, (newVal) => {
    if (newVal == false) {
        close();
        opened.value = true;
    }
});
function close() {
    emit("onClose");
}
async function submit(){
    const result = await API.recoverPassword(email.value)
    done.value = true;
    setTimeout(() => {
        emit("onClose")
    }, 1500);
}
</script>
