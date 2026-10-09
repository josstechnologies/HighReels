import {useMemo, useState} from 'react';
import {FlatList, Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {cn} from '@/utils';
import {COMMENT_HISTORY} from '@/mock-data/comment-history';

const FILTERS = ['All', 'Newest to oldest', 'Oldest to Newest'] as const;
type Filter = (typeof FILTERS)[number];

export default function CommentHistoryScreen() {
  const {back} = useRouter();
  const [filter, setFilter] = useState<Filter>('All');

  const posts = useMemo(() => {
    if (filter === 'All') return COMMENT_HISTORY;
    const direction = filter === 'Newest to oldest' ? -1 : 1;
    return [...COMMENT_HISTORY].sort((a, b) => (a.createdAt - b.createdAt) * direction);
  }, [filter]);

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Comment History</Text>
        <View className="w-8" />
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16, gap: 8}}>
          {FILTERS.map((item) => {
            const active = filter === item;
            return (
              <Pressable
                key={item}
                onPress={() => setFilter(item)}
                accessibilityRole="button"
                accessibilityState={{selected: active}}
                className={cn('h-9 items-center justify-center rounded-3xl px-4', active ? 'bg-black' : 'bg-white active:bg-grey-50')}>
                <Text className={cn('font-semibold text-sm', active ? 'text-white' : 'text-black')}>{item}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        className="flex-1"
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32, gap: 16}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View className="rounded-2xl bg-white px-4 py-4">
            <View className="flex-row items-center">
              <Image source={{uri: item.avatar}} className="h-10 w-10 rounded-full bg-grey-50" />
              <View className="mx-3 flex-1">
                <Text className="font-semibold text-sm text-black">{item.username}</Text>
                <Text numberOfLines={1} className="mt-0.5 text-xs text-black">
                  {item.caption}
                </Text>
              </View>
              <Image source={{uri: item.thumbnail}} className="h-10 w-10 rounded-lg bg-grey-50" />
            </View> 

            <View className="ml-10 mt-3">
              {item.replies.map((reply) => (
                <View key={reply.id} className="mt-2 flex-row">
                  <Image source={{uri: reply.avatar}} className="h-9 w-9 rounded-full bg-grey-50" />
                  <View className="ml-3 flex-1">
                    <Text className="text-sm text-black">
                      <Text className="font-medium text-13">{reply.name}</Text>
                      {'  '}
                      <Text className="text-13">{reply.text}</Text>
                    </Text>
                    <Text className="mt-1.5 text-13 text-grey-400">{reply.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center px-6 py-20">
            <SVGS.Comment width={32} height={32} color="#A7A7A7" />
            <Text className="mt-4 text-center font-medium text-base text-black">No comment history</Text>
            <Text className="mt-1 text-center text-sm text-grey-500">Your comments will appear here.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
