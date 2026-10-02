import {useState} from 'react';
import {Alert, Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {
  RECENTLY_DELETED_SECTIONS,
  type RecentlyDeletedItem,
  type RecentlyDeletedSection,
} from '@/mock-data/recently-deleted';

function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-8 pb-24 pt-16">
      <View className="h-24 w-24 items-center justify-center rounded-full bg-white">
        <SVGS.DeleteEmpty width={54} height={54} color="#111111" />
      </View>
      <Text className="mt-6 text-center font-semibold text-base text-black">Nothing deleted yet</Text>
      <Text className="mt-2 text-center text-sm leading-5 text-grey-400">
        Deleted posts, videos, and stories will appear here for a limited time.
      </Text>
    </View>
  );
}

function DeletedItemRow({
  item,
  showDivider,
  onRestore,
  onDelete,
}: {
  item: RecentlyDeletedItem;
  showDivider: boolean;
  onRestore: () => void;
  onDelete: () => void;
}) {
  return (
    <View>
      <View className="flex-row items-center px-4 py-3.5">
        <Image source={{uri: item.thumbnail}} className="h-12 w-12 rounded-lg bg-grey-75" />
        <View className="mx-3 flex-1">
          <Text className="font-semibold text-sm text-black">{item.username}</Text>
          <Text className="mt-0.5 text-xs text-grey-400">{item.meta}</Text>
          <Text numberOfLines={2} className="mt-1 text-sm leading-5 text-black">
            {item.caption}
          </Text>
        </View>
        <View className="flex-row items-center gap-2.5">
          <Pressable
            onPress={onRestore}
            accessibilityRole="button"
            accessibilityLabel={`Restore ${item.username}`}
            hitSlop={8}>
            <SVGS.Reload width={20} height={20} color="#111111" />
          </Pressable>
          <Pressable
            onPress={onDelete}
            accessibilityRole="button"
            accessibilityLabel={`Delete ${item.username} permanently`}
            hitSlop={8}>
            <SVGS.Delete2 width={20} height={20} color="#EC2727" />
          </Pressable>
        </View>
      </View>
      {showDivider ? <View className="h-px bg-grey-50" /> : null}
    </View>
  );
}

export function RecentlyDeletedScreen() {
  const {back} = useRouter();
  const [sections, setSections] = useState<RecentlyDeletedSection[]>(RECENTLY_DELETED_SECTIONS);

  const removeItem = (id: string) => {
    setSections(current =>
      current
        .map(section => ({...section, data: section.data.filter(item => item.id !== id)}))
        .filter(section => section.data.length > 0),
    );
  };

  const handleRestore = (item: RecentlyDeletedItem) => {
    Alert.alert('Restore', `Restore ${item.username}'s post?`, [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Restore', onPress: () => removeItem(item.id)},
    ]);
  };

  const handleDelete = (item: RecentlyDeletedItem) => {
    Alert.alert('Delete permanently', 'This post will be deleted forever.', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: () => removeItem(item.id)},
    ]);
  };

  const isEmpty = sections.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Recently Deleted</Text>
        <View className="w-8" />
      </View>

      <View className="bg-secondary px-4 pb-4">
        <Text className="text-sm leading-5 text-grey-400">
          Posts you deleted in the last 30 days appear here. You can restore them or delete them permanently.
        </Text>
      </View>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{paddingHorizontal: 16, paddingTop: 4, paddingBottom: 32}}
          showsVerticalScrollIndicator={false}>
          {sections.map((section, sectionIndex) => (
            <View key={section.id} className={sectionIndex === 0 ? undefined : 'mt-[14px]'}>
              <Text className="mb-[14px] font-semibold text-sm text-black">{section.title}</Text>
              <View className="overflow-hidden rounded-2xl bg-white">
                {section.data.map((item, index) => (
                  <DeletedItemRow
                    key={item.id}
                    item={item}
                    showDivider={index < section.data.length - 1}
                    onRestore={() => handleRestore(item)}
                    onDelete={() => handleDelete(item)}
                  />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
