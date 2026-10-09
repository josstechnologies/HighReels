import {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {formatTimeOfDay, TimePickerWheel, type TimeOfDay} from '@/components/TimePickerWheel';
import {ConfirmModal, ConfirmModalAction} from '@/components/ui/ConfirmModal';
import {Toggle} from '@/components/ui/Toggle';
import {getSleepHoursState, saveSleepHoursState, SLEEP_HOURS_INTRO} from '@/mock-data/sleep-hours';

type OpenPicker = 'start' | 'end' | null;

function TimeRow({
  label,
  time,
  open,
  onToggle,
  onChange,
}: {
  label: string;
  time: TimeOfDay;
  open: boolean;
  onToggle: () => void;
  onChange: (value: TimeOfDay) => void;
}) {
  return (
    <View>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{expanded: open}}
        accessibilityLabel={`${label}, ${formatTimeOfDay(time)}`}
        className="flex-row items-center justify-between py-3.5 active:opacity-70">
        <Text className="font-semibold text-15 text-black">{label}</Text>
        <View className="rounded-lg bg-grey-50 px-3 py-1.5">
          <Text className="font-medium text-sm text-black">{formatTimeOfDay(time)}</Text>
        </View>
      </Pressable>
      {open ? (
        <View className="pb-2 pt-1">
          <TimePickerWheel value={time} onChange={onChange} />
        </View>
      ) : null}
    </View>
  );
}

export default function SleepHoursScreen() {
  const {back} = useRouter();
  const initial = getSleepHoursState();
  const [enabled, setEnabled] = useState(initial.enabled);
  const [start, setStart] = useState<TimeOfDay>(initial.start);
  const [end, setEnd] = useState<TimeOfDay>(initial.end);
  const [open, setOpen] = useState<OpenPicker>(null);
  const [pauseModalVisible, setPauseModalVisible] = useState(false);

  const togglePicker = (key: Exclude<OpenPicker, null>) => {
    setOpen(prev => (prev === key ? null : key));
  };

  const handleSleepModeChange = (next: boolean) => {
    if (next) {
      setEnabled(true);
      return;
    }
    setPauseModalVisible(true);
  };

  const handleDisableSleepMode = () => {
    setPauseModalVisible(false);
    setEnabled(false);
  };

  const handleSave = () => {
    saveSleepHoursState({enabled, start, end});
    back();
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-3">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Sleep Hours</Text>
        <View className="w-8" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 4, paddingBottom: 16}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled>
        <Text className="text-sm leading-5 text-grey-400">{SLEEP_HOURS_INTRO}</Text>

        <View className="mt-4 flex-row items-center justify-between rounded-2xl bg-white px-4 py-4">
          <Text className="flex-1 font-semibold text-15 text-black">Enable Sleep Mode</Text>
          <Toggle checked={enabled} onCheckedChange={handleSleepModeChange} accessibilityLabel="Enable Sleep Mode" />
        </View>

        <Text className="mt-5 mb-2 font-medium text-sm text-grey-400">Set your sleep schedule</Text>
        <View className="rounded-2xl bg-white px-4">
          <TimeRow
            label="Start time"
            time={start}
            open={open === 'start'}
            onToggle={() => togglePicker('start')}
            onChange={setStart}
          />
          <View className="h-px bg-grey-50" />
          <TimeRow
            label="End time"
            time={end}
            open={open === 'end'}
            onToggle={() => togglePicker('end')}
            onChange={setEnd}
          />
        </View>
      </ScrollView>

      <View className="bg-secondary px-4 pb-4 pt-3">
        <Button title="Save" onPress={handleSave} className="rounded-2xl" />
      </View>

      <ConfirmModal
        visible={pauseModalVisible}
        title="Pause sleep hours today?"
        description="If you pause sleep hour, notifications will stay active for the rest of the day. Your sleep schedule will resume automatically tomorrow."
        onClose={() => setPauseModalVisible(false)}>
        <ConfirmModalAction title="Pause for today" tone="primary" onPress={handleDisableSleepMode} />
        <ConfirmModalAction title="Turn off completely" onPress={handleDisableSleepMode} />
      </ConfirmModal>
    </SafeAreaView>
  );
}
