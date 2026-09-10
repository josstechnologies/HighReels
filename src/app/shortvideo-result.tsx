import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useLocalSearchParams, useRouter, type Href} from 'expo-router';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';

const DEMO_POSTER = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80';

function DetailChip({value, label}: {value: string; label: string}) {
  return (
    <View className="mr-2 rounded-full bg-grey-800 px-3.5 py-2.5">
      <Text className="text-[13px]">
        <Text className="font-semibold text-white">{value}</Text>
        <Text className="text-grey-200"> {label}</Text>
      </Text>
    </View>
  );
}

export default function ShortVideoResult() {
  const {back, navigate} = useRouter();
  const insets = useSafeAreaInsets();
  const {
    title = 'Text to Video',
    kind = 'video',
    prompt = 'Drone flying over mountains at sunrise',
    ratio = '16:9',
    duration = '10 sec',
    resolution = '1080P',
    outputs = '1',
  } = useLocalSearchParams<{
    title?: string;
    kind?: string;
    prompt?: string;
    ratio?: string;
    duration?: string;
    resolution?: string;
    outputs?: string;
  }>();

  const isImage = kind === 'image';
  const seconds = String(duration).replace(/\D/g, '') || '10';
  const durationValue = `${seconds}s`;

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-row items-center px-4 py-2">
          <Pressable onPress={back} className="h-10 w-10 items-center justify-center">
            <SVGS.Back width={22} height={22} className="text-white" />
          </Pressable>
          <Text className="flex-1 text-center font-semibold text-[17px] text-white">{title}</Text>
          <View className="w-10" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 140 + insets.bottom}}>
          <View className="mt-2 overflow-hidden rounded-3xl bg-grey-900">
            <View className={isImage ? 'aspect-[3/4] w-full' : 'aspect-video w-full'}>
              <Image source={{uri: DEMO_POSTER}} className="h-full w-full" />
              {!isImage && (
                <>
                  <View className="absolute inset-0 items-center justify-center">
                    <View className="h-14 w-14 items-center justify-center rounded-full bg-black/45">
                      <SVGS.Play width={22} height={22} className="text-white" />
                    </View>
                  </View>
                  <View className="absolute bottom-3 left-3 right-3">
                    <View className="mb-1.5 flex-row justify-between">
                      <Text className="text-[11px] text-white">0:00</Text>
                      <Text className="text-[11px] text-white">0:{seconds.padStart(2, '0')}</Text>
                    </View>
                    <View className="justify-center">
                      <View className="h-1 rounded-full bg-white/30">
                        <View className="h-1 w-[33%] rounded-full bg-primary" />
                      </View>
                      <View className="absolute left-[33%] ml-[-6px] h-3 w-3 rounded-full bg-white" />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>

          <Text className="mb-3 mt-6 font-semibold text-[16px] text-white">Prompt</Text>
          <View className="rounded-2xl bg-grey-900 px-4 py-4">
            <Text className="text-[15px] text-white">{prompt}</Text>
          </View>

          <Text className="mb-3 mt-6 font-semibold text-[16px] text-white">{isImage ? 'Image Details' : 'Video Details'}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DetailChip value={String(ratio)} label="Aspect" />
            {isImage ? (
              <DetailChip value={String(outputs)} label="Outputs" />
            ) : (
              <>
                <DetailChip value={durationValue} label="Duration" />
                <DetailChip value={String(resolution)} label="Resolution" />
              </>
            )}
          </ScrollView>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 bg-black px-4 pt-2" style={{paddingBottom: Math.max(insets.bottom, 16)}}>
          <Pressable onPress={back} className="mb-3 h-14 flex-row items-center justify-center rounded-full bg-primary">
            <SVGS.Ai width={18} height={18} className="text-white" />
            <Text className="ml-2 font-semibold text-[16px] text-white">Generate again</Text>
          </Pressable>
          <Pressable
            onPress={() => navigate('/(tabs)' as Href)}
            className="h-14 items-center justify-center rounded-full border border-grey-600 bg-grey-900">
            <Text className="font-semibold text-[16px] text-white">Go to feed</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
