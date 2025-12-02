<!-- resources/js/Components/LoadingScreen.vue -->
<script setup lang="ts">
import {
    BeatLoader,
    BounceLoader,
    ClipLoader,
    DotLoader,
    FadeLoader,
    GridLoader,
    MoonLoader,
    PacmanLoader,
    PulseLoader,
    RingLoader,
    RiseLoader,
    RotateLoader,
    ScaleLoader,
    SkewLoader,
    SquareLoader,
    SyncLoader,
} from "vue3-spinner";
import { computed } from "vue";

const props = withDefaults(
    defineProps<{
        overlay: boolean;
        type?: string;
        label?: string;
    }>(),
    {
        type: "ScaleLoader",
        label: "Cargando...",
    }
);

const loaders: Record<string, any> = {
    BeatLoader,
    BounceLoader,
    ClipLoader,
    DotLoader,
    FadeLoader,
    GridLoader,
    MoonLoader,
    PacmanLoader,
    PulseLoader,
    RingLoader,
    RiseLoader,
    RotateLoader,
    ScaleLoader,
    SkewLoader,
    SquareLoader,
    SyncLoader,
};

const SelectedLoader = computed(() => loaders[props.type] ?? ScaleLoader);
</script>

<template>
    <v-overlay
        :model-value="overlay"
        opacity="65%"
        persistent
        class="justify-center d-flex align-center animate-pulse"
    >
        <div class="flex flex-col items-center gap-4">
        <component
            :is="SelectedLoader"
            :loading="overlay"
            :color="`var(--color-app-primary)`"
            height="80px"
            width="25px"
        />
        <span class="text-lg tracking-widest text-white uppercase animate-bounce">
            {{ label }}
        </span>
        </div>
    </v-overlay>
</template>
