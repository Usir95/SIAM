// resources/js/utils/MdFormContext.ts
import { reactive, provide, inject } from 'vue';

export interface MdFormField {
    validate: () => boolean;
    focus?: () => void;
}

export interface MdFormContext {
    registerField: (key: string, field: MdFormField) => void;
    unregisterField: (key: string) => void;
    validateAll: () => boolean;
    getFields: () => Record<string, MdFormField>;
}

const MdFormContextKey = Symbol('MdFormContext');

export function useProvideMdForm() {
    const fields = reactive<Record<string, MdFormField>>({});

    const getFields = () => fields;

    const registerField = (key: string, field: MdFormField) => {
        fields[key] = field;
    };

    const unregisterField = (key: string) => {
        delete fields[key];
    };

    const validateAll = (): boolean => {
        let allValid = true;

        Object.entries(fields).forEach(([key, field]) => {
            const ok = field.validate();
            // console.log(`Validando "${key}" →`, ok ? 'OK' : 'ERROR');
            if (!ok) allValid = false;
        });

        // console.info('Formulario:', allValid ? 'CORRECO' : 'INCORRECTO');
        return allValid;
    };

    const context: MdFormContext = {
        registerField,
        unregisterField,
        validateAll,
        getFields,
    };

    provide(MdFormContextKey, context);

    return context;
}

export function useMdForm(): MdFormContext | null {
    return inject<MdFormContext | null>(MdFormContextKey, null);
}
