import { reactive } from 'vue';

export interface ValidatableField {
    validate: () => boolean;
}

export interface FieldRefs {
    [key: string]: ValidatableField | null;
}

export function useMdFormValidation() {
    // Diccionario reactivo de refs
    const fieldRefs = reactive<FieldRefs>({});

    // Registrar ref
    const setFieldRef = (name: string) => (el: any) => {
        // solo guardamos elementos válidos
        if (el && typeof el.validate === 'function') {
            fieldRefs[name] = el as ValidatableField;
        } else {
            fieldRefs[name] = null;
        }
    };

    // Validacion global
    const validateAll = (): boolean => {
        let allValid = true;

        Object.values(fieldRefs).forEach((field) => {
            if (field && typeof field.validate === 'function') {
                const ok = field.validate();
                if (!ok) {
                    allValid = false;
                }
            }
        });

        return allValid;
    };

    return {
        fieldRefs,
        setFieldRef,
        validateAll,
    };
}
