import '@/i18n';
import '../../global.css';
import '../../nativewind-interop';
import {useEffect, useState} from 'react';
import {Stack} from 'expo-router';
import {useSelector} from '@legendapp/state/react';
import Provider from '@/provider';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {accountsSyncState$, authActions, authSyncState$} from '@/store';
import {completeSession} from '@/utils';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const accountsReady = useSelector(() => accountsSyncState$.isLoaded.get());
  const legacyAuthReady = useSelector(() => authSyncState$.isLoaded.get());
  const authReady = accountsReady && legacyAuthReady;
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!authReady || hydrated) return;

    let cancelled = false;

    const run = async () => {
      const result = authActions.hydrateFromPersist();
      if (result.needsLegacyMigration) {
        try {
          await completeSession(result.tokens);
          authActions.clearLegacyAuth();
        } catch {
          // Keep mirrored legacy tokens so user can still use the app; retry migration next launch.
        }
      }
      if (!cancelled) setHydrated(true);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [authReady, hydrated]);

  useEffect(() => {
    if (fontsLoaded && authReady && hydrated) SplashScreen.hideAsync();
  }, [fontsLoaded, authReady, hydrated]);

  if (!fontsLoaded || !authReady || !hydrated) return null;

  return (
    <Provider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="effects" />
        <Stack.Screen name="effect-filters" />
        <Stack.Screen name="(account-settings)" />
        {/* Always registered so Add Account can open login/signup while another session is active */}
        <Stack.Screen name="(auth)" />
      </Stack>
    </Provider>
  );
}
