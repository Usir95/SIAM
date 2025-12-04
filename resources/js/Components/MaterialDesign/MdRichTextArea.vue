<template>
    <div class="w-full mb-4">
        <label
            v-if="label"
            class="block mb-1 text-sm font-medium text-gray-700"
        >
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <div
            class="md-rich-text quill-comentarios"
            :class="{
                'md-error': !!displayedError,
                'md-success': showSuccessState && !displayedError && hasValue
            }"
        >
            <QuillEditor
                ref="editorRef"
                v-model:content="innerValue"
                content-type="html"
                theme="snow"
                :toolbar="toolbar"
                :placeholder="placeholder"
                :read-only="readonly"
                class="w-full"
                @blur="handleBlur"
            />
        </div>

        <p v-if="helper" class="mt-1 text-xs text-gray-500">
            {{ helper }}
        </p>

        <p v-if="displayedError" class="mt-1 text-xs text-red-600">
            {{ displayedError }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref, computed, watch } from 'vue';

/**
 * Opciones posibles para el toolbar de Quill (core):
 *
 * ── Formato de texto ─────────────────────────────
 *  'bold'
 *  'italic'
 *  'underline'
 *  'strike'
 *
 * ── Encabezados / Títulos ─────────────────────────
 *  { header: 1 }
 *  { header: 2 }
 *  { header: [1, 2, 3, 4, 5, 6, false] }
 *
 * ── Listas ────────────────────────────────────────
 *  { list: 'ordered' }
 *  { list: 'bullet' }
 *
 * ── Alineación ────────────────────────────────────
 *  { align: [] }                // left, center, right, justify
 *
 * ── Citas y código ────────────────────────────────
 *  'blockquote'
 *  'code-block'
 *
 * ── Embeds (insertar elementos) ───────────────────
 *  'link'
 *  'image'
 *  'video'
 *
 * ── Tamaño de texto ───────────────────────────────
 *  { size: ['small', false, 'large', 'huge'] }
 *
 * ── Color y fondo ─────────────────────────────────
 *  { color: [] }
 *  { background: [] }
 *
 * ── Fuentes ───────────────────────────────────────
 *  { font: [] }
 *
 * ── Sangría ───────────────────────────────────────
 *  { indent: '-1' }
 *  { indent: '+1' }
 *
 * ── Subíndice / Superíndice ───────────────────────
 *  { script: 'sub' }
 *  { script: 'super' }
 *
 * ── Dirección de texto ────────────────────────────
 *  { direction: 'rtl' }
 *
 * ── Limpiar formato ───────────────────────────────
 *  'clean'
 *
 * ── Toolbar agrupado (ejemplos válidos) ───────────
 *  ['bold', 'italic']
 *  ['bold', 'italic', 'underline', 'strike']
 *  [{ header: 1 }, { header: 2 }]
 *  [{ list: 'ordered' }, { list: 'bullet' }]
 *  [{ color: [] }, { background: [] }]
 *  [{ align: [] }]
 *  [{ font: [] }]
 *
 * ── Combinación completa típica ───────────────────
 *  [
 *    [{ font: [] }],
 *    [{ size: [] }],
 *    ['bold', 'italic', 'underline', 'strike'],
 *    [{ color: [] }, { background: [] }],
 *    [{ script: 'sub' }, { script: 'super' }],
 *    [{ header: 1 }, { header: 2 }],
 *    [{ align: [] }],
 *    [{ list: 'ordered' }, { list: 'bullet' }],
 *    ['blockquote', 'code-block'],
 *    ['link', 'image', 'video'],
 *    [{ indent: '-1' }, { indent: '+1' }],
 *    ['clean']
 *  ]
 *
 * ── Otras formas válidas ──────────────────────────
 *  []              // sin toolbar
 *  '#my-toolbar'   // toolbar externo por selector
 *
 */

type MdToolbarPreset = 'minimal' | 'essential' | 'full' | '';

interface MdRichTextProps {
    modelValue?: string;
    label?: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    helper?: string;
    placeholder?: string;
    readonly?: boolean;
    externalError?: string;
    showSuccessState?: boolean;
    toolbar?: MdToolbarPreset | any;
}

const props = withDefaults(defineProps<MdRichTextProps>(), {
    modelValue: '',
    label: '',
    required: false,
    minLength: 0,
    maxLength: 0,
    helper: '',
    placeholder: '',
    readonly: false,
    externalError: '',
    showSuccessState: true,
    toolbar: 'essential' as MdToolbarPreset,
});

const emit = defineEmits<{(e: 'update:modelValue', value: string): void; (e: 'blur'): void;}>();

const editorRef = ref<InstanceType<typeof QuillEditor> | null>(null);
const innerValue = ref(props.modelValue ?? '');
const internalError = ref<string>('');
const touched = ref(false);

watch(() => props.modelValue, (val) => {
        if (val !== innerValue.value) {
            innerValue.value = val ?? '';
        }
    }
);

watch(innerValue, (val) => {
    emit('update:modelValue', val);
    if (touched.value) {
        validate();
    }
});

const plainText = computed(() => {
    const html = innerValue.value || '';
    return html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
});

const hasValue = computed(() => plainText.value.length > 0);

const displayedError = computed(() => props.externalError || internalError.value);

const validate = () => {
    let error = '';
    const len = plainText.value.length;

    if (props.required && len === 0) {
        error = 'Este campo es obligatorio.';
    } else if (props.minLength && len > 0 && len < props.minLength) {
        error = `Mínimo ${props.minLength} caracteres.`;
    } else if (props.maxLength && len > props.maxLength) {
        error = `Máximo ${props.maxLength} caracteres.`;
    }

    internalError.value = error;
    return !error;
};

const handleBlur = () => {
    touched.value = true;
    validate();
    emit('blur');
};


const focus = () => {
    const q = (editorRef.value as any)?.getQuill?.();
    if (q && typeof q.focus === 'function') {
        q.focus();
    }
};

defineExpose({
    validate,
    focus
});
</script>

<style scoped>
.md-rich-text {
    width: 100%;
}

/* toolbar */
.quill-comentarios .ql-toolbar.ql-snow {
    border: 1px solid #d1d5db;
    border-bottom: none;
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
    padding: 4px 8px;
}

/* contenedor del editor */
.quill-comentarios .ql-container.ql-snow {
    border: 1px solid #d1d5db;
    border-top: none;
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
}

.quill-comentarios .ql-editor {
    min-height: 120px;
    overflow-wrap: break-word;
    word-break: break-word;
    padding: 8px 12px;
    font-size: 0.95rem;
}

.md-error .ql-toolbar.ql-snow,
.md-error .ql-container.ql-snow {
    border-color: #ef4444;
}

.md-success .ql-toolbar.ql-snow,
.md-success .ql-container.ql-snow {
    border-color: #16a34a;
}
</style>
