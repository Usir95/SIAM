// resources/js/utils/FieldUtils.ts
export type AllowedType =
    | "number"
    | "decimal"
    | "negative"
    | "negativeInt"   // 👈 NUEVO: enteros negativos
    | "money"
    | "email"
    | "phone"
    | "url"
    | "text"
    | "alphanumeric"
    | "special"
    | "password"
    | "json"
    | "any";

export const toUpper = (v: unknown, up: boolean): string => {
    const s = String(v ?? "");
    return up ? s.toUpperCase() : s;
};

export const allowSysKeys = (e: KeyboardEvent): boolean => {
    const k = e.key;
    if (
        [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "Tab",
            "Home",
            "End",
            "Enter",
            "Escape",
        ].includes(k)
    ) {
        return true;
    }
    if (e.ctrlKey || e.metaKey) return true;
    return false;
};

export const isValidKey = (e: KeyboardEvent, type: AllowedType): boolean => {
    const k = e.key;
    if (allowSysKeys(e)) return true;

    switch (type) {
        case "number":
            return /^[0-9]$/.test(k);

        case "decimal":
        case "money": // money se comporta como decimal (sin formato especial)
            return (
                /^[0-9.]$/.test(k) &&
                !(
                    k === "." &&
                    (e.target as HTMLInputElement).value.includes(".")
                )
            );

        case "negative":
            return (
                /^[0-9.-]$/.test(k) &&
                !(
                    k === "." &&
                    (e.target as HTMLInputElement).value.includes(".")
                ) &&
                !(
                    k === "-" &&
                    (
                        (e.target as HTMLInputElement).selectionStart !== 0 ||
                        (e.target as HTMLInputElement).value.includes("-")
                    )
                )
            );

        case "negativeInt": // 👈 entero negativo: NO permite '.'
            return (
                /^[0-9-]$/.test(k) &&
                !(
                    k === "-" &&
                    (
                        (e.target as HTMLInputElement).selectionStart !== 0 ||
                        (e.target as HTMLInputElement).value.includes("-")
                    )
                )
            );

        case "email":
            return /^[a-zA-Z0-9@._-]$/.test(k);

        case "phone":
            return /^[0-9+\-\s]$/.test(k);

        case "url":
            return /^[a-zA-Z0-9:/?&%._\-#=]$/.test(k);

        case "text":
            return /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.]/.test(k);

        case "alphanumeric":
            return /[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ\s.]/.test(k);

        case "special":
            return /[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ\s.,:;#@!$%&()¿?'"_\-\+\/]/.test(k);

        case "password":
            return /[A-Za-z0-9!@#$%^&*()_+\-=.,:?]/.test(k);

        case "json":
        case "any":
        default:
            return true;
    }
};

export const sanitizeByType = (
    v: unknown,
    type: AllowedType,
    upper: boolean,
    maxLength?: number | null
): string => {
    let s = String(v ?? "");

    switch (type) {
        case "number":
            s = s.replace(/[^0-9]/g, "");
            break;

        case "decimal":
        case "money":
            s = s.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
            break;

        case "negative":
            s = s.replace(/[^0-9.-]/g, "");
            s = s.replace(/(.*-)(.*-)/, "$1$2");
            if ((s.match(/\./g) || []).length > 1) {
                s = s.replace(/\.(?=.*\.)/g, "");
            }
            if (s.includes("-")) {
                s = "-" + s.replace(/-/g, "");
            }
            break;

        case "negativeInt": // 👈 entero negativo, sin puntos
            s = s.replace(/[^0-9-]/g, "");
            // dejar solo un '-' al inicio
            if (s.includes("-")) {
                s = "-" + s.replace(/-/g, "");
            }
            break;

        case "email":
            s = s.replace(/[^a-zA-Z0-9@._-]/g, "");
            break;

        case "phone":
            s = s.replace(/[^0-9+\-\s]/g, "");
            break;

        case "url":
            s = s.replace(/[^a-zA-Z0-9:/?&%._\-#=]/g, "");
            break;

        case "text":
            s = s.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.]/g, "");
            break;

        case "alphanumeric":
            s = s.replace(/[^A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ\s.]/g, "");
            break;

        case "special":
            s = s.replace(
                /[^A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ\s.,:;#@!$%&()¿?'"_\-\+\/]/g,
                ""
            );
            break;

        case "password":
            s = s.replace(/[^A-Za-z0-9!@#$%^&*()_+\-=.,:?]/g, "");
            break;

        case "json":
        case "any":
        default:
            break;
    }

    if (typeof maxLength === "number" && maxLength > 0) {
        s = s.slice(0, maxLength);
    }

    return toUpper(s, upper);
};
