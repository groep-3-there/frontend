/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

// Apexcharts
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);
app.use(VueApexCharts);

registerPlugins(app);

app.mount("#app");
