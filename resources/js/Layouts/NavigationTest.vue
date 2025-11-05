<script setup>
import { useDisplay } from 'vuetify'

const props = defineProps({
    rail:   { type: Boolean, default: false },
    drawer: { type: Boolean, default: true },
})

const emit = defineEmits(['update:rail','update:drawer'])

const display = useDisplay()

const toggleRail = () => emit('update:rail', !props.rail)
const toggleDrawer = () => emit('update:drawer', !props.drawer)
</script>

<template>
    <v-navigation-drawer
        v-model="props.drawer"
        :rail="props.rail"
        :temporary="display.mobile.value"
        app
    >
        <!-- Header del drawer con botones -->
        <v-list-item class="px-3 py-2">
        <template #prepend>
            <!-- Toggle drawer solo en móvil -->
            <v-btn
            v-if="display.mobile.value"
            icon="mdi-menu"
            variant="text"
            @click="toggleDrawer"
            />
        </template>

        <v-list-item-title class="font-medium">
            ADMIN FRACCIONA…
        </v-list-item-title>

        <template #append>
            <!-- Toggle rail en desktop -->
            <v-btn
            v-if="!display.mobile.value"
            :icon="props.rail ? 'mdi-menu-open' : 'mdi-menu'"
            variant="text"
            @click="toggleRail"
            />
        </template>
        </v-list-item>

        <v-divider />

        <!-- ...resto del menú -->
        <v-list density="comfortable" nav>
        <!-- tus <v-list-item> -->
        </v-list>
    </v-navigation-drawer>
</template>
