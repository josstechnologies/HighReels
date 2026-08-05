import {useState} from 'react';
import {View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Controller, useForm, useWatch} from 'react-hook-form';
import Svg, {Circle, Path} from 'react-native-svg';
import {SVGS} from '@/assets';
import {Button} from '@/components';

type FormData = {password: string};

function RuleIcon({checked}: {checked: boolean}) {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Circle cx="10" cy="10" r="10" fill={checked ? '#4FA531' : '#D1D5DB'} />
      <Path d="M6 10.2L8.6 12.8L14 7.4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function Password() {
  const {back, navigate} = useRouter();
  const {t} = useTranslation();
  const params = useLocalSearchParams<{flow?: string}>();
  const isReset = params.flow === 'reset';
  const [showPassword, setShowPassword] = useState(false);

  const {control} = useForm<FormData>({defaultValues: {password: ''}});
  const password = useWatch({control, name: 'password'}) ?? '';

  const hasNumber = /\d/.test(password);
  const isMinLength = password.length >= 8;
  const hasNoSpaces = password.length > 0 && !/\s/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>#&]/.test(password);
  const isValid = hasNumber && isMinLength && hasNoSpaces && hasSymbol;

  const rules = [
    {label: t('signup.reqNumber'), checked: hasNumber},
    {label: t('signup.reqMinLength'), checked: isMinLength},
    {label: t('signup.reqNoSpaces'), checked: hasNoSpaces},
    {label: t('signup.reqSymbol'), checked: hasSymbol},
  ];

  const onContinue = () => navigate(isReset ? '/password-changed' : '/pin');

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

          <View className="mt-6 flex-1 px-6">
            <View className="flex-row items-center">
              <SVGS.PasswordBG width={58} height={58} />
              <Text className="ml-4 flex-1 text-[28px] font-extrabold leading-9 text-[#111111]">{t('signup.createPassword')}</Text>
            </View>

            <View className="mt-8 h-14 flex-row items-center rounded-xl border border-[#ececec] px-4">
              <Controller
                name="password"
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                    placeholder={t('signup.passwordPlaceholder')}
                    placeholderTextColor="#a7a7a7"
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="flex-1 text-base font-medium text-[#111111]"
                  />
                )}
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

            <View className="mt-6 gap-3.5">
              {rules.map((rule) => (
                <View key={rule.label} className="flex-row items-center">
                  <RuleIcon checked={rule.checked} />
                  <Text className={`ml-3 text-[15px] font-medium ${rule.checked ? 'text-[#111111]' : 'text-[#a7a7a7]'}`}>{rule.label}</Text>
                </View>
              ))}
            </View>

            <View className="mt-auto pt-10">
              <Button title={t('signup.continue')} disabled={!isValid} onPress={onContinue} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
