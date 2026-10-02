import {useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import * as Haptics from 'expo-haptics';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {getActiveAccount} from '@/store';
import {useUIStore, type AnimatedEmoji} from '@/store/uiStore';
import {queryClient} from '@/utils';

export default function EmojiSheetScreen() {
  const router = useRouter();
  const emojis = useUIStore((state) => state.emojis);
  const previewEmojis = useUIStore((state) => state.previewEmojis);
  const updatePreviewEmoji = useUIStore((state) => state.updatePreviewEmoji);
  const setPostReaction = useUIStore((state) => state.setPostReaction);
  const overlayPostId = useUIStore((state) => state.reactionOverlay.postId);
  const [editing, setEditing] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const selectEmoji = (item: AnimatedEmoji) => {
    Haptics.selectionAsync();
    if (editing) {
      if (selectedSlot !== null) {
        updatePreviewEmoji(selectedSlot, item);
        setSelectedSlot(null);
      }
      return;
    }
    if (overlayPostId) {
      setPostReaction(overlayPostId, item.glyph);
      const accountId = getActiveAccount()?.accountId;
      queryClient.setQueryData(['feed', accountId], (old: any) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            items: page.items.map((post: any) =>
              post.id === overlayPostId
                ? {
                    ...post,
                    reactions_count: post.my_reaction?.has_reacted ? post.reactions_count : (post.reactions_count || 0) + 1,
                    my_reaction: {has_reacted: true, emoji_id: item.id},
                  }
                : post
            ),
          })),
        };
      });
    }
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <View className="flex-1 px-4 pb-8 pt-4">
        <View className="mb-6 flex-row items-center justify-between">
          <Pressable className="w-16" onPress={() => router.back()}>
            <SVGS.Add height={28} width={28} bgColor="#000" className="rotate-45" />
          </Pressable>
          <Text className="text-[18px] font-bold text-black">Reactions</Text>
          <Pressable
            className="w-16 items-end"
            onPress={() => {
              setEditing((value) => !value);
              setSelectedSlot(null);
            }}>
            <Text className={`font-semibold ${editing ? 'text-[#00cce6]' : 'text-gray-500'}`}>{editing ? 'Done' : 'Edit'}</Text>
          </Pressable>
        </View>

        <View className="mb-6 flex-row items-center justify-evenly rounded-2xl bg-gray-100 p-3">
          {previewEmojis.map((item, index) => (
            <Pressable
              key={item.id + index}
              disabled={!editing}
              onPress={() => setSelectedSlot(index)}
              className={`rounded-xl p-2 ${editing && selectedSlot === index ? 'border-2 border-[#00cce6] bg-white' : 'border-2 border-transparent'}`}>
              <Text className="text-[28px]">{item.glyph}</Text>
            </Pressable>
          ))}
        </View>
        <Text className="mb-4 text-center text-sm font-medium text-gray-400">
          {editing ? 'Tap a top emoji, then select one below to replace it.' : 'Pick a reaction'}
        </Text>
        <FlatList
          data={emojis}
          numColumns={5}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 16}}
          renderItem={({item}) => (
            <Pressable className="items-center justify-center p-2" onPress={() => selectEmoji(item)}>
              <Text className="text-[36px]">{item.glyph}</Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
