import {useEffect, useRef} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView, Text, View} from 'react-native';
import {cn} from '@/utils';

const ITEM_HEIGHT = 40;
const VISIBLE_ROWS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ROWS;
const CENTER_PAD = ITEM_HEIGHT * 2;
const COLUMN_WIDTH = 104;
const COLUMN_GAP = 20;

type WheelProps = {
  count: number;
  value: number;
  unit: string;
  onChange: (value: number) => void;
};

function Wheel({count, value, unit, onChange}: WheelProps) {
  const ref = useRef<ScrollView>(null);
  const ready = useRef(false);

  useEffect(() => {
    const y = value * ITEM_HEIGHT;
    const id = requestAnimationFrame(() => {
      ref.current?.scrollTo({y, animated: false});
      ready.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, [count]);

  useEffect(() => {
    if (!ready.current) return;
    ref.current?.scrollTo({y: value * ITEM_HEIGHT, animated: false});
  }, [value]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(count - 1, index));
    if (clamped !== value) onChange(clamped);
    else ref.current?.scrollTo({y: clamped * ITEM_HEIGHT, animated: true});
  };

  return (
    <View style={{height: PICKER_HEIGHT, width: COLUMN_WIDTH, overflow: 'hidden'}}>
      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        bounces={false}
        nestedScrollEnabled
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
        contentContainerStyle={{paddingVertical: CENTER_PAD}}
        {...(Platform.OS === 'android' ? {overScrollMode: 'never' as const} : null)}>
        {Array.from({length: count}, (_, i) => {
          const active = i === value;
          return (
            <View key={i} style={{height: ITEM_HEIGHT}} className="flex-row items-center justify-end pr-[56px]">
              <Text className={cn('min-w-[28px] text-right text-[26px] font-bold', active ? 'text-black' : 'text-grey-100')}>
                {i}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <Text
        pointerEvents="none"
        className="absolute right-0 w-12 text-left text-sm text-grey-400"
        style={{top: CENTER_PAD + (ITEM_HEIGHT - 18) / 2}}>
        {unit}
      </Text>
    </View>
  );
}

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
    <View style={{height: PICKER_HEIGHT, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: COLUMN_GAP, position: 'relative'}}>
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: -10,
            right: -10,
            top: CENTER_PAD,
            height: ITEM_HEIGHT,
            borderRadius: 20,
            backgroundColor: '#F0F0F0',
          }}
        />
        <Wheel count={hourCount} value={hours} unit="Hrs" onChange={h => onChange({hours: h, minutes})} />
        <Wheel count={60} value={minutes} unit="Mnts" onChange={m => onChange({hours, minutes: m})} />
      </View>
    </View>
  );
}
