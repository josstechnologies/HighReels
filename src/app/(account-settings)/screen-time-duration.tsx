import {useMemo, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {DurationPickerWheel} from '@/components/DurationPickerWheel';
import {RadioDot} from '@/components/RadioOption';
import {
  getScreenTimeState,
  matchPresetId,
  minutesToParts,
  partsToMinutes,
  PRESET_LIMITS,
  setDayLimitMinutes,
  setSameLimitMinutes,
  WEEKDAYS,
  type Weekday,
} from '@/mock-data/daily-screen-time';
function isWeekday(value: string): value is Weekday {
  return WEEKDAYS.some(d => d.id === value);
}

export default function ScreenTimeDurationScreen() {
  const {back} = useRouter();
  const params = useLocalSearchParams<{scope?: string}>();
  const scope = typeof params.scope === 'string' ? params.scope : 'all';
  const isAll = scope === 'all';
  const day = isWeekday(scope) ? scope : null;

  const initialMinutes = useMemo(() => {
    const state = getScreenTimeState();
    if (day) return state.dayLimits[day];
    return state.sameLimitMinutes;
  }, [day]);

  const [presetId, setPresetId] = useState(() => matchPresetId(initialMinutes));
  const [customParts, setCustomParts] = useState(() => {
    const parts = minutesToParts(initialMinutes);
    return {hours: parts.hours, minutes: parts.mins};
  });

  const dayLabel = day ? WEEKDAYS.find(d => d.id === day)?.label : null;

  const handleSelectPreset = (id: string, minutes: number | 'custom') => {
    setPresetId(id);
    if (minutes !== 'custom') {
      const parts = minutesToParts(minutes);
      setCustomParts({hours: parts.hours, minutes: parts.mins});
    }
  };

  const handleSave = () => {
    const preset = PRESET_LIMITS.find(p => p.id === presetId);
    const minutes =
      !preset || preset.minutes === 'custom'
        ? partsToMinutes(customParts.hours, customParts.minutes)
        : preset.minutes;

    if (day) {
      setDayLimitMinutes(day, minutes);
    } else {
      setSameLimitMinutes(minutes);
    }
    back();
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
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled>

        <Text className="text-sm leading-5 text-grey-400">
          {dayLabel ? `Set a time limit for ${dayLabel}.` : 'Control how much time you spend on the app each day.'}
        </Text>

        <View className="mt-4 rounded-[20px] bg-white px-4 pb-3 pt-3">
          <Text className="mb-1 font-medium text-sm text-grey-400">Time Limit</Text>
          {PRESET_LIMITS.map(item => {
            const selected = presetId === item.id;
            const isCustom = item.id === 'custom';
            return (
              <View key={item.id}>
                <Pressable
                  onPress={() => handleSelectPreset(item.id, item.minutes)}
                  accessibilityRole="radio"
                  accessibilityState={{selected}}
                  accessibilityLabel={item.label}
                  className="flex-row items-center py-3 active:opacity-70">
                  <Text className="flex-1 font-semibold text-15 text-black">{item.label}</Text>
                  <RadioDot selected={selected} />
                </Pressable>

                {isCustom && selected ? (
                  <View className="pb-1 pt-1">
                    <Text className="mb-2 font-medium text-sm text-grey-400">Select Time</Text>
                    <DurationPickerWheel value={customParts} onChange={setCustomParts} maxHours={23} />
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>

        {!isAll && !day ? <Text className="mt-4 text-sm text-grey-400">Invalid day. Go back and try again.</Text> : null}
      </ScrollView>

      <View className="bg-secondary px-4 pb-4 pt-6">
        <Button title="Save" onPress={handleSave} className="rounded-2xl" />
      </View>
    </SafeAreaView>
  );
}
