<template>
  <BaseTextField
    v-model="internalValue"
    label="Teléfono"
    icon="mdi-phone"
    type="tel"
    placeholder="Ej: 55 1234 5678"
    :error="!!localError"
    :error-messages="localError"
    required
    maxlength="12"
    @input="onInput"
    @keypress="onKeyPress"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaseTextField from './BaseTextField.vue'

interface Props {
  modelValue: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits(['update:modelValue'])

// v-model interno
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

// Mensaje de error
const localError = ref<string | null>(null)

// Función para formatear número: 5512345678 → 55 1234 5678
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10) // solo números y máximo 10
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return digits.slice(0, 2) + ' ' + digits.slice(2)
  return digits.slice(0, 2) + ' ' + digits.slice(2, 6) + ' ' + digits.slice(6)
}

// Maneja input y valida en tiempo real
function onInput(event: Event) {
  const input = event.target as HTMLInputElement
  const numeric = input.value.replace(/\D/g, '') // solo números
  internalValue.value = formatPhone(numeric)
  validate(numeric)
}

// Evita escribir letras y símbolos
function onKeyPress(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault()
  }
}

// Validación: obligatorio y 10 dígitos
function validate(value: string) {
  if (!value || value.trim() === '') {
    localError.value = 'El teléfono es obligatorio'
    return false
  } else if (value.length !== 10) {
    localError.value = 'Debe tener exactamente 10 dígitos numéricos'
    return false
  } else {
    localError.value = null
    return true
  }
}

// Exponer función para validar desde el padre al enviar formulario
defineExpose({
  validatePhone: () => {
    const digitsOnly = internalValue.value.replace(/\D/g, '')
    return validate(digitsOnly)
  },
})

// Validar si cambia desde afuera
watch(internalValue, (val) => {
  const digitsOnly = val.replace(/\D/g, '')
  validate(digitsOnly)
})
</script>
