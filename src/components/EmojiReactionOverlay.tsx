import {useEffect} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming} from 'react-native-reanimated';
import {SVGS} from '@/assets';
import {getActiveAccount} from '@/store';
import {useUIStore, type AnimatedEmoji} from '@/store/uiStore';
import {queryClient} from '@/utils';

const EmojiItem = ({emoji, index, onSelect}: {emoji: AnimatedEmoji; index: number; onSelect: (e: AnimatedEmoji) => void}) => {
  const scale = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    scale.value = withDelay(index * 50, withSpring(1, {damping: 14, stiffness: 150}));
    translateY.value = withDelay(index * 50, withSpring(0, {damping: 14, stiffness: 150}));
  }, [index, scale, translateY]);

  const style = useAnimatedStyle(() => ({transform: [{scale: scale.value}, {translateY: translateY.value}]}));

  return (
    <Animated.View style={style} className="mx-1">
      <Pressable
        onPress={() => {
          Haptics.selectionAsync();
          onSelect(emoji);
          scale.value = withSpring(1.3, {damping: 14, stiffness: 150});
        }}>
        <Text className="text-[28px]">{emoji.glyph}</Text>
      </Pressable>
    </Animated.View>
  );
};

export const EmojiReactionOverlay = () => {
  const router = useRouter();
  const isVisible = useUIStore((state) => state.reactionOverlay.isVisible);
  const position = useUIStore((state) => state.reactionOverlay.position);
  const overlayPostId = useUIStore((state) => state.reactionOverlay.postId);
  const hideReactionOverlay = useUIStore((state) => state.hideReactionOverlay);
  const setSelectedReaction = useUIStore((state) => state.setSelectedReaction);
  const setPostReaction = useUIStore((state) => state.setPostReaction);
  const previewEmojis = useUIStore((state) => state.previewEmojis);
  const containerScale = useSharedValue(0);
  const containerOpacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      containerScale.value = withSpring(1, {damping: 70, stiffness: 160});
      containerOpacity.value = withTiming(1, {duration: 70});
    } else {
      containerScale.value = withTiming(0, {duration: 30});
      containerOpacity.value = withTiming(0, {duration: 30});
    }
  }, [isVisible, containerScale, containerOpacity]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{scale: containerScale.value}],
  }));

  const handleSelectEmoji = (emoji: AnimatedEmoji) => {
    setSelectedReaction(emoji.glyph);
    hideReactionOverlay();
    if (!overlayPostId) return;
    setPostReaction(overlayPostId, emoji.glyph);
    const accountId = getActiveAccount()?.accountId;
    queryClient.setQueryData(['feed', accountId], (old: any) => {
      if (!old?.pages) return old;
      return {
        ...old,
        pages: old.pages.map((page: any) => ({
          ...page,
          items: page.items.map((item: any) =>
            item.id === overlayPostId
              ? {
                  ...item,
                  reactions_count: item.my_reaction?.has_reacted ? item.reactions_count : (item.reactions_count || 0) + 1,
                  my_reaction: {has_reacted: true, emoji_id: emoji.id},
                }
              : item
          ),
        })),
      };
    });
  };

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <Pressable className="flex-1" onPress={hideReactionOverlay}>
        <Animated.View style={[styles.popover, {top: position.y + 12}, containerStyle]} pointerEvents="box-none">
          <View className="rounded-full bg-white shadow-lg">
            <View className="flex-row items-center justify-center px-2 py-3">
              {previewEmojis.map((emoji, idx) => (
                <EmojiItem key={emoji.id} emoji={emoji} index={idx} onSelect={handleSelectEmoji} />
              ))}
              <Pressable
                onPress={() => {
                  hideReactionOverlay();
                  router.navigate('/emoji-sheet');
                }}
                className="mx-1 h-9 w-9 items-center justify-center rounded-full bg-[#E5E5E5]">
                <SVGS.Add bgColor="#fff" height={24} width={24} />
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popover: {position: 'absolute', right: '14%', alignItems: 'center', zIndex: 1000},
});
