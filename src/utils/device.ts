import storage from 'expo-sqlite/kv-store';
import * as Device from 'expo-device';

const DEVICE_ID_KEY = 'DEVICE_ID';

/** RFC4122-ish v4 id without relying on global crypto / native modules. */
function createDeviceId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Stable install-scoped id for `x-device-id` (persisted; not hardware IMEI). */
export function getDeviceId(): string {
  const existing = storage.getItemSync(DEVICE_ID_KEY);
  if (existing) return existing;

  const id = createDeviceId();
  storage.setItemSync(DEVICE_ID_KEY, id);
  return id;
}

/** Human-readable label for `x-device-name`. */
export function getDeviceName(): string {
  return Device.deviceName ?? Device.modelName ?? Device.osName ?? 'unknown';
}
