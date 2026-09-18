import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useLocalSearchParams, useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import { Progress } from '@/components/ui/progress';
import { AiLabTopGlow } from '@/components';

const DEMO_POSTER = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80';

function DetailChip({value, label}: {value: string; label: string}) {
  return (
    <View className="mr-2 flex-row items-end gap-0.5 rounded-xl bg-grey-700 px-4 py-2.5">
      <Text className="text-xs font-semibold text-white">{value}</Text>
      <Text className="text-micro text-grey-200"> {label}</Text>
    </View>
  );
}

export default function VideoResult() {
  const {back, dismissAll, replace} = useRouter();
  const {
    title = 'Text to Video',
    prompt = 'Drone flying over mountains at sunrise',
    ratio = '16:9',
    duration = '10 sec',
    resolution = '1080P',
  } = useLocalSearchParams<{
    title?: string;
    prompt?: string;
    ratio?: string;
    duration?: string;
    resolution?: string;
  }>();

  const seconds = String(duration).replace(/\D/g, '') || '10';
  const durationValue = `${seconds}s`;

  const goToFeed = () => {
    dismissAll();
    replace('/(tabs)' as Href);
  };

  return (
    <View className="flex-1 bg-black">
      <AiLabTopGlow gradient="soft20" />
      <SafeAreaView className="flex-1 px-4" edges={['top', 'bottom']}>
        <View className="z-20 flex-row items-center py-4">
          <Pressable onPress={back} className="h-10 w-10 items-center justify-center" hitSlop={8}>
            <SVGS.Back width={24} height={24} className="text-white" />
          </Pressable>
          <Text className="flex-1 text-center text-base font-bold text-white">{title}</Text>
          <View className="w-10" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="mt-2 overflow-hidden rounded-3xl bg-grey-900">
            <View className="h-[24rem] w-full">
              <Image source={{uri: DEMO_POSTER}} className="h-full w-full" />
              <View className="absolute inset-0 items-center justify-center">
                <View className="h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <SVGS.Play width={22} height={22} className="text-white" />
                </View>
              </View>
              <View className="absolute bottom-4 left-4 right-4">
                <View className="mb-1.5 flex-row justify-between">
                  <Text className="text-micro text-white">0:00</Text>
                  <Text className="text-micro text-white">0:{seconds.padStart(2, '0')}</Text>
                </View>
                <Progress value={33} className="h-1 bg-white/30" indicatorClassName="bg-primary" />
              </View>
            </View>
          </View>

          <Text className="mb-3 mt-6 font-bold text-base text-white">Prompt</Text>
          <View className="rounded-20 bg-grey-700 p-4"> 
            <Text className="text-sm text-white">{prompt}</Text>
          </View>

          <Text className="mb-3 mt-6 font-bold text-base text-white">Video Details</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DetailChip value={String(ratio)} label="Aspect" />
            <DetailChip value={durationValue} label="Duration" />
            <DetailChip value={String(resolution)} label="Resolution" />
          </ScrollView>

          <View className="gap-3 pt-10 pb-10">
            <Pressable onPress={back} className="h-14 flex-row items-center justify-center rounded-xl bg-primary">
              <SVGS.Ai width={20} height={20} className="text-white" />
              <Text className="ml-2 font-semibold text-base text-white">Generate again</Text>
            </Pressable>
            <Pressable
              onPress={goToFeed}
              className="h-14 items-center justify-center rounded-xl border border-grey-700 bg-transparent">
              <Text className="font-semibold text-base text-white">Go to feed</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
