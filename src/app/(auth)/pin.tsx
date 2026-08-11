import {useEffect, useRef, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useForm, useWatch} from 'react-hook-form';
import Svg, {Path} from 'react-native-svg';
import {SVGS} from '@/assets';
import {signupDraftActions} from '@/store';

const PIN_LENGTH = 4;
const KEYPAD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'back'],
] as const;

type PinMode = 'set' | 'confirm';
type FormData = {pin: string};
type KeypadKey = (typeof KEYPAD_ROWS)[number][number];

export default function Pin() {
  const {back, navigate} = useRouter();
  const {t} = useTranslation();
  const params = useLocalSearchParams<{flow?: string}>();
  const isSignup = params.flow === 'signup';

  const [mode, setMode] = useState<PinMode>('set');
  const [createdPin, setCreatedPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const didAdvance = useRef(false);

  const {control, setValue, reset} = useForm<FormData>({defaultValues: {pin: ''}});
  const pin = useWatch({control, name: 'pin'}) ?? '';

  useEffect(() => {
    if (pin.length !== PIN_LENGTH || didAdvance.current) return;
    didAdvance.current = true;

    const timeout = setTimeout(() => {
      if (mode === 'set') {
        setCreatedPin(pin);
        reset({pin: ''});
        setError(null);
        setMode('confirm');
        didAdvance.current = false;
        return;
      }

      if (pin === createdPin) {
        if (isSignup) signupDraftActions.setPin(pin);
        navigate('/birthday');
        return;
      }

      setError(t('signup.pinMismatch'));
      reset({pin: ''});
      didAdvance.current = false;
    }, 150);

    return () => clearTimeout(timeout);
  }, [pin, mode, createdPin, reset, t, navigate, isSignup]);

  const appendDigit = (digit: string) => {
    if (pin.length >= PIN_LENGTH) return;
    if (error) setError(null);
    setValue('pin', `${pin}${digit}`, {shouldDirty: true});
  };

  const removeDigit = () => {
    if (!pin.length) return;
    if (error) setError(null);
    setValue('pin', pin.slice(0, -1), {shouldDirty: true});
  };

  const handleBack = () => {
    if (mode === 'confirm') {
      setMode('set');
      setCreatedPin('');
      setError(null);
      reset({pin: ''});
      didAdvance.current = false;
      return;
    }
    back();
  };

  const goBirthday = () => navigate('/birthday');

  const title = mode === 'set' ? t('signup.setPinTitle') : t('signup.confirmPinTitle');
  const subtitle = mode === 'set' ? t('signup.setPinSubtitle') : t('signup.confirmPinSubtitle');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row items-center justify-between pt-2">
          <Pressable onPress={handleBack} className="rounded-full p-2 active:bg-zinc-100">
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
              <Path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>
          {mode === 'set' && !isSignup ? (
            <Pressable onPress={goBirthday} className="px-2 py-2 active:opacity-70">
              <Text className="font-medium text-base text-[#a7a7a7]">{t('signup.skip')}</Text>
            </Pressable>
          ) : (
            <View className="w-12" />
          )}
        </View>

        {/* Icon + title */}
        <View className="mt-6 flex-row items-center">
          <SVGS.PinBG width={58} height={58} />
          <Text className="ml-4 flex-1 font-extrabold text-[28px] leading-9 text-[#111111]">{title}</Text>
        </View>
        <Text className="mt-3 font-medium text-[15px] leading-6 text-[#6b6b6b]">{subtitle}</Text>

        {/* PIN slots */}
        <View className="mt-16 flex-row justify-center gap-6">
          {Array.from({length: PIN_LENGTH}).map((_, i) => (
            <View key={i} className="w-10 items-center">
              <Text className="mb-2 h-9 text-center font-bold text-[28px] text-[#111111]">{pin[i] || ''}</Text>
              <View className="h-[2px] w-full bg-[#d1d5db]" />
            </View>
          ))}
        </View>

        {error ? <Text className="mt-4 text-center font-medium text-sm text-danger-700">{error}</Text> : null}

        {/* Keypad — fixed 3 columns */}
        <View className="mb-4 mt-auto items-center">
          {KEYPAD_ROWS.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} className="mb-3 w-full max-w-[320px] flex-row justify-between px-2">
              {row.map((key, colIndex) => (
                <KeypadButton key={`${rowIndex}-${colIndex}-${key}`} value={key} onPressDigit={appendDigit} onPressBack={removeDigit} />
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

function KeypadButton({value, onPressDigit, onPressBack}: {value: KeypadKey; onPressDigit: (digit: string) => void; onPressBack: () => void}) {
  if (value === '') {
    return <View className="h-[72px] w-[72px]" />;
  }

  if (value === 'back') {
    return (
      <Pressable onPress={onPressBack} className="h-[72px] w-[72px] items-center justify-center rounded-full bg-[#f3f3f3] active:bg-primary/15">
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
      className="h-[72px] w-[72px] items-center justify-center rounded-full bg-[#f3f3f3] active:bg-primary/15">
      <Text className="font-semibold text-[28px] text-[#111111]">{value}</Text>
    </Pressable>
  );
}
