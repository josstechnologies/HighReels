import {useEffect, useRef, useState} from 'react';
import {View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {SVGS} from '@/assets';
import {OtpCodeInput, OTP_LENGTH, OtpResend, RESEND_SECONDS} from '@/components';

type FormData = {otp: string};

export default function VerifyPinOtp() {
  const {back, push} = useRouter();
  const {t} = useTranslation();

  const [timer, setTimer] = useState(RESEND_SECONDS);
  const didSubmit = useRef(false);

  const {control, setValue, watch} = useForm<FormData>({defaultValues: {otp: ''}});
  const otpCode = watch('otp');

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (otpCode.length !== OTP_LENGTH || didSubmit.current) return;
    didSubmit.current = true;
    // UI-only — PIN recovery OTP API not wired yet
    push('/set-new-pin');
  }, [otpCode, push]);

  const handleResend = () => {
    if (timer > 0) return;
    setValue('otp', '');
    didSubmit.current = false;
    setTimer(RESEND_SECONDS);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 24}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="px-5 pt-2">
            <Pressable onPress={back} className="self-start rounded-full p-2 active:bg-zinc-100">
              <SVGS.Back width={24} height={24} color="#111111" />
            </Pressable>
          </View>

          <View className="mt-6 items-center px-6">
            <View className="h-24 w-24 items-center justify-center rounded-full bg-primary">
              <SVGS.PinKey width={48} height={48} color="#FFFFFF" />
            </View>
            <Text className="mt-6 text-center font-extrabold text-[28px] leading-9 text-[#111111]">{t('pin.enterCodeTitle')}</Text>

            <View className="mt-8 w-full">
              <Controller
                name="otp"
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <OtpCodeInput value={value} onChange={onChange} onBlur={onBlur} autoFocus />
                )}
              />
            </View>

            <View className="mt-6 w-full">
              <OtpResend timer={timer} onResend={handleResend} className="items-center" />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
