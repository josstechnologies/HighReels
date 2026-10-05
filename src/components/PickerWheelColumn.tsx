import {useEffect, useRef} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView, Text, View} from 'react-native';
import {cn} from '@/utils';

export const WHEEL_ITEM_HEIGHT = 40;
export const WHEEL_VISIBLE_ROWS = 5;
export const WHEEL_PICKER_HEIGHT = WHEEL_ITEM_HEIGHT * WHEEL_VISIBLE_ROWS;
export const WHEEL_CENTER_PAD = WHEEL_ITEM_HEIGHT * 2;
export const WHEEL_COLUMN_WIDTH = 104;
export const WHEEL_COLUMN_GAP = 16;

type PickerWheelColumnProps = {
  count: number;
  value: number;
  onChange: (index: number) => void;
  unit?: string;
  /** Defaults to String(index). Use for 1–12 hours or AM/PM labels. */
  formatLabel?: (index: number) => string;
  columnWidth?: number;
};

/** Single finite drum column — shared by DurationPickerWheel and TimePickerWheel. */
export function PickerWheelColumn({
  count,
  value,
  onChange,
  unit,
  formatLabel = String,
  columnWidth = WHEEL_COLUMN_WIDTH,
}: PickerWheelColumnProps) {
  const ref = useRef<ScrollView>(null);
  const ready = useRef(false);

  useEffect(() => {
    const y = value * WHEEL_ITEM_HEIGHT;
    const id = requestAnimationFrame(() => {
      ref.current?.scrollTo({y, animated: false});
      ready.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, [count]);

  useEffect(() => {
    if (!ready.current) return;
    ref.current?.scrollTo({y: value * WHEEL_ITEM_HEIGHT, animated: false});
  }, [value]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / WHEEL_ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(count - 1, index));
    if (clamped !== value) onChange(clamped);
    else ref.current?.scrollTo({y: clamped * WHEEL_ITEM_HEIGHT, animated: true});
  };

  return (
    <View style={{height: WHEEL_PICKER_HEIGHT, width: columnWidth, overflow: 'hidden'}}>
      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        snapToInterval={WHEEL_ITEM_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        bounces={false}
        nestedScrollEnabled
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
        contentContainerStyle={{paddingVertical: WHEEL_CENTER_PAD}}
        {...(Platform.OS === 'android' ? {overScrollMode: 'never' as const} : null)}>
        {Array.from({length: count}, (_, i) => {
          const active = i === value;
          return (
            <View
              key={i}
              style={{height: WHEEL_ITEM_HEIGHT}}
              className={cn('flex-row items-center', unit ? 'justify-end pr-[56px]' : 'justify-center')}>
              <Text
                className={cn(
                  'text-[26px] font-bold',
                  unit ? 'min-w-[28px] text-right' : 'text-center',
                  active ? 'text-black' : 'text-grey-100',
                )}>
                {formatLabel(i)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      {unit ? (
        <Text
          pointerEvents="none"
          className="absolute right-0 w-12 text-left text-sm text-grey-400"
          style={{top: WHEEL_CENTER_PAD + (WHEEL_ITEM_HEIGHT - 18) / 2}}>
          {unit}
        </Text>
      ) : null}
    </View>
  );
}

export function PickerWheelBand() {
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: -10,
        right: -10,
        top: WHEEL_CENTER_PAD,
        height: WHEEL_ITEM_HEIGHT,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
      }}
    />
  );
}
