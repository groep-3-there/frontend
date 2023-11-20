<template>
    <v-row justify="center">
        <v-dialog v-model="opened" class="dialog" >
            <v-card class="rounded-4 card-dialog">
                <v-card-title class="text-h5 mx-auto my-2">
                    Login
                </v-card-title>


                <v-form ref="form" class="my-6">
                    <v-alert v-if="error" type="error" class="mx-auto my-4 error-alert" dismissible>
                        {{ error }}
                    </v-alert>
                    <v-text-field v-model="name" variant="underlined" class="text-field mx-auto"
                        :rules="[(v: string) => v.includes('@') && v.includes('.') || 'Vul alstublieft een email adres in']"
                        label="Email" placeholder="naam@email.com" prepend-icon="mdi-email" required>
                    </v-text-field>
                    <v-text-field v-model="password" variant="underlined" class="text-field mx-auto"
                        :rules="[(v: string) => !!v || 'Vul alstublieft een wachtwoord in']" label="Wachtwoord" required
                        prepend-icon="mdi-lock" :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword">
                    </v-text-field>
                </v-form>
                <v-spacer class="my-2"></v-spacer>

                <v-btn :color="success ? 'green':  'primary'" variant="elevated" class="action-button login-button mx-auto" @click="login">
                    <template v-if="!loading">
                        Login
                    </template>
                    <template v-else>
                        <v-progress-circular
                            indeterminate
                        ></v-progress-circular>
                    </template>
                </v-btn>
                <p @click="register" class="register mx-auto mb-2">
                    Nog geen account? Registeren
                </p>
            </v-card>
            <v-card>
                
            </v-card>

        </v-dialog>
    </v-row>
</template>
<style>
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
.login-button{
    transition:background-color 0.2s;
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
.error-alert{
    width: 80%;
}
</style>

<script setup lang="ts">
import API from "@/Api";
import { onMounted, watch } from "vue";
import { ref } from "vue";
import UserRegisterPopup from "./UserRegisterPopup.vue";
import { useSessionStore } from "@/store/sessionStore";
const sessionStore = useSessionStore();
const emit = defineEmits(["onClose", "onRequestRegister"]);
const name = ref("");
const password = ref("");
const showPassword = ref(false)
const opened = ref(true);
const error = ref("");
const loading = ref(false);

const success = ref(false);


watch(opened, (newVal) => {
    console.log(opened.value)
    if (newVal == false) {
        close()
        console.log("closing")
        opened.value = true;
    }
});
function close() {
    emit("onClose");
}
function register() {
    emit("onRequestRegister");
}


async function login() {
    loading.value = true;
    let result = false;
    if(name.value == "" || password.value == ""){
        error.value = "Vul alstublieft uw email en wachtwoord in"
        loading.value = false;
        return;
    }
    try {
        result = await sessionStore.logIn(name.value, password.value);
    }
    catch {
        error.value = "Er ging iets mis"
    }
    loading.value = false;
    if (!result) {
        error.value = "Email of wachtwoord is niet correct"
        return;
    }
    success.value = true;
    setTimeout(() => {
        close();
        
    }, 750);
}
</script>
