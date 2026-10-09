import {useCallback, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useFocusEffect, useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {RadioOption} from '@/components/RadioOption';
import {
  formatDuration,
  getScreenTimeState,
  setScreenTimeMode,
  WEEKDAYS,
  type ScreenTimeMode,
  type Weekday,
} from '@/mock-data/daily-screen-time';
import {CHEVRON_COLOR} from '@/theme/colors';

export default function SetScreenTimeLimitScreen() {
  const {back, push} = useRouter();
  const initial = getScreenTimeState();
  const [mode, setMode] = useState<ScreenTimeMode>(initial.mode);
  const [dayLimits, setDayLimits] = useState(initial.dayLimits);

  useFocusEffect(
    useCallback(() => {
      setDayLimits(getScreenTimeState().dayLimits);
    }, []),
  );

  const handleNext = () => {
    setScreenTimeMode(mode);
    if (mode === 'same') {
      push('/screen-time-duration?scope=all' as Href);
      return;
    }
    back();
  };

  const openDay = (day: Weekday) => {
    setMode('custom');
    setScreenTimeMode('custom');
    push(`/screen-time-duration?scope=${day}` as Href);
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Set Screen Time Limit</Text>
        <View className="w-8" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 16, paddingTop: 4, paddingBottom: 8}}
        showsVerticalScrollIndicator={false}>
        <Text className="text-sm leading-5 text-grey-400">Control how much time you spend on the app each day.</Text>

        <View className="mt-4 rounded-[20px] bg-white px-4 pb-2 pt-3">
          <Text className="mb-1 font-medium text-sm text-grey-400">How Would You Like to Set Your Limit?</Text>

          <RadioOption
            label="Same Limit Every Day"
            description="Set one daily time limit that applies to all days."
            selected={mode === 'same'}
            onPress={() => setMode('same')}
          />
          <RadioOption
            label="Custom Limits for Each Day"
            description="Choose different time limits for weekdays and weekends."
            selected={mode === 'custom'}
            onPress={() => setMode('custom')}
          />

          {mode === 'custom' ? (
            <View className="pb-1 pt-1">
              <Text className="mb-1 font-medium text-sm text-grey-400">Set custom limit for each day</Text>
              {WEEKDAYS.map(day => (
                <Pressable
                  key={day.id}
                  onPress={() => openDay(day.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Set limit for ${day.label}`}
                  className="flex-row items-center py-3 active:opacity-70">
                  <Text className="flex-1 font-semibold text-15 text-black">{day.label}</Text>
                  <Text className="mr-1.5 text-sm text-grey-400">{formatDuration(dayLimits[day.id])}</Text>
                  <SVGS.ArrowRight width={16} height={16} color={CHEVRON_COLOR} strokeWidth={2.2} />
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>

      <View className="bg-secondary px-4 pb-4 pt-6">
        <Button title="Next" onPress={handleNext} className="rounded-2xl" />
      </View>
    </SafeAreaView>
  );
}
