import {useMemo, useState} from 'react';
import {Image, Pressable, ScrollView, SectionList, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {cn} from '@/utils';
import {MENTION_HISTORY, type MentionHistoryItem, type MentionType} from '@/mock-data/mention-history';

const FILTERS: {label: string; type?: MentionType}[] = [
  {label: 'All Mentions'},
  {label: 'Posts', type: 'post'},
  {label: 'Comments', type: 'comment'},
  {label: 'Stories', type: 'story'},
];

function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-8 pb-24 pt-16">
      <View className="h-24 w-24 items-center justify-center rounded-full bg-white">
        <SVGS.Mention2 width={54} height={54} color="#111111" />
      </View>
      <Text className="mt-6 text-center font-semibold text-base text-black">No mention yet</Text>
      <Text className="mt-2 text-center text-sm leading-5 text-grey-400">
        When someone tags or mentions you, it will appear here.
      </Text>
    </View>
  );
}

export default function MentionHistoryScreen() {
  const {back} = useRouter();
  const [filter, setFilter] = useState(FILTERS[0].label);

  const sections = useMemo(() => {
    const type = FILTERS.find((item) => item.label === filter)?.type;
    const grouped = new Map<string, MentionHistoryItem[]>();
    for (const item of MENTION_HISTORY) {
      if (type && item.type !== type) continue;
      grouped.set(item.section, [...(grouped.get(item.section) ?? []), item]);
    }
    return [...grouped].map(([title, data]) => ({title, data}));
  }, [filter]);

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Mention History</Text>
        <View className="w-8" />
      </View>

      <Text className="px-4 text-sm leading-5 text-grey-400">
        See where people have mentioned or tagged you across posts, videos, and stories.
      </Text>

      {MENTION_HISTORY.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <View className="mt-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16, gap: 8}}>
              {FILTERS.map(({label}) => {
                const active = filter === label;
                return (
                  <Pressable
                    key={label}
                    onPress={() => setFilter(label)}
                    accessibilityRole="button"
                    accessibilityState={{selected: active}}
                    className={cn('items-center justify-center rounded-3xl px-3.5 py-2.5', active ? 'bg-black' : 'bg-white active:bg-grey-50')}>
                    <Text className={cn('font-medium text-xs', active ? 'text-white' : 'text-black')}>{label}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          <SectionList
            className="flex-1"
            sections={sections}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: 16, paddingBottom: 32}}
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({section}) => <Text className="mb-2 mt-5 font-semibold text-sm text-black">{section.title}</Text>}
            renderItem={({item, index, section}) => {
              const isFirst = index === 0;
              const isLast = index === section.data.length - 1;
              return (
                <View className={cn('bg-white px-4', isFirst && 'rounded-t-2xl', isLast && 'rounded-b-2xl')}>
                  <View className="flex-row items-center py-4">
                    <Image source={{uri: item.avatar}} className="h-10 w-10 rounded-full bg-grey-50" />
                    <View className="mx-3 flex-1">
                      <View className="flex-row items-start justify-between">
                        <Text numberOfLines={1} className="mr-2 flex-1 font-semibold text-sm text-black">
                          {item.name}
                        </Text>
                        <Text className="text-xs font-medium text-grey-950">{item.time}</Text>
                      </View>
                      <Text className="mt-1 text-sm leading-5 text-black">
                        {item.textBefore}
                        <Text className="font-bold">{item.mention}</Text>
                        {item.textAfter}
                      </Text>
                    </View>
                    <Image source={{uri: item.thumbnail}} className="h-10 w-10 rounded-lg bg-grey-50" />
                  </View>
                  {isLast ? null : <View className="h-px bg-grey-50" />}
                </View>
              );
            }}
            ListEmptyComponent={<EmptyState />}
          />
        </>
      )}
    </SafeAreaView>
  );
}
