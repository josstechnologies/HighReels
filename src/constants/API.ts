export const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const API_ROUTES = {
  LOGIN: {
    OTP_SEND: '/api/v1/auth/login/otp-send',
    OTP_VERIFY: '/api/v1/auth/login/otp-verify',
  },
  SIGNUP: {
    OTP_SEND: '/api/v1/auth/signup/otp-send',
    OTP_VERIFY: '/api/v1/auth/signup/otp-verify',
    COMPLETE: '/api/v1/auth/signup/complete',
  },
  OTP_RESEND: '/api/v1/auth/otp/resend',
  REFRESH: '/api/v1/auth/refresh',
};
