<template>
  <v-text-field
    v-model="internalValue"
    :label="label"
    :rules="rules"
    :error="hasError"
    :error-messages="errorMessage"
    prepend-inner-icon="mdi-phone"
    counter="10"
    clearable
    required
    :disabled="disabled"
    @input="onInput"
    @keypress="onlyNumbers"
    @blur="validate"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { required, validatePhone, formatPhone } from "@/constants/validationRules"

interface Props {
  modelValue: string
  label?: string
  disabled?: boolean
  required?: boolean
  showErrorsOnSubmit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: "Teléfono",
  disabled: false,
  required: true,
  showErrorsOnSubmit: false,
})

const emit = defineEmits(["update:modelValue"])

const internalValue = ref(props.modelValue || "")
const errorMessage = ref("")
const hasError = ref(false)

// ✅ Reglas de validación
const rules = computed(() => {
  const r: any[] = []
  if (props.required) r.push(required)
  r.push(validatePhone)
  return r
})

// ✅ Bloquea letras y no permite más de 10 números
function onlyNumbers(event: KeyboardEvent) {
  const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"]

  // Si no es número ni tecla permitida → bloquea
  if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
    event.preventDefault()
    return
  }

  // Si ya hay 10 dígitos reales → bloquea más entrada
  const currentNumbers = internalValue.value.replace(/\D/g, "")
  if (currentNumbers.length >= 10 && /[0-9]/.test(event.key)) {
    event.preventDefault()
  }
}

// ✅ Formatea y limpia en tiempo real
function onInput(event: Event) {
  const target = event.target as HTMLInputElement

  // Solo toma los primeros 10 dígitos
  let cleaned = target.value.replace(/\D/g, "").slice(0, 10)

  // Formatea dinámicamente
  if (cleaned.length > 2 && cleaned.length <= 6) {
    cleaned = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
  } else if (cleaned.length > 6) {
    cleaned = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6, 10)}`
  }

  internalValue.value = cleaned
  emit("update:modelValue", cleaned)
}

// ✅ Validación local
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

// ✅ Sincronización con el padre
watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val
    if (props.showErrorsOnSubmit) validate()
  }
)

watch(internalValue, (val) => {
  emit("update:modelValue", val)
  if (!props.showErrorsOnSubmit) validate()
})

defineExpose({ validate, hasError })
</script>
