// resources/js/plugins/auth-globals.js
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

export default {
    install(app) {
        const page = usePage();

        app.config.globalProperties.$can = computed(
            () => page.props.auth?.permissions || []
        );

        app.config.globalProperties.$roles = computed(
            () => page.props.auth?.roles || []
        );
    },
};
