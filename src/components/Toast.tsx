import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {subscribeToast} from '@/utils/toast';

export function Toast() {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => subscribeToast(setMessage), []);

  if (!message) return null;

  return (
    <View
      pointerEvents="none"
      style={{position: 'absolute', top: insets.top + 8, left: 16, right: 16, zIndex: 50}}>
      <View className="rounded-xl bg-grey-900 px-4 py-3">
        <Text className="text-center font-medium text-[14px] leading-5 text-white">{message}</Text>
      </View>
    </View>
  );
}
