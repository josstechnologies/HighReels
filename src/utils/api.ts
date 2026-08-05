import {AxiosError, InternalAxiosRequestConfig, create, isAxiosError} from 'axios';
import {authActions, authState$} from '@/store';
import {queryClient} from '@/utils/queryClient';

type ApiEnvelope<T> = {success?: boolean; data?: T; message?: string; code?: string};

type AuthTokensPayload = {accessToken?: string; refreshToken?: string};
type OtpChallengePayload = {sessionId?: string};

type RetryableRequestConfig = InternalAxiosRequestConfig & {_retry?: boolean};

const baseURL = process.env.EXPO_PUBLIC_API_URL;
if (!baseURL) throw new Error('EXPO_PUBLIC_API_URL is not set');

export const API = create({baseURL});

const refreshAPI = create({baseURL});

export const clearAuthSession = () => {
  authActions.clearSession();
  queryClient.clear();
};

let refreshPromise: Promise<string> | null = null;

const readEnvelope = <T extends object>(body: unknown): T | undefined => {
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

/** E.164: +countryCode + national digits (trunk 0 stripped), no spaces. */
export const toE164 = (callingCode: string, nationalNumber: string) => {
  const code = callingCode.replace(/\D/g, '');
  const national = nationalNumber.replace(/\D/g, '').replace(/^0+/, '');
  return `+${code}${national}`;
};

export const sendLoginOtp = async (phone: string) => {
  const response = await API.post<ApiEnvelope<OtpChallengePayload>>('/api/v1/auth/login/otp-send', {phone});
  const sessionId = readEnvelope<OtpChallengePayload>(response.data)?.sessionId;
  if (!sessionId) throw new Error('UNEXPECTED_LOGIN_OTP_SEND');
  return sessionId;
};

export const verifyLoginOtp = async (sessionId: string, otp: string) => {
  const response = await API.post<ApiEnvelope<AuthTokensPayload>>('/api/v1/auth/login/otp-verify', {
    sessionId,
    otp,
  });
  const tokens = readEnvelope<AuthTokensPayload>(response.data);
  if (!tokens?.accessToken || !tokens.refreshToken) throw new Error('UNEXPECTED_LOGIN_OTP_VERIFY');
  return {accessToken: tokens.accessToken, refreshToken: tokens.refreshToken};
};

export const resendOtp = async (sessionId: string) => {
  await API.post('/api/v1/auth/otp/resend', {sessionId});
};

const refreshAccessToken = async () => {
  const refreshToken = authState$.refreshToken.get();

  if (!refreshToken) throw new Error('No refresh token available');

  const response = await refreshAPI.post<ApiEnvelope<AuthTokensPayload>>('/api/v1/auth/refresh', null, {
    headers: {'x-refresh-token': refreshToken},
  });
  const tokens = readEnvelope<AuthTokensPayload>(response.data);
  if (!tokens?.accessToken) throw new Error('UNEXPECTED_REFRESH');

  if (tokens.refreshToken) {
    authActions.setSession({accessToken: tokens.accessToken, refreshToken: tokens.refreshToken});
  } else {
    authActions.setAccessToken(tokens.accessToken);
  }

  return tokens.accessToken;
};

API.interceptors.request.use((config) => {
  const accessToken = authState$.accessToken.get();

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

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
      request.headers.Authorization = `Bearer ${accessToken}`;
      return API(request);
    } catch (refreshError) {
      clearAuthSession();
      return Promise.reject(refreshError);
    }
  }
);
