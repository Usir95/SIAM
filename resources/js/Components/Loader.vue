<script setup lang="ts">
import { ScaleLoader } from "vue3-spinner";
defineProps<{
    overlay: boolean;
}>();
</script>
<template>
    <v-overlay
        opacity="80%"
        persistent
        :model-value="overlay"
        class="align-center justify-center"
    >
        <ScaleLoader
            :loading="overlay"
            color="#FFA500"
            height="80px"
            width="30px"
        />
    </v-overlay>
</template>
