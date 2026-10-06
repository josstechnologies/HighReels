import {useEffect, useRef} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useForm, useWatch} from 'react-hook-form';
import {SVGS} from '@/assets';
import {PinKeypad} from '@/components/PinKeypad';
import {pinGateActions} from '@/store';

const PIN_LENGTH = 4;

type FormData = {pin: string};

export default function PinScreen() {
  const {replace, navigate} = useRouter();
  const {t} = useTranslation();
  const didAdvance = useRef(false);

  const {control, setValue} = useForm<FormData>({defaultValues: {pin: ''}});
  const pin = useWatch({control, name: 'pin'}) ?? '';

  useEffect(() => {
    if (pin.length !== PIN_LENGTH || didAdvance.current) return;
    didAdvance.current = true;

    // ponytail: stub accepts any 4 digits — swap for SecureStore/API verify later
    const timeout = setTimeout(() => {
      pinGateActions.unlock();
      replace('/');
    }, 150);

    return () => clearTimeout(timeout);
  }, [pin, replace]);

  const appendDigit = (digit: string) => {
    if (pin.length >= PIN_LENGTH) return;
    setValue('pin', `${pin}${digit}`, {shouldDirty: true});
  };

  const removeDigit = () => {
    if (!pin.length) return;
    setValue('pin', pin.slice(0, -1), {shouldDirty: true});
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <View className="mt-10 items-center">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-primary">
            <SVGS.Locked width={38} height={38} color="#FFFFFF" />
          </View>
          <Text className="mt-6 font-extrabold text-[28px] leading-9 text-[#111111]">{t('pin.enterTitle')}</Text>
        </View>

        <View className="mt-14 flex-row justify-center gap-6">
          {Array.from({length: PIN_LENGTH}).map((_, i) => (
            <View key={i} className="w-10 items-center">
              <Text className="mb-2 h-9 text-center font-bold text-[28px] text-[#111111]">{pin[i] || ''}</Text>
              <View className="h-[2px] w-full bg-[#d1d5db]" />
            </View>
          ))}
        </View>

        <Pressable onPress={() => navigate('/forgot-pin')} className="mt-6 self-center active:opacity-70">
          <Text className="font-medium text-base text-info-700">{t('pin.forgot')}</Text>
        </Pressable>

        <PinKeypad onPressDigit={appendDigit} onPressBack={removeDigit} />
      </View>
    </SafeAreaView>
  );
}
