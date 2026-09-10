import {useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';

const CHIPS = ['Discover', 'Create', 'Stylish', 'New'] as const;

const PHOTOS = [
  {
    id: 'richman',
    name: 'Richman',
    pro: true,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80',
  },
  {
    id: 'alex',
    name: 'Alex',
    pro: false,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80',
  },
  {
    id: 'harry',
    name: 'Harry',
    pro: false,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80',
  },
];

const COMMUNITY = [
  {
    id: 'dog',
    caption: 'the camera slowly turns',
    likes: 12,
    comments: 17,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80',
  },
  {
    id: 'face',
    caption: 'the camera slowly turns',
    likes: 12,
    comments: 17,
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80',
  },
  {
    id: 'third',
    caption: 'the camera slowly turns',
    likes: 12,
    comments: 17,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
  },
];

function SeeAll({onPress}: {onPress?: () => void}) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center">
      <Text className="text-[13px] text-grey-200">See All</Text>
      <SVGS.ArrowRight width={14} height={14} className="text-grey-200" />
    </Pressable>
  );
}

export default function Effects() {
  const {back, navigate} = useRouter();
  const [chip, setChip] = useState<(typeof CHIPS)[number]>('Discover');

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-row items-center justify-center px-4 py-2">
          <Pressable onPress={back} className="absolute left-4 h-10 w-10 items-center justify-center">
            <SVGS.Back width={22} height={22} className="text-black" />
          </Pressable>
          <Text className="font-semibold text-[17px] text-black">Effects</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 28}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16, paddingTop: 8}}>
            {CHIPS.map(item => {
              const active = item === chip;
              return (
                <Pressable
                  key={item}
                  onPress={() => setChip(item)}
                  className={`mr-2 rounded-full px-4 py-2 ${active ? 'bg-black' : 'bg-secondary'}`}>
                  <Text className={`text-[13px] ${active ? 'font-semibold text-white' : 'text-black'}`}>{item}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View className="mx-4 mt-4 overflow-hidden rounded-3xl">
            <Image
              source={{uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80'}}
              className="h-52 w-full"
            />
            <View className="absolute inset-0 justify-end bg-black/25 p-4">
              <View className="flex-row items-end justify-between">
                <View className="flex-1 pr-3">
                  <Text className="font-semibold text-[22px] text-white">Micro Magic</Text>
                  <Text className="mt-1 text-[13px] text-white/90">Tiny crew stars your product</Text>
                </View>
                <Pressable className="rounded-full bg-white px-4 py-2">
                  <Text className="font-semibold text-[13px] text-black">Try Now</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View className="mt-6 flex-row items-center justify-between px-4">
            <Text className="font-semibold text-[18px] text-black">AI Photoshoots Male</Text>
            <SeeAll
              onPress={() =>
                navigate({pathname: '/effect-filters', params: {title: 'AI Photoshoot Male'}} as unknown as Href)
              }
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16, paddingTop: 12}}>
            {PHOTOS.map(item => (
              <View key={item.id} className="mr-3 w-[132px]">
                <View className="overflow-hidden rounded-2xl">
                  <Image source={{uri: item.image}} className="h-44 w-full bg-secondary" />
                  {item.pro ? (
                    <View className="absolute left-2 top-2 flex-row items-center rounded-full bg-black/70 px-2 py-1">
                      <SVGS.Star width={12} height={12} className="text-white" />
                      <Text className="ml-1 text-[11px] text-white">Pro</Text>
                    </View>
                  ) : null}
                  <View className="absolute bottom-2 left-2 h-8 w-8 overflow-hidden rounded-full border-2 border-white">
                    <Image source={{uri: item.image}} className="h-full w-full" />
                  </View>
                </View>
                <Text className="mt-2 text-[14px] text-black">{item.name}</Text>
              </View>
            ))}
          </ScrollView>

          <View className="mt-6 flex-row items-center justify-between px-4">
            <Text className="font-semibold text-[18px] text-black">Community</Text>
            <SeeAll />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16, paddingTop: 12}}>
            {COMMUNITY.map(item => (
              <View key={item.id} className="mr-3 w-[148px]">
                <View className="overflow-hidden rounded-2xl">
                  <Image source={{uri: item.image}} className="h-48 w-full bg-secondary" />
                  <View className="absolute left-2 top-2 h-7 w-7 items-center justify-center rounded-full bg-black/45">
                    <SVGS.Play width={14} height={14} className="text-white" />
                  </View>
                  <View className="absolute bottom-2 left-2 flex-row items-center">
                    <SVGS.Heart width={14} height={14} className="text-white" />
                    <Text className="ml-1 mr-2 text-[12px] text-white">{item.likes}</Text>
                    <SVGS.Comment width={14} height={14} className="text-white" />
                    <Text className="ml-1 text-[12px] text-white">{item.comments}</Text>
                  </View>
                </View>
                <Text numberOfLines={1} className="mt-2 text-[13px] text-grey-400">
                  {item.caption}
                </Text>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
