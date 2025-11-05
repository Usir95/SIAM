<template>
  <BaseTextField
    v-model="internalValue"
    :label="label"
    :error="!!localError"
    :error-messages="localError"
    :disabled="disabled"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :clearable="clearable"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseTextField from './BaseTextField.vue'

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  disabled?: boolean
  maxlength?: number
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Nombre',
  placeholder: '',
  disabled: false,
  maxlength: 50,
  clearable: true,
})

const emit = defineEmits(['update:modelValue'])

// ✅ ref interno para que no se borre al perder foco
const internalValue = ref(props.modelValue)

// Mensaje de error
const localError = ref<string | null>(null)

// Validación instantánea
function onInput(val: string) {
  internalValue.value = val
  emit('update:modelValue', val) // actualizar al padre
  validate(val)
}

// Solo valida, no borra valor
function validate(val: string) {
  const value = val.trim()

  if (!value) {
    localError.value = 'Este campo es obligatorio'
    return false
  }

  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(value)) {
    localError.value = 'Solo se permiten letras y espacios'
    return false
  }

  if (value.length < 2) {
    localError.value = 'Debe tener al menos 2 caracteres'
    return false
  }

  if (value.length > (props.maxlength ?? 50)) {
    localError.value = `Máximo ${props.maxlength ?? 50} caracteres`
    return false
  }

  localError.value = null
  return true
}

// Validar si el prop cambia desde afuera
watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val
    validate(val)
  }
)

// Exponer función de validación al padre
defineExpose({
  validateField: () => validate(internalValue.value)
})
</script>
