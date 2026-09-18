import {Pressable, Text, View, type StyleProp, type ViewStyle} from 'react-native';
import {SVGS} from '@/assets';
import {Textarea} from '@/components/ui/textarea';
import {cn} from '@/utils';

type PromptFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  height: number;
  onInspirationPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function PromptField({
  value,
  onChangeText,
  placeholder,
  height,
  onInspirationPress,
  className,
  style,
}: PromptFieldProps) {
  return (
    <View
      className={cn('overflow-hidden rounded-20 border border-grey-700 bg-grey-700 p-4', className)}
      style={[{height}, style]}>
      <Textarea
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="flex-1 pb-11"
        style={{flex: 1}}
      />
      <Pressable
        onPress={onInspirationPress}
        className="absolute bottom-3 right-3 flex-row items-center rounded-full bg-primary px-3 py-2">
        <Text className="mr-1.5 text-caption font-semibold text-white">Inspiration</Text>
        <SVGS.AiInspiration width={13} height={13} className="text-white" />
      </Pressable>
    </View>
  );
}
