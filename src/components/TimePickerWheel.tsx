import {View} from 'react-native';
import {
  PickerWheelBand,
  PickerWheelColumn,
  WHEEL_COLUMN_GAP,
  WHEEL_COLUMN_WIDTH,
  WHEEL_PICKER_HEIGHT,
} from '@/components/PickerWheelColumn';

export type TimeOfDay = {
  hour: number; // 1–12
  minute: number; // 0–59
  period: 'AM' | 'PM';
};

const PERIODS = ['AM', 'PM'] as const;

export function formatTimeOfDay({hour, minute, period}: TimeOfDay) {
  return `${hour}:${String(minute).padStart(2, '0')} ${period}`;
}

type TimePickerWheelProps = {
  value: TimeOfDay;
  onChange: (value: TimeOfDay) => void;
};

/** 12-hour clock drums: hour + minute + AM/PM (same column style as DurationPickerWheel). */
export function TimePickerWheel({value, onChange}: TimePickerWheelProps) {
  const hour = Math.min(12, Math.max(1, value.hour));
  const minute = Math.min(59, Math.max(0, value.minute));
  const periodIndex = value.period === 'PM' ? 1 : 0;

  return (
    <View style={{height: WHEEL_PICKER_HEIGHT, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: WHEEL_COLUMN_GAP, position: 'relative'}}>
        <PickerWheelBand />
        <PickerWheelColumn
          count={12}
          value={hour - 1}
          unit="Hrs"
          formatLabel={i => String(i + 1)}
          onChange={i => onChange({hour: i + 1, minute, period: value.period})}
        />
        <PickerWheelColumn
          count={60}
          value={minute}
          unit="Mnts"
          onChange={m => onChange({hour, minute: m, period: value.period})}
        />
        <PickerWheelColumn
          count={2}
          value={periodIndex}
          formatLabel={i => PERIODS[i]}
          columnWidth={WHEEL_COLUMN_WIDTH - 24}
          onChange={i => onChange({hour, minute, period: PERIODS[i]})}
        />
      </View>
    </View>
  );
}
