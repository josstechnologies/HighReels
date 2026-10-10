import {useState} from 'react';
import {FlatList, Platform, Pressable, Text, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image} from 'expo-image';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {ChatHeader} from '@/components/chat/ChatHeader';
import {ChatInputBar} from '@/components/chat/ChatInputBar';
import {MessageBubble} from '@/components/chat/MessageBubble';
import {blockAccount} from '@/mock-data/blocked-accounts';
import {acceptChatRequest, chatById, chatGate, removeChat, setChatMessages, useChatGates, useChatMessages, type ChatMessage, type ChatThread} from '@/mock-data/chats';
import {showToast} from '@/utils';

// function dateLabel(iso: string) {
//   const date = new Date(iso);
//   if (Number.isNaN(date.getTime())) return '';
//   if (date.toDateString() === new Date().toDateString()) return 'Today';
//   return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
// }
// ListHeaderComponent={
//   messages[0] ? (
//     <View className="mb-6 items-center">
//       <Text className="font-NunitoSans_500Medium text-sm text-[#808080]">{dateLabel(messages[0].createdAt)}</Text>
//     </View>
//   ) : null
// }

const NONE: ChatMessage[] = [];
const BLOCK = '#E15A45';
const ICON = '#111111';

function SelectionBar({
  selected,
  onClear,
  onCopy,
  onDelete,
  onPin,
}: {
  selected: ChatMessage[];
  onClear: () => void;
  onCopy: () => void;
  onDelete: () => void;
  onPin: () => void;
}) {
  const {t} = useTranslation();
  const only = selected.length === 1 ? selected[0] : null;

  return (
    <View className="h-14 flex-row items-center justify-between bg-white px-2">
      <Pressable
        onPress={onClear}
        accessibilityRole="button"
        accessibilityLabel={t('chat.clearSelection')}
        className="h-10 w-10 items-center justify-center">
        <SVGS.Back width={22} height={22} color={ICON} />
      </Pressable>
      <View accessibilityLabel={t('chat.reply')} className="h-10 w-10 items-center justify-center">
        <SVGS.ChatReply width={22} height={22} color={ICON} />
      </View>
      <View accessibilityLabel={t('chat.star')} className="h-10 w-10 items-center justify-center">
        <SVGS.ChatStar width={22} height={22} color={ICON} />
      </View>
      {only?.isSender ? (
        <View accessibilityLabel={t('chat.edit')} className="h-10 w-10 items-center justify-center">
          <SVGS.ChatEdit width={22} height={22} color={ICON} />
        </View>
      ) : null}
      {only ? (
        <Pressable onPress={onPin} accessibilityRole="button" accessibilityLabel={t('chat.pin')} className="h-10 w-10 items-center justify-center">
          <SVGS.ChatPin width={22} height={22} color={only.pinned ? '#6F41EC' : ICON} />
        </Pressable>
      ) : null}
      <Pressable onPress={onCopy} accessibilityRole="button" accessibilityLabel={t('chat.copy')} className="h-10 w-10 items-center justify-center">
        <SVGS.ChatCopy width={22} height={22} color={ICON} />
      </Pressable>
      <Pressable
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel={t('chat.deleteMessage')}
        className="h-10 w-10 items-center justify-center">
        <SVGS.ChatDelete width={22} height={22} color={ICON} />
      </Pressable>
      <View accessibilityLabel={t('chat.forward')} className="h-10 w-10 items-center justify-center">
        <SVGS.ChatForward width={22} height={22} color={ICON} />
      </View>
    </View>
  );
}

