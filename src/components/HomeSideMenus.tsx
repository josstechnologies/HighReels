import {useEffect, useRef, useState} from 'react';
import {Image, Share, Text, TouchableHighlight, View} from 'react-native';
import {useRouter} from 'expo-router';
import * as Haptics from 'expo-haptics';
import {IMAGES, SVGS} from '@/assets';
import {useCheckLogin} from '@/hooks/useCheckLogin';
import {getActiveAccount} from '@/store';
import {useUIStore} from '@/store/uiStore';
import {queryClient} from '@/utils';

const patchFeedItem = (postId: string, mapItem: (item: any) => any) => {
  const accountId = getActiveAccount()?.accountId;
  queryClient.setQueryData(['feed', accountId], (old: any) => {
    if (!old?.pages) return old;
    return {
      ...old,
      pages: old.pages.map((page: any) => ({
        ...page,
        items: page.items.map((item: any) => (item.id === postId ? mapItem(item) : item)),
      })),
    };
  });
};

export const HomeSideMenus = ({post}: {post: any}) => {
  const router = useRouter();
  const {checkLogin} = useCheckLogin();
  const showReactionOverlay = useUIStore((state) => state.showReactionOverlay);
  const postReactions = useUIStore((state) => state.postReactions);
  const setPostReaction = useUIStore((state) => state.setPostReaction);
  const showSongCard = useUIStore((state) => state.showSongCard);
  const likeRef = useRef<any>(null);
  const currentReaction = postReactions[post.id];
  const [isLiked, setIsLiked] = useState(post.my_reaction?.has_reacted ?? false);

  useEffect(() => {
    if (currentReaction !== undefined) setIsLiked(!!currentReaction);
    else setIsLiked(post.my_reaction?.has_reacted ?? false);
  }, [post.id, post.my_reaction?.has_reacted, currentReaction]);

  const handleLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    likeRef.current?.measure((_x: number, _y: number, _w: number, _h: number, pageX: number, pageY: number) => {
      showReactionOverlay({x: pageX, y: pageY}, post.id);
    });
  };

  const handleLikePress = () => {
    const previousIsLiked = isLiked;
    const newIsLiked = !previousIsLiked;
    setIsLiked(newIsLiked);
    setPostReaction(post.id, newIsLiked ? 'liked' : null);
    patchFeedItem(post.id, (item) => ({
      ...item,
      reactions_count: Math.max(0, (item.reactions_count || 0) + (newIsLiked ? 1 : -1)),
      my_reaction: newIsLiked ? {has_reacted: true, emoji_id: 0} : {has_reacted: false, emoji_id: null},
    }));
    if (newIsLiked) Haptics.selectionAsync();
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({message: `Check out this post on Highreels! ${post.url || post.text || ''}`});
      if (result.action !== Share.sharedAction) return;
      patchFeedItem(post.id, (item) => ({...item, share_count: (item.share_count || 0) + 1}));
    } catch (error: any) {
      console.error('Error sharing post:', error.message);
    }
  };

  const reactionsCount =
    (post.reactions_count || 0) + (isLiked && !post.my_reaction?.has_reacted ? 1 : !isLiked && post.my_reaction?.has_reacted ? -1 : 0);
  const emoji = typeof currentReaction === 'string' && currentReaction !== 'liked' ? currentReaction : null;

  return (
    <View className="absolute bottom-10 right-4 flex-col items-center justify-center gap-2">
      <TouchableHighlight
        style={{borderRadius: 50, padding: 5}}
        onPress={() => router.navigate(`/user-profile/${post.user?.id || post.user_id}`)}
        underlayColor="#ffffff33"
        activeOpacity={0.5}>
        <Image source={post.user?.image ? {uri: post.user.image} : IMAGES.user} className="h-10 w-10 rounded-full" />
      </TouchableHighlight>
      <TouchableHighlight
        ref={likeRef}
        style={{borderRadius: 50, padding: 5}}
        onLongPress={() => checkLogin(handleLongPress)}
        onPress={() => checkLogin(handleLikePress)}
        underlayColor="#ffffff33"
        activeOpacity={0.5}>
        <View className="items-center justify-center">
          {emoji ? <Text className="text-[32px]">{emoji}</Text> : <SVGS.Like height={40} width={40} filled={isLiked} />}
        </View>
      </TouchableHighlight>
      <Text className="-mt-3 font-NunitoSans_600SemiBold text-base text-white">{reactionsCount}</Text>

      <View className="items-center justify-center">
        <TouchableHighlight
          style={{borderRadius: 50, padding: 5}}
          underlayColor="#ffffff33"
          activeOpacity={0.5}
          onPress={() => router.navigate({pathname: '/comments-sheet', params: {postId: post.id}})}>
          <SVGS.Comment height={35} width={33} />
        </TouchableHighlight>
        <Text className="-mt-2 font-NunitoSans_600SemiBold text-base text-white">{post.comments_count || 0}</Text>
      </View>
      <TouchableHighlight
        underlayColor="#ffffff80"
        activeOpacity={0.6}
        style={{borderRadius: 50, padding: 5}}
        onPress={() => checkLogin(() => void handleShare())}
        className="items-center justify-center">
        <SVGS.Share />
      </TouchableHighlight>
      <Text className="font-NunitoSans_600SemiBold text-base text-white">{post.share_count || 0}</Text>
      <TouchableHighlight
        underlayColor="#ffffff80"
        activeOpacity={0.6}
        style={{borderRadius: 50, padding: 5}}
        onPress={() => checkLogin(() => router.navigate('/gift-sheet'))}>
        <SVGS.Gift color="#fff" />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor="#ffffff80"
        activeOpacity={0.6}
        style={{borderRadius: 50, padding: 5}}
        onPress={() => checkLogin(() => showSongCard(post))}>
        <SVGS.Add height={32} width={32} bgColor="#fff" />
      </TouchableHighlight>
    </View>
  );
};
