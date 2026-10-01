export type AccountHistoryEventType =
  | 'account_created'
  | 'email_verified'
  | 'phone_verified'
  | 'password_updated'
  | 'two_factor_enabled'
  | 'account_logged_in'
  | 'welcome_login'
  | 'recovery_email_added'
  | 'suspicious_login'
  | 'session_revoked';

export type AccountHistoryItem = {
  id: string;
  type: AccountHistoryEventType;
  title: string;
  body: string;
  time: string;
};

export type AccountHistorySection = {
  id: string;
  title: string;
  data: AccountHistoryItem[];
};

export const ACCOUNT_HISTORY_SECTIONS: AccountHistorySection[] = [
  {
    id: '13-february',
    title: '13 February',
    data: [
      {
        id: 'password-updated-13',
        type: 'password_updated',
        title: 'Password Updated',
        body: 'Password was updated from MacBook Pro in Dubai, UAE.',
        time: '6:57 PM',
      },
      {
        id: 'logged-in-13',
        type: 'account_logged_in',
        title: 'Account Logged In',
        body: 'You logged in to your account from Samsung Galaxy S21 5G in Sydney, Australia.',
        time: '10:18 AM',
      },
    ],
  },
  {
    id: '14-february',
    title: '14 February',
    data: [
      {
        id: 'two-factor-enabled-14',
        type: 'two_factor_enabled',
        title: 'Two-Factor Authentication Enabled',
        body: 'You enabled 2FA security using your registered phone number.',
        time: '6:57 PM',
      },
      {
        id: 'logged-in-14',
        type: 'account_logged_in',
        title: 'Account Logged In',
        body: 'You logged in to your account from Samsung Galaxy S21 5G in Sydney, Australia.',
        time: '10:18 AM',
      },
    ],
  },
  {
    id: '15-february',
    title: '15 February',
    data: [
      {
        id: 'account-created-15',
        type: 'account_created',
        title: 'Account Created',
        body: 'Your account was successfully registered using john@email.com',
        time: '6:57 PM',
      },
      {
        id: 'email-verified-15',
        type: 'email_verified',
        title: 'Email Verified',
        body: 'Your email address was verified successfully.',
        time: '6:57 PM',
      },
      {
        id: 'welcome-login-15',
        type: 'welcome_login',
        title: 'Welcome Login',
        body: 'First login detected from Chrome Browser in Sydney, Australia.',
        time: '10:18 AM',
      },
    ],
  },
];
