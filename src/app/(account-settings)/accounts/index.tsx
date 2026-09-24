import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SVGS } from '@/assets';

export default function Accounts() {
  const { back } = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-between bg-secondary px-4 py-3">
        <Pressable onPress={back} className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">Account</Text>
        <View style={{ width: 32, height: 24 }} />
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <View className="items-center rounded-2xl bg-white px-8 py-10">
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: '#F3F3F3',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
            <SVGS.History width={28} height={28} color="#111111" />
          </View>
          <Text className="text-center font-bold text-lg text-black">Coming soon</Text>
          <Text className="mt-2 text-center text-sm text-grey-500">
            This section is under development. Check back soon.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
