import {Pressable, Text, View, ScrollView} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import Svg, {Path, Circle, Defs, LinearGradient, Stop} from 'react-native-svg';

export default function Home() {
  const {navigate} = useRouter();
  const {t, i18n} = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Decorative Glowing Background Orbs */}
      <View className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-600/20 blur-[100px]" />
      <View className="absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-indigo-600/20 blur-[100px]" />
      <View className="absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[100px]" />

      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingBottom: 24}}
          showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center space-x-2">
              <View className="rounded-xl border border-purple-500/30 bg-purple-600/20 p-2">
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Circle cx="12" cy="12" r="10" stroke="#6F41EC" strokeWidth="2" />
                  <Path d="M10 8L16 12L10 16V8Z" fill="#6F41EC" />
                </Svg>
              </View>
              <Text className="ml-2 text-xl font-extrabold tracking-wider text-white">{t('landing.title')}</Text>
            </View>

            {/* Language Switcher */}
            <Pressable onPress={toggleLanguage} className="mr-12 rounded-full border border-white/10 bg-white/10 px-4 py-2 active:bg-white/20">
              <Text className="text-xs font-semibold uppercase tracking-wider text-white">{i18n.language === 'en' ? 'FR' : 'EN'}</Text>
            </Pressable>
          </View>

          {/* Central Logo & Brand Showcase */}
          <View className="my-6 items-center">
            <View className="mb-6 rounded-[32px] border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-purple-500/50">
              <Svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                <Defs>
                  <LinearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="0%" stopColor="#8B5CF6" />
                    <Stop offset="100%" stopColor="#6366F1" />
                  </LinearGradient>
                </Defs>
                {/* Outer decorative shutter rings */}
                <Circle cx="36" cy="36" r="32" stroke="url(#logo-grad)" strokeWidth="2" strokeDasharray="6 4" />
                <Circle cx="36" cy="36" r="26" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" />
                {/* Central play button and frame */}
                <Path
                  d="M28 22C25.7909 22 24 23.7909 24 26V46C24 48.2091 25.7909 50 28 50H44C46.2091 50 48 48.2091 48 46V26C48 23.7909 46.2091 22 44 22H28Z"
                  fill="url(#logo-grad)"
                />
                <Path d="M33 29L43 36L33 43V29Z" fill="#FFFFFF" />
              </Svg>
            </View>

            <Text className="text-center text-4xl font-black leading-tight tracking-tight text-white">{t('landing.slogan')}</Text>
            <Text className="mt-3 max-w-[280px] text-center text-base font-medium text-zinc-400">{t('landing.subSlogan')}</Text>
          </View>

          {/* Overlapping Mock Reel Previews */}
          <View className="relative my-4 h-44 w-full items-center justify-center">
            {/* Card 1 (Gaming Highlight) - Slanted Left */}
            <View
              style={{transform: [{rotate: '-6deg'}, {translateX: -35}]}}
              className="absolute w-44 rounded-2xl border border-white/10 bg-zinc-900/90 p-3 shadow-xl shadow-black/40">
              <View className="relative mb-2 h-20 w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-800">
                {/* Controller Icon placeholder */}
                <Svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5">
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                  />
                </Svg>
                <View className="absolute bottom-1.5 left-1.5 rounded bg-purple-600 px-1.5 py-0.5">
                  <Text className="text-[9px] font-extrabold uppercase text-white">LIVE</Text>
                </View>
              </View>
              <Text className="truncate text-xs font-bold text-white">Epic Quadra Kill 🔥</Text>
              <View className="mt-1 flex-row items-center justify-between">
                <Text className="text-[10px] font-semibold text-purple-400">{t('landing.cardGaming')}</Text>
                <Text className="text-[9px] font-medium text-zinc-500">45K views</Text>
              </View>
            </View>

            {/* Card 2 (Sports Highlight) - Slanted Right & Overlapping */}
            <View
              style={{transform: [{rotate: '4deg'}, {translateX: 45}, {translateY: 10}]}}
              className="absolute w-44 rounded-2xl border border-white/10 bg-zinc-900/90 p-3 shadow-2xl shadow-black/60">
              <View className="relative mb-2 h-20 w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-800">
                {/* Trophy/Sports Icon placeholder */}
                <Svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-5.25a1.125 1.125 0 00-1.125 1.125v3.375m9 0H7.5m9-13.5h-9L5.625 12h12.75L16.5 5.25z"
                  />
                </Svg>
                <View className="absolute bottom-1.5 right-1.5 flex-row items-center space-x-1 rounded bg-black/60 px-1.5 py-0.5">
                  <View className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <Text className="text-[9px] font-medium text-white">0:15</Text>
                </View>
              </View>
              <Text className="truncate text-xs font-bold text-white">Insane Dunk 🏀</Text>
              <View className="mt-1 flex-row items-center justify-between">
                <Text className="text-[10px] font-semibold text-indigo-400">{t('landing.cardSports')}</Text>
                <Text className="text-[9px] font-medium text-zinc-500">120K views</Text>
              </View>
            </View>
          </View>

          {/* Action Call-To-Action (CTA) Buttons */}
          <View className="mt-6 w-full space-y-4">
            {/* Primary Sign Up Button */}
            <Pressable
              onPress={() => navigate('/signup')}
              className="w-full items-center justify-center rounded-2xl bg-purple-600 py-4 shadow-lg shadow-purple-900/40 active:bg-purple-700">
              <Text className="text-base font-extrabold tracking-wide text-white">{t('landing.signUp')}</Text>
            </Pressable>

            {/* Secondary Log In Button */}
            <Pressable
              onPress={() => navigate('/signup')}
              className="mt-3 w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 py-4 active:bg-white/10">
              <Text className="text-base font-bold tracking-wide text-white">{t('landing.logIn')}</Text>
            </Pressable>

            {/* Guest mode or simple explore */}
            <Pressable onPress={() => navigate('/signup')} className="mt-2 items-center justify-center py-3">
              <Text className="text-sm font-semibold tracking-wide text-zinc-500 hover:text-zinc-400">{t('landing.guest')}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
