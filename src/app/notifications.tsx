import {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {NOTIFICATIONS, type Notice, type NoticeGroupId} from '@/mock-data/notifications';

const ICON = '#111111';
const ALERT = '#E4572E';

type Filter = 'all' | 'recent' | 'week' | 'month';

const FILTERS: {id: Filter; label: string; groups: NoticeGroupId[]}[] = [
  {id: 'all', label: 'notifications.all', groups: ['today', 'yesterday', 'week', 'month']},
  {id: 'recent', label: 'notifications.recent', groups: ['today']},
  {id: 'week', label: 'notifications.lastWeek', groups: ['yesterday', 'week']},
  {id: 'month', label: 'notifications.lastMonth', groups: ['month']},
];

function FollowButton({label}: {label: string}) {
  return (
    <View className="ml-3 rounded-lg bg-primary px-4 py-2">
      <Text className="font-NunitoSans_700Bold text-[13px] text-white">{label}</Text>
    </View>
  );
}

function NoticeRow({item}: {item: Notice}) {
  const {t} = useTranslation();
  const time = <Text className="font-NunitoSans_400Regular text-grey-200"> {t(`notifications.${item.time}`)}</Text>;

  if (item.kind === 'follow') {
    return (
      <View className="mt-4 flex-row items-center">
        <Image source={{uri: item.avatar}} style={{width: 44, height: 44, borderRadius: 22}} contentFit="cover" />
        <Text className="font-NunitoSans_400Regular ml-3 flex-1 text-[14px] leading-5 text-black">
          <Text className="font-NunitoSans_700Bold">{item.name}</Text>
          {t('notifications.onLorem')}
          <Text className="font-NunitoSans_700Bold">{item.other}</Text>
          {t('notifications.followsThem')}
          {time}
        </Text>
        <FollowButton label={t('notifications.follow')} />
      </View>
    );
  }

  const alert = item.kind === 'security';
  return (
    <View className="mt-4 flex-row items-center">
      <View
        className={`h-11 w-11 items-center justify-center rounded-full ${alert ? '' : 'bg-primary'}`}
        style={alert ? {backgroundColor: ALERT} : undefined}>
        {alert ? <Text className="font-NunitoSans_700Bold text-[18px] text-white">i</Text> : <SVGS.Person width={22} height={22} color="#FFFFFF" />}
      </View>
      <Text className="font-NunitoSans_400Regular ml-3 flex-1 text-[14px] leading-5 text-black">
        {t(alert ? 'notifications.security' : 'notifications.activity')}
        {time}
      </Text>
    </View>
  );
}

export default function Notifications() {
  const router = useRouter();
  const {t} = useTranslation();
  const [filter, setFilter] = useState<Filter>('all');
  const visible = FILTERS.find((item) => item.id === filter)?.groups ?? [];
  const groups = NOTIFICATIONS.filter((group) => visible.includes(group.id));

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="h-12 flex-row items-center px-2">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel={t('notifications.back')}
          className="h-10 w-10 items-center justify-center">
          <SVGS.Back width={24} height={24} color={ICON} />
        </Pressable>
        <Text className="font-NunitoSans_700Bold flex-1 text-center text-[18px] text-black">{t('notifications.title')}</Text>
        <View className="h-10 w-10" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 24}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 8, gap: 8}}>
          {FILTERS.map((item) => {
            const selected = item.id === filter;
            return (
              <Pressable
                key={item.id}
                onPress={() => setFilter(item.id)}
                accessibilityRole="button"
                accessibilityState={{selected}}
                className={`rounded-full px-4 py-2 ${selected ? 'bg-black' : 'bg-secondary'}`}>
                <Text className={`font-NunitoSans_600SemiBold text-[14px] ${selected ? 'text-white' : 'text-black'}`}>{t(item.label)}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <View className="px-4 pt-2">
          {groups.map((group) => (
            <View key={group.id} className={`mb-3 rounded-2xl px-4 pb-4 pt-4 ${group.tone === 'alert' ? 'bg-[#FDF4F4]' : 'bg-[#F6F6F6]'}`}>
              <Text className="font-NunitoSans_700Bold text-[16px] text-black">{t(`notifications.${group.id}`)}</Text>
              {group.items.map((item) => (
                <NoticeRow key={item.id} item={item} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
