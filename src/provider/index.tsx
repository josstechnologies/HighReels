import {PropsWithChildren} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {QueryClientProvider} from '@tanstack/react-query';
import {Toast} from '@/components/Toast';
import {useQueryClientState} from '@/hooks/queryClientState';
import {queryClient} from '@/utils/queryClient';

const Provider = ({children}: PropsWithChildren) => {
  useQueryClientState();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toast />
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Provider;
