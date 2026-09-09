export const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const API_ROUTES = {
  LOGIN: {
    PASSWORD: '/api/v1/auth/login/password',
    OTP_SEND: '/api/v1/auth/login/otp-send',
    OTP_VERIFY: '/api/v1/auth/login/otp-verify',
  },
  SIGNUP: {
    OTP_SEND: '/api/v1/auth/signup/otp-send',
    OTP_VERIFY: '/api/v1/auth/signup/otp-verify',
    COMPLETE: '/api/v1/auth/signup/complete',
  },
  OTP_RESEND: '/api/v1/auth/otp/resend',
  LOGOUT: '/api/v1/auth/logout',
  REFRESH: '/api/v1/auth/refresh',
  PASSWORD_RESET: {
    OTP_SEND: '/api/v1/auth/password-reset/otp-send',
    OTP_VERIFY: '/api/v1/auth/password-reset/otp-verify',
    COMPLETE: '/api/v1/auth/password-reset/reset-password',
  },
  PROFILE: {
    ME: '/api/v1/profile',
    PRIVACY: '/api/v1/profile/privacy',
    EMAIL: '/api/v1/profile/email',
    EMAIL_OTP_SEND: '/api/v1/profile/email/otp-send',
    EMAIL_OTP_VERIFY: '/api/v1/profile/email/otp-verify',
    PHONE: '/api/v1/profile/phone',
    PHONE_OTP_SEND: '/api/v1/profile/phone/otp-send',
    PHONE_OTP_VERIFY: '/api/v1/profile/phone/otp-verify',
    AVATAR: '/api/v1/profile/avatar',
    ACCOUNT_HISTORY: '/api/v1/profile/account-history',
  },
};

export type AuthOtpFlow = 'login' | 'signup' | 'reset' | 'email_change' | 'phone_change';

export const OTP_VERIFY_ROUTE: Record<AuthOtpFlow, string> = {
  login: API_ROUTES.LOGIN.OTP_VERIFY,
  signup: API_ROUTES.SIGNUP.OTP_VERIFY,
  reset: API_ROUTES.PASSWORD_RESET.OTP_VERIFY,
  email_change: API_ROUTES.PROFILE.EMAIL_OTP_VERIFY,
  phone_change: API_ROUTES.PROFILE.PHONE_OTP_VERIFY,
};
