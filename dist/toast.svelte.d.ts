export type ToastTone = 'info' | 'success' | 'danger';
export type Toast = {
    id: number;
    message: string;
    tone: ToastTone;
};
type ToastOptions = {
    tone?: ToastTone;
    /** Anzeigedauer in ms; 0 = bleibt, bis man es schließt. */
    duration?: number;
};
/** Liste der sichtbaren Meldungen; `<Toaster />` zeigt sie an. */
export declare const toasts: Toast[];
export declare function dismissToast(id: number): void;
/** Zeigt eine kurze Meldung. Gibt die ID zurück, um sie vorzeitig zu schließen. */
export declare function toast(message: string, { tone, duration }?: ToastOptions): number;
export {};
