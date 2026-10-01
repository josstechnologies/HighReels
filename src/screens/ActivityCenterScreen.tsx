import {Alert, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {SettingsListCard, SettingsListRow} from '@/components/SettingsListRow';
import type {SvgProps} from 'react-native-svg';
import type {ReactElement} from 'react';

type Row = {
  label: string;
  Icon: (props: SvgProps) => ReactElement;
  href?: Href;
};

const ROWS: Row[] = [
  {label: 'Watch history', Icon: SVGS.Watch, href: '/watch-history' as Href},
  {label: 'Comment history', Icon: SVGS.Comment2, href: '/comment-history' as Href},
  {label: 'Search history', Icon: SVGS.Search, href: '/search-history' as Href},
  {label: 'Add link history', Icon: SVGS.Link, href: '/ads-link-history' as Href},
  {label: 'Mention history', Icon: SVGS.Mention, href: '/mention-history' as Href},
  {label: 'Account history', Icon: SVGS.Account2, href: '/accounts/account-history' as Href},
  {label: 'Screen time', Icon: SVGS.Clock},
  {label: 'Recently deleted', Icon: SVGS.Delete},
  {label: 'Manage post visibility', Icon: SVGS.Views},
  {label: 'Manage comments permission', Icon: SVGS.Messages2, href: '/comment-permission' as Href},
  {label: 'Manage post reuse permission', Icon: SVGS.Posts},
];

export function ActivityCenterScreen() {
  const {back, navigate} = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-between bg-secondary px-4 py-3">
        <Pressable onPress={back} className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">Account</Text>
        <View style={{width: 32, height: 24}} />
      </View>

      <ScrollView className="bg-secondary" contentContainerStyle={{paddingBottom: 32}} showsVerticalScrollIndicator={false}>
        <SettingsListCard className="mt-2">
          {ROWS.map(row => (
            <SettingsListRow
              key={row.label}
              label={row.label}
              Icon={row.Icon}
              onPress={row.href ? () => navigate(row.href as Href) : () => Alert.alert(row.label, 'Coming soon')}
            />
          ))}
        </SettingsListCard>
      </ScrollView>
    </SafeAreaView>
  );
}
