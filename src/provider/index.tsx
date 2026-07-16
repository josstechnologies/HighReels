import {PropsWithChildren} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Provider = ({children}: PropsWithChildren) => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>{children}</GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default Provider;
