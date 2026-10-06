import {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {Image} from 'expo-image';
import {IMAGES, SVGS} from '@/assets';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {STATIC_PROFILES} from '@/mock-data/home-feed';
import {useUIStore} from '@/store/uiStore';

const STATS = [
  {key: 'repost', label: '120k', Icon: SVGS.Repost1},
  {key: 'views', label: '43', Icon: SVGS.Eye},
  {key: 'up', label: '20', Icon: SVGS.Up},
  {key: 'down', label: '30', Icon: SVGS.Up, rotate: true},
] as const;

/** Creator profile sheet opened from the feed ⋮ menu. */
export function HomeProfileSheet() {
  const router = useRouter();
  const visible = useUIStore((s) => s.profileCardVisible);
  const data = useUIStore((s) => s.profileCardData);
  const hideProfileCard = useUIStore((s) => s.hideProfileCard);
  const showSongCard = useUIStore((s) => s.showSongCard);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setFollowing(false);
  }, [data?.id]);

  const userId = data?.user?.id || data?.user_id;
  const name = data?.user?.name || data?.profiles?.name || 'User';
  const song = data?.templates?.name || 'Original Sound';
  const profile = userId ? STATIC_PROFILES[userId as keyof typeof STATIC_PROFILES] : undefined;
  const bio = profile?.bio || "Hey everyone! I'm thrilled to be back and ready to share more exciting updates with you all.";

  const goProfile = () => {
    if (!userId) return;
    hideProfileCard();
    router.navigate(`/user-profile/${userId}`);
  };

  return (
    <AppBottomSheet visible={visible} onClose={hideProfileCard} enableDynamicSizing>
      <View className="flex-row items-center">
        <Pressable onPress={goProfile} className="active:opacity-70">
          <Image
            source={data?.user?.image ? {uri: data.user.image} : IMAGES.user}
            style={{width: 52, height: 52, borderRadius: 26}}
            contentFit="cover"
          />
        </Pressable>

        <View className="ml-3 min-w-0 flex-1 justify-center">
          <View className="flex-row items-center justify-between gap-2">
            <Pressable onPress={goProfile} className="min-w-0 flex-1 active:opacity-70">
              <Text className="font-extrabold text-lg leading-5 text-black" numberOfLines={1}>
                {name}
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => {
              if (!data) return;
              showSongCard(data);
            }}
            className="mt-1 flex-row items-center gap-1 active:opacity-70">
            <SVGS.Audio width={13} height={13} color="#8a8a8a" />
            <Text className="flex-1 font-medium text-[13px] leading-4 text-[#8a8a8a]" numberOfLines={1}>
              {song}
            </Text>
          </Pressable>
        </View>

        {/* UI-only for now — follow API not wired yet */}
        <Pressable onPress={() => setFollowing((v) => !v)} className="rounded-xl bg-primary px-4 py-2 active:opacity-90">
          <Text className="font-semibold text-[14px] text-white">{following ? 'Following' : 'Follow'}</Text>
        </Pressable>
      </View>

      <View className="mt-5 flex-row items-center">
        {STATS.map((stat, index) => (
          <View key={stat.key} className="flex-1 flex-row items-center">
            {index > 0 ? <View className="h-10 w-px bg-[#e8e8e8]" /> : null}
            <View className="flex-1 items-center py-1">
              <View style={stat.rotate ? {transform: [{rotate: '180deg'}]} : undefined}>
                <stat.Icon width={22} height={22} color="#111111" />
              </View>
              <Text className="mt-1 font-semibold text-[13px] text-black">{stat.label}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text className="mb-2 mt-5 font-medium text-[14px] leading-5 text-[#4a4a4a]">{bio}</Text>
    </AppBottomSheet>
  );
}
