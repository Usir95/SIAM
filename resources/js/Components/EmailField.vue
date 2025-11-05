<template>
  <BaseTextField
    v-model="internalValue"
    label="Correo"
    icon="mdi-email"
    type="email"
    placeholder="ejemplo@correo.com"
    :rules="[emailRule]"
    :disabled="disabled"
    required
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseTextField from './BaseTextField.vue'

interface Props {
  modelValue: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const emailRule = (v: string) => {
  if (!v || v.trim() === '') return 'El correo es obligatorio'
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(v) ? true : 'Correo no válido'
}
</script>
