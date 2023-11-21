/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
        themes: {
            light: {
                colors: {
                    primary: "#20609C",
                    secondary: "#5CBBF6",
                    mmgreen: "#85B77B",
                    mmyellow: "F0B45B",
                    mmtaggreen: "#50856F",
                    coolgray: "8D99AE",
                },
            },
        },
    },
});
