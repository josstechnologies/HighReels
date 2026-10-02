import {Alert, Image, Pressable, ScrollView, Text, useWindowDimensions, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {WATCH_HISTORY, type WatchHistoryItem} from '@/mock-data/watch-history';

const COLS = 3;
const GAP = 2;

function VideoThumb({item, size}: {item: WatchHistoryItem; size: number}) {
  const height = size * 1.25;
  return (
    <Pressable
      onPress={() => Alert.alert(item.views, 'Coming soon')}
      accessibilityRole="button"
      accessibilityLabel={`Video with ${item.views} views`}
      style={{width: size, height}}
      className="overflow-hidden bg-grey-50 active:opacity-90">
      <Image source={{uri: item.thumbnail}} style={{width: size, height}} />
      <View className="absolute bottom-1.5 left-1.5 flex-row items-center">
        <SVGS.Play2 width={10} height={10} fill="none" color="#FFFFFF" />
        <Text className="ml-1 font-medium text-xs text-white">{item.views}</Text>
      </View>
    </Pressable>
  );
}

export function WatchHistoryScreen() {
  const {back} = useRouter();
  const {width} = useWindowDimensions();
  const cellSize = (width - GAP * (COLS - 1)) / COLS;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between bg-white px-4 py-3">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="absolute left-0 right-0 text-center font-bold text-lg text-black" pointerEvents="none">
          Watch History
        </Text>
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => Alert.alert('Search', 'Coming soon')}
            accessibilityRole="button"
            accessibilityLabel="Search watch history"
            className="rounded-full p-1 active:bg-grey-50">
            <SVGS.Search width={22} height={22} color="#111111" />
          </Pressable>
          <Pressable
            onPress={() => Alert.alert('More', 'Coming soon')}
            accessibilityRole="button"
            accessibilityLabel="More options"
            className="rounded-full p-1 active:bg-grey-50">
            <SVGS.ThreeDot width={22} height={22} color="#111111" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{paddingBottom: 32}} showsVerticalScrollIndicator={false}>
        <Text className="px-4 pt-1 text-sm leading-5 text-grey-400">
          Revisit the videos you've watched in the last 30 days.
        </Text>

        <View className="mt-3 px-4">
          <Pressable
            onPress={() => Alert.alert('Filter by date', 'Coming soon')}
            accessibilityRole="button"
            accessibilityLabel="Filter by date"
            className="h-9 flex-row items-center self-start rounded-full bg-black px-4 active:opacity-90">
            <Text className="font-semibold text-sm text-white">Filter by date</Text>
            <View style={{transform: [{rotate: '90deg'}]}} className="ml-1.5">
              <SVGS.ArrowRight width={12} height={12} color="#FFFFFF" strokeWidth={2.2} />
            </View>
          </Pressable>
        </View>

        <View className="mt-4">
          {WATCH_HISTORY.map(section => (
            <View key={section.title}>
              <View className="bg-grey-50 px-4 py-2.5">
                <Text className="font-semibold text-sm text-black">{section.title}</Text>
              </View>
              <View className="flex-row flex-wrap" style={{gap: GAP}}>
                {section.data.map(item => (
                  <VideoThumb key={item.id} item={item} size={cellSize} />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
