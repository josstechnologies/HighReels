import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import storage from 'expo-sqlite/kv-store';
import { SVGS } from '@/assets';
import { Toggle } from '@/components/ui/Toggle';

const AUTO_BACKUP_KEY = 'inbox:autoBackup';
const BACKUP_FREQUENCY_KEY = 'inbox:backupFrequency';

type BackupFrequency = 'daily' | 'weekly' | 'monthly';

const FREQUENCY_OPTIONS: { value: BackupFrequency; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

function getInitialAutoBackup(): boolean {
  try {
    const raw = storage.getItemSync(AUTO_BACKUP_KEY);
    if (raw === 'true') return true;
    if (raw === 'false') return false;
    if (raw != null) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'boolean') return parsed;
    }
  } catch {
    // fall through
  }
  return true;
}

function getInitialFrequency(): BackupFrequency {
  try {
    const raw = storage.getItemSync(BACKUP_FREQUENCY_KEY);
    if (raw != null) {
      try {
        const parsed = JSON.parse(raw);
        if (typeof parsed === 'string' && FREQUENCY_OPTIONS.some(o => o.value === parsed)) {
          return parsed as BackupFrequency;
        }
      } catch {
        if (FREQUENCY_OPTIONS.some(o => o.value === raw)) {
          return raw as BackupFrequency;
        }
      }
    }
  } catch {
    // fall through
  }
  return 'weekly';
}

export function InboxBackupScreen() {
  const { back } = useRouter();
  const [autoBackup, setAutoBackup] = useState<boolean>(getInitialAutoBackup);
  const [frequency, setFrequency] = useState<BackupFrequency>(getInitialFrequency);

  useEffect(() => {
    try {
      storage.setItemSync(AUTO_BACKUP_KEY, JSON.stringify(autoBackup));
    } catch (e) {
      console.warn('[InboxBackup] failed to persist autoBackup', String(e));
    }
  }, [autoBackup]);

  useEffect(() => {
    try {
      storage.setItemSync(BACKUP_FREQUENCY_KEY, JSON.stringify(frequency));
    } catch (e) {
      console.warn('[InboxBackup] failed to persist frequency', String(e));
    }
  }, [frequency]);

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      {/* Header */}
      <View className="flex-row items-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">Inbox backup</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        className="flex-1 bg-secondary"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}>
        {/* Auto Backup card */}
        <View className="mx-4 mt-3 flex-row items-center justify-between rounded-2xl bg-white px-4 py-4">
          <Text className="flex-1 pr-3 font-semibold text-black" style={{ fontSize: 16 }}>
            Auto Backup
          </Text>
          <Toggle checked={autoBackup} onCheckedChange={setAutoBackup} accessibilityLabel="Auto Backup" />
        </View>

        <Text className="mx-4 mt-2 font-medium text-[14px] leading-5 text-grey-300">
          Back up your chats to keep them safe
        </Text>

        {/* Last Backup card */}
        <View className="mx-4 mt-4 flex-row items-center justify-between rounded-2xl bg-white px-4 py-4">
          <Text className="font-semibold text-black" style={{ fontSize: 16 }}>
            Last Backup
          </Text>
          <Text className="font-medium text-grey-300" style={{ fontSize: 14 }}>
            Aug 20, 2026 at 3:42 PM
          </Text>
        </View>

        {/* Backup Frequency */}
        <Text className="mx-4 mt-6 font-medium text-[13px] tracking-wide text-grey-300">BACKUP FREQUENCY</Text>

        <View className="mx-4 mt-3 overflow-hidden rounded-2xl bg-white">
          {FREQUENCY_OPTIONS.map(option => {
            const selected = frequency === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => setFrequency(option.value)}
                className="flex-row items-center justify-between px-4 py-4 active:bg-grey-50">
                <Text className="flex-1 pr-3 font-semibold text-black" style={{ fontSize: 16 }}>
                  {option.label}
                </Text>
                {selected ? <SVGS.Tick width={20} height={20} color="#111111" /> : <View style={{ width: 20, height: 20 }} />}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
