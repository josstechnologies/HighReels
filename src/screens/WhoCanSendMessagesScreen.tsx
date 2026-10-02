import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SVGS } from '@/assets';

type WhoCanSendMessagesOption = 'everyone' | 'my_contacts' | 'my_contacts_and_their_contacts';

export function WhoCanSendMessagesScreen() {
  const { back } = useRouter();
  const [selected, setSelected] = useState<WhoCanSendMessagesOption>('everyone');

  const options: { value: WhoCanSendMessagesOption; label: string }[] = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'my_contacts', label: 'My contacts' },
    { value: 'my_contacts_and_their_contacts', label: 'My contacts and their contacts' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">Who can send messages</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        className="flex-1 bg-secondary"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-3 overflow-hidden rounded-2xl bg-white">
          {options.map(option => {
            const isSelected = selected === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => setSelected(option.value)}
                className="flex-row items-center justify-between px-4 py-4 active:bg-grey-50">
                <Text className="flex-1 pr-3 font-semibold text-black" style={{ fontSize: 16 }}>
                  {option.label}
                </Text>
                {isSelected ? (
                  <SVGS.Tick width={20} height={20} color="#111111" />
                ) : (
                  <View style={{ width: 20, height: 20 }} />
                )}
              </Pressable>
            );
          })}
        </View>

        <Text className="mx-4 mt-3 font-medium text-[14px] leading-5 text-grey-300">
          Other users can send you one message request
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
