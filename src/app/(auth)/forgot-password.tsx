import {useState} from 'react';
import {View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import Svg, {Path} from 'react-native-svg';
import {AuthMethodTabs, AuthTab, Button, PhoneInputField} from '@/components';

type FormData = {
  email: string;
  phone: string;
};

export default function ForgotPassword() {
  const {back, navigate} = useRouter();
  const {t} = useTranslation();

  const [activeTab, setActiveTab] = useState<AuthTab>('email');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const {control, handleSubmit, clearErrors} = useForm<FormData>({
    defaultValues: {email: '', phone: ''},
  });

  const handleTabChange = (tab: AuthTab) => {
    setActiveTab(tab);
    clearErrors();
  };

  const onSend = ({email, phone}: FormData) => {
    if (activeTab === 'email') {
      navigate({pathname: '/otp', params: {type: 'email', value: email, flow: 'reset'}});
      return;
    }

    const countryCode = selectedCountry?.callingCode ? `+${selectedCountry.callingCode}` : '';
    navigate({pathname: '/otp', params: {type: 'phone', value: `${countryCode} ${phone}`.trim(), flow: 'reset'}});
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

          <AuthMethodTabs activeTab={activeTab} onChange={handleTabChange} />

          <View className="px-6">
            {activeTab === 'email' ? (
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
                      className="h-14 rounded-xl border border-[#ececec] px-4 text-base font-medium text-[#111111]"
                    />
                    {fieldState.error?.message ? <Text className="text-danger-700 mt-2 text-sm font-medium">{fieldState.error.message}</Text> : null}
                  </View>
                )}
              />
            ) : (
              <Controller
                name="phone"
                control={control}
                rules={{
                  validate: (val) => {
                    if (activeTab !== 'phone') return true;
                    const digits = val.replace(/\D/g, '');
                    return digits.length >= 7 || t('signup.invalidPhone');
                  },
                }}
                render={({field: {onChange, value}, fieldState}) => (
                  <PhoneInputField
                    value={value}
                    onChangePhoneNumber={onChange}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={setSelectedCountry}
                    placeholder={t('signup.phonePlaceholder')}
                    defaultCountry="AU"
                    error={fieldState.error}
                  />
                )}
              />
            )}

            <Button className="mt-4" title={activeTab === 'email' ? t('signup.sendCode') : t('signup.sendOtp')} onPress={handleSubmit(onSend)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
