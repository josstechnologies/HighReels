import {FlatList, View, Text, useWindowDimensions, ActivityIndicator, AppState, Pressable, Dimensions} from 'react-native';
import {useSelector} from '@legendapp/state/react';
import {authState$, getActiveAccount} from '@/store';
import {useRouter} from 'expo-router';
import {IMAGES, SVGS} from '@/assets';
import {EmojiReactionOverlay} from '@/components/EmojiReactionOverlay';
import {HomeSideMenus} from '@/components/HomeSideMenus';
import {HomePostMeta} from '@/components/HomePostMeta';
import {HomeMusicSheet} from '@/components/HomeMusicSheet';
import {HomeProfileSheet} from '@/components/HomeProfileSheet';
import {HomeCommentsSheet} from '@/components/HomeCommentsSheet';
import {HomeBookmarkSheet} from '@/components/HomeBookmarkSheet';
import {HomeGiftSheet} from '@/components/HomeGiftSheet';
import {HomeReportSheet} from '@/components/HomeReportSheet';
import {HomeShareSheet} from '@/components/HomeShareSheet';
import {useIsFocused} from 'expo-router/react-navigation';
import {useBottomTabBarHeight} from 'expo-router/js-tabs';
import {useUIStore} from '@/store/uiStore';
import {STATIC_FEED} from '@/mock-data/home-feed';
import {useEffect, useState, useCallback, useRef, useMemo} from 'react';
// import {supabase, getAssetUrl} from '@/utils';
import {queryClient} from '@/utils';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useVideoPlayer, VideoView} from 'expo-video';
import {Image} from 'expo-image';
import * as Haptics from 'expo-haptics';
import Animated, {useSharedValue, useAnimatedStyle, withSpring, withDelay, withTiming, runOnJS} from 'react-native-reanimated';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

/* LEGACY SongCard UI (peach card) — restore when needed:
export const SongCard = () => {
  const router = useRouter();
  const hideSongCard = useUIStore((state) => state.hideSongCard);
  const songCardData = useUIStore((state) => state.songCardData);
  const hasSession = useSelector(() => !!(authState$.accessToken.get() && authState$.refreshToken.get()));
  const accountId = useSelector(() => getActiveAccount()?.accountId);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const currentUserId = hasSession ? accountId : undefined;

  useEffect(() => {
    setIsBioExpanded(false);
  }, [songCardData]);

  if (!songCardData) return null;

  return (
    <View className="absolute bottom-3 w-[96%] self-center">
      <View className="flex-col gap-4 rounded-[28px] bg-[#f2dfd8]/90 px-3 pb-0 pt-3 shadow-lg" style={{backgroundColor: 'rgba(255, 245, 240, 0.85)'}}>
        <View className="flex w-full flex-row items-start justify-between pl-1 pr-2">
          <Pressable onPress={() => router.navigate(`/user-profile/${songCardData.user.id}`)}>
            <Image
              source={songCardData.user?.image ? {uri: songCardData.user.image} : IMAGES.user}
              className="mt-1 h-[52px] w-[52px] rounded-full"
            />
          </Pressable>
          <View className="flex flex-row items-start justify-center gap-7 pt-2">
            <View className="flex-col items-center justify-center gap-1">
              <SVGS.Repost />
              <Text className="font-NunitoSans_500Medium text-base text-black/80">120k</Text>
            </View>
            <View className="items-center justify-center pt-3">
              <SVGS.Vote color="#121212" />
            </View>
            <View className="items-center justify-center pt-3">
              <SVGS.Vote className="rotate-180" color="#121212" />
            </View>
            <View className="pt-2">
              <SVGS.DotMenu />
            </View>
          </View>
          <Pressable onPress={() => hideSongCard()} className="h-full items-start pt-1">
            <SVGS.Add height={18} width={18} bgColor="#000" className="rotate-45" />
          </Pressable>
        </View>
        <View className="mb-3 w-full flex-col rounded-[20px] bg-white p-4 shadow-sm">
          <View className="mb-1 flex flex-row items-center justify-between">
            <Text className="flex-1 font-extrabold text-[20px] tracking-tight text-black" numberOfLines={1}>
              {songCardData.templates?.name || 'Original Sound'}
            </Text>
            <View className="flex flex-row items-center gap-3">
              {currentUserId !== songCardData.user.id && (
                <View className="min-w-[90px] items-center justify-center rounded-xl border-[1.5px] border-black bg-transparent px-4 py-1.5">
                  <Text className="font-semibold text-[15px] text-black">Follow</Text>
                </View>
              )}
              <Pressable
                onPress={() => {
                  hideSongCard();
                  router.navigate({pathname: '/post-views', params: {postId: songCardData?.id}});
                }}>
                <SVGS.Eye />
              </Pressable>
            </View>
          </View>
          <View className="mb-2.5 flex flex-row items-center gap-1">
            <SVGS.Profile width={16} height={16} color="#6b7280" />
            <Text className="font-NunitoSans_600SemiBold text-base text-gray-400">by {songCardData.profiles?.name || 'User'}</Text>
          </View>
          <Pressable onPress={() => setIsBioExpanded(!isBioExpanded)}>
            <Text className="font-NunitoSans_600SemiBold text-base text-gray-400">
              {songCardData.templates?.category ? `Category: ${songCardData.templates.category}` : 'No template details available'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
*/

