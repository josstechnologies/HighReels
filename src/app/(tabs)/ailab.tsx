import {useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';

const CHIPS = ['Saved', 'AI Tools', 'Text to video', 'Text to image'] as const;

const TEMPLATES = [
  {
    id: 'couple',
    title: 'Couple',
    stats: '7.4M videos * 12 clips',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80',
  },
  {
    id: 'sky',
    title: 'Sky Diving',
    stats: '7.4M videos * 12 clips',
    image: 'https://images.unsplash.com/photo-1521685366472-88f6b8b8d4ef?w=600&q=80',
  },
];

const SHORTCUTS = [
  {label: 'Effects', Icon: SVGS.Effects, href: '/effects' as Href},
  {label: 'Tools', Icon: SVGS.Tools},
  {label: 'Short Vids', Icon: SVGS.ShortVids},
  {label: 'Story', Icon: SVGS.Story},
  {label: 'Ads', Icon: SVGS.Ads},
];

export default function AiLab() {
  const {navigate} = useRouter();
  const [chip, setChip] = useState<(typeof CHIPS)[number]>('Saved');

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-row items-center justify-between px-4 py-2">
          <Pressable className="h-10 w-10 items-center justify-center rounded-full">
            <SVGS.Back width={22} height={22} className="text-white" />
          </Pressable>
          <Text className="font-semibold text-[17px] text-white">AI Lab</Text>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <SVGS.ArrowRight width={18} height={18} className="text-white" />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 24}}>
          <View className="mt-2 flex-row justify-between px-5">
            {SHORTCUTS.map(({label, Icon, href}) => (
              <Pressable key={label} className="w-16 items-center" onPress={href ? () => navigate(href) : undefined}>
                <Icon width={26} height={26} className="text-white" />
                <Text className="mt-2 text-center text-[12px] text-white">{label}</Text>
              </Pressable>
            ))}
          </View>

          <View className="mt-4 flex-row gap-3 px-4">
            <Pressable
              className="h-[88px] flex-1 items-center justify-center rounded-2xl bg-[#E7F0FF]"
              onPress={() => navigate({pathname: '/shortvideo', params: {mode: 'text_video'}} as unknown as Href)}>
              <SVGS.Play width={26} height={26} className="text-black" />
              <Text className="mt-1 font-semibold text-[14px] text-black">AI Video</Text>
            </Pressable>
            <Pressable
              className="h-[88px] flex-1 items-center justify-center rounded-2xl bg-[#F3E8FF]"
              onPress={() => navigate({pathname: '/shortvideo', params: {mode: 'text_image'}} as unknown as Href)}>
              <SVGS.Photo width={26} height={26} className="text-black" />
              <Text className="mt-1 font-semibold text-[14px] text-black">AI Image</Text>
            </Pressable>
            <Pressable className="h-[88px] w-[92px] items-center justify-center rounded-2xl bg-[#FDE7D4]">
              <SVGS.ShortVids width={26} height={26} className="text-black" />
              <Text className="mt-1 font-semibold text-[14px] text-black">Drafts</Text>
            </Pressable>
          </View>

          <Text className="mt-6 px-4 font-semibold text-[22px] text-white">Templates</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16, paddingTop: 12}}>
            {CHIPS.map(item => {
              const active = item === chip;
              return (
                <Pressable
                  key={item}
                  onPress={() => setChip(item)}
                  className={`mr-2 rounded-full px-4 py-2 ${active ? 'bg-white' : 'bg-white/10'}`}>
                  <Text className={`text-[13px] ${active ? 'font-semibold text-black' : 'text-white'}`}>{item}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View className="mt-4 flex-row flex-wrap justify-between px-4">
            {TEMPLATES.concat(TEMPLATES).map((item, index) => (
              <View key={`${item.id}-${index}`} className="mb-4 w-[48%]">
                <Image source={{uri: item.image}} className="aspect-[3/4] w-full rounded-2xl bg-white/10" />
                <Text className="mt-2 font-semibold text-[15px] text-white">{item.title}</Text>
                <Text className="mt-0.5 text-[12px] text-white/50">{item.stats}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
