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
import {accountsSyncState$, authActions, authSyncState$} from '@/store';
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
        } catch {}
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

  if (!fontsLoaded || !authReady || !hydrated) {
    return <View style={{flex: 1, backgroundColor: '#000000'}} />;
  }

  return (
    <Provider>
      <Stack screenOptions={DARK_CARD}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(ailab)" />
        <Stack.Screen name="(account-settings)" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <PortalHost />
    </Provider>
  );
}
