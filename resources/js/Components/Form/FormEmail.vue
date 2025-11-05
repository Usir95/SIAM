<template>
  <v-text-field
    v-model="internalValue"
    label="Correo electrónico"
    type="email"
    :rules="rules"
    :error="hasError"
    :error-messages="errorMessage"
    placeholder="ejemplo@correo.com"
    prepend-inner-icon="mdi-email"
    required
    :disabled="disabled"
    @blur="validate"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { required, email } from "@/constants/validationRules"

interface Props {
  modelValue: string
  disabled?: boolean
  required?: boolean
  showErrorsOnSubmit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: true,
  showErrorsOnSubmit: false,
})

const emit = defineEmits(["update:modelValue"])
const internalValue = ref(props.modelValue || "")
const errorMessage = ref("")
const hasError = ref(false)

// Reglas dinámicas
const rules = computed(() => {
  const r: any[] = []
  if (props.required) r.push(required)
  r.push(email)
  return r
})

// Observa cambios desde el padre
watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val
    if (props.showErrorsOnSubmit) validate()
  }
)

// Envía cambios al padre y valida
watch(internalValue, (val) => {
  emit("update:modelValue", val)
  if (!props.showErrorsOnSubmit) validate()
})

// Ejecuta validación
function validate() {
  for (const rule of rules.value) {
    const result = rule(internalValue.value)
    if (result !== true) {
      hasError.value = true
      errorMessage.value = result
      return false
    }
  }
  hasError.value = false
  errorMessage.value = ""
  return true
}

// Permite validar manualmente desde el formulario padre
defineExpose({ validate, hasError })
</script>
