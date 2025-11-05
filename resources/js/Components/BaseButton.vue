<template>
  <!-- Con tooltip -->
  <v-tooltip v-if="tooltipFinal" location="top">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        :color="colorFinal"
        :variant="variant"
        :size="size"
        :icon="iconOnly"
        :loading="loading"
        :disabled="disabled"
        :type="type"
        class="ma-1"
        @click="$emit('click')"
      >
        <v-icon v-if="iconFinal && !iconOnly" start>{{ iconFinal }}</v-icon>
        <v-icon v-if="iconFinal && iconOnly">{{ iconFinal }}</v-icon>
        <span v-if="!iconOnly">
          <slot>{{ textFinal }}</slot>
        </span>
      </v-btn>
    </template>
    <span>{{ tooltipFinal }}</span>
  </v-tooltip>

  <!-- Sin tooltip -->
  <v-btn
    v-else
    :color="colorFinal"
    :variant="variant"
    :size="size"
    :icon="iconOnly"
    :loading="loading"
    :disabled="disabled"
    :type="type"
    class="ma-1"
    @click="$emit('click')"
  >
    <v-icon v-if="iconFinal && !iconOnly" start>{{ iconFinal }}</v-icon>
    <v-icon v-if="iconFinal && iconOnly">{{ iconFinal }}</v-icon>
    <span v-if="!iconOnly">
      <slot>{{ textFinal }}</slot>
    </span>
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Emisión del evento de click
const emit = defineEmits<{ (e: 'click'): void }>();

// ✳️ Nota: ahora action es un string genérico, no restringido al tipo fijo
const props = withDefaults(
  defineProps<{
    action?: string; // <-- más flexible
    text?: string;
    icon?: string | null;
    iconOnly?: boolean;
    color?: string;
    variant?: 'text' | 'flat' | 'outlined' | 'tonal' | 'elevated' | 'plain';
    size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large';
    loading?: boolean;
    disabled?: boolean;
    tooltip?: string;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    iconOnly: true,
    variant: 'text',
    size: 'default',
    loading: false,
    disabled: false,
    type: 'button',
  }
);

// === Diccionario de acciones predefinidas ===
const defaults: Record<
  string,
  { icon: string; color: string; text: string }
> = {
  save: { icon: 'mdi-content-save-outline', color: 'success', text: 'Guardar' },
  edit: { icon: 'mdi-pencil-outline', color: 'primary', text: 'Editar' },
  delete: { icon: 'mdi-delete-outline', color: 'error', text: 'Eliminar' },
  view: { icon: 'mdi-eye-outline', color: 'info', text: 'Ver' },
  add: { icon: 'mdi-plus-outline', color: 'success', text: 'Agregar' },
  cancel: { icon: 'mdi-cancel', color: 'grey', text: 'Cancelar' },
  download: { icon: 'mdi-download-outline', color: 'info', text: 'Descargar' },
  upload: { icon: 'mdi-upload-outline', color: 'primary', text: 'Subir' },
  close:  { icon: 'mdi-close', color: 'error', text: 'Cerrar' },
  config: { icon: 'mdi-cog-outline', color: 'success', text: 'Configurar' },
};

// === Valores base según la acción (si existe) ===
const defaultsForAction = computed(() => defaults[props.action ?? ''] ?? null);

// === Computed con fallback sólido ===
const iconFinal = computed(() => props.icon ?? defaultsForAction.value?.icon ?? 'mdi-dots-horizontal');
const colorFinal = computed(() => props.color ?? defaultsForAction.value?.color ?? 'primary');
const textFinal = computed(() => props.text ?? defaultsForAction.value?.text ?? props.action ?? '');
const tooltipFinal = computed(() => {
  // 1️⃣ Si se pasa tooltip manual → usarlo
  if (props.tooltip) return props.tooltip;
  // 2️⃣ Si hay texto → usar textoFinal
  if (textFinal.value) return textFinal.value;
  // 3️⃣ Si nada aplica → cadena vacía
  return '';
});
</script>
