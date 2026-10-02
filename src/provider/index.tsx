import {PropsWithChildren} from 'react';
import {Toast} from '@/components/Toast';
import storage from 'expo-sqlite/kv-store';
import {StyleSheet, View} from 'react-native';
import {queryClient} from '@/utils/queryClient';
import {QueryClientProvider} from '@tanstack/react-query';
import {useQueryClientState} from '@/hooks/queryClientState';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PortalHost, PortalProvider} from 'react-native-teleport';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';

const Provider = ({children}: PropsWithChildren) => {
  useQueryClientState();

  return (
    <PortalProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView className="flex-1">
          <PersistQueryClientProvider client={queryClient} persistOptions={{persister: createAsyncStoragePersister({storage})}}>
            <BottomSheetModalProvider>
              <QueryClientProvider client={queryClient}>
                <KeyboardProvider>
                  {children}
                  <View style={[StyleSheet.absoluteFill, {zIndex: 9999, elevation: 9999}]} pointerEvents="box-none">
                    <PortalHost name="video-overlay" style={StyleSheet.absoluteFill} />
                  </View>
                </KeyboardProvider>
                {/* <StatusBar translucent style="auto" backgroundColor="transparent" /> */}
                <Toast />
              </QueryClientProvider>
            </BottomSheetModalProvider>
          </PersistQueryClientProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PortalProvider>
  );
};

export default Provider;
