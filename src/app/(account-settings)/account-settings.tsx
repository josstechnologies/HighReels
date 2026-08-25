import {Pressable, Text, View, ScrollView} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
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

const ICON_SIZE = 22;
const ICON_SLOT = 22;
const CHEVRON_SIZE = 16;

function SettingsRow({label, Icon, danger = false, onPress}: RowDef) {
  const tint = danger ? '#EC2727' : '#111111';
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
        <Icon width={ICON_SIZE} height={ICON_SIZE} color={tint} />
      </View>
      <Text
        className={`flex-1 font-medium ${danger ? 'text-danger-700' : 'text-black'}`}
        style={{fontSize: 16, lineHeight: ICON_SLOT}}>
        {label}
      </Text>
      <View style={{width: ICON_SLOT, height: ICON_SLOT, alignItems: 'center', justifyContent: 'center'}}>
        <SVGS.ArrowRight width={CHEVRON_SIZE} height={CHEVRON_SIZE} color="#A7A7A7" />
      </View>
    </Pressable>
  );
}

function SectionSeparator({title}: {title: string}) {
  return <Text className="mb-2 mt-5 px-4 font-semibold text-[13px] text-black">{title}</Text>;
}

export default function AccountSettings() {
  const {back, replace, navigate} = useRouter();

  const handleSignOut = async () => {
    await signOut();
    replace('/');
  };

  const sections: SectionDef[] = [
    {
      title: 'Profile',
      rows: [
        {label: 'Password and security', Icon: SVGS.Key},
        {label: 'Balance', Icon: SVGS.Tools},
        {label: 'Subscriptions', Icon: SVGS.Bookmark},
        {label: 'QR code', Icon: SVGS.QrCode},
        {label: 'Personal details', Icon: SVGS.Layout},
      ],
    },
    {
      title: 'Account Settings',
      rows: [
        {label: 'Account', Icon: SVGS.Tools},
        {label: 'Messaging and inbox', Icon: SVGS.Messages},
        {label: 'Edit Storefront', Icon: SVGS.Tools},
        {label: 'Account privacy', Icon: SVGS.Lock},
        {label: 'AI Lab settings', Icon: SVGS.Ai},
        {label: 'AI Studio settings', Icon: SVGS.Ai},
        {label: 'Help center', Icon: SVGS.Info},
        {label: 'Terms and policies', Icon: SVGS.Layout, onPress: () => navigate('/policies-and-safety')},
      ],
    },
    {
      title: 'Activity',
      rows: [
        {label: 'Activity center', Icon: SVGS.History},
        {label: 'Switch account', Icon: SVGS.Replay},
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
        <Pressable className="mx-4 mt-3 min-h-[70px] flex-row items-center rounded-2xl bg-white px-4 py-5 active:bg-grey-50">
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
          <Text className="flex-1 font-medium text-black" style={{fontSize: 16, lineHeight: ICON_SLOT}}>
            Add profile account
          </Text>
          <View style={{width: ICON_SLOT, height: ICON_SLOT, alignItems: 'center', justifyContent: 'center'}}>
            <SVGS.ArrowRight width={CHEVRON_SIZE} height={CHEVRON_SIZE} color="#A7A7A7" />
          </View>
        </Pressable>

        {sections.map(section => (
          <View key={section.title}>
            <SectionSeparator title={section.title} />
            <View className="mx-4 rounded-2xl bg-white">
              {section.rows.map((row, i) => (
                <View key={row.label}>
                  {i > 0 && <View className="ml-[50px] h-[1px] bg-grey-50" />}
                  <SettingsRow {...row} />
                </View>
              ))}
            </View>
          </View>
        ))}

        <View className="mx-4 mt-5 rounded-2xl bg-white">
          <SettingsRow label="Log out" Icon={SVGS.Delete} danger onPress={() => void handleSignOut()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
