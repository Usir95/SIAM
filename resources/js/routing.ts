interface Routing {
    name: string | Array<string>;
    title: string;
    icon: string;
    value: string;
    group: string | null;
    groupItems?: Array<{
        name: string;
        title: string;
        icon: string;
        value: string;
    }>;
}
const routes: Routing[] = [
    /* Rutas para superadministrador */
    {
        name: "profile.show",
        title: "Mi perfil",
        icon: "mdi-account-circle-outline",
        value: "profile",
        group: null,
        // groupItems: null
    },
    {
        name: "dashboard",
        title: "Inicio",
        icon: "mdi-home-outline",
        value: "dashboard",
        group: null,
        // groupItems: null
    },
    /* 
    {
        name: ["dashboard"],
        title: "Pagos",
        icon: "mdi-cash-multiple",
        value: "pagosMenu",
        group: "Pagos",
        groupItems: [
            {
                name: "dashboard",
                title: "Cobros y conceptos",
                icon: "mdi-credit-card-outline",
                value: "cobros-conceptos",
            },
            {
                name: "dashboard",
                title: "Pagos registrados",
                icon: "mdi-cash-check",
                value: "cobros-conceptos",
            },
            {
                name: "dashboard",
                title: "Historial y reportes",
                icon: "mdi-history",
                value: "cobros-conceptos",
            },
            {
                name: "dashboard",
                title: "Métodos de cobro",
                icon: "mdi-cog",
                value: "cobros-conceptos",
            },
        ],
    },
     */
];
export default routes;
