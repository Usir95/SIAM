<template>
  <v-select
    v-model="internalValue"
    :label="label"
    :items="items"
    :rules="rules"
    :error="hasError"
    :error-messages="errorMessage"
    :disabled="disabled"
    :clearable="clearable"
    required
    @blur="validate"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"

interface Props {
  modelValue: string | number | null
  label?: string
  items: { title: string; value: string | number }[]
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  showErrorsOnSubmit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: "Seleccionar opción",
  disabled: false,
  required: true,
  clearable: true,
  showErrorsOnSubmit: false,
})

const emit = defineEmits(["update:modelValue"])

const internalValue = ref(props.modelValue)
const errorMessage = ref("")
const hasError = ref(false)

// Reglas dinámicas
const rules = computed(() => {
  const arr: any[] = []
  if (props.required) {
    arr.push((v: any) => (!!v || v === 0) || "Este campo es obligatorio")
  }
  return arr
})

// Sincronizar valor externo → interno
watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val
    if (props.showErrorsOnSubmit) validate()
  }
)

// Sincronizar interno → externo
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

// Exponer validación al padre
defineExpose({ validate, hasError })
</script>
