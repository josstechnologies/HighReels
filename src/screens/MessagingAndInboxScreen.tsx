import { Pressable, Text, View, ScrollView } from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SVGS } from '@/assets';
import type { SvgProps } from 'react-native-svg';
import type { ReactElement } from 'react';

const ICON_SIZE = 22;
const ICON_SLOT = 22;
const CHEVRON_SIZE = 16;

type RowProps = {
  label: string;
  Icon: (props: SvgProps) => ReactElement;
  onPress?: () => void;
};

function MessagingRow({ label, Icon, onPress }: RowProps) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center px-4 py-3.5 active:bg-grey-50">
      <View
        style={{
          width: ICON_SLOT,
          height: ICON_SLOT,
          marginRight: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon width={ICON_SIZE} height={ICON_SIZE} color="#111111" />
      </View>
      <Text className="flex-1 font-medium text-black" style={{ fontSize: 16, lineHeight: ICON_SLOT }}>
        {label}
      </Text>
      <View style={{ width: ICON_SLOT, height: ICON_SLOT, alignItems: 'center', justifyContent: 'center' }}>
        <SVGS.ArrowRight width={CHEVRON_SIZE} height={CHEVRON_SIZE} color="#A7A7A7" />
      </View>
    </Pressable>
  );
}

export function MessagingAndInboxScreen() {
  const { back, navigate } = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="font-extrabold text-xl text-black">Messaging and inbox</Text>
      </View>

      <ScrollView
        className="flex-1 bg-secondary"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-3 overflow-hidden rounded-2xl bg-white">
          <MessagingRow label="Privacy" Icon={SVGS.Lock} onPress={() => navigate('/account-privacy' as Href)} />
          <View className="ml-[50px] h-[1px] bg-grey-50" />
          <MessagingRow label="Chats" Icon={SVGS.Chat} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
