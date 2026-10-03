import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IMAGES, SVGS} from '@/assets';
import {Button} from '@/components/Button';
import type {ReactElement} from 'react';
import type {SvgProps} from 'react-native-svg';

const H_PAD = 16;

const BENEFITS: {label: string; Icon: (props: SvgProps) => ReactElement; iconW: number; iconH: number}[] = [
  {label: 'Reduce distractions', Icon: SVGS.EyeOff, iconW: 24, iconH: 24},
  {label: 'Build healthy habits', Icon: SVGS.HeartOutline, iconW: 24, iconH: 24},
  {label: 'Get reminders before you hit your limit', Icon: SVGS.BellOutline, iconW: 19, iconH: 20},
];

export function DailyScreenTimeScreen() {
  const {back, push} = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Daily Screen Time</Text>
        <View className="w-8" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingHorizontal: H_PAD, paddingTop: 4, paddingBottom: 16}}
        showsVerticalScrollIndicator={false}>
        <View className="overflow-hidden rounded-3xl bg-grey-50">
          <Image
            source={IMAGES.dailyScreenTimeHero}
            style={{width: '100%', aspectRatio: 354 / 220}}
            resizeMode="cover"
            accessibilityLabel="Daily screen time illustration"
          />
        </View>

        <Text className="mt-8 font-bold text-22 leading-7 text-black">Set Your Daily Screen Time Limit</Text>
        <Text className="mt-3 text-sm leading-5 text-grey-400">
          Control how much time you spend on the app each day. Stay focused, stay balanced.
        </Text>

        <View className="mt-8 gap-2.5">
          {BENEFITS.map(({label, Icon, iconW, iconH}) => (
            <View key={label} className="flex-row items-center rounded-2xl bg-grey-50 px-4 py-3.5">
              <View className="h-6 w-6 items-center justify-center">
                <Icon width={iconW} height={iconH} color="#111111" />
              </View>
              <Text className="ml-3 flex-1 font-medium text-sm leading-5 text-black">{label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="bg-secondary px-4 pb-4 pt-3">
        <Button title="Set Screen Time Limit" onPress={() => push('/set-screen-time-limit' as Href)} className="rounded-2xl" />
      </View>
    </SafeAreaView>
  );
}
