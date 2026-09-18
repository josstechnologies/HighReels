import {Pressable, ScrollView, Text} from 'react-native';
import {cn} from '@/utils';

export type ChipShape = 'square' | 'rect';

type ChipGroupProps<T extends string> = {
  options: readonly T[];
  value: T;
  onChange?: (value: T) => void;
  shape?: ChipShape;
};

function Chip({
  label,
  active,
  onPress,
  shape = 'rect',
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  shape?: ChipShape;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'mr-2 items-center justify-center rounded-2xl',
        shape === 'square' ? 'h-14 w-14' : 'h-11 flex-row px-5',
        active ? 'bg-primary' : 'bg-grey-800',
      )}
      style={
        active
          ? {
              shadowColor: '#6F41EC',
              shadowOpacity: 0.5,
              shadowRadius: 10,
              shadowOffset: {width: 0, height: 0},
              elevation: 8,
            }
          : undefined
      }>
      <Text className={cn('text-caption text-white', active ? 'font-semibold' : 'font-medium')}>{label}</Text>
    </Pressable>
  );
}

export function ChipGroup<T extends string>({options, value, onChange, shape = 'rect'}: ChipGroupProps<T>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {options.map(item => (
        <Chip
          key={item}
          label={item}
          shape={shape}
          active={value === item}
          onPress={() => onChange?.(item)}
        />
      ))}
    </ScrollView>
  );
}
