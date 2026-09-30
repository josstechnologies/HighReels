import {Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {SettingsListCard, SettingsListRow} from '@/components/SettingsListRow';
import type {SvgProps} from 'react-native-svg';
import type {ReactElement} from 'react';

const ROWS: {label: string; Icon: (props: SvgProps) => ReactElement; href: Href}[] = [
  {label: 'Online and last seen', Icon: SVGS.Eye, href: '/online-and-last-seen' as Href},
  {label: 'Who can send messages', Icon: SVGS.Person, href: '/who-can-send-messages' as Href},
  {label: 'Read receipts', Icon: SVGS.CheckCircle, href: '/read-receipts' as Href},
  {label: 'Disappearing messages', Icon: SVGS.Timer, href: '/disappearing-messages' as Href},
];

export function PrivacyScreen() {
  const {back, navigate} = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="font-extrabold text-xl text-black">Privacy</Text>
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
