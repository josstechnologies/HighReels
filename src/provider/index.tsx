import {PropsWithChildren} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClientProvider} from '@tanstack/react-query';
import {useQueryClientState} from '@/hooks/queryClientState';
import {queryClient} from '@/utils/queryClient';

const Provider = ({children}: PropsWithChildren) => {
  useQueryClientState();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Provider;
