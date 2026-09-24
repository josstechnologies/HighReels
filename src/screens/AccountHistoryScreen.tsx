import {Alert, Pressable, SectionList, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {ACCOUNT_HISTORY_SECTIONS, type AccountHistoryEventType} from '@/mock-data/account-history';
import type {ReactElement} from 'react';
import type {SvgProps} from 'react-native-svg';

const ICONS: Record<AccountHistoryEventType, (props: SvgProps) => ReactElement> = {
  account_created: SVGS.CheckCircle,
  email_verified: SVGS.Email,
  phone_verified: SVGS.Phone,
  password_updated: SVGS.Key,
  two_factor_enabled: SVGS.ShieldSecurity,
  account_logged_in: SVGS.Replay,
  welcome_login: SVGS.Replay,
  recovery_email_added: SVGS.Email,
  suspicious_login: SVGS.Notifications,
  session_revoked: SVGS.Lock,
};

export function AccountHistoryScreen() {
  const {back, navigate} = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable
          onPress={back}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">Account History</Text>
        <View className="w-8" />
      </View>

      <SectionList
        className="flex-1"
        sections={ACCOUNT_HISTORY_SECTIONS}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32}}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <View className="mb-2 flex-row items-center rounded-2xl bg-white px-4 py-4">
            <View className="mr-3 h-7 w-7 items-center justify-center rounded-full border border-black">
              <SVGS.Info width={18} height={18} color="#111111" />
            </View>
            <Text className="flex-1 text-base leading-6 text-black">
              Account history from the day you signed up will be shown here. If you don&apos;t recognize any activity, review your{' '}
              <Text
                accessibilityRole="link"
                onPress={() => navigate('/personal-details' as Href)}
                className="font-semibold text-info-700">
                Account information
              </Text>{' '}
              or{' '}
              <Text
                accessibilityRole="link"
                onPress={() => Alert.alert('Manage devices', 'Coming soon')}
                className="font-semibold text-info-700">
                Manage devices
              </Text>
              .
            </Text>
          </View>
        }
        renderSectionHeader={({section}) => <Text className="mb-2 mt-3 text-lg text-grey-500">{section.title}</Text>}
        renderItem={({item, index, section}) => {
          const Icon = ICONS[item.type];
          const isLast = index === section.data.length - 1;

          return (
            <View className={`bg-white px-4 ${index === 0 ? 'rounded-t-2xl' : ''} ${isLast ? 'rounded-b-2xl' : ''}`}>
              <View className="flex-row py-4">
                <View className="w-6 flex-col items-center" style={{alignSelf: 'stretch'}}>
                  <Icon width={22} height={22} color="#111111" />
                  {isLast ? null : <View className="mt-2 w-px flex-1 bg-grey-100" />}
                </View>
                <View className="ml-3 flex-1">
                  <View className="flex-row items-start justify-between">
                    <Text className="mr-3 flex-1 text-lg font-medium leading-6 text-black">{item.title}</Text>
                    <Text className="text-base text-black">{item.time}</Text>
                  </View>
                  <Text className="mt-1 text-base leading-6 text-grey-450">{item.body}</Text>
                </View>
              </View>
              {isLast ? null : <View className="ml-9 h-px bg-grey-50" />}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
