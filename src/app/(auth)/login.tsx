import {useState} from 'react';
import {View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import Svg, {Circle, Path} from 'react-native-svg';
import {AuthMethodTabs, AuthTab, Button, PhoneInputField, SocialAuthButtons} from '@/components';
import {API_ROUTES} from '@/constants';
import {API, apiErrorMessage, ApiEnvelope, completeSession, isValidNationalPhone, readEnvelope, toPhoneE164} from '@/utils';
import type {ICountry} from 'rn-international-phone-number';

type FormData = {
  email: string;
  password: string;
  phone: string;
};

type OtpChallengePayload = {sessionId?: string};
type AuthTokensPayload = {accessToken?: string; refreshToken?: string};
type PasswordLoginPayload = AuthTokensPayload & {requiresOtp?: boolean; sessionId?: string};

export default function Login() {
  const {navigate, replace} = useRouter();
  const {t} = useTranslation();

  const [activeTab, setActiveTab] = useState<AuthTab>('email');
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {control, handleSubmit, clearErrors} = useForm<FormData>({defaultValues: {email: '', password: '', phone: ''}});

  const alertLoginError = (error: unknown) => {
    Alert.alert(
      t('login.errorTitle'),
      error instanceof Error && error.message.startsWith('UNEXPECTED_')
        ? t('errors.unexpectedResponse')
        : apiErrorMessage(error, t('errors.generic'))
    );
  };

  const passwordLoginMutation = useMutation({
    mutationFn: async ({email, password}: {email: string; password: string}) => {
      const response = await API.post<ApiEnvelope<PasswordLoginPayload>>(API_ROUTES.LOGIN.PASSWORD, {
        email,
        password,
      });
      const data = readEnvelope<PasswordLoginPayload>(response.data);
      if (!data) throw new Error('UNEXPECTED_LOGIN_PASSWORD');
      return {data, email};
    },
    onSuccess: async ({data, email}) => {
      if (data.accessToken && data.refreshToken) {
        try {
          await completeSession({accessToken: data.accessToken, refreshToken: data.refreshToken});
          replace('/');
        } catch (error) {
          if (error instanceof Error && error.message === 'ACCOUNT_CAP_REACHED') {
            Alert.alert(
              t('login.errorTitle'),
              'You can add up to 5 accounts on this device. Log out of one to add another.'
            );
            return;
          }
          alertLoginError(error);
        }
        return;
      }
      if (data.requiresOtp && data.sessionId) {
        navigate({pathname: '/otp', params: {flow: 'login', type: 'email', value: email, sessionId: data.sessionId}});
        return;
      }
      Alert.alert(t('login.errorTitle'), t('errors.unexpectedResponse'));
    },
    onError: alertLoginError,
  });

  const sendOtpMutation = useMutation({
    mutationFn: async (phone: string) => {
      const response = await API.post<ApiEnvelope<OtpChallengePayload>>(API_ROUTES.LOGIN.OTP_SEND, {phone});
      const sessionId = readEnvelope<OtpChallengePayload>(response.data)?.sessionId;
      if (!sessionId) throw new Error('UNEXPECTED_LOGIN_OTP_SEND');
      return {sessionId, phone};
    },
    onSuccess: ({sessionId, phone}) => {
      navigate({pathname: '/otp', params: {flow: 'login', type: 'phone', value: phone, sessionId}});
    },
    onError: alertLoginError,
  });

  const handleTabChange = (tab: AuthTab) => {
    setActiveTab(tab);
    clearErrors();
  };

  const onSubmit = ({email, password, phone}: FormData) => {
    if (activeTab === 'email') {
      passwordLoginMutation.mutate({email: email.trim(), password});
      return;
    }

    const e164 = toPhoneE164(phone, selectedCountry);
    if (!e164) {
      Alert.alert(t('login.errorTitle'), t('signup.invalidPhone'));
      return;
    }

    sendOtpMutation.mutate(e164);
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
            <Text className="text-center font-extrabold text-2xl text-[#111111]">{t('login.title')}</Text>
          </View>

          <AuthMethodTabs activeTab={activeTab} onChange={handleTabChange} />

          <View className="px-6">
            {activeTab === 'email' ? (
              <View className="gap-3">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    validate: (val) => {
                      if (activeTab !== 'email') return true;
                      if (!val) return t('signup.invalidEmail');
                      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || t('signup.invalidEmail');
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
                      {fieldState.error?.message ? (
                        <Text className="mt-2 font-medium text-sm text-danger-700">{fieldState.error.message}</Text>
                      ) : null}
                    </View>
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  rules={{
                    validate: (val) => {
                      if (activeTab !== 'email') return true;
                      return !!val.trim() || t('login.invalidPassword');
                    },
                  }}
                  render={({field: {onChange, onBlur, value}, fieldState}) => (
                    <View>
                      <View className="h-14 flex-row items-center rounded-xl border border-[#ececec] px-4">
                        <TextInput
                          value={value}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          secureTextEntry={!showPassword}
                          placeholder={t('login.passwordPlaceholder')}
                          placeholderTextColor="#a7a7a7"
                          autoCapitalize="none"
                          autoCorrect={false}
                          autoComplete="password"
                          className="flex-1 font-medium text-base text-[#111111]"
                        />
                        <Pressable onPress={() => setShowPassword((v) => !v)} className="p-1 active:opacity-70">
                          {showPassword ? (
                            <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a7a7a7" strokeWidth="2">
                              <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <Circle cx="12" cy="12" r="3" />
                            </Svg>
                          ) : (
                            <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a7a7a7" strokeWidth="2">
                              <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                              <Path d="M1 1l22 22" />
                            </Svg>
                          )}
                        </Pressable>
                      </View>
                      {fieldState.error?.message ? (
                        <Text className="mt-2 font-medium text-sm text-danger-700">{fieldState.error.message}</Text>
                      ) : null}
                    </View>
                  )}
                />
              </View>
            ) : (
              <Controller
                name="phone"
                control={control}
                rules={{
                  validate: (val) => {
                    if (activeTab !== 'phone') return true;
                    return isValidNationalPhone(val, selectedCountry) || t('signup.invalidPhone');
                  },
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
              title={activeTab === 'email' ? t('login.submit') : t('signup.sendOtp')}
              loading={passwordLoginMutation.isPending || sendOtpMutation.isPending}
              onPress={handleSubmit(onSubmit)}
            />

            {activeTab === 'email' ? (
              <Pressable onPress={() => navigate('/forgot-password')} className="mt-4 self-start active:opacity-70">
                <Text className="font-semibold text-sm text-primary">{t('login.forgotPassword')}</Text>
              </Pressable>
            ) : null}
          </View>

          <SocialAuthButtons />

          <View className="mt-8 items-center px-9">
            <Text className="text-center font-medium text-[13px] leading-[22px] text-[#a7a7a7]">{t('signup.terms')}</Text>
          </View>

          <View className="mt-auto flex-row justify-center py-6">
            <Text className="font-medium text-sm text-[#a7a7a7]">{t('login.noAccount')} </Text>
            <Pressable onPress={() => navigate('/signup')}>
              <Text className="font-semibold text-sm text-primary">{t('login.signUp')}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
