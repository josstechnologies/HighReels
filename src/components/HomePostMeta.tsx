import {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {Image} from 'expo-image';
import {IMAGES, SVGS} from '@/assets';
import {useCheckLogin} from '@/hooks/useCheckLogin';
import {useUIStore} from '@/store/uiStore';

function captionFromPost(post: any): string {
  if (typeof post?.text === 'string' && post.text.trim()) return post.text.trim();
  const overlay = Array.isArray(post?.overlays) ? post.overlays.find((o: any) => o?.type === 'text' && o?.content) : null;
  return overlay?.content ? String(overlay.content) : '';
}

export function HomePostMeta({post}: {post: any}) {
  const router = useRouter();
  const {checkLogin} = useCheckLogin();
  const showSongCard = useUIStore((state) => state.showSongCard);
  const showProfileCard = useUIStore((state) => state.showProfileCard);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setFollowing(false);
  }, [post?.id]);

  if (!post) return null;

  const userId = post.user?.id || post.user_id;
  const name = post.user?.name || post.profiles?.name || 'User';
  const song = post.templates?.name || 'Original Sound';
  const caption = captionFromPost(post);

  const goProfile = () => {
    if (!userId) return;
    router.navigate(`/user-profile/${userId}`);
  };

  return (
    <View className="absolute bottom-4 left-4 right-24" pointerEvents="box-none">
      <View className="flex-row items-center">
        <Pressable onPress={goProfile} className="active:opacity-70">
          <Image
            source={post.user?.image ? {uri: post.user.image} : IMAGES.user}
            style={{width: 40, height: 40, borderRadius: 20}}
            contentFit="cover"
          />
        </Pressable>

        <View className="ml-3 min-w-0 flex-1">
          <View className="flex-row items-center gap-2.5">
            <Pressable onPress={goProfile} className="min-w-0 shrink active:opacity-70">
              <Text className="font-extrabold text-[15px] text-white" numberOfLines={1}>
                {name}
              </Text>
            </Pressable>

            {/* UI-only for now — follow API not wired yet */}
            <Pressable onPress={() => setFollowing((v) => !v)} className="rounded-lg border border-white px-2.5 py-0.5 active:opacity-70">
              <Text className="font-semibold text-[13px] text-white">{following ? 'Following' : 'Follow'}</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => showSongCard(post)} className="mt-1 flex-row items-center gap-1.5 active:opacity-70">
            <SVGS.Audio width={14} height={14} color="#FFFFFF" />
            <Text className="flex-1 font-medium text-[13px] text-white" numberOfLines={1}>
              {song}
            </Text>
          </Pressable>
        </View>
      </View>

      {caption ? (
        <Pressable onPress={() => checkLogin(() => showProfileCard(post))} className="mt-2.5 active:opacity-70">
          <Text className="font-medium text-[13px] leading-5 text-white" numberOfLines={1}>
            {caption}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
