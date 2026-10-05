import {Pressable, ScrollView, Text, View} from 'react-native';
import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {STATIC, SVGS} from '@/assets';

const INTRO = 'Track your content performance, audience growth, and earnings—all in one place.';

const CARDS = [
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Track content performance and audience trends to create standout videos.',
    meta: '18 videos',
    image: STATIC.analytics,
  },
  {
    id: 'engagement',
    title: 'Engagement',
    description: 'Measure audience connection with content. Analyze interactions and engagement trends.',
    meta: '18 videos',
    image: STATIC.engagement,
  },
  {
    id: 'monetization',
    title: 'Monetization',
    description: 'Turn your content into earnings. Explore ways to monetize your videos and grow your income.',
    meta: '18 videos',
    image: STATIC.monetization,
  },
] as const;

function VideoMeta({label}: {label: string}) {
  return (
    <View className="mt-3 flex-row items-center">
      <View className="h-4 w-4 items-center justify-center rounded-full border border-grey-200">
        <SVGS.Play2 width={7} height={8} color="#A7A7A7" />
      </View>
      <Text className="ml-1.5 text-xs text-grey-200">{label}</Text>
    </View>
  );
}

export function ProfessionalDashboardScreen() {
  const {back} = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-3">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Professional Dashboard</Text>
        <View className="w-8" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 4, paddingBottom: 24}}
        showsVerticalScrollIndicator={false}>
        <Text className="text-sm leading-5 text-grey-400">{INTRO}</Text>

        <View className="mt-4 gap-3">
          {CARDS.map(card => (
            <Pressable
              key={card.id}
              accessibilityRole="button"
              accessibilityLabel={card.title}
              className="flex-row overflow-hidden rounded-2xl bg-white px-4 py-4 active:opacity-90"
              style={{
                shadowColor: '#000',
                shadowOpacity: 0.06,
                shadowRadius: 10,
                shadowOffset: {width: 0, height: 2},
                elevation: 2,
              }}>
              <View className="mr-2 flex-1 justify-between pr-1">
                <View>
                  <Text className="font-bold text-base text-black">{card.title}</Text>
                  <Text className="mt-1.5 text-xs leading-4 text-grey-400">{card.description}</Text>
                </View>
                <VideoMeta label={card.meta} />
              </View>
              <Image source={card.image} style={{width: 112, height: 100}} contentFit="contain" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
