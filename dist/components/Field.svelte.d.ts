/** Attribute, die das Feld an sein Eingabeelement weiterreicht. */
export type FieldControlProps = {
    id: string;
    'aria-describedby': string | undefined;
    invalid: boolean;
    required: boolean | undefined;
};
import type { Snippet } from 'svelte';
type Props = {
    label: string;
    /** Erklärung unter dem Feld. */
    hint?: string;
    /** Fehlermeldung; ersetzt den Hinweis und markiert das Feld. */
    error?: string | null;
    required?: boolean;
    id?: string;
    children: Snippet<[FieldControlProps]>;
};
declare const Field: import("svelte").Component<Props, {}, "">;
type Field = ReturnType<typeof Field>;
export default Field;
