import type {ReactNode} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'expo-image';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useTranslation} from 'react-i18next';
import type {SvgProps} from 'react-native-svg';
import {IMAGES, SVGS} from '@/assets';
import {Toggle} from '@/components/ui/Toggle';
import {
  ChatProfileCustomise,
  ChatProfileDisappearing,
  ChatProfileEdit,
  ChatProfileExport,
  ChatProfileFollow,
  ChatProfileGroup,
  ChatProfileLock,
  ChatProfileMedia,
  ChatProfileMute,
  ChatProfileNotifications,
  ChatProfilePinned,
  ChatProfileQr,
  ChatProfileSearch,
  ChatProfileShare,
  ChatProfileStar,
  ChatProfileUser,
  ChatProfileClear,
} from '@/assets/SVGS/chatProfile';
import {chatById, chatMenu, clearChatMessages, setChatLock, setChatMuted, setChatNotifications, useChatMenu} from '@/mock-data/chats';
import {CHEVRON_COLOR} from '@/theme/colors';

const ICON = '#111111';
const DANGER = '#EC2727';

function Section({title, children}: {title: string; children: ReactNode}) {
  return (
    <View className="mt-6">
      <Text className="font-NunitoSans_700Bold mb-1 text-[16px] text-black">{title}</Text>
      {children}
    </View>
  );
}

function LinkRow({Icon, label}: {Icon: (props: SvgProps) => ReactNode; label: string}) {
  return (
    <View className="flex-row items-center border-b border-[#F3F3F3] py-3.5">
      <Icon width={22} height={22} color={ICON} />
      <Text className="font-NunitoSans_500Medium ml-3 flex-1 text-[15px] text-black">{label}</Text>
      <SVGS.ArrowRight width={16} height={16} color={CHEVRON_COLOR} strokeWidth={2.2} />
    </View>
  );
}

function ToggleRow({
  Icon,
  label,
  checked,
  onCheckedChange,
}: {
  Icon: (props: SvgProps) => ReactNode;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <View className="flex-row items-center border-b border-[#F3F3F3] py-3">
      <Icon width={22} height={22} color={ICON} />
      <Text className="font-NunitoSans_500Medium ml-3 flex-1 text-[15px] text-black">{label}</Text>
      <Toggle checked={checked} onCheckedChange={onCheckedChange} accessibilityLabel={label} />
    </View>
  );
}

export default function ChatProfile() {
  const {id} = useLocalSearchParams<{id: string}>();
  const router = useRouter();
  const {t} = useTranslation();
  const chat = chatById(typeof id === 'string' ? id : '');
  const menu = useChatMenu();
  const state = chat ? chatMenu(chat.id, menu) : null;

  if (!chat || !state) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-black" onPress={() => router.back()}>
          {t('chat.notFound')}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="h-12 flex-row items-center justify-between px-2">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel={t('chat.back')}
          className="h-10 w-10 items-center justify-center">
          <SVGS.Back width={24} height={24} color={ICON} />
        </Pressable>
        <View className="h-10 w-10 items-center justify-center">
          <ChatProfileQr width={22} height={22} color={ICON} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 32}}>
        <Image
          source={chat.image ? {uri: chat.image} : IMAGES.user}
          style={{width: 88, height: 88, borderRadius: 44, alignSelf: 'center'}}
          contentFit="cover"
        />
        <View className="mt-3 flex-row items-center justify-center">
          <Text className="font-NunitoSans_700Bold text-[18px] text-black">{chat.name}</Text>
          <View className="ml-1.5">
            <ChatProfileEdit width={16} height={16} color={ICON} />
          </View>
        </View>
        <View className="mt-6 flex-row justify-around">
          {[
            {Icon: ChatProfileFollow, label: t('chat.follow')},
            {Icon: ChatProfileUser, label: t('chat.viewProfile')},
            {Icon: ChatProfileSearch, label: t('chat.profileSearch')},
          ].map(({Icon, label}) => (
            <View key={label} className="w-24 items-center">
              <View className="h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <Icon width={24} height={24} color={ICON} />
              </View>
              <Text className="font-NunitoSans_500Medium mt-2 text-center text-[12px] text-black">{label}</Text>
            </View>
          ))}
        </View>
        <Section title={t('chat.sectionProfile')}>
          <LinkRow Icon={ChatProfileCustomise} label={t('chat.customise')} />
          <LinkRow Icon={ChatProfileMedia} label={t('chat.viewMedia')} />
          <LinkRow Icon={ChatProfilePinned} label={t('chat.viewPinned')} />
          <ToggleRow Icon={ChatProfileMute} label={t('chat.muteUser')} checked={state.muted} onCheckedChange={(muted) => setChatMuted(chat.id, muted)} />
          <ToggleRow
            Icon={ChatProfileNotifications}
            label={t('chat.notifications')}
            checked={state.notifications}
            onCheckedChange={(notifications) => setChatNotifications(chat.id, notifications)}
          />
        </Section>
        <Section title={t('chat.sectionChat')}>
          <LinkRow Icon={ChatProfileGroup} label={t('chat.createGroup')} />
          <LinkRow Icon={ChatProfileShare} label={t('chat.shareProfile')} />
          <LinkRow Icon={ChatProfileDisappearing} label={t('chat.disappearing')} />
          <ToggleRow Icon={ChatProfileLock} label={t('chat.chatLock')} checked={state.chatLock} onCheckedChange={(locked) => setChatLock(chat.id, locked)} />
        </Section>
        <Section title={t('chat.sectionSettings')}>
          <LinkRow Icon={ChatProfileStar} label={t('chat.favourites')} />
          <LinkRow Icon={ChatProfileExport} label={t('chat.exportChat')} />
          <Pressable
            onPress={() => {
              clearChatMessages(chat.id);
              router.back();
            }}
            accessibilityRole="button"
            accessibilityLabel={t('chat.clearChat')}
            className="flex-row items-center py-3.5">
            <ChatProfileClear width={22} height={22} color={DANGER} />
            <Text className="font-NunitoSans_500Medium ml-3 text-[15px]" style={{color: DANGER}}>
              {t('chat.clearChat')}
            </Text>
          </Pressable>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}
