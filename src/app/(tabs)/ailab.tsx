import {useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {AiLabTopGlow, AI_LAB_GRADIENT} from '@/modules/ailab';
import {cn} from '@/utils';

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
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    
  },
];

const SHORTCUTS = [
  {label: 'Effects', Icon: SVGS.Effects, href: '/effects' as Href},
  {label: 'Tools', Icon: SVGS.AiLabsTools},
  {label: 'Short Vids', Icon: SVGS.ShortVids},
  {label: 'Story', Icon: SVGS.People},
  {label: 'Ads', Icon: SVGS.Ads},
];

const CREATORS = [
  {label: 'AI Video', Icon: SVGS.AiVideo, href: '/generate?mode=text_video' as Href},
  {label: 'AI Image', Icon: SVGS.AiImage, href: '/generate?mode=text_image' as Href},
  {label: 'Drafts', Icon: SVGS.Draft},
];

export default function AiLab() {
  const {navigate} = useRouter();
  const [chip, setChip] = useState<(typeof CHIPS)[number]>('Saved');

  return (
    <View className="flex-1 bg-black">
      <AiLabTopGlow gradient="wash" />
      <SafeAreaView className="flex-1 px-4" edges={['top']}>
        <View className="z-20 flex-row items-center justify-between py-5">
          <Pressable className="h-10 w-10 items-center justify-center rounded-full">
            <SVGS.Back width={22} height={22} className="text-white" />
          </Pressable>
          <Text className="font-bold text-lg text-white">AI Lab</Text>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <SVGS.ArrowRight2 width={18} height={18} className="text-white" />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className='pb-6'>
          <View className="flex-row justify-between">
            {SHORTCUTS.map(({label, Icon, href}) => (
              <Pressable
                key={label}
                className="flex-1 items-center"
                onPress={href ? () => navigate(href) : undefined}>
                <View className="h-12 w-12 items-center justify-center rounded-xl bg-grey-700">
                  <Icon width={18} height={18} className="text-white" />
                </View>
                <Text className="mt-2 text-center text-xs font-semibold text-white" numberOfLines={1}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="mt-8 flex-row justify-between gap-3">
            {CREATORS.map(({label, Icon, href}) => (
              <Pressable
                key={label}
                className="h-[4.5rem] flex-1 overflow-hidden rounded-xl"
                onPress={href ? () => navigate(href) : undefined}>
                <LinearGradient
                  colors={AI_LAB_GRADIENT.soft}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Icon width={24} height={24} className="text-black" />
                  <Text className="mt-2 font-medium text-[13px] text-black">{label}</Text>
                </LinearGradient>
              </Pressable>
            ))}
          </View>

          <Text className="mt-6 mb-2 font-bold text-xl text-white">Templates</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='pt-3'>
            {CHIPS.map(item => {
              const active = item === chip;
              return (
                <Pressable
                  key={item}
                  onPress={() => setChip(item)}
                  className={cn('mr-2 rounded-full px-4 py-2 border border-gray-700', active ? 'bg-grey-700' : 'bg-transparent')}>
                  <Text className={cn('text-xs font-medium ', active ? 'text-white' : 'text-grey-200')}>{item}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View className="mt-4 flex-row flex-wrap justify-between">
            {TEMPLATES.concat(TEMPLATES).map((item, index) => (
              <View key={`${item.id}-${index}`} className="mb-4 w-[48%]">
                <Image source={{uri: item.image}} className="aspect-[3/4] w-full rounded-10 bg-white/10" />
                <Text className="mt-2 font-medium text-sm text-white">{item.title}</Text>
                <Text className="mt-0.5 text-xs text-grey-300">{item.stats}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
