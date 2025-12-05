<!-- resources/js/Components/MaterialDesign/MdFileInput.vue -->
<template>
    <div class="w-full">
        <v-file-input
            ref="inputRef"
            v-model="innerValue"
            :label="label"
            :id="id"
            :name="name"
            :multiple="multiple"
            :accept="accept"
            :chips="chips"
            :counter="counter"
            :show-size="showSize"
            :readonly="readonly"
            :disabled="disabled"
            :density="density"
            :variant="variant"
            :truncate-length="truncateLength"
            :color="color"
            :error="!!displayedError"
            :error-messages="displayedError"
            :class="successClass"
            :prepend-inner-icon="icon"
            prepend-icon=""
            clearable
            hide-details="auto"
            @blur="handleBlur"
            @update:model-value="handleChange"
        />
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    computed,
    watch,
    onMounted,
    onBeforeUnmount,
    getCurrentInstance,
} from 'vue';
import { useMdForm } from '@/utils/MdFormContext';

type Density = 'default' | 'comfortable' | 'compact';
type Variant =
    | 'outlined'
    | 'filled'
    | 'plain'
    | 'solo'
    | 'solo-filled'
    | 'solo-inverted'
    | 'underlined';

interface MdFileInputProps {
    modelValue?: File | File[] | null;
    label?: string;
    id?: string;
    name?: string;
    required?: boolean;
    multiple?: boolean;
    accept?: string;
    chips?: boolean;
    counter?: boolean;
    showSize?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    externalError?: string;
    showSuccessState?: boolean;
    density?: Density;
    variant?: Variant;
    color?: string;
    truncateLength?: number;
    icon?: string;
    maxSizeMB?: number | null;
}

const props = withDefaults(defineProps<MdFileInputProps>(), {
    modelValue: null,
    label: '',
    id: undefined,
    name: undefined,
    required: false,
    multiple: false,
    accept: undefined,
    chips: false,
    counter: false,
    showSize: false,
    readonly: false,
    disabled: false,
    externalError: '',
    showSuccessState: true,
    density: 'comfortable',
    variant: 'outlined',
    color: undefined,
    truncateLength: 22,
    icon: 'mdi-paperclip',
    maxSizeMB: null,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: File | File[] | null): void;
}>();

const rawValue = ref<File | File[] | null>(props.modelValue);
const errorMessage = ref('');
const touched = ref(false);

// ref al v-file-input para focus()
const inputRef = ref<any | null>(null);

// MdFormContext
const mdForm = useMdForm();
const instance = getCurrentInstance();
const fieldKey =
    props.name ||
    `MdFileInput_${props.id || instance?.uid || Math.random().toString(36)}`;

watch(
    () => props.modelValue,
    (val) => (rawValue.value = val),
    { immediate: true }
);

const innerValue = computed({
    get: () => rawValue.value,
    set: (v: File | File[] | null) => {
        rawValue.value = v;
        emit('update:modelValue', v);
    },
});

const displayedError = computed(
    () => props.externalError || errorMessage.value
);

// ----------------------
// VALIDAR FORMATO / MIME
// ----------------------
const isFileAllowed = (file: File): boolean => {
    if (!props.accept) return true;

    const acceptList = props.accept.split(',').map((a) => a.trim().toLowerCase());
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    for (const rule of acceptList) {
        if (rule.startsWith('.')) {
            if (fileName.endsWith(rule)) return true;
        }
        if (rule.includes('/')) {
            const [type, subtype] = rule.split('/');
            const [fType, fSubtype] = fileType.split('/');

            if (type === fType && (subtype === '*' || subtype === fSubtype)) {
                return true;
            }
        }
    }

    return false;
};

// ----------------------
// VALIDATION
// ----------------------
const validate = (): boolean => {
    touched.value = true;

    const files = rawValue.value;
    const empty =
        files == null || (Array.isArray(files) && files.length === 0);

    if (props.required && empty) {
        errorMessage.value = 'Este campo es obligatorio';
        return false;
    }

    // validar formato segun "accept"
    if (!empty && props.accept) {
        const arr = Array.isArray(files) ? files : [files];
        for (const f of arr) {
            if (!isFileAllowed(f)) {
                errorMessage.value = `El archivo ${f.name} no esta permitido`;
                return false;
            }
        }
    }

    // validar tamano maximo
    if (!empty && props.maxSizeMB && props.maxSizeMB > 0) {
        const maxBytes = props.maxSizeMB * 1024 * 1024;
        const arr = Array.isArray(files) ? files : [files];

        for (const f of arr) {
            if (f.size > maxBytes) {
                errorMessage.value = `El archivo ${f.name} excede ${props.maxSizeMB} MB`;
                return false;
            }
        }
    }

    errorMessage.value = '';
    return true;
};

const handleBlur = () => validate();
const handleChange = () => {
    if (!touched.value) touched.value = true;
    validate();
};

const focus = () => {
    const comp = inputRef.value as any;
    if (!comp) return;

    if (typeof comp.focus === 'function') {
        comp.focus();
        return;
    }

    const el: HTMLInputElement | null =
        comp.$el?.querySelector?.('input[type="file"]') ?? null;

    el?.focus();
};

const successClass = computed(() => {
    if (!props.showSuccessState) return '';
    if (!touched.value) return '';
    if (displayedError.value) return '';
    return 'md-input-success';
});

// Registro automático en MdFormContext
onMounted(() => {
    if (mdForm) {
        mdForm.registerField(fieldKey, {
            validate,
            focus,
        });
    }
});

onBeforeUnmount(() => {
    if (mdForm) {
        mdForm.unregisterField(fieldKey);
    }
});

defineExpose({ validate, focus });
</script>

<style scoped>
.md-input-success :deep(.v-field__outline__start),
.md-input-success :deep(.v-field__outline__notch),
.md-input-success :deep(.v-field__outline__end) {
    border-color: #16a34a !important;
}

.md-input-success :deep(.v-label) {
    color: #16a34a !important;
}

.md-input-success :deep(.v-field__append-inner .v-icon),
.md-input-success :deep(.v-field__prepend-inner .v-icon) {
    color: #16a34a !important;
}
</style>
