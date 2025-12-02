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
                    :ref="setFieldRef('curp')"
                    v-model="form.curp"
                    label="CURP"
                    icon="mdi-card-account-details"
                    :required="true"
                    :minLength="18"
                    :maxLength="18"
                    allowed="alphanumeric"
                    :pattern="/^([A-ZÑ&]{4})(\d{2})(\d{2})(\d{2})([HM])/"
                    helper="18 caracteres, solo letras y números"
                />

                <MdNumberInput
                    :ref="setFieldRef('edad')"
                    v-model="form.edad"
                    label="Edad"
                    :allowed="'number'"
                    :min="18"
                    :max="99"
                    :maxLength="2"
                    :required="true"
                />

                <!-- Decimal / dinero -->
                <MdNumberInput
                    :ref="setFieldRef('monto')"
                    v-model="form.monto"
                    label="Monto"
                    icon="mdi-currency-usd"
                    :allowed="'money'"
                    :allowNegative="true"
                    :required="true"
                />

                <!-- Negativo permitido -->

                <MdNumberInput
                    :ref="setFieldRef('saldo')"
                    v-model="form.saldo"
                    label="Saldo"
                    :allowNegative="true"
                    :required="true"
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
import MdNumberInput from '@/Components/MaterialDesign/MdNumberInput.vue';

import { useMdFormValidation } from '@/utils/FormValidation';
import { reactive, ref } from 'vue';

const form = reactive({
    nombre: '',
    correo: '',
    curp: '',
    edad: null,
    monto: null,
    saldo: null,
});

const data = ref({});
const { setFieldRef, validateAll } = useMdFormValidation();

const handleSubmit = () => {
    const allValid = validateAll();

    if (!allValid) {
        console.log("Formulario inválido");
        return;
    }

    data.value = { ...form };
    console.log("Formulario válido:", data.value);
};
</script>
