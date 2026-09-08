type Listener = (message: string | null) => void;

const HIDE_MS = 2500;
let message: string | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach(listener => listener(message));
}

export function showToast(text: string) {
  const next = text.trim();
  if (!next) return;
  message = next;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    message = null;
    timer = null;
    emit();
  }, HIDE_MS);
  emit();
}

export function subscribeToast(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
