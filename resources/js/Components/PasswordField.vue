<template>
  <v-text-field
    v-model="internalValue"
    :label="label"
    :type="showPassword ? 'text' : 'password'"
    :rules="rules"
    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
    @click:append-inner="togglePassword"
    autocomplete="new-password"
    density="comfortable"
    variant="outlined"
    clearable
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ValidationRule } from 'vuetify'

// Props del componente
interface Props {
  modelValue: string
  label?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

// Estado interno
const internalValue = ref(props.modelValue)
const showPassword = ref(false)

// Sincroniza con el v-model externo
watch(() => props.modelValue, (val) => {
  internalValue.value = val
})
watch(internalValue, (val) => {
  emit('update:modelValue', val)
})

// Mostrar/ocultar contraseña
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Reglas de validación
const rules: ValidationRule[] = [
  (v) => !!v || 'La contraseña es obligatoria',
  (v) => v.length >= 8 || 'Debe tener al menos 8 caracteres',
  (v) => /[A-Z]/.test(v) || 'Debe contener al menos una mayúscula',
  (v) => /[a-z]/.test(v) || 'Debe contener al menos una minúscula',
  (v) => /\d/.test(v) || 'Debe incluir al menos un número',
]
</script>
