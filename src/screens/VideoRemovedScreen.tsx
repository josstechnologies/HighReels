import {Alert, Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {REMOVED_VIDEOS, VIDEO_REMOVED_INTRO, type RemovedVideo} from '@/mock-data/video-removed';

function OutlineChip({title, onPress}: {title: string; onPress: () => void}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      className="h-9 items-center justify-center rounded-xl border border-grey-75 bg-white px-3.5 active:opacity-80">
      <Text className="font-normal text-13 leading-4 text-black">{title}</Text>
    </Pressable>
  );
}

function RemovedVideoCard({video}: {video: RemovedVideo}) {
  return (
    <View className="mt-3">
      <View className="z-[1] min-h-[102px] flex-row items-center rounded-xl bg-white px-3 py-4">
        <Image source={{uri: video.thumbnail}} className="h-[70px] w-[70px] rounded-xl bg-grey-75" />
        <View className="ml-2.5 flex-1 justify-center">
          <Text numberOfLines={1} className="font-semibold text-sm leading-[18px] text-black">
            {video.title}
          </Text>
          <Text className="mt-0.5 text-xs leading-4 text-grey-400">
            Posted on: <Text className="font-medium text-black">{video.postedOn}</Text>
          </Text>
          <View className="mt-0.5 flex-row items-center">
            <SVGS.EyeOutline width={14} height={14} color="#666666" />
            <Text className="ml-1 text-xs leading-4 text-grey-400">{video.views}</Text>
          </View>
        </View>
      </View>

      <View className="z-0 -mt-3 rounded-b-3xl border-[1.5px] border-t-0 border-[#FFDADA] bg-[#FFF5F5] px-4 pb-4 pt-[26px]">
        <Text className="font-semibold text-sm leading-[18px] text-black">Reason:</Text>
        <Text className="mt-1 text-xs leading-4 text-grey-400">{video.reasonIntro}</Text>
        <View className="mt-1">
          {video.reasons.map(reason => (
            <View key={reason} className="mt-0.5 flex-row items-start">
              <Text className="w-3 text-xs leading-4 text-black">•</Text>
              <Text className="flex-1 text-xs leading-4 text-grey-400">{reason}</Text>
            </View>
          ))}
        </View>

        <View className="mt-3 h-[108px] w-full max-w-[327px] items-center justify-center self-center rounded-2xl bg-white px-3">
          <Text className="text-center font-semibold text-sm leading-[18px] text-black">Do you agree with this decision?</Text>
          <View className="mt-[18px] flex-row items-center justify-center gap-2.5">
            <OutlineChip title="I Understand" onPress={() => Alert.alert('I Understand', 'Coming soon')} />
            <OutlineChip title="Appeal Decision" onPress={() => Alert.alert('Appeal Decision', 'Coming soon')} />
          </View>
        </View>
      </View>
    </View>
  );
}

export function VideoRemovedScreen() {
  const {back} = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-3">
        <Pressable
          onPress={back}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Video Removed</Text>
        <View className="w-8" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 24}}
        showsVerticalScrollIndicator={false}>
        <Text className="text-sm leading-5 text-grey-400">{VIDEO_REMOVED_INTRO}</Text>

        {REMOVED_VIDEOS.map((video, index) => (
          <View key={video.id} className={index > 0 ? 'mt-4' : undefined}>
            <RemovedVideoCard video={video} />
          </View>
        ))}

        <View className="mt-4 items-center">
          <Pressable
            onPress={() => Alert.alert('View Guidelines', 'Coming soon')}
            accessibilityRole="button"
            accessibilityLabel="View Guidelines"
            className="h-12 w-full items-center justify-center active:opacity-70">
            <Text className="font-bold text-base leading-[22px] text-black">View Guidelines</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
