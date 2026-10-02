import {useRouter} from 'expo-router';
import {useSelector} from '@legendapp/state/react';
import {authState$} from '@/store';

/** Run an action when signed in. Otherwise open login, matching the old side menu. */
export const useCheckLogin = () => {
  const router = useRouter();
  const hasSession = useSelector(() => !!(authState$.accessToken.get() && authState$.refreshToken.get()));

  const checkLogin = (action: () => void) => {
    if (hasSession) action();
    else router.navigate('/login');
  };

  return {checkLogin, isLoggedIn: hasSession};
};
