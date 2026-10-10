import type {ReactNode} from 'react';
import {Pressable, Text} from 'react-native';
import {useRouter} from 'expo-router';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {blockAccount} from '@/mock-data/blocked-accounts';
import {archiveChat, chatById, chatMenu, removeChat, toggleChatMute, toggleChatPin, useChatMenu} from '@/mock-data/chats';
import {showToast} from '@/utils';

const ICON = '#111111';
const DANGER = '#EC2727';

function Row({
  label,
  color = ICON,
  onPress,
  children,
}: {
  label: string;
  color?: string;
  onPress: () => void;
  children: ReactNode;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} className="flex-row items-center gap-4 py-3.5">
      {children}
      <Text className="font-NunitoSans_500Medium text-[16px]" style={{color}}>
        {label}
      </Text>
    </Pressable>
  );
}

export function ChatInfoSheet({visible, chatId, onClose}: {visible: boolean; chatId: string; onClose: () => void}) {
  const {t} = useTranslation();
  const router = useRouter();
  const menu = useChatMenu();
  const state = chatMenu(chatId, menu);
  const chat = chatById(chatId);

  const leave = () => {
    onClose();
    if (!chat) return;
    removeChat(chat.id);
    router.back();
  };

  return (
    <AppBottomSheet visible={visible} onClose={onClose}>
      <Row
        label={state.pinned ? t('chat.unpin') : t('chat.pin')}
        onPress={() => {
          toggleChatPin(chatId);
          onClose();
        }}>
        <SVGS.Pin width={24} height={24} color={ICON} />
      </Row>
      <Row
        label={t('chat.archive')}
        onPress={() => {
          archiveChat(chatId);
          onClose();
        }}>
        <SVGS.Archive width={24} height={24} color={ICON} />
      </Row>
      <Row
        label={state.muted ? t('chat.unmute') : t('chat.mute')}
        onPress={() => {
          toggleChatMute(chatId);
          onClose();
        }}>
        <SVGS.Mute width={24} height={24} color={ICON} />
      </Row>
      <Row
        label={t('chat.block')}
        onPress={() => {
          if (chat) {
            blockAccount({id: chat.id, name: chat.name, username: chat.name.replace(/\s+/g, '').toLowerCase(), avatar: chat.image});
          }
          leave();
        }}>
        <SVGS.Block width={24} height={24} color={ICON} />
      </Row>
      <Row
        label={t('chat.report')}
        onPress={() => {
          showToast(t('report.thanks'));
          onClose();
        }}>
        <SVGS.ChatReport width={24} height={24} color={ICON} />
      </Row>
      <Row label={t('chat.deleteMessage')} color={DANGER} onPress={leave}>
        <SVGS.ChatDelete width={24} height={24} color={DANGER} />
      </Row>
    </AppBottomSheet>
  );
}
