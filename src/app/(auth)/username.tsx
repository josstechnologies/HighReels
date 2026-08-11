import {View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import Svg, {Circle, Path} from 'react-native-svg';
import {SVGS} from '@/assets';
import {Button} from '@/components';
import {API_ROUTES} from '@/constants';
import {authActions, signupDraft$, signupDraftActions} from '@/store';
import {API, apiErrorMessage, ApiEnvelope, readEnvelope} from '@/utils';

const USERNAME_PATTERN = /^[a-z0-9_]+$/;

type FormData = {username: string};

type AuthTokensPayload = {accessToken?: string; refreshToken?: string};

const isValidUsername = (value: string) => value.length >= 3 && USERNAME_PATTERN.test(value);

export default function Username() {
  const {back, replace} = useRouter();
  const {t} = useTranslation();

  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {username: ''},
    mode: 'onChange',
  });
  const username = useWatch({control, name: 'username'}) ?? '';
  const canContinue = isValidUsername(username);

  const completeMutation = useMutation({
    mutationFn: async (usernameValue: string) => {
      const draft = signupDraft$.get();
      if (!draft.sessionId || !draft.password || !draft.pin || !draft.dob) {
        throw new Error('INCOMPLETE_SIGNUP_DRAFT');
      }
      const response = await API.post<ApiEnvelope<AuthTokensPayload>>(API_ROUTES.SIGNUP.COMPLETE, {
        sessionId: draft.sessionId,
        password: draft.password,
        pin: draft.pin,
        dob: draft.dob,
        username: usernameValue,
      });
      const tokens = readEnvelope<AuthTokensPayload>(response.data);
      if (!tokens?.accessToken || !tokens.refreshToken) throw new Error('UNEXPECTED_SIGNUP_COMPLETE');
      return {accessToken: tokens.accessToken, refreshToken: tokens.refreshToken};
    },
    onSuccess: (tokens) => {
      authActions.setSession(tokens);
      signupDraftActions.clear();
      replace('/');
    },
    onError: (error) => {
      if (error instanceof Error && error.message === 'INCOMPLETE_SIGNUP_DRAFT') {
        signupDraftActions.clear();
        Alert.alert(t('signup.errorTitle'), t('errors.generic'));
        replace('/signup');
        return;
      }
      Alert.alert(
        t('signup.errorTitle'),
        error instanceof Error && error.message.startsWith('UNEXPECTED_')
          ? t('errors.unexpectedResponse')
          : apiErrorMessage(error, t('errors.generic'))
      );
    },
  });

  const onContinue = (data: FormData) => {
    completeMutation.mutate(data.username);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 24}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="flex-1 px-6">
            <View className="pt-2">
              <Pressable onPress={back} className="self-start rounded-full p-2 active:bg-zinc-100">
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                  <Path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </Pressable>
            </View>

            <View className="mt-6 flex-row items-center">
              <SVGS.UserBG width={58} height={58} />
              <Text className="ml-4 flex-1 font-extrabold text-[28px] leading-9 text-[#111111]">{t('signup.usernameTitle')}</Text>
            </View>

            <View className="mt-8">
              <Controller
                name="username"
                control={control}
                rules={{
                  required: true,
                  minLength: 3,
                  pattern: {value: USERNAME_PATTERN, message: t('signup.invalidUsername')},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View className="h-14 flex-row items-center rounded-xl border border-[#ececec] px-4">
                    <TextInput
                      value={value}
                      onBlur={onBlur}
                      onChangeText={(text) => onChange(text.toLowerCase())}
                      placeholder={t('signup.usernamePlaceholder')}
                      placeholderTextColor="#a7a7a7"
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!completeMutation.isPending}
                      className="flex-1 font-medium text-base text-[#111111]"
                    />
                    {isValidUsername(value) ? (
                      <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <Circle cx="11" cy="11" r="11" fill="#4FA531" />
                        <Path d="M6.5 11.2L9.1 13.8L15.5 8.4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </Svg>
                    ) : null}
                  </View>
                )}
              />
            </View>

            <View className="mt-5 flex-row items-start">
              <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5">
                <Circle cx="9" cy="9" r="8" stroke="#a7a7a7" strokeWidth="1.5" />
                <Path d="M9 8V13" stroke="#a7a7a7" strokeWidth="1.5" strokeLinecap="round" />
                <Circle cx="9" cy="5.5" r="0.75" fill="#a7a7a7" />
              </Svg>
              <Text className="ml-2.5 flex-1 font-medium text-[13px] leading-5 text-[#a7a7a7]">{t('signup.usernameInfo')}</Text>
            </View>

            <View className="mt-auto pb-4 pt-10">
              <Button
                title={t('signup.continue')}
                disabled={!canContinue || completeMutation.isPending}
                loading={completeMutation.isPending}
                onPress={handleSubmit(onContinue)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
