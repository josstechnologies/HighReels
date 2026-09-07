import {Pressable, Text, View} from 'react-native';

type RadioOptionProps = {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
};

export function RadioDot({selected}: {selected: boolean}) {
  return (
    <View
      className={`h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${selected ? 'border-primary' : 'border-grey-100'}`}>
      {selected ? <View className="h-3 w-3 rounded-full bg-primary" /> : null}
    </View>
  );
}

export function RadioOption({label, description, selected, onPress}: RadioOptionProps) {
  return (
    <Pressable onPress={onPress} className="flex-row items-start justify-between py-3 active:opacity-70">
      <View className="mr-3 flex-1">
        <Text className="font-semibold text-[15px] text-black">{label}</Text>
        {description ? <Text className="mt-1 font-medium text-[13px] leading-5 text-grey-300">{description}</Text> : null}
      </View>
      <RadioDot selected={selected} />
    </Pressable>
  );
}
