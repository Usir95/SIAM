<script setup>
import { ScaleLoader } from "vue3-spinner";
import Screen from "@/Components/LoadingScreen.vue";

const props = defineProps({
    overlay: Boolean,
});
</script>
<template>
    <v-overlay opacity="65%" persistent :model-value="overlay" class="justify-center align-center">
        <Screen :overlay="true" type="ScaleLoader" />
    </v-overlay>
</template>
