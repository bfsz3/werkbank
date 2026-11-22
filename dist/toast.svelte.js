let nextId = 1;
/** Liste der sichtbaren Meldungen; `<Toaster />` zeigt sie an. */
export const toasts = $state([]);
export function dismissToast(id) {
    const index = toasts.findIndex((t) => t.id === id);
    if (index !== -1)
        toasts.splice(index, 1);
}
/** Zeigt eine kurze Meldung. Gibt die ID zurück, um sie vorzeitig zu schließen. */
export function toast(message, { tone = 'info', duration = 4000 } = {}) {
    const id = nextId++;
    toasts.push({ id, message, tone });
    if (duration > 0 && typeof window !== 'undefined')
        setTimeout(() => dismissToast(id), duration);
    return id;
}
