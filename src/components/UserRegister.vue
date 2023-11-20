<template>
    <v-form @submit.prevent ref="registerForm">
        <v-stepper
            alt-labels
            non-linear
            next-text="volgende"
            prev-text="terug"
            :items="['Account gegevens', 'Naam', 'Bedrijfscode', 'Overzicht']"
        >
            <template v-slot:item.1>
                <v-card flat class="mt-2">
                    <v-text-field
                        label="E-mailadres"
                        v-model="email"
                        type="text"
                        class="mt-2"
                        variant="outlined"
                        :rules="emailRules"
                    >
                    </v-text-field>
                    <v-text-field
                        label="Wachtwoord"
                        v-model="password"
                        class="mt-2"
                        variant="outlined"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        :rules="passwordRules"
                    >
                    </v-text-field>
                </v-card>
            </template>

            <template v-slot:item.2>
                <v-card flat class="mt-2">
                    <v-text-field
                        label="Naam"
                        v-model="name"
                        type="text"
                        class="mt-2"
                        variant="outlined"
                        :rules="nameRules"
                    >
                    </v-text-field>
                </v-card>
            </template>

            <template v-slot:item.3>
                <v-card flat class="mt-2">
                    <v-text-field
                        label="Bedrijfscode (optioneel)"
                        v-model="companyCode"
                        type="text"
                        class="mt-2"
                        variant="outlined"
                        :rules="[
                            (v) =>
                                (v.length < 1 && v.length <= 6) ||
                                'Bedrijfscode moet minimaal 6 tekens lang zijn',
                        ]"
                    >
                    </v-text-field>
                </v-card>
            </template>

            <template v-slot:item.4>
                <v-card flat class="mt-2">
                    <v-container class="data-container">
                        <v-row>
                            <v-col cols="12" md="6">
                                <p>E-mailadres</p>
                                <p v-if="email">{{ email }}</p>
                                <p v-else>Vul een geldig email adres in!</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <p>Volledige naam</p>
                                <p v-if="name">{{ name }}</p>
                                <p v-else>Vul uw naam in!</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <p>Bedrijf</p>
                                <p v-if="companyCode">{{ companyCode }}</p>
                                <p v-else>U heeft geen bedrijfscode ingevuld</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pt-3">
                                <v-checkbox :rules="acceptedRules">
                                    <template v-slot:label>
                                        <div>
                                            Ik ga akkoord met de
                                            <v-tooltip location="top">
                                                <template
                                                    v-slot:activator="{ props }"
                                                >
                                                    <a
                                                        target="_blank"
                                                        href="https://blog.basetis.com/sites/default/files/media/imatge_header/spooning.png"
                                                        v-bind="props"
                                                        @click.stop
                                                    >
                                                        algememe voorwaarden
                                                    </a>
                                                </template>
                                                open een niew tabblad
                                            </v-tooltip>
                                        </div>
                                    </template>
                                </v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="d-flex justify-center align-center">
                                <v-btn
                                    color="primary"
                                    type="submit"
                                    @click="onSubmit"
                                    size="large"
                                    variant="elevated"
                                    prepend-icon="mdi-account-plus"
                                    class="px-4"
                                >
                                    Registreer
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>

                    <!-- <v-card-actions class="justify-end">
                        <v-btn type="submit" color="primary">Registreer</v-btn>
                    </v-card-actions> -->
                </v-card>
            </template>
        </v-stepper>
    </v-form>
</template>

<script setup lang="ts">
import { SnackMessage } from "@/store/Snackbar";
import { templateElement } from "@babel/types";
import { ref } from "vue";

import { useSnackbarStore } from "@/store/Snackbar";
import API from "@/Api";
const snackbarStore = useSnackbarStore();

const registerForm = ref(null) as any;

const email = ref("");
const emailRules = [
    (v: string) => !!v || "E-mail is verplicht",
    (v: string) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail moet geldig zijn",
];

const password = ref("");
const showPassword = ref(false);
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

const name = ref("");
const nameRules = [
    (v: string) => !!v || "Naam is verplicht",
    (v: string) => v.length >= 2 || "Naam moet minimaal 2 tekens lang zijn",
];

const companyCode = ref("");

// checkbox must be checked
const acceptedRules = [
    (v: boolean) => !!v || "Je moet akkoord gaan met de algemene voorwaarden",
];

async function onSubmit() {
    const { valid } = await registerForm.value.validate();
    if (
        !valid ||
        email.value == null ||
        password.value == null ||
        name.value == null
    ) {
        snackbarStore.createSimple(
            "Er is iets fout gegaan, controlleer als alle velden zijn correct ingevuld",
            "error",
        );
        return;
    }

    const userData: {
        email: string;
        password: string;
        name: string;
        companyCode: string;
    } = {
        email: email.value,
        password: password.value,
        name: name.value,
        companyCode: companyCode.value,
    };

    API.postCreateUser(userData)
        .then((res) => {
            snackbarStore.createSimple(
                "Uw account is aangemaakt, u kunt nu inloggen",
                "success",
            );
        })
        .catch((err) => {
            snackbarStore.createSimple(
                "Er is iets fout gegaan, probeer het later opnieuw",
                "error",
            );
        });
}
</script>

<style scoped>
.data-container {
    padding: 2rem 0 2rem 0;
}

.data-container > * {
    padding: 0 0 0 1rem;
}

.data-container :last-child {
    padding: 0 0 0 0;
}

.data-container :first-child :first-child :first-child {
    margin: 0 0 0 0;
}

.data-container p:nth-of-type(odd) {
    margin: 2rem 0 0 0;
    font-weight: bold;
}

@media screen and (min-width: 700px) {
    .data-container > * {
        padding: 0 0 0 8vw;
    }
}
</style>
