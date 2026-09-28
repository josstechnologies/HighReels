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
  {
    id: '16-february',
    title: '16 February',
    data: [
      {
        id: 'phone-verified-16',
        type: 'phone_verified',
        title: 'Phone Number Verified',
        body: 'Your registered phone number was verified successfully.',
        time: '8:42 AM',
      },
      {
        id: 'recovery-email-added-16',
        type: 'recovery_email_added',
        title: 'Recovery Email Added',
        body: 'A recovery email was added to help protect your account.',
        time: '2:16 PM',
      },
      {
        id: 'suspicious-login-16',
        type: 'suspicious_login',
        title: 'New Login Alert',
        body: 'We noticed a login from Chrome Browser in Melbourne, Australia.',
        time: '11:27 PM',
      },
    ],
  },
  {
    id: '17-february',
    title: '17 February',
    data: [
      {
        id: 'session-revoked-17',
        type: 'session_revoked',
        title: 'Signed Out Other Devices',
        body: 'All other active sessions were signed out for your protection.',
        time: '9:05 AM',
      },
    ],
  },
];
