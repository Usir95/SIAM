// resources/js/utils/FormValidation.ts
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
        if (el && typeof el.validate === 'function') {
            fieldRefs[name] = el as ValidatableField;
        } else {
            fieldRefs[name] = null;
        }
    };

    // Validación global con logs
    const validateAll = (): boolean => {
        let allValid = true;

        Object.entries(fieldRefs).forEach(([name, field]) => {
            if (field && typeof field.validate === 'function') {
                const ok = field.validate();
                console.log(`Validando "${name}" →`, ok ? 'OK' : 'ERROR');
                if (!ok) allValid = false;
            } else {
                console.log(`"${name}" no tiene método validate()`);
            }
        });

        console.log('Resultado final del formulario →', allValid ? 'VÁLIDO' : 'INVÁLIDO');
        return allValid;
    };

    return {
        fieldRefs,
        setFieldRef,
        validateAll,
    };
}
