import {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useForm, useWatch} from 'react-hook-form';
import {SVGS} from '@/assets';
import {PinKeypad} from '@/components/PinKeypad';
import {pinGateActions} from '@/store';

const PIN_LENGTH = 4;

type PinMode = 'set' | 'confirm';
type FormData = {pin: string};

export default function SetNewPin() {
  const {replace} = useRouter();
  const {t} = useTranslation();

  const [mode, setMode] = useState<PinMode>('set');
  const [createdPin, setCreatedPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const didAdvance = useRef(false);
  const modeRef = useRef(mode);
  const createdPinRef = useRef(createdPin);
  modeRef.current = mode;
  createdPinRef.current = createdPin;

  const {control, setValue, reset} = useForm<FormData>({defaultValues: {pin: ''}});
  const pin = useWatch({control, name: 'pin'}) ?? '';

  useEffect(() => {
    if (pin.length !== PIN_LENGTH || didAdvance.current) return;
    didAdvance.current = true;

    const timeout = setTimeout(() => {
      if (modeRef.current === 'set') {
        setCreatedPin(pin);
        reset({pin: ''});
        setError(null);
        setMode('confirm');
        didAdvance.current = false;
        return;
      }

      if (pin === createdPinRef.current) {
        // ponytail: stub — swap for SecureStore/API persist later
        pinGateActions.unlock();
        replace('/');
        return;
      }

      setError(t('pin.mismatch'));
      reset({pin: ''});
      didAdvance.current = false;
    }, 150);

    return () => {
      clearTimeout(timeout);
      // If deps change before the timeout fires, allow a reschedule
      didAdvance.current = false;
    };
  }, [pin, reset, t, replace]);

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

  const title = mode === 'set' ? t('pin.createTitle') : t('pin.confirmTitle');
  const subtitle = mode === 'set' ? t('pin.createSubtitle') : t('pin.confirmSubtitle');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <View className="mt-10 items-center">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-primary">
            <SVGS.Unlocked width={38} height={38} color="#FFFFFF" />
          </View>
          <Text className="mt-6 text-center font-extrabold text-[28px] leading-9 text-[#111111]">{title}</Text>
          <Text className="mt-2 text-center font-medium text-15 leading-6 text-[#6b6b6b]">{subtitle}</Text>
        </View>

        <View className="mt-14 flex-row justify-center gap-6">
          {Array.from({length: PIN_LENGTH}).map((_, i) => (
            <View key={i} className="w-10 items-center">
              <Text className="mb-2 h-9 text-center font-bold text-[28px] text-[#111111]">{pin[i] || ''}</Text>
              <View className="h-[2px] w-full bg-[#d1d5db]" />
            </View>
          ))}
        </View>

        {error ? <Text className="mt-4 text-center font-medium text-sm text-danger-700">{error}</Text> : null}

        <PinKeypad onPressDigit={appendDigit} onPressBack={removeDigit} />
      </View>
    </SafeAreaView>
  );
}
