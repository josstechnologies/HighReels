import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useLocalSearchParams, useRouter, type Href} from 'expo-router';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {AiLabTopGlow} from '@/modules/ailab';

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

export default function ImageResult() {
  const {back, dismissAll, replace} = useRouter();
  const insets = useSafeAreaInsets();
  const {
    title = 'Text to Image',
    prompt = 'A futuristic city glowing at night',
    ratio = '9:16',
    outputs = '1',
  } = useLocalSearchParams<{
    title?: string;
    prompt?: string;
    ratio?: string;
    outputs?: string;
  }>();

  const count = Math.max(1, Number(outputs) || 1);

  const goToFeed = () => {
    dismissAll();
    replace('/(tabs)' as Href);
  };

  return (
    <View className="flex-1 bg-black" style={{backgroundColor: '#000'}}>
      <AiLabTopGlow gradient="soft20" />
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="z-20 flex-row items-center px-4 py-4">
          <Pressable onPress={back} className="h-10 w-10 items-center justify-center" hitSlop={8}>
            <SVGS.Back width={22} height={22} className="text-white" />
          </Pressable>
          <Text className="flex-1 text-center font-semibold text-[17px] text-white">{title}</Text>
          <View className="w-10" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 140 + insets.bottom}}>
          {count === 1 ? (
            <View className="mt-2 overflow-hidden rounded-3xl bg-grey-900">
              <Image source={{uri: DEMO_POSTER}} className="aspect-[3/4] w-full" />
            </View>
          ) : (
            <View className="mt-2 flex-row flex-wrap justify-between">
              {Array.from({length: count}).map((_, i) => (
                <View key={i} className="mb-3 w-[48%] overflow-hidden rounded-2xl bg-grey-900">
                  <Image source={{uri: DEMO_POSTER}} className="aspect-[3/4] w-full" />
                </View>
              ))}
            </View>
          )}

          <Text className="mb-3 mt-6 font-semibold text-[16px] text-white">Prompt</Text>
          <View className="rounded-2xl bg-grey-900 px-4 py-4">
            <Text className="text-[15px] text-white">{prompt}</Text>
          </View>

          <Text className="mb-3 mt-6 font-semibold text-[16px] text-white">Image Details</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DetailChip value={String(ratio)} label="Aspect" />
            <DetailChip value={String(outputs)} label="Outputs" />
          </ScrollView>
        </ScrollView>

        <View
          className="absolute bottom-0 left-0 right-0 bg-black px-4 pt-2"
          style={{paddingBottom: Math.max(insets.bottom, 16), backgroundColor: '#000'}}>
          <Pressable onPress={back} className="mb-3 h-14 flex-row items-center justify-center rounded-full bg-primary">
            <SVGS.Ai width={18} height={18} className="text-white" />
            <Text className="ml-2 font-semibold text-[16px] text-white">Generate again</Text>
          </Pressable>
          <Pressable
            onPress={goToFeed}
            className="h-14 items-center justify-center rounded-full border border-grey-600 bg-grey-900">
            <Text className="font-semibold text-[16px] text-white">Go to feed</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
