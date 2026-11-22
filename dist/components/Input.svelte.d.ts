import type { HTMLInputAttributes } from 'svelte/elements';
type Props = Omit<HTMLInputAttributes, 'size'> & {
    value?: string;
    /** Markiert das Feld als fehlerhaft (setzt auch aria-invalid). */
    invalid?: boolean;
};
declare const Input: import("svelte").Component<Props, {}, "value">;
type Input = ReturnType<typeof Input>;
export default Input;
