import {View} from 'react-native';
import {
  PickerWheelBand,
  PickerWheelColumn,
  WHEEL_COLUMN_GAP,
  WHEEL_PICKER_HEIGHT,
} from '@/components/PickerWheelColumn';

export type DurationParts = {
  hours: number;
  minutes: number;
};

type DurationPickerWheelProps = {
  value: DurationParts;
  onChange: (value: DurationParts) => void;
  maxHours?: number;
};

/** Dual drum wheels for hours / minutes — finite lists (same pattern as DatePickerWheel). */
export function DurationPickerWheel({value, onChange, maxHours = 23}: DurationPickerWheelProps) {
  const hourCount = maxHours + 1;
  const hours = Math.min(Math.max(0, value.hours), maxHours);
  const minutes = Math.min(Math.max(0, value.minutes), 59);

  return (
    <View style={{height: WHEEL_PICKER_HEIGHT, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: WHEEL_COLUMN_GAP, position: 'relative'}}>
        <PickerWheelBand />
        <PickerWheelColumn count={hourCount} value={hours} unit="Hrs" onChange={h => onChange({hours: h, minutes})} />
        <PickerWheelColumn count={60} value={minutes} unit="Mnts" onChange={m => onChange({hours, minutes: m})} />
      </View>
    </View>
  );
}
