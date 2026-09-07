import {AxiosError, InternalAxiosRequestConfig, create, isAxiosError} from 'axios';
import {API_ROUTES, BASE_URL} from '@/constants';
import {authActions, authState$} from '@/store';
import {getDeviceId, getDeviceName} from '@/utils/device';
import {queryClient} from '@/utils/queryClient';

export type ApiEnvelope<T> = {success?: boolean; data?: T; message?: string; code?: string};

type AuthTokensPayload = {accessToken?: string; refreshToken?: string};

type RetryableRequestConfig = InternalAxiosRequestConfig & {_retry?: boolean};

const baseURL = BASE_URL;
if (!baseURL) throw new Error('EXPO_PUBLIC_API_URL is not set');

export const API = create({baseURL, timeout: 15000});

const refreshAPI = create({baseURL, timeout: 15000});

export const clearAuthSession = () => {
  authActions.clearSession();
  queryClient.clear();
};

export const signOut = async () => {
  const refreshToken = authState$.refreshToken.get();

  if (refreshToken) {
    try {
      await refreshAPI.post(API_ROUTES.LOGOUT, null, {headers: {'x-refresh-token': refreshToken}});
    } catch {
      // Local sign-out still proceeds if revoke fails (offline / expired token).
    }
  }

  clearAuthSession();
};

let refreshPromise: Promise<string> | null = null;

export const readEnvelope = <T extends object>(body: unknown): T | undefined => {
  if (!body || typeof body !== 'object') return undefined;
  const envelope = body as ApiEnvelope<T> & T;
  if (envelope.data && typeof envelope.data === 'object') return envelope.data;
  return envelope;
};

export const apiErrorMessage = (error: unknown, fallback: string) => {
  if (!isAxiosError(error)) return fallback;
  const message = (error.response?.data as ApiEnvelope<unknown> | undefined)?.message;
  return typeof message === 'string' && message.trim() ? message : fallback;
};

const refreshAccessToken = async () => {
  const refreshToken = authState$.refreshToken.get();

  if (!refreshToken) throw new Error('No refresh token available');

  const response = await refreshAPI.post<ApiEnvelope<AuthTokensPayload>>(API_ROUTES.REFRESH, null, {headers: {'x-refresh-token': refreshToken}});
  const tokens = readEnvelope<AuthTokensPayload>(response.data);
  if (!tokens?.accessToken) throw new Error('UNEXPECTED_REFRESH');

  if (tokens.refreshToken) {
    authActions.setSession({accessToken: tokens.accessToken, refreshToken: tokens.refreshToken});
  } else {
    authActions.setAccessToken(tokens.accessToken);
  }

  return tokens.accessToken;
};

const setHeader = (config: InternalAxiosRequestConfig, key: string, value: string) => {
  const headers = config.headers;
  if (headers && typeof headers.set === 'function') {
    headers.set(key, value);
  } else if (headers) {
    (headers as Record<string, string>)[key] = value;
  }
};

const attachDeviceHeaders = (config: InternalAxiosRequestConfig) => {
  setHeader(config, 'x-device-id', getDeviceId());
  setHeader(config, 'x-device-name', getDeviceName());
  return config;
};

API.interceptors.request.use((config) => {
  attachDeviceHeaders(config);
  const accessToken = authState$.accessToken.get();
  if (accessToken) setHeader(config, 'Authorization', `Bearer ${accessToken}`);
  return config;
});

refreshAPI.interceptors.request.use(attachDeviceHeaders);

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as RetryableRequestConfig | undefined;

    if (error.response?.status !== 401 || !request || request._retry) {
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });

      const accessToken = await refreshPromise;
      setHeader(request, 'Authorization', `Bearer ${accessToken}`);
      return API(request);
    } catch (refreshError) {
      clearAuthSession();
      return Promise.reject(refreshError);
    }
  }
);
