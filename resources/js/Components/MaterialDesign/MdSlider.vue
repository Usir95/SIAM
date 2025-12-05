<!-- resources/js/Components/MaterialDesign/MdSlider.vue -->
<template>
    <div class="w-full">
        <v-slider
            v-model="innerValue"
            :label="label"
            :min="min"
            :max="max"
            :step="step"
            :readonly="readonly"
            :disabled="disabled"
            :show-ticks="showTicks"
            :ticks="ticks"
            :thumb-label="thumbLabel"
            :error="!!displayedError"
            :error-messages="displayedError"
            :class="successClass"
            :density="density"
            :color="color"
            @blur="handleBlur"
            @update:model-value="handleChange"
        />
        <p v-if="helper" class="mt-1 text-xs text-gray-500">
            {{ helper }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface MdSliderProps {
    modelValue?: number | null;
    label?: string;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    helper?: string;
    externalError?: string;
    showSuccessState?: boolean;
    density?: 'comfortable' | 'compact' | 'default';
    color?: string;
    showTicks?: boolean | 'always';
    ticks?: number[] | Record<number, string>;
    thumbLabel?: boolean | 'always';
}

const props = withDefaults(defineProps<MdSliderProps>(), {
    modelValue: null,
    label: '',
    required: false,
    readonly: false,
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    helper: '',
    externalError: '',
    showSuccessState: true,
    density: 'compact',
    color: 'primary',
    showTicks: false,
    thumbLabel: false,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const rawValue = ref<number | null>(props.modelValue);
const innerValue = ref<number | null>(props.modelValue);
const isDirty = ref(false);

watch(
    () => props.modelValue,
    (value) => {
        rawValue.value = value;
        innerValue.value = value;
    }
);

const validationError = computed(() => {
    if (props.externalError) {
        return props.externalError;
    }

    const value = rawValue.value;

    if (props.required && (value === null || value === undefined)) {
        return 'Este campo es requerido.';
    }

    if (value !== null && value !== undefined) {
        if (value < props.min) {
            return `El valor minimo es ${props.min}.`;
        }
        if (value > props.max) {
            return `El valor maximo es ${props.max}.`;
        }
    }

    return '';
});

const displayedError = computed(() => (isDirty.value ? validationError.value : ''));

const successClass = computed(() => {
    return props.showSuccessState && isDirty.value && !displayedError.value
        ? 'md-input-success'
        : '';
});

const handleBlur = () => {
    isDirty.value = true;
};

const handleChange = (value: number | null) => {
    isDirty.value = true;
    rawValue.value = value;
    innerValue.value = value;
    emit('update:modelValue', value);
};
</script>
