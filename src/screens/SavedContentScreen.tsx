import {useMemo, useState} from 'react';
import {Alert, Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {CreateCollectionSheet} from '@/components/CreateCollectionSheet';
import {
  SAVED_COLLECTIONS,
  SAVED_POSTS,
  type SavedCollection,
  type SavedFilter,
  type SavedPost,
} from '@/mock-data/saved-content';
import {cn} from '@/utils';
import type {ReactElement} from 'react';
import type {SvgProps} from 'react-native-svg';

const FILTERS: {id: SavedFilter; label: string; Icon: (props: SvgProps) => ReactElement}[] = [
  {id: 'liked', label: 'Liked', Icon: SVGS.Liked},
  {id: 'watched', label: 'Watched', Icon: SVGS.Watched},
  {id: 'shared', label: 'Shared', Icon: SVGS.Shared},
];

function FilterChip({
  label,
  Icon,
  active,
  onPress,
}: {
  label: string;
  Icon: (props: SvgProps) => ReactElement;
  active: boolean;
  onPress: () => void;
}) {
  const tint = active ? '#FFFFFF' : '#111111';
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'mr-2 h-8 flex-row items-center gap-1.5 rounded-full px-3 active:opacity-80',
        active ? 'bg-black' : 'bg-grey-75',
      )}>
      <View className="h-5 w-5 items-center justify-center">
        <Icon width={20} height={20} color={tint} />
      </View>
      <Text
        className={cn('font-semibold text-13 leading-5', active ? 'text-white' : 'text-black')}
        style={{includeFontPadding: false, textAlignVertical: 'center'}}>
        {label}
      </Text>
    </Pressable>
  );
}

function CollectionCard({item}: {item: SavedCollection}) {
  return (
    <View className="mr-3 w-[148px]">
      <Image source={{uri: item.image}} className="aspect-square w-full rounded-2xl bg-grey-75" />
      <Text numberOfLines={1} className="mt-2 font-semibold text-13 text-black">
        {item.username}
      </Text>
      <View className="mt-1 flex-row items-center">
        <SVGS.Lock width={12} height={12} color="#A7A7A7" />
        <Text className="ml-1 text-xs text-grey-200">{item.privacy}</Text>
      </View>
    </View>
  );
}

function RecentCard({item}: {item: SavedPost}) {
  return (
    <View className="mb-4 w-[48%]">
      <Image source={{uri: item.image}} className="aspect-square w-full rounded-xl bg-grey-75" />
      <Text numberOfLines={2} className="mt-2 text-13 leading-5 text-black">
        {item.caption}
      </Text>
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-xs text-grey-400">
          {item.reactions} {item.count}
        </Text>
        <Pressable
          onPress={() => Alert.alert('Share', 'Coming soon')}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Share saved post"
          className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Share width={16} height={16} color="#7F7F7F" />
        </Pressable>
      </View>
    </View>
  );
}

export function SavedContentScreen() {
  const {back} = useRouter();
  const [filter, setFilter] = useState<SavedFilter>('liked');
  const [createOpen, setCreateOpen] = useState(false);

  const posts = useMemo(() => SAVED_POSTS.filter(item => item.filter === filter), [filter]);

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Saved Content</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{paddingBottom: 32}} showsVerticalScrollIndicator={false}>
        <Text className="px-4 text-sm leading-5 text-grey-300">
          Your saved posts, videos, and stories appear here.{'\n'}Easily revisit your favorite moments anytime.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
          contentContainerStyle={{paddingHorizontal: 16, paddingRight: 32}}>
          {FILTERS.map(item => (
            <FilterChip
              key={item.id}
              label={item.label}
              Icon={item.Icon}
              active={filter === item.id}
              onPress={() => setFilter(item.id)}
            />
          ))}
        </ScrollView>

        <View className="mt-6 flex-row items-center justify-between px-4">
          <Text className="font-bold text-base text-black">Collections</Text>
          <Pressable
            onPress={() => setCreateOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="Add new collection"
            className="flex-row items-center gap-1.5 active:opacity-70">
            <View className="h-6 w-6 items-center justify-center">
              <SVGS.AddNew width={24} height={24} color="#111111" />
            </View>
            <Text
              className="font-medium text-13 leading-6 text-black"
              style={{includeFontPadding: false, textAlignVertical: 'center'}}>
              Add New
            </Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 px-4" contentContainerStyle={{paddingRight: 16}}>
          {SAVED_COLLECTIONS.map(item => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </ScrollView>

        <Text className="mb-3 mt-6 px-4 font-bold text-base text-black">Recently saved</Text>
        <View className="flex-row flex-wrap justify-between px-4">
          {posts.length > 0 ? (
            posts.map(item => <RecentCard key={item.id} item={item} />)
          ) : (
            <View className="w-full items-center py-16">
              <SVGS.Bookmark width={32} height={32} color="#A7A7A7" />
              <Text className="mt-3 font-medium text-base text-black">No saved content</Text>
              <Text className="mt-1 text-center text-sm text-grey-500">Items you save will show up here.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <CreateCollectionSheet visible={createOpen} onClose={() => setCreateOpen(false)} />
    </SafeAreaView>
  );
}
