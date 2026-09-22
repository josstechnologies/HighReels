import {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import storage from 'expo-sqlite/kv-store';
import {SVGS} from '@/assets';
import {Toggle} from '@/components/ui/Toggle';

// AsyncStorage key for local persistence. Currently local-only; later this will be synced with the
// backend API (e.g., GET/PATCH /privacy or /settings) — server becomes source of truth and local
// cache is optimistic fallback. Keep default ON until server value loads.
const READ_RECEIPTS_KEY = 'privacy:readReceipts';

export function ReadReceiptsScreen() {
  const {back} = useRouter();
  const [enabled, setEnabled] = useState(() => {
    try {
      const raw = storage.getItemSync(READ_RECEIPTS_KEY);
      if (raw === 'true') return true;
      if (raw === 'false') return false;
      if (raw != null) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === 'boolean') return parsed;
      }
    } catch {
      // fall through to default
    }
    return true;
  });

  // Persist locally via expo-sqlite/kv-store (AsyncStorage-compatible).
  // TODO(API): Future API sync — replace/augment with remote persistence. Example:
  //   query: GET /privacy -> { readReceipts: boolean }
  //   mutation: PATCH /privacy { readReceipts: boolean } on toggle (optimistic update + rollback).
  //   On hydration, server value should override local cache; keep AsyncStorage as fallback/offline cache.
  useEffect(() => {
    try {
      storage.setItemSync(READ_RECEIPTS_KEY, JSON.stringify(enabled));
    } catch (e) {
      console.warn('[ReadReceipts] failed to persist', String(e));
    }
  }, [enabled]);

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">Read receipts</Text>
        <View style={{width: 32}} />
      </View>

      <ScrollView className="flex-1 bg-secondary" contentContainerStyle={{paddingBottom: 24}} showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-3 flex-row items-center justify-between rounded-2xl bg-white px-4 py-4">
          <Text className="flex-1 font-medium text-black" style={{fontSize: 16}}>
            Read receipts
          </Text>
          <Toggle checked={enabled} onCheckedChange={setEnabled} accessibilityLabel="Read receipts" />
        </View>

        <Text className="mx-4 mt-2 font-medium text-[14px] leading-5 text-grey-300">
          When turned off, you won&apos;t send or receive read receipts. Read receipts are always sent for group chats.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
