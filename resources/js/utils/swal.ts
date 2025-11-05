import Swal from "sweetalert2";

const customSwal = (options) => {
    return Swal.fire({
        confirmButtonColor: "#43A047",
        cancelButtonColor: "#BDBDBD",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        denyButtonColor: "#D32F2F",
        denyButtonText: "Denegar",
        ...options,
    });
};
const customToastSwal = (options) => {
    return Swal.fire({
        showCancelButton: false,
        showConfirmButton: false,
        showDenyButton: false,
        timer: 2500,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
        customClass: {
            container: "my-swal",
        },
        ...options,
    });
};
const customConfirmSwal = (options) => {
    return Swal.fire({
        text: "Esta acción es irreversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#43A047",
        cancelButtonColor: "#BDBDBD",
        // confirmButtonText: "Si, eliminar",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "No, cancelar",
        denyButtonText: "Denegar",
        reverseButtons: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
            container: "my-swal",
        },
        ...options,
    });
};

export { customConfirmSwal, customSwal, customToastSwal };
