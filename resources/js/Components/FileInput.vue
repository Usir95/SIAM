<template>
    <div
        :for="inputId"
        class="flex flex-col items-center min-w-full p-6 mx-auto text-center border-2 border-dashed cursor-pointer rounded-xl"
        :class="fileName ? 'border-green-500' : 'border-empresa1'"
        @dragover.prevent="handleDragOver"
        @drop.prevent="handleDrop"
        @click="openFilePicker"
    >

        <div v-if="!fileName">
            <i :class="iconClass" class="text-4xl text-empresa"></i>
        </div>
        <div v-else>
            <i class="text-4xl text-green-500 fa-solid fa-file-arrow-down"></i>
        </div>

        <h2 class="mt-4 text-xl font-medium tracking-wide text-gray-700" v-if="!fileName">
            {{ title }}
        </h2>

        <h2 class="mt-4 text-xl font-medium tracking-wide text-green-500" v-if="fileName">
            <strong>{{ fileName }}</strong>
        </h2>

        <p class="mt-2 tracking-wide text-gray-500" v-if="!fileName">
            {{ description }}
        </p>

        <p class="mt-2 tracking-wide text-green-500" v-if="fileName">
            Archivo cargado
        </p>

        <input
            :id="inputId"
            ref="fileInput"
            type="file"
            class="hidden"
            @change="handleFileChange"
            :accept="allowedFileTypes"
        />

        <p v-if="errorMessage" class="mt-2 text-sm text-red-500">
            {{ errorMessage }}
        </p>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    inputId: {
        type: String,
        default: "dropzone-file",
    },
    iconClass: {
        type: String,
        default: "fa fa-upload",
    },
    title: {
        type: String,
        default: "Subir archivo",
    },
    description: {
        type: String,
        default:
            "Arrastra y suelta tu archivo aquí o haz clic para seleccionarlo.",
    },
    allowedFileTypes: {
        type: String,
        default: ".pdf,.jpg,.png",
    },
    maxFileSizeMB: {
        type: Number,
        default: 5,
    },
});

const emit = defineEmits(["file-selected"]);

const errorMessage = ref("");
const fileName = ref("");
const fileInput = ref(null);

const maxFileSizeBytes = computed(() => props.maxFileSizeMB * 1024 * 1024);

const openFilePicker = () => {
    fileInput.value.click();
};

const handleDragOver = (event) => {
    event.preventDefault();
};

const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        handleFile(file);
    }
};

const getFileExtension = (filename) => {
    return filename.split(".").pop().toLowerCase();
};

const handleFile = (file) => {
    if (!file) {
        errorMessage.value = "";
        fileName.value = "";
        return;
    }

    const fileExtension = getFileExtension(file.name);

    const allowedExtensions = props.allowedFileTypes
        .split(",")
        .map((ext) => ext.trim().toLowerCase());

    if (!allowedExtensions.includes(`.${fileExtension}`)) {
        errorMessage.value = `Tipo de archivo no permitido. Solo se permiten: ${props.allowedFileTypes}`;
        fileName.value = "";
        return;
    }

    if (file.size > maxFileSizeBytes.value) {
        errorMessage.value = `El archivo es demasiado grande. Tamaño máximo permitido: ${props.maxFileSizeMB} MB.`;
        fileName.value = "";
        return;
    }

    errorMessage.value = "";
    fileName.value = file.name;

    // Emitir el archivo seleccionado
    emit("file-selected", file);
};
</script>
