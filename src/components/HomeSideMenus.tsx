import {useEffect, useRef, useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import * as Haptics from 'expo-haptics';
import {SVGS} from '@/assets';
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
  const {checkLogin} = useCheckLogin();
  const showReactionOverlay = useUIStore((state) => state.showReactionOverlay);
  const postReactions = useUIStore((state) => state.postReactions);
  const setPostReaction = useUIStore((state) => state.setPostReaction);
  const showShareSheet = useUIStore((state) => state.showShareSheet);
  const showCommentsSheet = useUIStore((state) => state.showCommentsSheet);
  const showGiftSheet = useUIStore((state) => state.showGiftSheet);
  const showBookmarkSheet = useUIStore((state) => state.showBookmarkSheet);
  const showMoreSheet = useUIStore((state) => state.showMoreSheet);
  // const showSongCard = useUIStore((state) => state.showSongCard);
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

  // Legacy native share — kept for later:
  // const handleShare = async () => {
  //   try {
  //     const result = await Share.share({message: `Check out this post on Highreels! ${post.url || post.text || ''}`});
  //     if (result.action !== Share.sharedAction) return;
  //     patchFeedItem(post.id, (item) => ({...item, share_count: (item.share_count || 0) + 1}));
  //   } catch (error: any) {
  //     console.error('Error sharing post:', error.message);
  //   }
  // };

  const reactionsCount =
    (post.reactions_count || 0) + (isLiked && !post.my_reaction?.has_reacted ? 1 : !isLiked && post.my_reaction?.has_reacted ? -1 : 0);
  const emoji = typeof currentReaction === 'string' && currentReaction !== 'liked' ? currentReaction : null;

  return (
    <View className="absolute bottom-4 right-4 flex-col items-center justify-center gap-2">
      <TouchableHighlight
        ref={likeRef}
        style={{borderRadius: 50, padding: 5}}
        onLongPress={() => checkLogin(handleLongPress)}
        onPress={() => checkLogin(handleLikePress)}
        underlayColor="#ffffff33"
        activeOpacity={0.5}>
        <View className="items-center justify-center">
          {emoji ? <Text className="text-[32px]">{emoji}</Text> : <SVGS.Like height={37} width={37} filled={isLiked} />}
        </View>
      </TouchableHighlight>
      <Text className="font-NunitoSans_600SemiBold -mt-3 text-base text-white">{reactionsCount}</Text>

      <View className="items-center justify-center">
        <TouchableHighlight
          style={{borderRadius: 50, padding: 5}}
          underlayColor="#ffffff33"
          activeOpacity={0.5}
          onPress={() => showCommentsSheet(post)}>
          <SVGS.Comment height={37} width={37} />
        </TouchableHighlight>
        <Text className="font-NunitoSans_600SemiBold -mt-2 text-base text-white">{post.comments_count || 0}</Text>
      </View>

      <View className="items-center justify-center">
        <TouchableHighlight
          underlayColor="#ffffff80"
          activeOpacity={0.6}
          style={{borderRadius: 50, padding: 5}}
          // onPress={() => checkLogin(() => void handleShare())}
          onPress={() => checkLogin(() => showShareSheet(post))}>
          <SVGS.Share height={37} width={37} />
        </TouchableHighlight>
        <Text className="font-NunitoSans_600SemiBold -mt-2 text-base text-white">{post.share_count || 0}</Text>
      </View>

      <View className="items-center justify-center">
        <TouchableHighlight
          underlayColor="#ffffff80"
          activeOpacity={0.6}
          style={{borderRadius: 50, padding: 5}}
          onPress={() => checkLogin(() => showBookmarkSheet(post))}>
          <SVGS.Bookmark height={36} width={36} />
        </TouchableHighlight>
        <Text className="font-NunitoSans_600SemiBold -mt-2 text-base text-white">{post.bookmark_count || 0}</Text>
      </View>

      <View className="items-center justify-center">
        <TouchableHighlight
          underlayColor="#ffffff80"
          activeOpacity={0.6}
          style={{borderRadius: 50, padding: 5}}
          onPress={() => checkLogin(() => showGiftSheet(post))}>
          <SVGS.Gift height={37} width={37} />
        </TouchableHighlight>
        <Text className="font-NunitoSans_600SemiBold -mt-2 text-base text-white">{post.gift_count || 0}</Text>
      </View>

      <TouchableHighlight
        underlayColor="#ffffff80"
        activeOpacity={0.6}
        style={{borderRadius: 50, padding: 5}}
        onPress={() => checkLogin(() => showMoreSheet(post))}>
        <SVGS.ThreeDot height={37} width={37} />
      </TouchableHighlight>
    </View>
  );
};
