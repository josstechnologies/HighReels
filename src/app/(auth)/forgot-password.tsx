import {View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import Svg, {Path} from 'react-native-svg';
import {Button} from '@/components';
import {API_ROUTES} from '@/constants';
import {API, apiErrorMessage, ApiEnvelope, readEnvelope} from '@/utils';

type FormData = {
  email: string;
};

type OtpChallengePayload = {sessionId?: string};

export default function ForgotPassword() {
  const {back, navigate} = useRouter();
  const {t} = useTranslation();

  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {email: ''},
  });

  const sendOtpMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await API.post<ApiEnvelope<OtpChallengePayload>>(API_ROUTES.PASSWORD_RESET.OTP_SEND, {email});
      const sessionId = readEnvelope<OtpChallengePayload>(response.data)?.sessionId;
      if (!sessionId) throw new Error('UNEXPECTED_PASSWORD_RESET_OTP_SEND');
      return {sessionId, email};
    },
    onSuccess: ({sessionId, email}) => {
      navigate({pathname: '/otp', params: {flow: 'reset', type: 'email', value: email, sessionId}});
    },
    onError: (error) => {
      Alert.alert(
        t('login.forgotPasswordTitle'),
        error instanceof Error && error.message.startsWith('UNEXPECTED_')
          ? t('errors.unexpectedResponse')
          : apiErrorMessage(error, t('errors.generic'))
      );
    },
  });

  const onSend = ({email}: FormData) => {
    sendOtpMutation.mutate(email.trim());
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 24}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-end px-5 pt-2">
            <Pressable onPress={back} className="rounded-full p-2 active:bg-zinc-100">
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                <Path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </Pressable>
          </View>

          <View className="mb-8 mt-4 items-center px-6">
            <Text className="text-center text-2xl font-extrabold text-[#111111]">{t('login.forgotPasswordTitle')}</Text>
          </View>

          <View className="px-6">
            <Controller
              name="email"
              control={control}
              rules={{
                validate: (val) => {
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
                    className="h-14 rounded-xl border border-[#ececec] px-4 text-base font-medium text-[#111111]"
                  />
                  {fieldState.error?.message ? <Text className="text-danger-700 mt-2 text-sm font-medium">{fieldState.error.message}</Text> : null}
                </View>
              )}
            />

            <Button
              className="mt-4"
              title={t('signup.sendCode')}
              loading={sendOtpMutation.isPending}
              onPress={handleSubmit(onSend)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