function RequestCard({chat, onReject, onAccept}: {chat: ChatThread; onReject: () => void; onAccept: () => void}) {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View className="px-4 pt-2" style={{paddingBottom: Math.max(insets.bottom, 16)}}>
      <View className="items-center rounded-3xl border border-[#F0F0F0] bg-white px-5 pb-5 pt-6">
        <Image source={{uri: chat.image}} style={{width: 72, height: 72, borderRadius: 36}} contentFit="cover" />
        <Text className="font-NunitoSans_700Bold mt-3 text-[17px] text-black">{chat.name}</Text>
        <Text className="font-NunitoSans_400Regular mt-1 text-center text-[14px] text-grey-200">{t('chat.request')}</Text>
        <View className="mt-5 w-full flex-row gap-3">
          <Pressable
            onPress={onReject}
            accessibilityRole="button"
            className="h-12 flex-1 items-center justify-center rounded-2xl bg-secondary">
            <Text className="font-NunitoSans_700Bold text-[15px] text-black">{t('chat.reject')}</Text>
          </Pressable>
          <Pressable
            onPress={onAccept}
            accessibilityRole="button"
            className="h-12 flex-1 items-center justify-center rounded-2xl bg-primary">
            <Text className="font-NunitoSans_700Bold text-[15px] text-white">{t('chat.accept')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function RejectedCard({chat, onDelete, onBlock}: {chat: ChatThread; onDelete: () => void; onBlock: () => void}) {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View className="px-4 pt-2" style={{paddingBottom: Math.max(insets.bottom, 16)}}>
      <View className="rounded-3xl border border-[#F0F0F0] bg-white px-5 pb-5 pt-6">
        <Text className="font-NunitoSans_600SemiBold px-4 text-center text-[15px] leading-6 text-black">
          {t('chat.rejected', {name: chat.name})}
        </Text>
        <View className="mt-5 w-full flex-row gap-3">
          <Pressable
            onPress={onDelete}
            accessibilityRole="button"
            className="h-12 flex-1 items-center justify-center rounded-2xl bg-secondary">
            <Text className="font-NunitoSans_700Bold text-[15px] text-black">{t('chat.deleteChat')}</Text>
          </Pressable>
          <Pressable
            onPress={onBlock}
            accessibilityRole="button"
            className="h-12 flex-1 items-center justify-center rounded-2xl"
            style={{backgroundColor: BLOCK}}>
            <Text className="font-NunitoSans_700Bold text-[15px] text-white">{t('chat.block')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function ChatThread() {
  const {id} = useLocalSearchParams<{id: string}>();
  const router = useRouter();
  const {t} = useTranslation();
  const gates = useChatGates();
  const chat = chatById(typeof id === 'string' ? id : '');
  const messages = useChatMessages(chat?.id ?? '', chat?.messages ?? NONE);
  const [rejected, setRejected] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selected = messages.filter((item) => selectedIds.includes(item.id));
  const selecting = selected.length > 0;
  const pending = chat ? chatGate(chat, gates) === 'pending' : false;

  if (!chat) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-black" onPress={() => router.back()}>
          {t('chat.notFound')}
        </Text>
      </SafeAreaView>
    );
  }

  const onSend = (text: string) => {
    const now = new Date();
    setChatMessages(chat.id, [
      ...messages,
      {
        id: `local-${now.getTime()}`,
        text,
        isSender: true,
        timestamp: now.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'}),
        createdAt: now.toISOString(),
      },
    ]);
  };

  const onBlock = () => {
    blockAccount({id: chat.id, name: chat.name, username: chat.name.replace(/\s+/g, '').toLowerCase(), avatar: chat.image});
    removeChat(chat.id);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        {selecting ? (
          <SelectionBar
            selected={selected}
            onClear={() => setSelectedIds([])}
            onCopy={() => {
              const text = messages
                .filter((item) => selectedIds.includes(item.id))
                .map((item) => item.text)
                .join('\n');
              void import('expo-clipboard')
                .then((Clipboard) => Clipboard.setStringAsync(text))
                .then(() => showToast(t('chat.copied')))
                .catch(() => {});
            }}
            onDelete={() => {
              setChatMessages(chat.id, messages.filter((item) => !selectedIds.includes(item.id)));
              setSelectedIds([]);
            }}
            onPin={() => {
              const onlyId = selectedIds.length === 1 ? selectedIds[0] : null;
              if (!onlyId) return;
              setChatMessages(
                chat.id,
                messages.map((item) => (item.id === onlyId ? {...item, pinned: !item.pinned} : item)),
              );
            }}
          />
        ) : (
          <ChatHeader userName={chat.name} userAvatar={chat.image} chatId={chat.id} />
        )}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          className="flex-1 bg-white"
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 8}}
          renderItem={({item, index}) => {
            const next = messages[index + 1];
            const grouped = next?.isSender === item.isSender;
            const selected = selectedIds.includes(item.id);
            return (
              <MessageBubble
                message={item}
                showTime={!grouped}
                grouped={grouped}
                selected={selected}
                joinBelow={selected && !!next && selectedIds.includes(next.id)}
                onPress={
                  selecting
                    ? () => setSelectedIds((current) => (current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]))
                    : undefined
                }
                onLongPress={() => setSelectedIds((current) => (current.includes(item.id) ? current : [...current, item.id]))}
                avatarUrl={pending && !item.isSender ? chat.image : undefined}
              />
            );
          }}
        />
        {pending ? (
          rejected ? (
            <RejectedCard
              chat={chat}
              onDelete={() => {
                removeChat(chat.id);
                router.back();
              }}
              onBlock={onBlock}
            />
          ) : (
            <RequestCard chat={chat} onReject={() => setRejected(true)} onAccept={() => acceptChatRequest(chat.id)} />
          )
        ) : (
          <ChatInputBar onSend={onSend} />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