export const SongCard = () => {
  // Legacy peach song card kept for later — feed uses HomeMusicSheet / HomeProfileSheet.
  // const router = useRouter();
  // const hideSongCard = useUIStore((state) => state.hideSongCard);
  // const songCardData = useUIStore((state) => state.songCardData);
  // const hasSession = useSelector(() => !!(authState$.accessToken.get() && authState$.refreshToken.get()));
  // const accountId = useSelector(() => getActiveAccount()?.accountId);
  // const [isBioExpanded, setIsBioExpanded] = useState(false);
  // const currentUserId = hasSession ? accountId : undefined;
  //
  // useEffect(() => { setIsBioExpanded(false); }, [songCardData]);
  // if (!songCardData) return null;
  // return ( ... old peach card UI ... );
  return null;
};

export const EmptyList = ({message}: {message: string}) => {
  return (
    <View className="h-screen w-screen flex-1 items-center justify-center self-center">
      <Text className="self-center text-center text-gray-400">{message}</Text>
    </View>
  );
};

const FeedItem = ({
  item,
  index,
  activeIndex,
  reelHeight,
  width,
  isActive,
  isFocused,
  onDoubleTapLike,
}: {
  item: any;
  index: number;
  activeIndex: number;
  reelHeight: number;
  width: number;
  isActive: boolean;
  isFocused: boolean;
  onDoubleTapLike: () => void;
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const lastTapRef = useRef(0);
  const heartScale = useSharedValue(0);
  const heartOpacity = useSharedValue(0);

  // Only init player when ACTIVE and FOCUSED to completely drop hardware decoders on tab switch
  // uri was getAssetUrl(item.url)
  const player = useVideoPlayer(isActive && isFocused && item.type === 'video' ? {uri: item.url, useCaching: false} : null, (player) => {
    player.loop = true;
    player.bufferOptions = {preferredForwardBufferDuration: 2};
  });

  useEffect(() => {
    if (isActive && isFocused && !isPaused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, isFocused, isPaused, player]);

  useEffect(() => {
    if (!isActive) setIsPaused(false);
  }, [isActive]);

  const hideHeart = () => setShowHeart(false);

  const handlePress = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onDoubleTapLike();

      // Always show heart animation on double-tap
      setShowHeart(true);
      heartScale.value = 0;
      heartOpacity.value = 1;
      heartScale.value = withSpring(1, {damping: 6, stiffness: 200});
      heartOpacity.value = withDelay(
        600,
        withTiming(0, {duration: 400}, () => runOnJS(hideHeart)())
      );
    } else {
      // Single tap — toggle play/pause for videos
      if (item.type === 'video') {
        if (player.playing) {
          player.pause();
          setIsPaused(true);
        } else {
          player.play();
          setIsPaused(false);
        }
      }
    }
    lastTapRef.current = now;
  };

  const handleSkip = (seconds: number) => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    player.seekBy(seconds);
    player.play();
  };

  const heartAnimatedStyle = useAnimatedStyle(() => ({transform: [{scale: heartScale.value}], opacity: heartOpacity.value}));

  const renderOverlays = () => {
    if (!item.overlays || !Array.isArray(item.overlays)) return null;
    return item.overlays.map((overlay: any) => (
      <View
        key={overlay.id}
        style={{
          position: 'absolute',
          left: overlay.x,
          top: overlay.y,
          zIndex: 10,
          transform: [
            {translateX: overlay.translateX || 0},
            {translateY: overlay.translateY || 0},
            {scale: overlay.scale || 1},
            {rotate: `${overlay.rotation || 0}rad`},
          ],
        }}
        pointerEvents="none">
        {overlay.type === 'emoji' ? (
          <LottieView source={{uri: overlay.content}} autoPlay loop style={{width: 120, height: 120}} />
        ) : overlay.type === 'sticker' ? (
          <Image source={{uri: overlay.content}} style={{width: 120, height: 120}} contentFit="contain" />
        ) : (
          overlay.type === 'text' && (
            <Text
              style={{
                fontSize: 32,
                color: overlay.color || 'white',
                fontFamily: overlay.font || 'NunitoSans_700Bold',
                backgroundColor: 'rgba(0,0,0,0.3)',
                paddingHorizontal: 12,
                borderRadius: 8,
                textAlign: 'center',
              }}>
              {overlay.content}
            </Text>
          )
        )}
      </View>
    ));
  };

  return (
    <View style={{height: reelHeight, width, backgroundColor: item?.overlays?.[0]?.color}} className="items-center justify-center bg-black">
      <Pressable onPress={handlePress} className="h-full w-full items-center justify-center">
        {item.type === 'video' ? (
          <>
            {/* Always load the lightning-fast static thumbnail natively extracted from the video */}
            {/* source was getAssetUrl(item.url) */}
            <Image contentFit="cover" source={{uri: item.url}} style={{position: 'absolute', width: '100%', height: '100%'}} />

            {/* Only render the hardware-heavy native video player if this is the actively viewed item AND the tab is focused */}
            {isActive && isFocused && (
              <VideoView player={player} style={{width: width, height: reelHeight}} contentFit="cover" nativeControls={false} />
            )}
          </>
        ) : item.type === 'photo' ? (
          <Image source={{uri: item.url}} style={{width: '100%', height: '100%'}} contentFit="cover" />
        ) : item.type === 'text' ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 32,
                color: 'white',
                fontFamily: item?.overlays[0]?.font || 'NunitoSans_700Bold',
              }}>
              {item?.text}
            </Text>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center px-10">
            <Text
              style={{
                fontSize: 32,
                color: 'white',
                fontFamily: 'NunitoSans_700Bold',
                textAlign: 'center',
              }}>
              {item.url || item.title || ''}
            </Text>
          </View>
        )}

        {/* Render Overlays on top of any media type */}
        {renderOverlays()}

        {isPaused && item.type === 'video' && (
          <View className="absolute flex-row items-center justify-center gap-8">
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                handleSkip(-10);
              }}
              className="items-center justify-center rounded-full bg-black/30 p-4">
              <MaterialCommunityIcons name="rewind-10" size={15} color="white" />
            </Pressable>

            <View className="items-center justify-center rounded-full bg-black/30 p-4">
              <SVGS.Play color="white" height={12} width={14} />
            </View>

            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                handleSkip(10);
              }}
              className="items-center justify-center rounded-full bg-black/30 p-4">
              <MaterialCommunityIcons name="fast-forward-10" size={15} color="white" />
            </Pressable>
          </View>
        )}
      </Pressable>

      {/* Double-tap heart animation */}
      {showHeart && (
        <Animated.View style={[{position: 'absolute', alignSelf: 'center'}, heartAnimatedStyle]} pointerEvents="none">
          <SVGS.HeartFilled width={100} height={100} />
        </Animated.View>
      )}
    </View>
  );
};

