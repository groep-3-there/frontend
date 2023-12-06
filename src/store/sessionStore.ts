// Utilities
import API from "@/Api";
import { User } from "@/models/User";
import { defineStore } from "pinia";
import { useSnackbarStore } from "./Snackbar";

export const useSessionStore = defineStore("session", {
    state: () => ({
        loggedInUser: null as User | null,
    }),
    actions: {
        async forceUpdate() {
            if (!API.hasAuthToken()) {
                return;
            }

            this.loggedInUser = await API.getCurrentUser();
            if(this.loggedInUser === null) {
                //probably expired token
                API.removeAuthToken();
                useSnackbarStore().createSimple(
                    "U bent uitgelogd, log opnieuw in",
                    "warning",
                );
            }
           
        },
        async logOut() {
            API.removeAuthToken();
            this.loggedInUser = null;
        },
        async logIn(username: string, password: string) {
            let success = false;
            API.removeAuthToken();
            try {
                success = await API.firebaseLoginAndUseToken(
                    username,
                    password,
                );
            } catch (e) {
                console.warn(e);
                return false;
            }
            if (success) {
                try {
                    await this.forceUpdate();
                } catch (e) {
                    console.warn(e);
                    return false;
                }
            }
            return success;
        },
    },
});
