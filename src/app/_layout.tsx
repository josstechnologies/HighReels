import '@/i18n';
import '../../global.css';
import '../../nativewind-interop';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Stack} from 'expo-router';
import {useSelector} from '@legendapp/state/react';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import Provider from '@/provider';
import {accountsSyncState$, authActions, authSyncState$, chatThemeSyncState$} from '@/store';
import {completeSession} from '@/utils';
import {PortalHost} from '@rn-primitives/portal';

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync('#000000');

const DARK_CARD = {
  headerShown: false,
  contentStyle: {backgroundColor: '#000000'},
  animation: 'slide_from_right' as const,
};

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
  const chatThemeReady = useSelector(() => chatThemeSyncState$.isLoaded.get());
  const authReady = accountsReady && legacyAuthReady && chatThemeReady;
  const [hydrated, setHydrated] = useState(false);
  const [hydrateTimeout, setHydrateTimeout] = useState(false);

  useEffect(() => {
    if (!authReady || hydrated) return;

    let cancelled = false;

    const run = async () => {
      const result = authActions.hydrateFromPersist();
      if (result.needsLegacyMigration) {
        try {
          // 8s timeout so stale network doesn't block app forever
          await Promise.race([
            completeSession(result.tokens),
            new Promise((_, rej) => setTimeout(() => rej(new Error('MIGRATION_TIMEOUT')), 8000)),
          ]);
          authActions.clearLegacyAuth();
        } catch (e) {
          console.warn('[HighReels] legacy migration failed/timeout', String(e));
        }
      }
      if (!cancelled) setHydrated(true);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [authReady, hydrated]);

  // Safety timeout: if sqlite isLoaded never fires (corrupt DB), don't block forever
  useEffect(() => {
    if (authReady && hydrated) return;
    const t = setTimeout(() => {
      console.warn('[HighReels] hydrate timeout - forcing render', {fontsLoaded, authReady, hydrated});
      setHydrateTimeout(true);
    }, 6000);
    return () => clearTimeout(t);
  }, [fontsLoaded, authReady, hydrated]);

  useEffect(() => {
    if ((fontsLoaded && authReady && hydrated) || (fontsLoaded && hydrateTimeout)) SplashScreen.hideAsync();
  }, [fontsLoaded, authReady, hydrated, hydrateTimeout]);

  if ((!fontsLoaded || !authReady || !hydrated) && !hydrateTimeout) {
    return <View style={{flex: 1, backgroundColor: '#000000'}} />;
  }

  return (
    <Provider>
      <Stack screenOptions={DARK_CARD}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(ailab)" />
        <Stack.Screen name="(account-settings)" options={{ animation: 'slide_from_left' }} />
        <Stack.Screen name="(auth)" />
      </Stack>
      <PortalHost />
    </Provider>
  );
}
