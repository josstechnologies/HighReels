import type {ReactNode} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {useQuery} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from '@legendapp/state/react';
import {SVGS} from '@/assets';
import {Button} from '@/components';
import {API_ROUTES} from '@/constants';
import {authState$} from '@/store';
import {API, ApiEnvelope, cn, readEnvelope} from '@/utils';

type ProfileMePayload = {
  id?: string;
  profile?: {
    username?: string | null;
    displayName?: string | null;
    bio?: string | null;
    avatar?: string | null;
  };
};

const FLAG = '🇺🇸';
const STATS = [
  {key: 'posts', value: '0', Icon: SVGS.Grid},
  {key: 'followers', value: '0', Icon: SVGS.Followers},
  {key: 'following', value: '0', Icon: SVGS.Follow},
] as const;

function HeaderIcon({onPress, children}: {onPress?: () => void; children: ReactNode}) {
  return (
    <Pressable onPress={onPress} className="h-10 w-10 items-center justify-center rounded-full active:bg-grey-50">
      {children}
    </Pressable>
  );
}

function ProfileHeader({onMenu}: {onMenu?: () => void}) {
  return (
    <View className="flex-row items-center justify-between px-2 py-1">
      <View className="flex-row items-center">
        <HeaderIcon onPress={onMenu}>
          <SVGS.Menu width={22} height={22} className="text-black" />
        </HeaderIcon>
        <HeaderIcon>
          <SVGS.Plus width={22} height={22} className="text-black" />
        </HeaderIcon>
      </View>
      <View className="flex-row items-center">
        <HeaderIcon>
          <SVGS.Campaign width={22} height={22} className="text-black" />
        </HeaderIcon>
        <View className="relative">
          <HeaderIcon>
            <SVGS.Notifications width={22} height={22} className="text-black" />
          </HeaderIcon>
          <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger-700" />
        </View>
        <HeaderIcon>
          <SVGS.Messages width={22} height={22} className="text-black" />
        </HeaderIcon>
      </View>
    </View>
  );
}

function ProfileSkeleton() {
  return (
    <View className="px-4 pt-2">
      <View className="flex-row items-start">
        <View className="h-[88px] w-[88px] rounded-full bg-grey-75" />
        <View className="ml-4 flex-1 pt-1">
          <View className="h-5 w-40 rounded-full bg-grey-75" />
          <View className="mt-3 h-4 w-36 rounded-full bg-grey-75" />
          <View className="mt-4 h-4 w-full rounded-full bg-grey-75" />
          <View className="mt-2 h-4 w-3/4 rounded-full bg-grey-75" />
        </View>
      </View>
    </View>
  );
}

export default function Profile() {
  const {navigate} = useRouter();
  const hasSession = useSelector(() => !!(authState$.accessToken.get() && authState$.refreshToken.get()));

  const profileQuery = useQuery({
    queryKey: ['profile', 'me'],
    enabled: hasSession,
    retry: 1,
    queryFn: async () => {
      const response = await API.get<ApiEnvelope<ProfileMePayload>>(API_ROUTES.PROFILE.ME);
      const data = readEnvelope<ProfileMePayload>(response.data);
      if (!data?.id) throw new Error('UNEXPECTED_PROFILE');
      return data;
    },
  });

  const data = profileQuery.data;
  const displayName = data?.profile?.displayName?.trim() || data?.profile?.username?.trim() || 'User';
  const bio = data?.profile?.bio?.trim() || '';
  const avatar = data?.profile?.avatar?.trim() || '';
  const initial = displayName.charAt(0).toUpperCase();
  const showSkeleton = hasSession && !data && (profileQuery.isLoading || profileQuery.isFetching);
  const showError = hasSession && !data && profileQuery.isError;

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ProfileHeader onMenu={hasSession ? () => navigate('/account-settings' as Href) : undefined} />

        {!hasSession ? (
          <View className="flex-1 items-center justify-center px-8">
            <Text className="text-center font-semibold text-[17px] text-black">You&apos;re not logged in</Text>
            <Text className="mt-2 text-center text-[14px] text-grey-300">
              Log in to see your profile, posts, and account settings.
            </Text>
            <View className="mt-6 w-full">
              <Button title="Log in" onPress={() => navigate('/login' as Href)} />
            </View>
          </View>
        ) : (
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 24}}>
            {showSkeleton ? (
              <ProfileSkeleton />
            ) : showError ? (
              <View className="items-center px-8 pt-16">
                <Text className="text-center font-semibold text-[16px] text-black">Couldn&apos;t load your profile</Text>
                <Text className="mt-2 text-center text-[14px] text-grey-300">Check your connection and try again.</Text>
                <Pressable onPress={() => profileQuery.refetch()} className="mt-4 active:opacity-70">
                  <Text className="font-semibold text-[15px] text-primary">Try again</Text>
                </Pressable>
              </View>
            ) : (
              <View className="px-4 pt-2">
                <View className="flex-row items-start">
                  <View className="rounded-full border-2 border-[#E879F9] p-0.5">
                    {avatar ? (
                      <Image key={avatar} source={{uri: avatar}} className="h-[84px] w-[84px] rounded-full bg-grey-50" />
                    ) : (
                      <View className="h-[84px] w-[84px] items-center justify-center rounded-full bg-secondary">
                        <Text className="font-extrabold text-3xl text-grey-300">{initial}</Text>
                      </View>
                    )}
                  </View>

                  <View className="ml-3 flex-1 pt-1">
                    <View className="flex-row flex-wrap items-center">
                      <Text className="font-bold text-[18px] text-black">{displayName}</Text>
                      <Text className="ml-1.5 text-[16px]">{FLAG}</Text>
                    </View>

                    <View className="mt-2.5 flex-row items-center">
                      {STATS.map((stat, index) => {
                        const Icon = stat.Icon;
                        return (
                          <View key={stat.key} className={cn('flex-row items-center', index > 0 && 'ml-4')}>
                            <Icon width={16} height={16} className="text-black" />
                            <Text className="ml-1 font-semibold text-[13px] text-black">{stat.value}</Text>
                          </View>
                        );
                      })}
                    </View>

                    {bio ? <Text className="mt-3 text-[14px] leading-5 text-black">{bio}</Text> : null}
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}
