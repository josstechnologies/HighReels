import {useState} from 'react';
import {View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import Svg, {Path} from 'react-native-svg';
import {AuthMethodTabs, AuthTab, Button, PhoneInputField, SocialAuthButtons} from '@/components';
import {API_ROUTES} from '@/constants';
import {API, apiErrorMessage, ApiEnvelope, isValidNationalPhone, readEnvelope, toPhoneE164} from '@/utils';
import type {ICountry} from 'rn-international-phone-number';

type FormData = {
  email: string;
  phone: string;
};

type OtpChallengePayload = {sessionId?: string};

export default function Signup() {
  const {navigate} = useRouter();
  const {t} = useTranslation();

  const [activeTab, setActiveTab] = useState<AuthTab>('email');
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);

  const {control, handleSubmit, clearErrors} = useForm<FormData>({
    defaultValues: {email: '', phone: ''},
  });

  const sendOtpMutation = useMutation({
    mutationFn: async (payload: {type: 'email'; email: string} | {type: 'phone'; phone: string}) => {
      const body = payload.type === 'email' ? {email: payload.email} : {phone: payload.phone};
      const response = await API.post<ApiEnvelope<OtpChallengePayload>>(API_ROUTES.SIGNUP.OTP_SEND, body);
      const sessionId = readEnvelope<OtpChallengePayload>(response.data)?.sessionId;
      if (!sessionId) throw new Error('UNEXPECTED_SIGNUP_OTP_SEND');
      return payload.type === 'email'
        ? {sessionId, type: 'email' as const, value: payload.email}
        : {sessionId, type: 'phone' as const, value: payload.phone};
    },
    onSuccess: ({sessionId, type, value}) => {
      navigate({pathname: '/otp', params: {flow: 'signup', type, value, sessionId}});
    },
    onError: (error) => {
      Alert.alert(
        t('signup.errorTitle'),
        error instanceof Error && error.message.startsWith('UNEXPECTED_')
          ? t('errors.unexpectedResponse')
          : apiErrorMessage(error, t('errors.generic'))
      );
    },
  });

  const handleTabChange = (tab: AuthTab) => {
    setActiveTab(tab);
    clearErrors();
  };

  const onSend = ({email, phone}: FormData) => {
    if (activeTab === 'email') {
      sendOtpMutation.mutate({type: 'email', email: email.trim()});
      return;
    }

    const e164 = toPhoneE164(phone, selectedCountry);
    if (!e164) {
      Alert.alert(t('signup.errorTitle'), t('signup.invalidPhone'));
      return;
    }

    sendOtpMutation.mutate({type: 'phone', phone: e164});
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 24}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-end px-5 pt-2">
            <Pressable onPress={() => navigate('/')} className="rounded-full p-2 active:bg-zinc-100">
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                <Path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </Pressable>
          </View>

          <View className="mb-8 mt-4 items-center px-6">
            <Text className="text-center font-extrabold text-2xl text-[#111111]">{t('signup.title')}</Text>
          </View>

          <AuthMethodTabs activeTab={activeTab} onChange={handleTabChange} />

          <View className="px-6">
            {activeTab === 'email' ? (
              <Controller
                name="email"
                control={control}
                rules={{
                  required: t('signup.invalidEmail'),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t('signup.invalidEmail'),
                  },
                }}
                render={({field: {onChange, onBlur, value}, fieldState}) => (
                  <View>
                    <TextInput
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      placeholder={t('signup.emailPlaceholder')}
                      placeholderTextColor="#a7a7a7"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoComplete="email"
                      className="h-14 rounded-xl border border-[#ececec] px-4 font-medium text-base text-[#111111]"
                    />
                    {fieldState.error?.message ? <Text className="mt-2 font-medium text-sm text-danger-700">{fieldState.error.message}</Text> : null}
                  </View>
                )}
              />
            ) : (
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: t('signup.invalidPhone'),
                  validate: (val) => isValidNationalPhone(val, selectedCountry) || t('signup.invalidPhone'),
                }}
                render={({field: {onChange, value}, fieldState}) => (
                  <PhoneInputField
                    value={value}
                    onChangePhoneNumber={onChange}
                    country={selectedCountry}
                    onChangeCountry={setSelectedCountry}
                    placeholder={t('signup.phonePlaceholder')}
                    defaultCountry="AU"
                    error={fieldState.error}
                  />
                )}
              />
            )}

            <Button
              className="mt-4"
              title={activeTab === 'email' ? t('signup.sendCode') : t('signup.sendOtp')}
              loading={sendOtpMutation.isPending}
              onPress={handleSubmit(onSend)}
            />
          </View>

          <SocialAuthButtons />

          <View className="mt-8 items-center px-9">
            <Text className="text-center font-medium text-[13px] leading-[22px] text-[#a7a7a7]">{t('signup.terms')}</Text>
          </View>

          <View className="mt-auto flex-row justify-center py-6">
            <Text className="font-medium text-sm text-[#a7a7a7]">{t('signup.alreadyAccount')} </Text>
            <Pressable onPress={() => navigate('/login')}>
              <Text className="font-semibold text-sm text-primary">{t('signup.logIn')}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