export default function Home() {
  const {navigate} = useRouter();
  const tabBarHeight = useBottomTabBarHeight();
  const {height, width} = useWindowDimensions();
  const hasSession = useSelector(() => !!(authState$.accessToken.get() && authState$.refreshToken.get()));
  const accountId = useSelector(() => getActiveAccount()?.accountId);
  const hideSongCard = useUIStore((state) => state.hideSongCard);
  const setPostReaction = useUIStore((state) => state.setPostReaction);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: loading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['feed', hasSession ? accountId : undefined],
    initialPageParam: null as any,
    queryFn: async ({pageParam}) => {
      void pageParam;
      return {items: STATIC_FEED, has_more: false, next_cursor: null};
      // const {data: rpcData, error} = await supabase.rpc('get_feed', {
      //   p_limit: 10,
      //   p_cursor_id: pageParam?.id,
      //   p_cursor_created_at: pageParam?.created_at,
      // });
      //
      // if (error) throw error;
      //
      // const response = rpcData as any;
      // const rawItems = response.items || [];
      //
      // const transformedItems = rawItems.map((item: any) => ({
      //   ...item,
      //   user: {name: item.name, id: item.user_id, image: item.image, user_name: item.user_name},
      //   my_reaction: item.my_reaction !== null ? {has_reacted: true, emoji_id: item.my_reaction} : {has_reacted: false, emoji_id: null},
      // }));
      //
      // return {items: transformedItems, has_more: response.has_more, next_cursor: response.next_cursor};
    },
    getNextPageParam: (lastPage) => (lastPage.has_more ? lastPage.next_cursor : undefined),
    staleTime: 1000 * 60 * 5,
  });

  const posts = useMemo(() => data?.pages.flatMap((page) => page.items) || [], [data]);

  const [activePostId, setActivePostId] = useState<string | null>(STATIC_FEED[0].id);
  const activeIndexState = useState(0);
  const activeIndex = activeIndexState[0];
  const setActiveIndex = activeIndexState[1];

  const isScreenFocused = useIsFocused();
  const [appStateActive, setAppStateActive] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      setAppStateActive(nextAppState === 'active');
    });
    return () => subscription.remove();
  }, []);

  const isFocused = isScreenFocused && appStateActive;

  const onViewableItemsChanged = useRef(({viewableItems}: {viewableItems: any[]}) => {
    if (viewableItems.length > 0) {
      setActivePostId(viewableItems[0].item.id);
      setActiveIndex(viewableItems[0].index || 0);
      hideSongCard();
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  useEffect(() => {
    // Session change re-fetches automatically due to queryKey dependency
  }, [accountId]);

  useEffect(() => {
    // const trackView = async () => {
    //   if (activePostId && hasSession && accountId) {
    //     const {error} = await supabase
    //       .from('post_views')
    //       .upsert({post_id: activePostId, user_id: accountId, viewed_at: new Date().toISOString()}, {onConflict: 'post_id,user_id'});
    //
    //     if (error) {
    //       console.log('Error tracking post view:', error);
    //     }
    //   }
    // };
    //
    // trackView();
  }, [activePostId, hasSession, accountId]);

  const fetchMorePosts = () => {
    if (!loading && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleDoubleTapLike = useCallback(
    async (post: any): Promise<boolean> => {
      try {
        if (!hasSession || !accountId) return false;

        // If already liked, do nothing and return false
        const alreadyLiked = post.my_reaction?.has_reacted;
        if (alreadyLiked) return false;

        Haptics.selectionAsync();

        // Sync UI store so HomeSideMenus' isLiked state updates → count increments
        setPostReaction(post.id, 'liked');

        // Optimistic Update
        queryClient.setQueryData(['feed', accountId], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              items: page.items.map((item: any) =>
                item.id === post.id
                  ? {...item, my_reaction: {has_reacted: true, emoji_id: 0}, reactions_count: (item.reactions_count || 0) + 1}
                  : item
              ),
            })),
          };
        });

        // const {error} = await supabase
        //   .from('posts_interaction')
        //   .upsert({emoji_id: 0, post_id: post.id, user_id: accountId}, {onConflict: 'post_id,user_id'});
        // if (error) throw error;
        return true;
      } catch (error) {
        console.error('Error liking post:', error);
        // Rollback on failure
        setPostReaction(post.id, null);
        refetch();
        return false;
      }
    },
    [hasSession, accountId, refetch, setPostReaction]
  );

  const reelHeight = height;

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#04BFCE" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <FlatList
        pagingEnabled={true}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={reelHeight}
        disableIntervalMomentum={true}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => (
          <FeedItem
            item={item}
            index={index}
            activeIndex={activeIndex}
            reelHeight={reelHeight}
            width={width}
            isActive={activePostId === item.id}
            isFocused={isFocused}
            onDoubleTapLike={() => handleDoubleTapLike(item)}
          />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ListEmptyComponent={<EmptyList message="No posts yet. Be the first one to post something!" />}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="small" color="#04BFCE" style={{padding: 20}} /> : null}
        refreshing={loading}
        onRefresh={refetch}
        windowSize={3}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
      />
      {posts[activeIndex] && <HomePostMeta post={posts[activeIndex]} />}
      {posts[activeIndex] && <HomeSideMenus post={posts[activeIndex]} />}
      <EmojiReactionOverlay />
      <HomeMusicSheet />
      <HomeProfileSheet />
      <HomeShareSheet />
      <HomeReportSheet />
      <HomeCommentsSheet />
      <HomeGiftSheet />
      <HomeBookmarkSheet />
    </View>
  );
}
