import {Alert, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {SettingsListCard, SettingsListRow} from '@/components/SettingsListRow';
import type {SvgProps} from 'react-native-svg';
import type {ReactElement} from 'react';

const ROWS: {label: string; Icon: (props: SvgProps) => ReactElement; href?: Href}[] = [
  {label: 'Sync Contact', Icon: SVGS.Account, href: '/sync-contacts' as Href},
  {label: 'Blocked Accounts', Icon: SVGS.Block, href: '/blocked-accounts' as Href},
  {label: 'Ads settings', Icon: SVGS.Tools, href: '/ads-settings' as Href},
  {label: 'Saved Content', Icon: SVGS.Bookmark, href: '/saved-content' as Href},
  {label: 'Song Favourites', Icon: SVGS.Audio, href: '/song-favourites' as Href},
  {label: 'Manage Devices', Icon: SVGS.Smartphone, href: '/manage-devices' as Href},
  {label: 'Download Your Data', Icon: SVGS.Download, href: '/download-your-data' as Href},
  {label: 'Video Removed', Icon: SVGS.Report, href: '/video-removed' as Href},
  {label: 'Sleep Hours', Icon: SVGS.Clock, href: '/sleep-hours' as Href},
  {label: 'Share Your Feedback', Icon: SVGS.Chat, href: '/share-your-feedback' as Href},
  {label: 'Professional Dashboard', Icon: SVGS.Campaign, href: '/professional-dashboard' as Href},
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
