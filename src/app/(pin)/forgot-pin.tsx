import {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {Button} from '@/components';
import {RadioDot} from '@/components';
import {cn} from '@/utils';

type Channel = 'email' | 'phone';

export default function ForgotPin() {
  const {back, push} = useRouter();
  const {t} = useTranslation();
  const [channel, setChannel] = useState<Channel>('email');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <Pressable onPress={back} className="mt-2 self-start rounded-full p-2 active:bg-zinc-100">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>

        <View className="mt-6 items-center">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-primary">
            <SVGS.Shield width={48} height={48} color="#FFFFFF" />
          </View>
          <Text className="mt-6 text-center font-extrabold text-[28px] leading-9 text-[#111111]">{t('pin.verifyTitle')}</Text>
          <Text className="mt-2 text-center font-medium text-15 leading-6 text-[#6b6b6b]">{t('pin.verifySubtitle')}</Text>
        </View>

        <View className="mt-10 gap-3">
          <Pressable
            onPress={() => setChannel('email')}
            className={cn(
              'flex-row items-center rounded-2xl border bg-white px-4 py-3.5 shadow-sm shadow-black/5',
              channel === 'email' ? 'border-primary' : 'border-[#e8e8e8]',
            )}>
            <SVGS.Mail width={40} height={40} />
            <View className="ml-3 flex-1">
              <Text className="font-bold text-base text-[#111111]">{t('pin.channelEmail')}</Text>
              <Text className="mt-0.5 font-medium text-13 text-[#8a8a8a]">{t('pin.maskedEmail')}</Text>
            </View>
            <RadioDot selected={channel === 'email'} />
          </Pressable>

          <Pressable
            onPress={() => setChannel('phone')}
            className={cn(
              'flex-row items-center rounded-2xl border bg-white px-4 py-3.5 shadow-sm shadow-black/5',
              channel === 'phone' ? 'border-primary' : 'border-[#e8e8e8]',
            )}>
            <SVGS.PhoneBadge width={40} height={40} />
            <View className="ml-3 flex-1">
              <Text className="font-bold text-base text-[#111111]">{t('pin.channelPhone')}</Text>
              <Text className="mt-0.5 font-medium text-13 text-[#8a8a8a]">{t('pin.maskedPhone')}</Text>
            </View>
            <RadioDot selected={channel === 'phone'} />
          </Pressable>
        </View>

        <View className="mt-auto pb-4">
          {/* UI-only for now — PIN recovery OTP API not wired yet */}
          <Button title={t('pin.sendOtp')} onPress={() => push({pathname: '/verify-pin-otp', params: {type: channel}})} />
        </View>
      </View>
    </SafeAreaView>
  );
}
