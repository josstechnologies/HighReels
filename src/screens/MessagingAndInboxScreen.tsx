import {Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {SettingsListCard, SettingsListRow} from '@/components/SettingsListRow';
import type {SvgProps} from 'react-native-svg';
import type {ReactElement} from 'react';

const ROWS: {label: string; Icon: (props: SvgProps) => ReactElement; href: Href}[] = [
  {label: 'Privacy', Icon: SVGS.Lock, href: '/privacy' as Href},
  {label: 'Chats', Icon: SVGS.Chat, href: '/chats' as Href},
];

export function MessagingAndInboxScreen() {
  const {back, navigate} = useRouter();

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
        contentContainerStyle={{paddingBottom: 24}}
        showsVerticalScrollIndicator={false}>
        <SettingsListCard className="mt-3">
          {ROWS.map(row => (
            <SettingsListRow key={row.label} label={row.label} Icon={row.Icon} onPress={() => navigate(row.href)} />
          ))}
        </SettingsListCard>
      </ScrollView>
    </SafeAreaView>
  );
}
