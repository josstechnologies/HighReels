import {useState} from 'react';
import {FlatList, Pressable, ScrollView, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'expo-image';
import {useRouter, type Href} from 'expo-router';
import {useTranslation} from 'react-i18next';
import {IMAGES, SVGS} from '@/assets';
import {CHATS, INBOX_STORIES, chatGate, useChatGates, useChatMenu, type ChatThread, type OutgoingStatus} from '@/mock-data/chats';

const READ = '#6F41EC';
const SENT = '#A0A0A0';
const CARD_W = 104;
const CARD_H = 148;

type InboxTab = 'main' | 'requests' | 'unread' | 'group';

function mainCount(count: number) {
  return count > 99 ? '99+' : String(count);
}

function MessageStatus({status}: {status: OutgoingStatus | null}) {
  if (!status) return null;
  const color = status === 'read' ? READ : SENT;
  return (
    <View className="mr-1 flex-row items-center">
      <SVGS.Tick width={14} height={14} color={color} />
      {status === 'sent' ? null : (
        <View className="-ml-2">
          <SVGS.Tick width={14} height={14} color={color} />
        </View>
      )}
    </View>
  );
}

function StoryCard({name, cover, avatar, addLabel}: {name: string; cover: string; avatar: string | null; addLabel: string}) {
  if (!avatar) {
    return (
      <View className="overflow-hidden rounded-[18px] border border-grey-50 bg-white" style={{width: CARD_W, height: CARD_H}}>
        <Image source={{uri: cover}} style={{width: CARD_W, height: 100}} contentFit="cover" />
        <View className="absolute left-0 right-0 items-center" style={{top: 84}}>
          <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
            <SVGS.Plus width={14} height={14} color="#FFFFFF" />
          </View>
        </View>
        <Text className="font-NunitoSans_600SemiBold mt-auto mb-3 text-center text-[13px] text-black">{addLabel}</Text>
      </View>
    );
  }

  return (
    <View style={{width: CARD_W, height: CARD_H}}>
      <View className="overflow-hidden rounded-[18px]" style={{width: CARD_W, height: CARD_H}}>
        <Image source={{uri: cover}} style={{width: CARD_W, height: CARD_H}} contentFit="cover" />
        <View className="absolute bottom-0 left-0 right-0 h-10 bg-black/35" />
        <Text
          className="font-NunitoSans_600SemiBold absolute bottom-2 left-1 right-1 text-center text-[12px] text-white"
          numberOfLines={1}>
          {name}
        </Text>
      </View>
      <Image
        source={{uri: avatar}}
        style={{position: 'absolute', top: -12, alignSelf: 'center', width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: '#FFFFFF'}}
        contentFit="cover"
      />
    </View>
  );
}

export default function ChatInbox() {
  const router = useRouter();
  const {t} = useTranslation();
  const [tab, setTab] = useState<InboxTab>('main');
  const gates = useChatGates();
  const menu = useChatMenu();
  const listed = (chat: ChatThread) => !menu[chat.id]?.archived;
  const mainChats = CHATS.filter((chat) => listed(chat) && chatGate(chat, gates) === 'accepted');
  const requestChats = CHATS.filter((chat) => listed(chat) && chatGate(chat, gates) === 'pending');
  const threads = tab === 'main' ? mainChats : tab === 'requests' ? requestChats : tab === 'unread' ? mainChats.filter((chat) => chat.unreadCount > 0) : [];
  const empty =
    threads.length > 0 ? '' : tab === 'requests' ? t('inbox.noRequests') : tab === 'group' ? t('inbox.noGroups') : tab === 'unread' ? t('inbox.noUnread') : '';

  const tabs: {id: InboxTab; label: string}[] = [
    {id: 'main', label: `${t('inbox.main')} ${mainCount(mainChats.length)}`},
    {id: 'requests', label: t('inbox.requests')},
    {id: 'unread', label: t('inbox.unread')},
    {id: 'group', label: t('inbox.group')},
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <View className="h-12 flex-row items-center justify-between px-2">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel={t('inbox.back')}
          className="h-10 w-10 items-center justify-center">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <View className="flex-row items-center gap-1">
          <Text className="font-NunitoSans_700Bold text-[20px] text-black">{t('inbox.title')}</Text>
          <SVGS.ArrowDown width={12} height={7} color="#111111" />
        </View>
        <View className="h-10 w-10 items-center justify-center">
          <SVGS.Search width={22} height={22} color="#111111" />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{flexGrow: 0, height: CARD_H + 24}}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, gap: 10}}>
        {INBOX_STORIES.map((story) => (
          <StoryCard key={story.id} name={story.name} cover={story.cover} avatar={story.avatar} addLabel={t('inbox.addStory')} />
        ))}
      </ScrollView>

      <View className="flex-row items-center py-2 pl-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 8, paddingRight: 8}}>
          {tabs.map((item) => {
            const selected = item.id === tab;
            return (
              <Pressable
                key={item.id}
                onPress={() => setTab(item.id)}
                accessibilityRole="button"
                accessibilityState={{selected}}
                className={`rounded-full px-4 py-2 ${selected ? 'bg-primary' : 'bg-secondary'}`}>
                <Text className={`font-NunitoSans_600SemiBold text-[14px] ${selected ? 'text-white' : 'text-black'}`}>{item.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <View className="h-10 w-10 items-center justify-center">
          <SVGS.Filter width={22} height={22} color="#111111" />
        </View>
      </View>

      <FlatList
        data={threads}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{paddingBottom: 24, flexGrow: 1}}
        ListEmptyComponent={
          empty ? (
            <View className="flex-1 items-center justify-center">
              <Text className="font-NunitoSans_400Regular text-[15px] text-grey-200">{empty}</Text>
            </View>
          ) : null
        }
        renderItem={({item}) => <ChatRow item={item} pinned={!!menu[item.id]?.pinned} onPress={() => router.push(`/chat/${item.id}` as Href)} />}
      />
    </SafeAreaView>
  );
}

function ChatRow({item, pinned, onPress}: {item: ChatThread; pinned: boolean; onPress: () => void}) {
  return (
    <Pressable className="flex-row items-center px-4 py-3" onPress={onPress}>
      <Image source={item.image ? {uri: item.image} : IMAGES.user} style={{width: 56, height: 56, borderRadius: 28}} contentFit="cover" />
      <View className="ml-3 flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-NunitoSans_700Bold shrink text-[16px] text-black" numberOfLines={1}>
            {item.name}
          </Text>
          {pinned ? <SVGS.Pin width={14} height={14} color="#6F41EC" style={{marginLeft: 6}} /> : null}
          <View className="flex-1" />
          <Text className="font-NunitoSans_400Regular ml-2 text-[12px] text-grey-200">{item.time}</Text>
        </View>
        <View className="mt-1 flex-row items-center">
          <MessageStatus status={item.outgoingStatus} />
          <Text className="font-NunitoSans_400Regular flex-1 text-[14px] text-grey-200" numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 ? (
            <View className="ml-2 h-[22px] min-w-[22px] items-center justify-center rounded-full bg-primary px-1.5">
              <Text className="font-NunitoSans_700Bold text-[11px] text-white">{item.unreadCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
