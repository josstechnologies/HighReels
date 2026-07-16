import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import Svg, { Path, Circle } from 'react-native-svg';
import { SVGS } from '@/src/assets/SVGS';
import { PhoneInputField } from '@/src/components';

type FormData = {
  email: string;
  phone: string;
};

type StepState = 'form' | 'otp' | 'password' | 'pin';

export default function Signup() {
  const { navigate } = useRouter();
  const { t } = useTranslation();

  // Onboarding step state
  const [step, setStep] = useState<StepState>('form');
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  // Form values for verification steps
  const [submittedValue, setSubmittedValue] = useState('');
  
  // OTP Verification state
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [timer, setTimer] = useState(33);
  const otpInputRef = useRef<TextInput>(null);

  // Password state
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // PIN state
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);
  const pinInputRef = useRef<TextInput>(null);

  const { control, handleSubmit, clearErrors } = useForm<FormData>({
    defaultValues: { email: '', phone: '' },
  });

  // OTP Countdown timer hook
  useEffect(() => {
    if (step !== 'otp') return;
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleTabChange = (tab: 'email' | 'phone') => {
    setActiveTab(tab);
    clearErrors();
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleLoginNav = () => {
    navigate('/login');
  };

  const onFormSubmit = (data: FormData) => {
    if (activeTab === 'email') {
      setSubmittedValue(data.email);
    } else {
      const countryCode = selectedCountry ? `+${selectedCountry.callingCode}` : '';
      setSubmittedValue(`${countryCode} ${data.phone}`);
    }
    setOtpCode('');
    setOtpError(null);
    setTimer(33);
    setStep('otp');
  };

  const handleOtpChange = (text: string) => {
    const clean = text.replace(/\D/g, '');
    setOtpCode(clean);
    if (otpError) setOtpError(null);
    
    // Automatically transition once 6th digit is entered
    if (clean.length === 6) {
      setTimeout(() => {
        setPassword('');
        setStep('password');
      }, 150);
    }
  };

  const handleResendOtp = () => {
    if (timer > 0) return;
    setOtpCode('');
    setTimer(33);
    Alert.alert(t('landing.title'), `New code sent to ${submittedValue}`);
  };

  // Password validation checks
  const isMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasNoSpaces = /^\S*$/.test(password) && password.length > 0;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = isMinLength && hasNumber && hasNoSpaces && hasSymbol;

  const handlePasswordSubmit = () => {
    if (!isPasswordValid) return;
    setPinCode('');
    setPinError(null);
    setStep('pin');
  };

  const handlePinChange = (text: string) => {
    const clean = text.replace(/\D/g, '');
    setPinCode(clean);
    if (pinError) setPinError(null);
    
    // Automatically finish once 4th digit is entered
    if (clean.length === 4) {
      setTimeout(() => {
        Alert.alert(
          t('landing.title'),
          'Signup Complete!',
          [{ text: 'OK', onPress: () => navigate('/') }]
        );
      }, 150);
    }
  };

  const handleSocialSignup = (provider: string) => {
    Alert.alert(t('landing.title'), `Signing up with ${provider}...`);
  };

  const renderBackButton = (prevStep: StepState) => (
    <View className="flex-row items-center justify-between py-4 px-6">
      <Pressable 
        onPress={() => setStep(prevStep)} 
        className="p-2 active:bg-zinc-100 rounded-full"
      >
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
          <Path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </Pressable>
      <Pressable 
        onPress={handleClose} 
        className="p-2 active:bg-zinc-100 rounded-full"
      >
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
          <Path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === 'form' && (
            <View className="flex-1">
              {/* Close Button Header */}
              <View className="flex-row justify-end py-4 px-6">
                <Pressable 
                  onPress={handleClose} 
                  className="p-2 active:bg-zinc-100 rounded-full"
                >
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                    <Path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                </Pressable>
              </View>

              {/* Main Heading */}
              <View className="items-center mt-2 mb-8 px-6">
                <Text className="text-3xl font-extrabold text-zinc-950 tracking-tight text-center">
                  {t('signup.title')}
                </Text>
              </View>

              {/* Full-width Tab Selector */}
              <View className="flex-row w-full border-b border-zinc-200 mb-8">
                <Pressable 
                  onPress={() => handleTabChange('email')}
                  className={`flex-1 py-4 items-center ${activeTab === 'email' ? 'border-b-[3px] border-zinc-950' : 'border-b border-transparent'}`}
                >
                  <Text className={`text-[17px] ${activeTab === 'email' ? 'font-bold text-zinc-950' : 'font-semibold text-zinc-400'}`}>
                    {t('signup.email')}
                  </Text>
                </Pressable>
                
                <Pressable 
                  onPress={() => handleTabChange('phone')}
                  className={`flex-1 py-4 items-center ${activeTab === 'phone' ? 'border-b-[3px] border-zinc-950' : 'border-b border-transparent'}`}
                >
                  <Text className={`text-[17px] ${activeTab === 'phone' ? 'font-bold text-zinc-950' : 'font-semibold text-zinc-400'}`}>
                    {t('signup.phone')}
                  </Text>
                </Pressable>
              </View>

              {/* Form Content */}
              <View className="px-6 mb-6">
                {activeTab === 'email' ? (
                  <View>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: activeTab === 'email' ? t('signup.invalidEmail') : false,
                        pattern: activeTab === 'email' ? {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: t('signup.invalidEmail'),
                        } : undefined
                      }}
                      render={({ field: { onChange, onBlur, value }, fieldState }) => (
                        <View>
                          <TextInput
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder={t('signup.emailPlaceholder')}
                            placeholderTextColor="#A1A1AA"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoComplete="email"
                            className={`border ${fieldState.error ? 'border-red-500' : 'border-zinc-200'} rounded-2xl px-5 text-base text-zinc-950 bg-white mb-2`}
                            style={{ height: 56 }}
                          />
                          {fieldState.error && (
                            <Text className="text-red-500 text-xs ml-2 mb-2 font-semibold">{fieldState.error.message}</Text>
                          )}
                        </View>
                      )}
                    />
                    
                    <Pressable
                      onPress={handleSubmit(onFormSubmit)}
                      className="bg-purple-600 active:bg-purple-700 rounded-2xl py-4 items-center justify-center mt-4 shadow-sm"
                    >
                      <Text className="text-white font-extrabold text-base tracking-wide">
                        {t('signup.sendCode')}
                      </Text>
                    </Pressable>
                  </View>
                ) : (
                  <View>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: activeTab === 'phone' ? t('signup.invalidPhone') : false,
                        validate: (val) => {
                          if (activeTab !== 'phone') return true;
                          if (!val) return t('signup.invalidPhone');
                          const cleanNumber = val.replace(/\D/g, '');
                          return cleanNumber.length >= 7 || t('signup.invalidPhone');
                        }
                      }}
                      render={({ field: { onChange, value }, fieldState }) => (
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

                    <Pressable
                      onPress={handleSubmit(onFormSubmit)}
                      className="bg-purple-600 active:bg-purple-700 rounded-2xl py-4 items-center justify-center mt-4 shadow-sm"
                    >
                      <Text className="text-white font-extrabold text-base tracking-wide">
                        {t('signup.sendOtp')}
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>

              {/* Divider Line */}
              <View className="flex-row items-center my-6 px-6">
                <View className="flex-1 h-[1px] bg-zinc-200" />
                <Text className="mx-4 text-zinc-400 text-sm font-semibold">
                  {t('signup.or')}
                </Text>
                <View className="flex-1 h-[1px] bg-zinc-200" />
              </View>

              {/* Social Sign-In Buttons */}
              <View className="flex-row justify-between mb-8 px-6">
                <Pressable
                  onPress={() => handleSocialSignup('Google')}
                  className="flex-1 flex-row border border-zinc-200/50 bg-zinc-100/60 active:bg-zinc-200/80 rounded-2xl py-4 items-center justify-center mr-2"
                >
                  <SVGS.Google width={20} height={20} />
                  <Text className="text-zinc-900 font-bold text-sm tracking-wide ml-2">
                    {t('signup.google')}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => handleSocialSignup('Apple')}
                  className="flex-1 flex-row border border-zinc-200/50 bg-zinc-100/60 active:bg-zinc-200/80 rounded-2xl py-4 items-center justify-center ml-2"
                >
                  <SVGS.Apple width={20} height={20} />
                  <Text className="text-zinc-900 font-bold text-sm tracking-wide ml-2">
                    {t('signup.apple')}
                  </Text>
                </Pressable>
              </View>

              {/* Disclaimer Text */}
              <View className="items-center mb-8 px-6">
                <Text className="text-zinc-500 text-xs text-center leading-relaxed max-w-[300px] font-medium">
                  {t('signup.terms')}
                </Text>
              </View>

              {/* Footer Navigation */}
              <View className="flex-row justify-center mt-auto py-4 px-6">
                <Text className="text-zinc-500 text-sm font-semibold">
                  {t('signup.alreadyAccount')}
                </Text>
                <Pressable onPress={handleLoginNav}>
                  <Text className="text-purple-600 font-bold text-sm">
                    {" "}{t('signup.logIn')}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}

          {step === 'otp' && (
            <View className="flex-1">
              {renderBackButton('form')}

              {/* Icon & Heading Side by Side */}
              <View className="flex-row items-center mt-6 mb-2 px-6">
                {activeTab === 'email' ? (
                  <SVGS.EmailBG width={58} height={58} />
                ) : (
                  <SVGS.PhoneBG width={58} height={58} />
                )}
                <Text className="text-2xl font-extrabold text-zinc-950 ml-4 flex-1 tracking-tight">
                  {activeTab === 'email' ? t('signup.checkEmail') : t('signup.checkPhone')}
                </Text>
              </View>

              {/* Subtitle */}
              <View className="px-6 mb-4">
                <Text className="text-zinc-400 text-sm font-medium leading-relaxed">
                  {activeTab === 'email' ? t('signup.sentEmailCode') : t('signup.sentPhoneOtp')}{' '}
                  <Text className="text-zinc-900 font-bold">{submittedValue}</Text>
                </Text>
              </View>

              {/* Hidden text input & OTP Box visualizer */}
              <View className="px-6 mt-8 mb-6 relative">
                <TextInput
                  ref={otpInputRef}
                  value={otpCode}
                  onChangeText={handleOtpChange}
                  maxLength={6}
                  keyboardType="number-pad"
                  className="absolute w-full h-full opacity-0 z-10"
                  caretHidden
                />
                
                <Pressable 
                  onPress={() => otpInputRef.current?.focus()} 
                  className="flex-row justify-between w-full"
                >
                  {Array(6).fill(0).map((_, i) => {
                    const char = otpCode[i] || '';
                    const isFocused = otpCode.length === i && otpInputRef.current?.isFocused();
                    return (
                      <View 
                        key={i} 
                        className={`w-[48px] h-[56px] border ${isFocused ? 'border-zinc-950 border-2' : 'border-zinc-200'} rounded-2xl items-center justify-center bg-zinc-50`}
                      >
                        <Text className="text-xl font-bold text-zinc-950">{char}</Text>
                      </View>
                    );
                  })}
                </Pressable>
                {otpError && (
                  <Text className="text-red-500 text-xs ml-2 mt-3 font-semibold">{otpError}</Text>
                )}
              </View>

              {/* Resend Code Section */}
              <View className="items-center mb-6 px-6">
                {timer > 0 ? (
                  <Text className="text-zinc-400 text-sm font-semibold">
                    {t('signup.resendIn')} 00:{timer < 10 ? `0${timer}` : timer}
                  </Text>
                ) : (
                  <Pressable 
                    onPress={handleResendOtp}
                    className="flex-row items-center space-x-1 py-2"
                  >
                    <SVGS.Resend width={14} height={14} />
                    <Text className="text-zinc-900 font-bold text-sm ml-1.5">
                      {t('signup.resendCode')}
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}

          {step === 'password' && (
            <View className="flex-1">
              {renderBackButton('otp')}

              {/* Icon & Heading Side by Side */}
              <View className="flex-row items-center mt-6 mb-2 px-6">
                <SVGS.PasswordBG width={58} height={58} />
                <Text className="text-2xl font-extrabold text-zinc-950 ml-4 flex-1 tracking-tight">
                  {t('signup.createPassword')}
                </Text>
              </View>

              {/* Subtitle */}
              <View className="px-6 mb-6">
                <Text className="text-zinc-400 text-sm font-medium leading-relaxed">
                  {t('signup.passwordSubtitle')}
                </Text>
              </View>

              {/* Password Input */}
              <View className="px-6 mb-6">
                <View className="flex-row items-center border border-zinc-200 rounded-2xl px-5 bg-white mb-6" style={{ height: 56 }}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholder={t('signup.passwordPlaceholder')}
                    placeholderTextColor="#A1A1AA"
                    autoCapitalize="none"
                    className="flex-1 text-base text-zinc-950"
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)} className="p-2">
                    {showPassword ? (
                      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2">
                        <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <Path d="M1 1l22 22" />
                      </Svg>
                    ) : (
                      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2">
                        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <Circle cx="12" cy="12" r="3" />
                      </Svg>
                    )}
                  </Pressable>
                </View>

                {/* Password Rules Checklist */}
                <View className="space-y-3 mb-8 px-2">
                  {[
                    { label: t('signup.reqMinLength'), checked: isMinLength },
                    { label: t('signup.reqNumber'), checked: hasNumber },
                    { label: t('signup.reqNoSpaces'), checked: hasNoSpaces },
                    { label: t('signup.reqSymbol'), checked: hasSymbol },
                  ].map((rule, idx) => (
                    <View key={idx} className="flex-row items-center mb-2.5">
                      {rule.checked ? (
                        <View className="mr-3">
                          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3.5">
                            <Path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </Svg>
                        </View>
                      ) : (
                        <View className="w-2.5 h-2.5 rounded-full bg-zinc-200 mr-4 ml-0.5" />
                      )}
                      <Text className={`text-sm ${rule.checked ? 'text-zinc-800 font-bold' : 'text-zinc-400 font-medium'}`}>
                        {rule.label}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Continue CTA */}
                <Pressable
                  disabled={!isPasswordValid}
                  onPress={handlePasswordSubmit}
                  className={`rounded-2xl py-4 items-center justify-center shadow-sm ${isPasswordValid ? 'bg-purple-600 active:bg-purple-700' : 'bg-purple-300'}`}
                >
                  <Text className="text-white font-extrabold text-base tracking-wide">
                    {t('signup.continue')}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}

          {step === 'pin' && (
            <View className="flex-1">
              {renderBackButton('password')}

              {/* Icon & Heading Side by Side */}
              <View className="flex-row items-center mt-6 mb-2 px-6">
                <View className="bg-purple-600/10 p-3 rounded-full border border-purple-500/20">
                  <Svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
                    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                </View>
                <Text className="text-2xl font-extrabold text-zinc-950 ml-4 flex-1 tracking-tight">
                  {t('signup.createPin')}
                </Text>
              </View>

              {/* Subtitle */}
              <View className="px-6 mb-6">
                <Text className="text-zinc-400 text-sm font-medium leading-relaxed">
                  {t('signup.pinSubtitle')}
                </Text>
              </View>

              {/* Hidden text input & PIN Box visualizer */}
              <View className="px-6 mt-8 mb-6 relative">
                <TextInput
                  ref={pinInputRef}
                  value={pinCode}
                  onChangeText={handlePinChange}
                  maxLength={4}
                  keyboardType="number-pad"
                  className="absolute w-full h-full opacity-0 z-10"
                  caretHidden
                />
                
                <Pressable 
                  onPress={() => pinInputRef.current?.focus()} 
                  className="flex-row justify-center space-x-4 w-full"
                >
                  {Array(4).fill(0).map((_, i) => {
                    const char = pinCode[i] || '';
                    const isFocused = pinCode.length === i && pinInputRef.current?.isFocused();
                    return (
                      <View 
                        key={i} 
                        className={`w-[60px] h-[68px] border ${isFocused ? 'border-zinc-950 border-2' : 'border-zinc-200'} rounded-2xl items-center justify-center bg-zinc-50`}
                      >
                        {char ? (
                          <View className="w-3.5 h-3.5 rounded-full bg-zinc-950" />
                        ) : (
                          <Text className="text-xl font-bold text-zinc-300">-</Text>
                        )}
                      </View>
                    );
                  })}
                </Pressable>
                {pinError && (
                  <Text className="text-red-500 text-xs ml-2 mt-4 font-semibold text-center">{pinError}</Text>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
