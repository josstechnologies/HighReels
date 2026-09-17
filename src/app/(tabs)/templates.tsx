import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Templates() {
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 items-center justify-center" edges={['top']}>
        <Text className="font-semibold text-[16px] text-black">Templates Screen</Text>
      </SafeAreaView>
    </View>
  );
}
