import {useState} from 'react';
import {Alert, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {AccountSwitcherSheet} from '@/components/AccountSwitcherSheet';
import {SettingsListCard, SettingsListRow, SETTINGS_CHEVRON_SIZE, SETTINGS_ICON_SLOT} from '@/components/SettingsListRow';
import {CHEVRON_COLOR} from '@/theme/colors';
import {signOut} from '@/utils';
import type {SvgProps} from 'react-native-svg';
import type {ReactElement} from 'react';

type RowDef = {
  label: string;
  Icon: (props: SvgProps) => ReactElement;
  danger?: boolean;
  onPress?: () => void;
};

type SectionDef = {
  title: string;
  rows: RowDef[];
};

function SectionSeparator({title}: {title: string}) {
  return <Text className="mb-2 mt-5 px-4 font-semibold text-13 text-black">{title}</Text>;
}

export default function AccountSettingsScreen() {
  const {back, replace, navigate} = useRouter();
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const openSwitcher = () => setSwitcherOpen(true);

  const handleSignOut = async () => {
    const stillSignedIn = await signOut();
    if (!stillSignedIn) replace('/');
  };

  const sections: SectionDef[] = [
    {
      title: 'Profile',
      rows: [
        {label: 'Password and security', Icon: SVGS.Key},
        {label: 'Balance', Icon: SVGS.WalletAdd},
        {label: 'Subscriptions', Icon: SVGS.Subscriptions, onPress: () => navigate('/subscriptions' as Href)},
        {label: 'QR code', Icon: SVGS.QrCode},
        {label: 'Personal details', Icon: SVGS.ClipboardText, onPress: () => navigate('/personal-details' as Href)},
      ],
    },
    {
      title: 'Account Settings',
      rows: [
        {label: 'Account', Icon: SVGS.Account},
        {label: 'Messaging and inbox', Icon: SVGS.Messages, onPress: () => navigate('/messaging-and-inbox' as Href)},
        {label: 'Edit Storefront', Icon: SVGS.Tools},
        {label: 'Account privacy', Icon: SVGS.ShieldSecurity, onPress: () => navigate('/account-privacy')},
        {label: 'AI Lab settings', Icon: SVGS.Ai},
        {label: 'AI Studio settings', Icon: SVGS.Ai},
        {label: 'Help center', Icon: SVGS.Question, onPress: () => navigate('/help-center' as Href)},
        {label: 'Terms and policies', Icon: SVGS.Layout, onPress: () => navigate('/policies-and-safety')},
      ],
    },
    {
      title: 'Activity',
      rows: [
        {label: 'Activity center', Icon: SVGS.Activity, onPress: () => navigate('/activity-center' as Href)},
        {label: 'Switch account', Icon: SVGS.Replay, onPress: openSwitcher},
        {label: 'Share your Feedback', Icon: SVGS.Share},
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="font-extrabold text-xl text-black">Account</Text>
      </View>

      <ScrollView className="bg-secondary" contentContainerStyle={{paddingBottom: 32}} showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={openSwitcher}
          className="mx-4 mt-3 min-h-[70px] flex-row items-center rounded-2xl bg-white px-4 py-5 active:bg-grey-50">
          <View
            style={{
              width: 38,
              height: 38,
              marginRight: 12,
              borderRadius: 38 / 2,
              backgroundColor: '#F3F3F3',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SVGS.Plus width={16} height={16} color="#111111" />
          </View>
          <Text className="flex-1 font-medium text-sm text-black">Add profile account</Text>
          <View style={{width: SETTINGS_ICON_SLOT, height: SETTINGS_ICON_SLOT, alignItems: 'center', justifyContent: 'center'}}>
            <SVGS.ArrowRight width={SETTINGS_CHEVRON_SIZE} height={SETTINGS_CHEVRON_SIZE} color={CHEVRON_COLOR} strokeWidth={2.2} />
          </View>
        </Pressable>

        {sections.map(section => (
          <View key={section.title}>
            <SectionSeparator title={section.title} />
            <SettingsListCard>
              {section.rows.map(row => (
                <SettingsListRow
                  key={row.label}
                  label={row.label}
                  Icon={row.Icon}
                  danger={row.danger}
                  onPress={row.onPress ?? (() => Alert.alert(row.label, 'Coming soon'))}
                />
              ))}
            </SettingsListCard>
          </View>
        ))}

        <SettingsListCard className="mt-5">
          <SettingsListRow label="Log out" Icon={SVGS.Delete} danger onPress={() => void handleSignOut()} />
        </SettingsListCard>
      </ScrollView>

      <AccountSwitcherSheet visible={switcherOpen} onClose={() => setSwitcherOpen(false)} />
    </SafeAreaView>
  );
}
