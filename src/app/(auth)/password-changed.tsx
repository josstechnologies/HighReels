import {View, Text} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {Button} from '@/components';

export default function PasswordChanged() {
  const {navigate} = useRouter();
  const {t} = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <SVGS.CheckBG width={80} height={80} />
        <Text className="mt-8 text-center text-[28px] font-extrabold leading-9 text-[#111111]">{t('login.passwordChangedTitle')}</Text>
        <Text className="mt-3 text-center text-[15px] font-medium leading-6 text-[#6b6b6b]">{t('login.passwordChangedSubtitle')}</Text>
      </View>

      <View className="px-6 pb-4">
        <Button title={t('login.continueLogIn')} onPress={() => navigate('/login')} />
      </View>
    </SafeAreaView>
  );
}
