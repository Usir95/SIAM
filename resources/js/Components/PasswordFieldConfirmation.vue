<template>
  <div>
    <!-- Campo de contraseña -->
    <v-text-field
      v-model="internalValue"
      :label="label"
      :type="showPassword ? 'text' : 'password'"
      :rules="localRules"
      :error="!!errorMessage"
      :error-messages="errorMessage"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="togglePassword"
      variant="outlined"
      clearable
      density="comfortable"
      autocomplete="new-password"
      @input="updateStrength"
    />

    <!-- Barra de fuerza -->
    <v-progress-linear
      v-if="internalValue"
      :model-value="passwordStrength.percent"
      :color="passwordStrength.color"
      height="6"
      class="mt-3 mb-1 rounded"
    />

    <!-- Texto descriptivo -->
    <div v-if="internalValue" class="text-sm text-gray-600 mt-3">
      {{ passwordStrength.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue"
import type { ValidationRule } from "vuetify"

// Props
interface Props {
  modelValue: string
  label?: string
  errorMessage?: string | null
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: "Contraseña",
  required: true,
  errorMessage: null,
})

const emit = defineEmits(["update:modelValue"])

// Estado
const internalValue = ref(props.modelValue)
const showPassword = ref(false)
const passwordStrength = ref({
  percent: 0,
  color: "grey",
  label: "",
})

// 🔄 Sincronización con el padre
watch(
  () => props.modelValue,
  (val) => (internalValue.value = val)
)
watch(internalValue, (val) => emit("update:modelValue", val))

// Mostrar/ocultar contraseña
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// ✅ Reglas de validación (frontend)
const localRules = computed<ValidationRule[]>(() => {
  const rules: ValidationRule[] = []

  if (props.required) rules.push((v) => !!v || "La contraseña es obligatoria")
  rules.push((v) => v.length >= 8 || "Debe tener al menos 8 caracteres")
  rules.push((v) => /[A-Z]/.test(v) || "Debe contener una mayúscula")
  rules.push((v) => /[a-z]/.test(v) || "Debe contener una minúscula")
  rules.push((v) => /\d/.test(v) || "Debe incluir un número")

  return rules
})

// Calcular fuerza de la contraseña
const updateStrength = () => {
  const password = internalValue.value
  let score = 0

  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1 // símbolos

  // Convertir score a porcentaje
  const percent = (score / 5) * 100

  // Determinar color y etiqueta
  let color = "grey"
  let label = "Muy débil"

  if (percent >= 20) {
    color = "error"
    label = "Débil"
  }
  if (percent >= 40) {
    color = "warning"
    label = "Regular"
  }
  if (percent >= 60) {
    color = "info"
    label = "Buena"
  }
  if (percent >= 80) {
    color = "success"
    label = "Fuerte"
  }

  passwordStrength.value = { percent, color, label }
}
</script>
