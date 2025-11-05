<template>
  <v-text-field
    v-model="internalValue"
    :label="label"
    :rules="rules"
    :error="hasError"
    :error-messages="errorMessage"
    prepend-inner-icon="mdi-account"
    counter="50"
    clearable
    required
    :disabled="disabled"
    @input="onInput"
    @blur="validate"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { required, onlyLetters, sanitizeLetters  } from "@/constants/validationRules"

interface Props {
  modelValue: string
  label?: string
  disabled?: boolean
  required?: boolean
  showErrorsOnSubmit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: "Nombre",
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
  r.push(onlyLetters)
  return r
})

// Sincroniza con el valor del padre
watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val
    if (props.showErrorsOnSubmit) validate()
  }
)

// Envía cambios al padre
watch(internalValue, (val) => {
  emit("update:modelValue", val)
  if (!props.showErrorsOnSubmit) validate()
})

// Validación local
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

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  target.value = sanitizeLetters(target.value)
  internalValue.value = target.value
}

// Expone validación al formulario padre
defineExpose({ validate, hasError })
</script>
