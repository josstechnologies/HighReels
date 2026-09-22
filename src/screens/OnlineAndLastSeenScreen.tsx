import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SVGS } from '@/assets';
import { Toggle } from '@/components/ui/Toggle';

type LastSeenOption = 'everyone' | 'contacts' | 'nobody';

export function OnlineAndLastSeenScreen() {
  const { back } = useRouter();
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [lastSeen, setLastSeen] = useState<LastSeenOption>('everyone');

  const options: { value: LastSeenOption; label: string }[] = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'contacts', label: 'My contacts' },
    { value: 'nobody', label: 'Nobody' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">Online and last seen</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        className="flex-1 bg-secondary"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}>
        {/* Online status toggle card */}
        <View className="mx-4 mt-3 flex-row items-center justify-between rounded-2xl bg-white px-4 py-4">
          <Text className="flex-1 font-medium text-black" style={{ fontSize: 16 }}>
            Online status
          </Text>
          <Toggle checked={onlineStatus} onCheckedChange={setOnlineStatus} accessibilityLabel="Online status" />
        </View>

        <Text className="mx-4 mt-2 font-medium text-[14px] leading-5 text-grey-300">
          Others can see when you are online
        </Text>

        <Text className="mx-4 mt-6 font-medium text-[13px] tracking-wide text-grey-300">WHO CAN SEE MY LAST SEEN</Text>

        <View className="mx-4 mt-3 overflow-hidden rounded-2xl bg-white">
          {options.map(option => {
            const selected = lastSeen === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => setLastSeen(option.value)}
                className="flex-row items-center justify-between px-4 py-4 active:bg-grey-50">
                <Text className="flex-1 font-semibold text-black" style={{ fontSize: 16 }}>
                  {option.label}
                </Text>
                {selected ? <SVGS.Tick width={20} height={20} color="#111111" /> : <View style={{ width: 20, height: 20 }} />}
              </Pressable>
            );
          })}
        </View>

        <Text className="mx-4 mt-6 font-medium text-[14px] leading-5 text-grey-300">
          If you don&apos;t share your last seen, you won&apos;t be able to see others
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
