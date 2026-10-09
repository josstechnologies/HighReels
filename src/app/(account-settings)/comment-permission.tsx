import {useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {Button} from '@/components';
import {Checkbox} from '@/components/ui/Checkbox';
import {UpdateCommentPermissionSheet} from '@/components/UpdateCommentPermissionSheet';
import {showToast} from '@/utils';
import {COMMENT_PERMISSION_POSTS} from '@/mock-data/comment-permission';

export default function CommentPermissionScreen() {
  const {back} = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sheetVisible, setSheetVisible] = useState(false);

  const handleUpdate = () => {
    setSheetVisible(false);
    setSelected(new Set());
    showToast('Comment permission updated');
  };

  const toggle = (id: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Comment Permission</Text>
        <View className="w-8" />
      </View>

      <FlatList
        className="flex-1"
        data={COMMENT_PERMISSION_POSTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, gap: 12}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          const checked = selected.has(item.id);
          return (
            <Pressable
              onPress={() => toggle(item.id)}
              className="flex-row items-center rounded-2xl bg-white p-3 active:bg-grey-50">
              <Image source={{uri: item.thumbnail}} className="h-[88px] w-[64px] rounded-xl bg-grey-50" />
              <View className="mx-3 flex-1 self-stretch">
                <Text numberOfLines={2} className="font-medium text-base text-black">
                  {item.caption}
                </Text>
                <Text className="mt-3 text-xs font-medium text-black">{item.date}</Text>
              </View>
              <Checkbox checked={checked} onCheckedChange={() => toggle(item.id)} accessibilityLabel={item.caption} />
            </Pressable>
          );
        }}
      />

      <View className="bg-secondary px-4 pb-4 pt-3">
        <Button
          title={selected.size > 0 ? `Next (${selected.size})` : 'Next'}
          disabled={selected.size === 0}
          onPress={() => setSheetVisible(true)}
          className="rounded-2xl"
        />
      </View>

      <UpdateCommentPermissionSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        selectedCount={selected.size}
        onUpdate={handleUpdate}
      />
    </SafeAreaView>
  );
}
