<template v-if="sessionStore.loggedInUser">
    <Banner
        title="Rollen bewerken"
        :subtitle="'Admin paneel'"
        :banner-src="company?.getBannerForCompany()"
        :logo-src="company?.getProfileOrDefaultImageUrl()"
    />
    <v-row>
        <v-col cols="12" md="4" class="mx-auto d-flex align-center">
            <v-select
                class="text-field mx-auto mt-4"
                v-model="selectedRoleId"
                @update:model-value="(e: any) => selectRole(e)"
                :items="allRoles"
                variant="underlined"
                prepend-icon="mdi-account-box-multiple"
                closable-chips
                color="blue-grey-lighten-2"
                item-title="name"
                item-value="id"
                label="Kies een rol"
            >
                <template v-slot:item="{ props, item }">
                    <v-list-item
                        v-bind="props"
                        :title="item?.raw?.name"
                        :is="item?.raw?.id"
                        :subtitle="`ID: ${item?.raw?.id}`"
                    ></v-list-item>
                </template>
            </v-select>
            <v-tooltip :text="'Nieuwe rol aanmaken'" :location="'top'">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="primary ml-2 p-0" @click="newRole"
                        ><v-icon>mdi-plus</v-icon></v-btn
                    >
                </template>
            </v-tooltip>
        </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>
    <v-row v-if="selectedRole">
        <v-col cols="12">
            <v-row>
                <v-col cols="12" md="4" class="mx-auto">
                    <h2 class="mx-auto text-center settings-title">
                        Algemene instellingen
                    </h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6" class="mx-auto">
                    <v-text-field
                        class="name-field"
                        v-model="selectedRole.name"
                        label="Naam"
                        variant="underlined"
                        prepend-inner-icon="mdi-rename-box"
                        :rules="[
                            (v: string) =>
                                v.length > 1 || 'Vul alstublieft een naam in',
                        ]"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4" class="mx-auto">
                    <h3>Medewerker-rol</h3>
                    <p>Is deze rol aan te wijzen aan medewerkers?</p>
                </v-col>
                <v-col cols="2">
                    <v-switch
                        v-model="selectedRole.isAssignable"
                        :color="'green'"
                        :loading="updating"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10" md="4" class="mx-auto">
                    <h3>Department admin</h3>
                    <p>
                        Is deze rol aan een department admin? Er moet hier
                        altijd 1 van zijn.
                    </p>
                </v-col>
                <v-col cols="2">
                    <v-switch
                        v-model="selectedRole.isAssignable"
                        :color="'green'"
                        :loading="updating"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4" class="mx-auto">
                    <h2 class="mx-auto text-center settings-title">
                        Permissies
                    </h2>
                </v-col>
            </v-row>
            <v-row v-for="permission in allPermissions" :key="permission.id">
                <v-col cols="10" md="4" class="mx-auto">
                    <h3>{{ permission.fancyName }}</h3>
                    <p>{{ permission.description }}</p>
                </v-col>
                <v-col cols="2">
                    <v-switch
                        v-model="selectedIds"
                        :color="'green'"
                        :value="permission.id"
                        :loading="updating"
                    />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <v-row v-if="selectedRole">
        <v-col cols="10" md="6" class="mx-auto d-flex justify-center">
            <v-btn color="primary" variant="elevated" @click="saveChanges"
                ><span v-if="!updating">Opslaan</span>
                <v-progress-circular
                    v-if="updating"
                    indeterminate
                ></v-progress-circular>
            </v-btn>
        </v-col>
    </v-row>
    <v-spacer class="my-8"></v-spacer>
</template>
<style scoped></style>
<script lang="ts" setup>
import API from "@/Api";
import RoleAssign from "@/components/RoleAssign.vue";
import { useSessionStore } from "@/store/sessionStore";
import { Ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { User } from "@/models/User";
import { Role } from "@/models/Role";
import { useSnackbarStore } from "@/store/Snackbar";
import Banner from "@/components/Banner.vue";
import Tag from "@/components/Tag.vue";
import { Permission } from "@/models/Permission";

const snackbar = useSnackbarStore();
const sessionStore = useSessionStore();
const company = computed(
    () => sessionStore.loggedInUser?.department?.parentCompany,
);
// options
const allRoles = ref<Role[]>([]);
const allPermissions = ref<Permission[]>([]);
// selected
const selectedRole: Ref<Role | null> = ref(null);
const selectedRoleId = ref<number | null>(null);
// toggle and computed result
const selectedIds = ref<number[]>([]);
const selectedPermissions = computed(() => {
    return allPermissions.value.filter((i) => selectedIds.value.includes(i.id));
});

const madeChanges = ref(false);
const updating = ref(false);

const idParam = useRoute().query.selectId;
let selectId = Number(Array.isArray(idParam) ? idParam[0] : idParam);

onMounted(async () => {
    await loadData();
});

async function loadData() {
    allRoles.value = await API.getAllRoles();
    allPermissions.value = await API.getAllPermissions();

    if (selectId) {
        selectedRoleId.value = selectId;
        selectRole(selectId);
    }
}

function selectRole(e: any) {
    selectedRole.value = allRoles.value.find((role) => role.id === e) || null;
    selectedIds.value = selectedRole.value?.permissions.map((i) => i.id) || [];
}
async function saveChanges() {
    if (!selectedRole.value) return;
    updating.value = true;
    selectedRole.value.permissions = selectedPermissions.value;
    let result = null;
    try {
        result = await API.updateRole(selectedRole.value);
    } catch (e) {
        snackbar.createSimple(`Er is iets misgegaan`, "error");
        return;
    } finally {
        updating.value = false;
    }
    if (!result) {
        snackbar.createSimple(`Er is iets misgegaan`, "error");
        return;
    }
    snackbar.createSimple(`${result.name} is opgeslagen`, "success");
}
async function newRole() {
    const role = new Role({
        id: -1, //overwritten in backend
        name: "Nieuwe Rol",
        permissions: [],
        isAssignable: true,
        isDepartmentAdmin: false,
        isMatchmaker: false,
    });
    let result = null;
    try {
        result = await API.createRole(role);
    } catch (e) {
        snackbar.createSimple(`Er is iets misgegaan`, "error");
        return;
    }
    if (result) {
        snackbar.createSimple(`Nieuwe rol is aangemaakt`, "success");
        await loadData();
        selectedRoleId.value = result.id;
        selectRole(result.id);
        sessionStore.forceUpdate();
    }
}
</script>

<style scoped>
.settings-title {
    margin-left: 0;
    width: fit-content;
}
h1 {
    margin: 4rem 0 0 0;
}

h1,
h2 {
    margin: 0 0 0 3rem;
}
</style>
