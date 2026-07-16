import '@/global.css';
import '@/src/utils/i18n';
import '@/nativewind-interop';
import {Stack} from 'expo-router';
import Provider from '@/src/provider';

export default function Layout() {
  return (
    <Provider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
      </Stack>
    </Provider>
  );
}
