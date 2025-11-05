<template>
  <v-container class="px-0 py-0">
    <v-row justify="space-around">
      <v-col cols="12">
        <v-text-field
            :model-value="modelValue"
            :label="labelMenu"
            v-bind="showIcon ? { 'prepend-icon': 'mdi-clock-time-four-outline' } : {}"
            readonly
            @click="showMenu = true"
            :rules="rules"
        >
            <v-menu
                v-model="showMenu"
                :close-on-content-click="false"
                activator="parent"
                min-width="0"
            >
                <v-time-picker
                    v-model="internalValue"
                    @update:model-value="updateValue"
                />
            </v-menu>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  labelMenu: {
    type: String,
    default: 'Seleccionar hora (menú)',
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)
const showMenu = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val
  }
)

function updateValue(val) {
  internalValue.value = val
  emit('update:modelValue', val)
}

</script>
