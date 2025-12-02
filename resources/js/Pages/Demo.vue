<template>
    <AppLayout>
        <template #header> Demo </template>

        <section class="flex justify-center py-4 mx-4">
            <form @submit.prevent="handleSubmit" class="flex flex-row flex-wrap w-full gap-4">

                <MdTextInput
                    :ref="setFieldRef('nombre')"
                    v-model="form.nombre"
                    label="Nombre"
                    icon="mdi-account"
                    :required="true"
                    clearable
                />

                <MdTextInput
                    :ref="setFieldRef('correo')"
                    v-model="form.correo"
                    label="Correo electrónico"
                    icon="mdi-email"
                    :required="true"
                    clearable
                />

                <v-btn type="submit" color="primary" block>
                    Probar validaciones
                </v-btn>

            </form>
        </section>

        <pre>
{{ data }}
        </pre>
    </AppLayout>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import MdTextInput from '@/Components/MaterialDesign/MdTextInput.vue';
import { reactive, ref } from 'vue';

const form = reactive({
    nombre: '',
    correo: '',
});

// Diccionario de refs a los campos
const fieldRefs = reactive({});

// Para mostrar resultado en el <pre>
const data = ref({});

// Función para registrar cada ref
const setFieldRef = (name) => (el) => {
    if (el) {
        fieldRefs[name] = el;
    }
};

const handleSubmit = () => {
    let allValid = true;

    // Validar todos los campos registrados
    Object.values(fieldRefs).forEach((field) => {
        if (field && typeof field.validate === 'function') {
            const ok = field.validate();
            if (!ok) {
                allValid = false;
            }
        }
    });

    if (!allValid) {
        console.log("Formulario inválido");
        return;
    }

    data.value = { ...form };
    console.log("Formulario válido:", data.value);
};
</script>
