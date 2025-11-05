import { Inertia } from "@inertiajs/inertia";
import "../css/app.css";
import "./bootstrap";

import { createInertiaApp, usePage } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createApp, h, computed } from "vue";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

import DateFnsAdapter from "@date-io/date-fns";
import "@mdi/font/css/materialdesignicons.css";
import enUS from "date-fns/locale/en-US";
import es from "date-fns/locale/es";
import "sweetalert2/dist/sweetalert2.min.css";
import VueSweetalert2 from "vue-sweetalert2";
import vue3Spinner from "vue3-spinner";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mdi } from "vuetify/iconsets/mdi";
import "vuetify/styles";
import { isLoading } from "./loading";

const options = {
    confirmButtonColor: "#41b882",
    cancelButtonColor: "#ff7674",
};

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "mdi",
        sets: { mdi },
    },
    date: {
        adapter: DateFnsAdapter,
        locale: { es: es, en: enUS },
    },
    theme: {
        defaultTheme: "myTheme",
        themes: {
            myTheme: {
                dark: false,
                colors: {
                    customPrimary: "#0C1A2C",
                    customSecondary: "#D9D9D9",
                    customThird: "#F1EFE8",
                    customFourth: "#E03A3E",
                    customFifth: "#B0B0B0",
                },
            },
            myDarkTheme: {
                dark: true,
                colors: {
                    primary: "#F1EFE8",
                    background: "#B0B0B0",
                    drawer: "#E03A3E",
                    customPrimary: "#F0F0F0",
                },
            },
        },
    },
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        const vueApp = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(vuetify)
            .use(vue3Spinner)
            .use(VueSweetalert2, options);

        // ---- Globales para permisos y roles ----
        const page = usePage();
        vueApp.config.globalProperties.$can = computed(
            () => page.props.auth?.permissions || []
        );
        vueApp.config.globalProperties.$roles = computed(
            () => page.props.auth?.roles || []
        );
        // ----------------------------------------

        Inertia.on("start", () => (isLoading.value = true));
        Inertia.on("finish", () => (isLoading.value = false));

        return vueApp.mount(el);
    },
});
