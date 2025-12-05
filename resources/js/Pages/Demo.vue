<template>
    <AppLayout>
        <template #header> Demo </template>

        <section class="flex justify-center py-4 mx-4">
            <form @submit.prevent="handleSubmit" class="flex flex-row flex-wrap w-full gap-4">

                <MdTextInput
                    v-model="form.nombre"
                    label="Nombre"
                    icon="mdi-account"
                    :required="true"
                    clearable
                />

                <MdTextInput
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

                <MdEmailInput
                    v-model="form.correo"
                    label="Correo electronico"
                    :required="true"
                    helper="helper de correo"
                />

                <MdPhoneInput
                    v-model="form.telefono"
                    label="Telefono"
                    :required="true"
                    helper="Incluye lada, ej: 2221234567"
                />

                <MdNumberInput
                    v-model="form.edad"
                    label="Edad"
                    :allowed="'number'"
                    :min="18"
                    :max="99"
                    :maxLength="2"
                    :required="true"
                />

                <MdNumberInput
                    v-model="form.monto"
                    label="Monto"
                    icon="mdi-currency-usd"
                    :allowed="'money'"
                    :allowNegative="true"
                    :required="true"
                />

                <MdNumberInput
                    v-model="form.saldo"
                    label="Saldo"
                    :allowNegative="true"
                    :required="true"
                />

                <MdDateInput
                    v-model="form.fecha_nacimiento"
                    label="Fecha de nacimiento"
                    :required="true"
                />

                <MdDateInput
                    v-model="form.fecha_cita"
                    label="Fecha de cita"
                    :range="true"
                    :required="true"
                />

                <MdDatePicker
                    v-model="form.fecha_rango"
                    label="Fecha de cita (rango)"
                    :range="true"
                    :required="true"
                />

                <MdDatePicker
                    v-model="form.fecha_simple"
                    label="Fecha simple"
                    :required="true"
                />

                <MdSelect
                    v-model="form.frutas_id"
                    label="Departamento"
                    :items="Frutas"
                    item-title="nombre"
                    item-value="id"
                    :required="true"
                />

                <MdSelectSearch
                    v-model="form.colores_id"
                    :items="Colores"
                    label="colores"
                    multiple
                    chips
                    item-title="nombre"
                    item-value="id"
                    :minSelected="2"
                    :maxSelected="3"
                    :required="true"
                />

                <MdCheckbox
                    v-model="form.acepta_terminos"
                    label="Acepto términos y condiciones"
                    color="orange-darken-3"
                    :required="true"
                />

                <MdSwitch
                    v-model="form.activo"
                    label="Activo"
                    color="indigo-darken-3"
                    :required="true"
                />

                <MdRadioGroup
                    v-model="form.genero"
                    label="Genero"
                    :items="[
                        { value: 'H', label: 'Hombre' },
                        { value: 'M', label: 'Mujer' }
                    ]"
                    :required="true"
                    color="orange-darken-3"
                />

                <MdTextarea
                    v-model="form.texto"
                    label="Descripcion"
                    :required="true"
                    :minLength="10"
                    :maxLength="30"
                    :uppercase="true"
                    counter
                />

                <MdFileInput
                    v-model="form.documentos"
                    label="Documentos"
                    multiple
                    chips
                    counter
                    counterString="archivos seleccionados"
                    accept=".pdf,image/*"
                    :required="true"
                    :maxSizeMB="2"
                />

                <MdRichText
                    v-model="form.comentarios"
                    label="Comentarios"
                    :required="true"
                    :minLength="10"
                    :maxLength="300"
                    toolbar="minimal"
                    helper="Entre 10 y 300 caracteres"
                    placeholder="Escribe tus comentarios..."
                />

                <MdPasswordInput
                    v-model="form.password"
                    label="Contraseña"
                    :required="true"
                    :minLength="5"
                    security="strong"
                />

                <MdTimeInput
                    v-model="form.hora_simple"
                    label="Hora simple"
                    :required="true"
                />

                <MdTimeInput
                    v-model="form.hora_requerida"
                    label="Hora requerida"
                    :required="true"
                />

                <MdTimeInput
                    v-model="form.hora_con_segundos"
                    label="Con segundos"
                    :required="true"
                    :use-seconds="true"
                />

                <MdToggle
                    v-model="form.activo"
                    label="Activo?"
                    left-label="No"
                    right-label="Sí"
                    :left-value="false"
                    :right-value="true"
                    :required="true"
                />

                <MdSlider
                    v-model="form.volumen"
                    label="Volumen"
                    :min="0"
                    :max="100"
                    :step="1"
                    color="secondary"
                    :required="true"
                    :show-ticks="true"
                    thumb-label="always"
                />

                <MdUploadArea
                    v-model="form.archivos"
                    label="Documentos"
                    description="Sube contratos, identificaciones o comprobantes."
                    :required="true"
                    multiple
                    accept=".pdf,image/*"
                    :maxSizeMB="5"
                    :maxFiles="5"
                />

                <v-btn type="submit" color="primary" block>
                    Probar validaciones
                </v-btn>
            </form>
        </section>

    </AppLayout>
