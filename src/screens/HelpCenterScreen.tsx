import {Alert, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import type {SvgProps} from 'react-native-svg';
import type {ReactElement} from 'react';

const ICON_SIZE = 22;
const ICON_SLOT = 22;
const CHEVRON_SIZE = 16;

const ROWS: {label: string; Icon: (props: SvgProps) => ReactElement; href?: Href}[] = [
  {label: 'Sync Contact', Icon: SVGS.Account, href: '/sync-contacts' as Href},
  {label: 'Blocked Accounts', Icon: SVGS.Block, href: '/blocked-accounts' as Href},
  {label: 'Ads settings', Icon: SVGS.Tools, href: '/ads-settings' as Href},
];

export function HelpCenterScreen() {
  const {back, navigate} = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-between bg-secondary px-4 py-3">
        <Pressable onPress={back} className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">Help center</Text>
        <View style={{width: 32, height: 24}} />
      </View>

      <ScrollView className="bg-secondary" contentContainerStyle={{paddingBottom: 32}} showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-2 rounded-2xl bg-white">
          {ROWS.map((row, index) => (
            <View key={row.label}>
              {index > 0 ? <View className="ml-[50px] h-px bg-grey-50" /> : null}
              <Pressable
                onPress={row.href ? () => navigate(row.href as Href) : () => Alert.alert(row.label, 'Coming soon')}
                className="flex-row items-center px-4 py-3.5 active:bg-grey-50">
                <View
                  style={{
                    width: ICON_SLOT,
                    height: ICON_SLOT,
                    marginRight: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <row.Icon width={ICON_SIZE} height={ICON_SIZE} color="#111111" />
                </View>
                <Text className="flex-1 font-medium text-black" style={{fontSize: 16, lineHeight: ICON_SLOT}}>
                  {row.label}
                </Text>
                <View style={{width: ICON_SLOT, height: ICON_SLOT, alignItems: 'center', justifyContent: 'center'}}>
                  <SVGS.ArrowRight width={CHEVRON_SIZE} height={CHEVRON_SIZE} color="#A7A7A7" />
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
