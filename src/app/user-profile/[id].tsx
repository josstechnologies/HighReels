import {useState} from 'react';
import {Pressable, ScrollView, Text, View, useWindowDimensions} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Image} from 'expo-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IMAGES, SVGS} from '@/assets';
import {useCheckLogin} from '@/hooks/useCheckLogin';
import {STATIC_FEED, STATIC_PROFILES} from '@/mock-data/home-feed';
import {authState$, getActiveAccount} from '@/store';
import {useSelector} from '@legendapp/state/react';

export default function UserProfile() {
  const {id} = useLocalSearchParams<{id: string}>();
  const router = useRouter();
  const {width} = useWindowDimensions();
  const {checkLogin} = useCheckLogin();
  const hasSession = useSelector(() => !!(authState$.accessToken.get() && authState$.refreshToken.get()));
  const accountId = hasSession ? getActiveAccount()?.accountId : undefined;
  const profile = STATIC_PROFILES[id as keyof typeof STATIC_PROFILES];
  const posts = STATIC_FEED.filter((post) => post.user.id === id && post.type !== 'text');
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(profile?.follower ?? 0);
  const imageSize = width / 3;

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-black">User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()} className="px-4 pt-2">
          <SVGS.Back width={24} height={24} />
        </Pressable>
        <View className="flex-row items-center px-6 pt-4">
          <Image source={{uri: profile.image}} style={{width: 90, height: 90, borderRadius: 90}} contentFit="cover" />
          <View className="ml-4 flex-1">
            <Text className="font-NunitoSans_700Bold text-[24px] text-black">{profile.name}</Text>
            <Text className="mt-1 text-[14px] text-gray-500">{profile.bio}</Text>
          </View>
        </View>
        <View className="mt-8 flex-row items-center justify-between px-10">
          <View className="items-center">
            <Text className="font-NunitoSans_700Bold text-[18px] text-black">{profile.follow}</Text>
            <Text className="text-[14px] text-gray-400">Following</Text>
          </View>
          <View className="items-center">
            <Text className="font-NunitoSans_700Bold text-[18px] text-black">{followers}</Text>
            <Text className="text-[14px] text-gray-400">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="font-NunitoSans_700Bold text-[18px] text-black">0</Text>
            <Text className="text-[14px] text-gray-400">Interactions</Text>
          </View>
        </View>
        {accountId !== id && (
          <View className="mt-8 px-6">
            <Pressable
              onPress={() =>
                checkLogin(() => {
                  setFollowing((value) => {
                    setFollowers((count) => Math.max(0, count + (value ? -1 : 1)));
                    return !value;
                  });
                })
              }
              className="items-center rounded-full bg-gray-100 py-4">
              <Text className="text-[16px] font-bold text-black">{following ? 'Unfollow' : 'Follow'}</Text>
            </Pressable>
          </View>
        )}
        <View className="mt-8 flex-row flex-wrap">
          {posts.length === 0 ? (
            <Text className="mt-10 w-full text-center text-gray-400">This user hasn&apos;t posted anything yet.</Text>
          ) : (
            posts.map((post) => (
              <Image key={post.id} source={post.url ? {uri: post.url} : IMAGES.user} style={{width: imageSize, height: imageSize * 1.5}} contentFit="cover" />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
