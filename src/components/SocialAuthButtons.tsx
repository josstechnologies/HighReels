import {View, Text, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';

export function SocialAuthButtons() {
  const {t} = useTranslation();

  return (
    <>
      <View className="my-6 flex-row items-center px-6">
        <View className="h-[1px] flex-1 bg-[#f4f4f4]" />
        <Text className="mx-4 text-sm font-medium text-[#a7a7a7]">{t('signup.or')}</Text>
        <View className="h-[1px] flex-1 bg-[#f4f4f4]" />
      </View>

      <View className="flex-row px-6">
        <Pressable className="mr-3 h-11 flex-1 flex-row items-center justify-center rounded-xl bg-[#f3f3f3] active:opacity-80">
          <SVGS.Google width={20} height={20} />
          <Text className="ml-2 text-sm font-medium text-[#111111]">{t('signup.google')}</Text>
        </Pressable>
        <Pressable className="ml-3 h-11 flex-1 flex-row items-center justify-center rounded-xl bg-[#f3f3f3] active:opacity-80">
          <SVGS.Apple width={20} height={20} />
          <Text className="ml-2 text-sm font-medium text-[#111111]">{t('signup.apple')}</Text>
        </Pressable>
      </View>
    </>
  );
}
