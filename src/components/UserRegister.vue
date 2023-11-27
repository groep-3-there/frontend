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
                    <v-alert type="error" v-if="emailIsTaken">
                        Dit email adres is al in gebruik
                    </v-alert>
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
                    <div v-if="joinDepartment" class="d-flex header">
                        <img
                            class="invite-logo"
                            :src="
                                joinDepartment?.parentCompany?.getProfileOrDefaultImageUrl()
                            "
                            alt="logo"
                        />
                        <h2 class="text-center invite-title ml-2">
                            Uitnodiging van
                            {{ joinDepartment?.parentCompany?.name }}
                        </h2>
                    </div>
                    <v-spacer class="mt-8"></v-spacer>
                    <v-text-field
                        :prepend-inner-icon="codeIcon"
                        label="Bedrijfscode (optioneel)"
                        :color="joinDepartment ? 'green' : 'gray'"
                        v-model="companyCode"
                        type="text"
                        class="mt-2"
                        variant="outlined"
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
                                <p v-else class="text-red">
                                    Vul een geldig email adres in!
                                </p>
                                <p v-if="emailIsTaken" class="text-red mt-0">
                                    Dit email adres is al in gebruik!
                                </p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <p>Volledige naam</p>
                                <p v-if="name">{{ name }}</p>
                                <p v-else class="text-red">Vul uw naam in!</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <p>Bedrijf</p>
                                <p v-if="joinDepartment">
                                    {{ joinDepartment.parentCompany.name }} |
                                    {{ joinDepartment.name }}
                                </p>
                                <p v-if="joinDepartment">
                                    {{ joinDepartment.parentCompany.name }} |
                                    {{ joinDepartment.name }}
                                </p>
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
                                    :disabled="disableRegister"
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
                </v-card>
            </template>
        </v-stepper>
    </v-form>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref, watch } from "vue";
import API from "@/Api";
import { useSnackbarStore } from "@/store/Snackbar";
import { useSessionStore } from "@/store/sessionStore";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Department } from "@/models/Department";
const snackbarStore = useSnackbarStore();
const sessionStore = useSessionStore();
const emit = defineEmits(["onClose", "onRequestLogin"]);
const registerForm = ref(null) as any;
const codeParam = useRoute().query.invite;

const joinDepartment: Ref<Department | null> = ref(null);
const companyCode = ref("");
let _thresholdSearchDepartment: any = null;
const checkingInProgress = ref(false);

const codeIcon = computed(() => {
    if (checkingInProgress.value) {
        return "mdi-loading mdi-spin";
    }
    if (joinDepartment.value) {
        return "mdi-check";
    }
    return "mdi-close";
});

watch(companyCode, async (newVal) => {
    if (!newVal) return;
    if (_thresholdSearchDepartment) {
        return;
    }
    checkingInProgress.value = true;

    _thresholdSearchDepartment = setTimeout(async () => {
        joinDepartment.value = null;
        _thresholdSearchDepartment = null;
        try {
            const department = await API.getDepartmentByCode(newVal as string);
            joinDepartment.value = department;
        } catch (err) {
            console.log("Invalid code");
        } finally {
            checkingInProgress.value = false;
        }
    }, 1000);
});

const email = ref("");
const emailRules = [
    (v: string) => !!v || "E-mail is verplicht",
    (v: string) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail moet geldig zijn",
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

        const result = await API.isEmailRegistered(email.value);
        if (result) {
            console.log("taken");
            emailIsTaken.value = true;
        }
    }, 500);
});

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

onMounted(() => {
    let code = Array.isArray(codeParam)
        ? (codeParam[0] as string)
        : (codeParam as string);
    companyCode.value = code;
});

const disableRegister = computed(() => {
    return !email.value || !password.value || !name.value;
});

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

    await API.postCreateUser(userData)
        .then((res) => {
            emit("onClose");
            sessionStore.logIn(res.email, password.value);
            snackbarStore.createSimple(
                "Uw account is aangemaakt, u bent ingelogd",
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
.invite-title {
    display: flex;
    align-items: center;
    font-weight: 400;
}
.invite-logo {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 100%;
}
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
