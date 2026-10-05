import {View, Text, Pressable} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export const KEYPAD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'back'],
] as const;

export type KeypadKey = (typeof KEYPAD_ROWS)[number][number];

type PinKeypadProps = {
  onPressDigit: (digit: string) => void;
  onPressBack: () => void;
};

export function PinKeypad({onPressDigit, onPressBack}: PinKeypadProps) {
  return (
    <View className="mb-4 mt-auto items-center">
      {KEYPAD_ROWS.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} className="mb-3 w-full max-w-[320px] flex-row justify-between px-2">
          {row.map((key, colIndex) => (
            <KeypadButton key={`${rowIndex}-${colIndex}-${key}`} value={key} onPressDigit={onPressDigit} onPressBack={onPressBack} />
          ))}
        </View>
      ))}
    </View>
  );
}

function KeypadButton({value, onPressDigit, onPressBack}: {value: KeypadKey; onPressDigit: (digit: string) => void; onPressBack: () => void}) {
  if (value === '') {
    return <View className="h-20 w-20" />;
  }

  if (value === 'back') {
    return (
      <Pressable onPress={onPressBack} className="h-20 w-20 items-center justify-center rounded-full bg-[#f3f3f3] active:bg-primary/15">
        <Svg width="28" height="20" viewBox="0 0 28 20" fill="none">
          <Path
            d="M10.5 1H24C25.6569 1 27 2.34315 27 4V16C27 17.6569 25.6569 19 24 19H10.5L2 10L10.5 1Z"
            stroke="#111111"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <Path d="M13 7L19 13M19 7L13 13" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
        </Svg>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={() => onPressDigit(value)}
      className="group h-20 w-20 items-center justify-center rounded-full bg-[#f3f3f3] active:bg-primary/15">
      <Text className="font-semibold text-3xl leading-7 text-[#111111] group-active:text-primary">{value}</Text>
    </Pressable>
  );
}
