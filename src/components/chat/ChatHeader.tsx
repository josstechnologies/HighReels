import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {Image} from 'expo-image';
import {useTranslation} from 'react-i18next';
import {IMAGES, SVGS} from '@/assets';
import {ChatInfoSheet} from '@/components/chat/ChatInfoSheet';
import {ChatLanguageSheet} from '@/components/chat/ChatLanguageSheet';

const ICON = '#111111';

export function ChatHeader({userName, userAvatar, chatId}: {userName: string; userAvatar?: string; chatId: string}) {
  const router = useRouter();
  const {t} = useTranslation();
  const [infoOpen, setInfoOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const avatarSource = userAvatar ? {uri: userAvatar} : IMAGES.user;

  return (
    <>
      <View className="flex-row items-center bg-white px-2 py-2">
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel={t('chat.back')}
        className="h-10 w-10 items-center justify-center">
        <SVGS.Back width={24} height={24} color={ICON} />
      </Pressable>
      <Pressable
        onPress={() => router.push(`/chat/profile/${chatId}` as Href)}
        accessibilityRole="button"
        accessibilityLabel={userName}
        className="mr-3">
        <Image source={avatarSource} style={{width: 40, height: 40, borderRadius: 20}} contentFit="cover" />
        <View className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#34C759]" />
      </Pressable>
      <View className="flex-1">
        <Text className="font-NunitoSans_700Bold text-[16px] text-black" numberOfLines={1}>
          {userName}
        </Text>
        <Text className="font-NunitoSans_600SemiBold text-[12px] text-primary underline">{t('chat.online')}</Text>
      </View>
      <Pressable
        onPress={() => setInfoOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={t('chat.info')}
        className="h-10 w-10 items-center justify-center">
        <SVGS.Info width={24} height={24} color={ICON} />
      </Pressable>
      <Pressable
        onPress={() => setLanguageOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={t('chat.chooseLanguage')}
        className="h-10 w-10 items-center justify-center">
        <SVGS.Lang width={24} height={24} color={ICON} />
      </Pressable>
      </View>
      <ChatInfoSheet visible={infoOpen} chatId={chatId} onClose={() => setInfoOpen(false)} />
      <ChatLanguageSheet visible={languageOpen} chatId={chatId} onClose={() => setLanguageOpen(false)} />
    </>
  );
}
