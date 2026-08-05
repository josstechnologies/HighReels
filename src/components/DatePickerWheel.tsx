import {useEffect, useMemo, useRef} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View} from 'react-native';

const ITEM_HEIGHT = 44;
const VISIBLE_ROWS = 3;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ROWS;

type WheelProps = {
  items: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
};

function Wheel({items, selectedIndex, onChange}: WheelProps) {
  const ref = useRef<ScrollView>(null);
  const padding = ITEM_HEIGHT; // one row above/below so center aligns

  useEffect(() => {
    const y = selectedIndex * ITEM_HEIGHT;
    requestAnimationFrame(() => {
      ref.current?.scrollTo({y, animated: false});
    });
  }, [selectedIndex, items.length]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    if (clamped !== selectedIndex) onChange(clamped);
    else ref.current?.scrollTo({y: clamped * ITEM_HEIGHT, animated: true});
  };

  return (
    <View style={{height: PICKER_HEIGHT}} className="flex-1 overflow-hidden">
      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        bounces={false}
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
        contentContainerStyle={{paddingVertical: padding}}>
        {items.map((label, index) => {
          const active = index === selectedIndex;
          return (
            <View key={`${label}-${index}`} style={{height: ITEM_HEIGHT}} className="items-center justify-center">
              <Text className={`text-xl font-semibold ${active ? 'text-[#111111]' : 'text-[#c4c4c4]'}`}>{label}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export type DateParts = {
  day: number;
  month: number; // 1-12
  year: number;
};

type DatePickerWheelProps = {
  value: DateParts;
  onChange: (value: DateParts) => void;
  minYear?: number;
  maxYear?: number;
};

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function DatePickerWheel({value, onChange, minYear, maxYear}: DatePickerWheelProps) {
  const now = new Date();
  const endYear = maxYear ?? now.getFullYear();
  const startYear = minYear ?? endYear - 100;

  const years = useMemo(() => {
    const list: number[] = [];
    for (let y = startYear; y <= endYear; y++) list.push(y);
    return list;
  }, [startYear, endYear]);

  const dayCount = daysInMonth(value.month, value.year);
  const days = useMemo(() => Array.from({length: dayCount}, (_, i) => String(i + 1)), [dayCount]);

  const dayIndex = Math.min(value.day, dayCount) - 1;
  const monthIndex = value.month - 1;
  const yearIndex = Math.max(0, years.indexOf(value.year));

  const update = (next: Partial<DateParts>) => {
    const month = next.month ?? value.month;
    const year = next.year ?? value.year;
    const maxDay = daysInMonth(month, year);
    const day = Math.min(next.day ?? value.day, maxDay);
    onChange({day, month, year});
  };

  return (
    <View className="relative h-[132px] w-full flex-row items-center">
      <View pointerEvents="none" className="absolute left-0 right-0 top-[44px] h-[44px] border-y border-[#ececec]" />

      <Wheel items={days} selectedIndex={dayIndex} onChange={(index) => update({day: index + 1})} />
      <Wheel items={MONTHS} selectedIndex={monthIndex} onChange={(index) => update({month: index + 1})} />
      <Wheel items={years.map(String)} selectedIndex={yearIndex} onChange={(index) => update({year: years[index]})} />
    </View>
  );
}

export function formatBirthdayLabel({day, month, year}: DateParts) {
  const ordinal = (n: number) => {
    const j = n % 10;
    const k = n % 100;
    if (j === 1 && k !== 11) return `${n}st`;
    if (j === 2 && k !== 12) return `${n}nd`;
    if (j === 3 && k !== 13) return `${n}rd`;
    return `${n}th`;
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${ordinal(day)} ${monthNames[month - 1]}, ${year}`;
}

export function isAtLeastAge({day, month, year}: DateParts, minAge: number) {
  const today = new Date();
  const birth = new Date(year, month - 1, day);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age >= minAge;
}

export function datePartsFromDate(date: Date): DateParts {
  return {day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()};
}
