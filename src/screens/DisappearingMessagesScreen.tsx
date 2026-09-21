import {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import storage from 'expo-sqlite/kv-store';
import {SVGS} from '@/assets';

// Key for local persistence. Currently local-only; later this will be synced with the
// backend API (e.g., GET /privacy or GET /settings -> { disappearingTimer }) — server
// becomes source of truth and local cache is optimistic fallback. Keep default 'off'
// until server value loads.
const DISAPPEARING_TIMER_KEY = 'privacy:disappearingTimer';

type DisappearingTimer = 'off' | '24_hours' | '7_days' | '90_days';

const OPTIONS: {value: DisappearingTimer; label: string}[] = [
  {value: 'off', label: 'Off'},
  {value: '24_hours', label: '24 hours'},
  {value: '7_days', label: '7 days'},
  {value: '90_days', label: '90 days'},
];

export function DisappearingMessagesScreen() {
  const {back} = useRouter();
  const [selected, setSelected] = useState<DisappearingTimer>(() => {
    try {
      const raw = storage.getItemSync(DISAPPEARING_TIMER_KEY);
      if (raw != null) {
        // Handle both JSON-stringified string and raw string for backwards compat
        try {
          const parsed = JSON.parse(raw);
          if (typeof parsed === 'string' && OPTIONS.some(o => o.value === parsed)) {
            return parsed as DisappearingTimer;
          }
        } catch {
          if (OPTIONS.some(o => o.value === raw)) {
            return raw as DisappearingTimer;
          }
        }
      }
    } catch {
      // fall through to default
    }
    return 'off';
  });

  // Persist locally via expo-sqlite/kv-store (AsyncStorage-compatible).
  // TODO(API): Future API sync — replace/augment with remote persistence. Example:
  //   query: GET /privacy -> { disappearingTimer: 'off' | '24_hours' | '7_days' | '90_days' }
  //   mutation: PATCH /privacy { disappearingTimer: DisappearingTimer } on select (optimistic update + rollback).
  //   On hydration, server value should override local cache; keep kv-store as fallback/offline cache.
  useEffect(() => {
    try {
      storage.setItemSync(DISAPPEARING_TIMER_KEY, JSON.stringify(selected));
    } catch (e) {
      console.warn('[DisappearingMessages] failed to persist', String(e));
    }
  }, [selected]);

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">Disappearing messages</Text>
        <View style={{width: 32}} />
      </View>

      <ScrollView
        className="flex-1 bg-secondary"
        contentContainerStyle={{paddingBottom: 24}}
        showsVerticalScrollIndicator={false}>
        <Text className="mx-4 mt-3 font-medium text-[14px] leading-5 text-grey-300">
          Start new chats with disappearing messages enabled. Messages will disappear after the selected duration.
        </Text>

        <Text className="mx-4 mt-6 font-medium text-[13px] tracking-wide text-grey-300">DEFAULT TIMER</Text>

        <View className="mx-4 mt-3 overflow-hidden rounded-2xl bg-white">
          {OPTIONS.map(option => {
            const isSelected = selected === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => setSelected(option.value)}
                className="flex-row items-center justify-between px-4 py-4 active:bg-grey-50">
                <Text className="flex-1 pr-3 font-semibold text-black" style={{fontSize: 16}}>
                  {option.label}
                </Text>
                {isSelected ? <SVGS.Tick width={20} height={20} color="#111111" /> : <View style={{width: 20, height: 20}} />}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
