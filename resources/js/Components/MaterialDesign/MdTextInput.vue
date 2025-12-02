<!-- MdTextInput.vue -->
<template>
    <div class="w-full max-w-xs">
        <v-text-field
            v-model="innerValue"
            :label="label"
            :type="type"
            :prepend-inner-icon="icon"
            :density="'compact'"
            :variant="variant"
            :error="!!errorMessage"
            :error-messages="errorMessage"
            :clearable="clearable"
            @blur="handleBlur"
        />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '', // ej: 'mdi-account'
    },
    type: {
        type: String,
        default: 'text',
    },
    required: {
        type: Boolean,
        default: false,
    },
    variant: {
        type: String,
        default: 'outlined',
    },
    clearable: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const errorMessage = ref('');

// v-model interno enlazado con el padre
const innerValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

/**
 * Valida el campo y devuelve true/false
 */
const validate = () => {
    if (props.required) {
        const value = String(props.modelValue ?? '').trim();
        const isEmpty = !value;

        errorMessage.value = isEmpty ? 'Este campo es obligatorio' : '';
        return !isEmpty;
    }

    errorMessage.value = '';
    return true;
};

const handleBlur = () => {
    validate();
};

// Exponemos validate() para poder usar ref en el padre
defineExpose({
    validate,
});
</script>
