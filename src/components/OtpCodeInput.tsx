import {useRef, useState} from 'react';
import {View, Text, Pressable, TextInput, StyleSheet} from 'react-native';
import {cn} from '@/utils';

export const OTP_LENGTH = 6;

type OtpCodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  editable?: boolean;
  autoFocus?: boolean;
  onBlur?: () => void;
};

export function OtpCodeInput({
  value,
  onChange,
  length = OTP_LENGTH,
  editable = true,
  autoFocus = false,
  onBlur,
}: OtpCodeInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View className="relative">
      <TextInput
        ref={inputRef}
        value={value}
        editable={editable}
        autoFocus={autoFocus}
        onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, length))}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        maxLength={length}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        className="absolute z-10 h-full w-full opacity-0"
        caretHidden
      />

      <Pressable onPress={() => inputRef.current?.focus()} className="w-full flex-row gap-2.5">
        {Array.from({length}).map((_, i) => {
          const char = value[i] || '';
          const active = isFocused && value.length === i;
          return (
            <View
              key={i}
              style={styles.otpBox}
              className={cn(
                'h-[56px] flex-1 items-center justify-center rounded-2xl border bg-white',
                active ? 'border-[#111111]' : 'border-[#ececec]',
              )}>
              <Text className="font-bold text-xl text-[#111111]">{char}</Text>
            </View>
          );
        })}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  otpBox: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
});
