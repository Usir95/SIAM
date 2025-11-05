<template>
  <v-text-field
    v-model="internalValue"
    :label="label"
    :type="showPassword ? 'text' : 'password'"
    :rules="rules"
    :error="hasError"
    :error-messages="errorMessage"
    :disabled="disabled"
    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
    @click:append-inner="togglePassword"
    @blur="validate"
    clearable
    required
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { passwordRule, confirmPasswordRule } from "@/constants/validationRules"

interface Props {
  modelValue: string
  label?: string
  required?: boolean
  disabled?: boolean
  confirmWith?: string // campo opcional para confirmar otra contraseña
  showErrorsOnSubmit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: "Contraseña",
  required: true,
  disabled: false,
  showErrorsOnSubmit: false,
})

const emit = defineEmits(["update:modelValue"])

const internalValue = ref(props.modelValue)
const errorMessage = ref("")
const hasError = ref(false)
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Reglas dinámicas
const rules = computed(() => {
  const arr: any[] = []
  if (props.required) arr.push(passwordRule)
  if (props.confirmWith !== undefined)
    arr.push(confirmPasswordRule(props.confirmWith))
  return arr
})

// Sincronización bidireccional
watch(
  () => props.modelValue,
  (val) => (internalValue.value = val)
)

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

// Exponer función al padre
defineExpose({ validate, hasError })
</script>
