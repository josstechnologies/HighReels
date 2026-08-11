import {useEffect, useRef, useState} from 'react';
import {View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Alert} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import Svg, {Path} from 'react-native-svg';
import {SVGS} from '@/assets';
import {API_ROUTES} from '@/constants';
import {authActions, signupDraftActions} from '@/store';
import {API, apiErrorMessage, ApiEnvelope, readEnvelope} from '@/utils';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

type OtpType = 'email' | 'phone';

type FormData = {otp: string};

type AuthTokensPayload = {accessToken?: string; refreshToken?: string};

export default function Otp() {
  const {back, navigate, replace} = useRouter();
  const {t} = useTranslation();
  const params = useLocalSearchParams<{type?: string; value?: string; flow?: string; sessionId?: string}>();

  const type: OtpType = params.type === 'email' ? 'email' : 'phone';
  const value = typeof params.value === 'string' ? params.value : '';
  const sessionId = typeof params.sessionId === 'string' ? params.sessionId : '';
  const isReset = params.flow === 'reset';
  const isLogin = params.flow === 'login';
  const isSignup = params.flow === 'signup';

  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [isFocused, setIsFocused] = useState(false);
  const otpInputRef = useRef<TextInput>(null);
  const didSubmit = useRef(false);

  const {control, setValue, watch} = useForm<FormData>({
    defaultValues: {otp: ''},
  });
  const otpCode = watch('otp');

  const verifyLoginMutation = useMutation({
    mutationFn: async (otp: string) => {
      const response = await API.post<ApiEnvelope<AuthTokensPayload>>(API_ROUTES.LOGIN.OTP_VERIFY, {sessionId, otp});
      const tokens = readEnvelope<AuthTokensPayload>(response.data);
      if (!tokens?.accessToken || !tokens.refreshToken) throw new Error('UNEXPECTED_LOGIN_OTP_VERIFY');
      return {accessToken: tokens.accessToken, refreshToken: tokens.refreshToken};
    },
    onSuccess: (tokens) => {
      authActions.setSession(tokens);
      replace('/');
    },
    onError: (error) => {
      didSubmit.current = false;
      setValue('otp', '');
      Alert.alert(
        t('login.errorTitle'),
        error instanceof Error && error.message.startsWith('UNEXPECTED_')
          ? t('errors.unexpectedResponse')
          : apiErrorMessage(error, t('errors.generic'))
      );
    },
  });

  const verifySignupMutation = useMutation({
    mutationFn: async (otp: string) => {
      await API.post(API_ROUTES.SIGNUP.OTP_VERIFY, {sessionId, otp});
    },
    onSuccess: () => {
      signupDraftActions.start(sessionId);
      navigate({pathname: '/password', params: {flow: 'signup'}});
    },
    onError: (error) => {
      didSubmit.current = false;
      setValue('otp', '');
      Alert.alert(t('signup.errorTitle'), apiErrorMessage(error, t('errors.generic')));
    },
  });

  const resendMutation = useMutation({
    mutationFn: async () => {
      await API.post(API_ROUTES.OTP_RESEND, {sessionId});
    },
    onSuccess: () => {
      setValue('otp', '');
      didSubmit.current = false;
      setTimer(RESEND_SECONDS);
    },
    onError: (error) => {
      Alert.alert(isLogin ? t('login.errorTitle') : t('signup.errorTitle'), apiErrorMessage(error, t('errors.generic')));
    },
  });

  const busy = verifyLoginMutation.isPending || verifySignupMutation.isPending || resendMutation.isPending;

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (otpCode.length !== OTP_LENGTH || didSubmit.current || busy) return;

    if (isLogin) {
      if (!sessionId) {
        Alert.alert(t('login.errorTitle'), t('errors.missingChallenge'));
        return;
      }
      didSubmit.current = true;
      verifyLoginMutation.mutate(otpCode);
      return;
    }

    if (isSignup) {
      if (!sessionId) {
        Alert.alert(t('signup.errorTitle'), t('errors.missingChallenge'));
        return;
      }
      didSubmit.current = true;
      verifySignupMutation.mutate(otpCode);
      return;
    }

    didSubmit.current = true;
    const timeout = setTimeout(() => {
      navigate(isReset ? {pathname: '/password', params: {flow: 'reset'}} : '/password');
    }, 150);
    return () => clearTimeout(timeout);
    // mutate is stable; omit mutation objects to avoid re-firing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpCode, navigate, isReset, isLogin, isSignup, sessionId, busy, t]);

  const handleResend = () => {
    if (timer > 0 || busy) return;

    if ((isLogin || isSignup) && sessionId) {
      resendMutation.mutate();
      return;
    }

    if (isLogin || isSignup) {
      Alert.alert(isLogin ? t('login.errorTitle') : t('signup.errorTitle'), t('errors.missingChallenge'));
      return;
    }

    setValue('otp', '');
    didSubmit.current = false;
    setTimer(RESEND_SECONDS);
  };

  const timerLabel = `00:${timer < 10 ? `0${timer}` : timer}`;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 24}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="px-5 pt-2">
            <Pressable onPress={back} className="self-start rounded-full p-2 active:bg-zinc-100">
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                <Path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </Pressable>
          </View>

          <View className="mt-6 px-6">
            <View className="flex-row items-center">
              {type === 'email' ? <SVGS.EmailBG width={58} height={58} /> : <SVGS.PhoneBG width={58} height={58} />}
              <Text className="ml-4 flex-1 font-extrabold text-[28px] leading-9 text-[#111111]">
                {type === 'email' ? t('signup.checkEmail') : t('signup.checkPhone')}
              </Text>
            </View>

            <Text className="mt-3 font-medium text-[15px] leading-6 text-[#6b6b6b]">
              {type === 'email' ? t('signup.sentEmailCode', {value}) : t('signup.sentPhoneOtp', {value})}
            </Text>

            <View className="relative mt-8">
              <Controller
                name="otp"
                control={control}
                render={({field: {onChange, onBlur, value: otp}}) => (
                  <TextInput
                    ref={otpInputRef}
                    value={otp}
                    editable={!busy}
                    onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, OTP_LENGTH))}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      setIsFocused(false);
                      onBlur();
                    }}
                    maxLength={OTP_LENGTH}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    autoComplete="sms-otp"
                    className="absolute z-10 h-full w-full opacity-0"
                    caretHidden
                  />
                )}
              />

              <Pressable onPress={() => otpInputRef.current?.focus()} className="w-full flex-row gap-2.5">
                {Array.from({length: OTP_LENGTH}).map((_, i) => {
                  const char = otpCode[i] || '';
                  const active = isFocused && otpCode.length === i;
                  return (
                    <View
                      key={i}
                      style={styles.otpBox}
                      className={`h-[56px] flex-1 items-center justify-center rounded-2xl border bg-white ${
                        active ? 'border-[#111111]' : 'border-[#ececec]'
                      }`}>
                      <Text className="font-bold text-xl text-[#111111]">{char}</Text>
                    </View>
                  );
                })}
              </Pressable>
            </View>

            <View className="mt-6 items-start">
              {timer > 0 ? (
                <Text className="font-medium text-[15px] text-[#a7a7a7]">
                  {t('signup.resendIn')} <Text className="font-semibold text-[#111111]">{timerLabel}</Text>
                </Text>
              ) : (
                <Pressable
                  onPress={handleResend}
                  disabled={busy}
                  className="flex-row items-center rounded-full border border-[#ececec] px-4 py-2.5 active:opacity-70">
                  <SVGS.Resend width={14} height={14} />
                  <Text className="ml-2 font-semibold text-sm text-[#111111]">{t('signup.resendCode')}</Text>
                </Pressable>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