</template>

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";

import MdTextInput from '@/Components/MaterialDesign/MdTextInput.vue';
import MdNumberInput from '@/Components/MaterialDesign/MdNumberInput.vue';
import MdTextarea from '@/Components/MaterialDesign/MdTextareaInput.vue';
import MdDateInput from '@/Components/MaterialDesign/MdDateInput.vue';
import MdDatePicker from '@/Components/MaterialDesign/MdDatePicker.vue';
import MdSelect from '@/Components/MaterialDesign/MdSelect.vue';
import MdSelectSearch from '@/Components/MaterialDesign/MdSelectSearch.vue';
import MdSwitch from '@/Components/MaterialDesign/MdSwitch.vue';
import MdCheckbox from '@/Components/MaterialDesign/MdCheckbox.vue';
import MdRadioGroup from '@/Components/MaterialDesign/MdRadioGroup.vue';
import MdFileInput from '@/Components/MaterialDesign/MdFileInput.vue';
import MdPasswordInput from '@/Components/MaterialDesign/MdPasswordInput.vue';
import MdTimeInput from '@/Components/MaterialDesign/MdTimeInput.vue';
import MdToggle from '@/Components/MaterialDesign/MdToggle.vue';
import MdSlider from '@/Components/MaterialDesign/MdSlider.vue';
import MdUploadArea from '@/Components/MaterialDesign/MdUploadArea.vue';
import MdEmailInput from '@/Components/MaterialDesign/MdEmailInput.vue';
import MdPhoneInput from '@/Components/MaterialDesign/MdPhoneInput.vue';

import MdRichText from '@/Components/MaterialDesign/MdRichTextArea.vue';

// import { useMdFormValidation } from '@/utils/FormValidation';
import { useProvideMdForm } from '@/utils/MdFormContext';

import { reactive, ref, onMounted } from 'vue';

const form = reactive({
    nombre: '',
    correo: '',
    telefono: '',
    curp: '',
    edad: null,
    monto: null,
    saldo: null,
    texto: '',
    comentarios: '',
    fecha_nacimiento: '',
    fecha_cita: [],
    fecha_rango: [],
    fecha_simple: '',
    frutas_id: null,
    activo: false,
    acepta_terminos: false,
    genero: '',
    documentos: [],
    contenido_texto: '',
    hora_simple: '',
    hora_requerida: '',
    hora_con_segundos: '',
    activo: true,
    volumen: 0,
    archivos: [],
});

const Frutas = ref([
    { id: 1, nombre: 'Manzana' },
    { id: 2, nombre: 'Plátano' },
    { id: 3, nombre: 'Naranja' },
    { id: 4, nombre: 'Mango' },
    { id: 5, nombre: 'Fresa' },
    { id: 6, nombre: 'Uva' },
    { id: 7, nombre: 'Sandía' }
]);

const Colores = ref([
    { id: 1, nombre: 'Rojo' },
    { id: 2, nombre: 'Azul' },
    { id: 3, nombre: 'Verde' },
    { id: 4, nombre: 'Amarillo' },
    { id: 5, nombre: 'Negro' },
    { id: 6, nombre: 'Blanco' },
    { id: 7, nombre: 'Gris' },
])

const data = ref({});
const { validateAll } = useProvideMdForm();

const handleSubmit = () => {
  const ok = validateAll();

  if (!ok) {
    console.log('%cFORMULARIO INVALIDO', 'color: red; font-weight: bold;');
    return;
  }

  console.log('%cFORMULARIO VALIDO', 'color: green; font-weight: bold;');
  console.log('Payload listo para enviar:', JSON.parse(JSON.stringify(form)));
};


onMounted(() => {
});
</script>


