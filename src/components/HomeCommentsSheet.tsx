import {useCallback, useEffect, useMemo, useRef, useState, type ComponentRef} from 'react';
import {Pressable, Text, View} from 'react-native';
import {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetTextInput,
  BottomSheetView,
  type BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import {Image} from 'expo-image';
import {useSelector} from '@legendapp/state/react';
import {useTranslation} from 'react-i18next';
import {IMAGES, SVGS} from '@/assets';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {STATIC_COMMENTS, type StaticComment, type StaticCommentReply} from '@/mock-data/home-feed';
import {getActiveAccount} from '@/store';
import {useUIStore} from '@/store/uiStore';
import {showToast} from '@/utils';

type ReplyRow = StaticCommentReply & {liked: boolean};
type Row = Omit<StaticComment, 'replies'> & {liked: boolean; replies: ReplyRow[]};

const MUTED = '#9E9E9E';
const PILL = '#F2F2F2';

function seedRows(postId: string | undefined): Row[] {
  return STATIC_COMMENTS.filter((c) => c.postId === postId).map((c) => ({
    ...c,
    liked: false,
    replies: c.replies.map((r) => ({...r, liked: false})),
  }));
}

function LikeControl({liked, likes, onPress}: {liked: boolean; likes: number; onPress: () => void}) {
  return (
    <Pressable onPress={onPress} className="w-9 items-center active:opacity-70" hitSlop={8}>
      {liked ? (
        <SVGS.HeartFilled width={18} height={18} />
      ) : (
        <SVGS.HeartOutline width={18} height={18} color={MUTED} />
      )}
      <Text className="mt-0.5 text-center font-medium text-[11px]" style={{color: MUTED}}>
        {likes}
      </Text>
    </Pressable>
  );
}

/** Feed comments bottom sheet (replaces /comments-sheet route). */
export function HomeCommentsSheet() {
  const {t} = useTranslation();
  const visible = useUIStore((s) => s.commentsSheetVisible);
  const data = useUIStore((s) => s.commentsSheetData);
  const hideCommentsSheet = useUIStore((s) => s.hideCommentsSheet);
  const account = useSelector(() => getActiveAccount());
  const inputRef = useRef<ComponentRef<typeof BottomSheetTextInput>>(null);

  const postId = data?.id as string | undefined;
  const [rows, setRows] = useState<Row[]>(() => seedRows(postId));
  const [draft, setDraft] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [replyTo, setReplyTo] = useState<{id: string; name: string} | null>(null);

  useEffect(() => {
    if (!visible) {
      setDraft('');
      setReplyTo(null);
      setExpanded(new Set());
      return;
    }
    setRows(seedRows(postId));
  }, [visible, postId]);

  const composerAvatar = account?.avatar ? {uri: account.avatar} : IMAGES.user;
  const composerName = account?.displayName || account?.username || 'You';

  const toggleLike = (commentId: string, replyId?: string) => {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== commentId) return row;
        if (!replyId) {
          return {...row, liked: !row.liked, likes: row.likes + (row.liked ? -1 : 1)};
        }
        return {
          ...row,
          replies: row.replies.map((r) =>
            r.id === replyId ? {...r, liked: !r.liked, likes: r.likes + (r.liked ? -1 : 1)} : r,
          ),
        };
      }),
    );
  };

  const startReply = (id: string, name: string) => {
    setReplyTo({id, name});
    setDraft(`@${name} `);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const submit = useCallback(() => {
    const text = draft.trim();
    if (!text) return;
    const now = 'now';
    const imageUri = typeof composerAvatar === 'object' && 'uri' in composerAvatar ? composerAvatar.uri : '';
    if (replyTo) {
      const reply = {
        id: `local-r-${Date.now()}`,
        name: composerName,
        text,
        time: now,
        likes: 0,
        image: imageUri,
        liked: false,
      };
      setRows((current) =>
        current.map((row) => (row.id === replyTo.id ? {...row, replies: [...row.replies, reply]} : row)),
      );
      setExpanded((prev) => new Set(prev).add(replyTo.id));
      setReplyTo(null);
    } else {
      setRows((current) => [
        {
          id: `local-${Date.now()}`,
          postId: postId ?? '',
          name: composerName,
          text,
          time: now,
          likes: 0,
          image: imageUri,
          liked: false,
          replies: [],
        },
        ...current,
      ]);
    }
    setDraft('');
  }, [composerAvatar, composerName, draft, postId, replyTo]);

  const stub = useCallback(() => showToast(t('comments.comingSoon')), [t]);

  const empty = useMemo(
    () => (
      <Text className="mt-10 text-center font-medium text-[14px]" style={{color: MUTED}}>
        {t('comments.empty')}
      </Text>
    ),
    [t],
  );

  // Sticky footer pins to the sheet bottom on first present (in-flow flex left a dead gap).
  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} bottomInset={0}>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: '#EFEFEF',
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 8,
          }}>
          <View className="flex-row items-center">
            <Image source={composerAvatar} style={{width: 36, height: 36, borderRadius: 18}} contentFit="cover" />
            <View
              className="ml-2.5 h-10 flex-1 flex-row items-center rounded-full pl-4 pr-2.5"
              style={{backgroundColor: PILL}}>
              <BottomSheetTextInput
                ref={inputRef}
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={submit}
                placeholder={t('comments.addComment')}
                placeholderTextColor={MUTED}
                returnKeyType="send"
                style={{flex: 1, fontSize: 14, fontWeight: '500', color: '#111111', paddingVertical: 0}}
              />
              <Pressable onPress={stub} className="p-1.5 active:opacity-70" accessibilityLabel={t('comments.emoji')}>
                <SVGS.SmileEmoji width={22} height={22} color={MUTED} />
              </Pressable>
              <Pressable onPress={stub} className="p-1.5 active:opacity-70" accessibilityLabel={t('comments.gift')}>
                <SVGS.Gift width={20} height={20} color={MUTED} />
              </Pressable>
            </View>
          </View>
        </View>
      </BottomSheetFooter>
    ),
    [composerAvatar, draft, stub, submit, t],
  );

  return (
    <AppBottomSheet
      visible={visible}
      onClose={hideCommentsSheet}
      snapPoints={['75%']}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustPan"
      footerComponent={renderFooter}>
      <BottomSheetView style={{flex: 1, paddingHorizontal: 16, paddingTop: 4}}>
        <Text className="mb-4 text-center font-bold text-[18px] text-black">{t('comments.title')}</Text>

        <BottomSheetFlatList
          data={rows}
          keyExtractor={(item) => item.id}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: 12}}
          ListEmptyComponent={empty}
          renderItem={({item}) => {
            const isOpen = expanded.has(item.id);
            const replyCount = item.replies.length;
            return (
              <View className="mb-5 flex-row items-start">
                <Image
                  source={item.image ? {uri: item.image} : IMAGES.user}
                  style={{width: 36, height: 36, borderRadius: 18}}
                  contentFit="cover"
                />
                <View className="ml-2.5 min-w-0 flex-1 pr-1">
                  <View className="flex-row items-baseline">
                    <Text className="font-bold text-[14px] text-black" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text className="ml-1.5 font-normal text-[12px]" style={{color: MUTED}}>
                      {item.time}
                    </Text>
                  </View>
                  <Text className="mt-0.5 font-normal text-[14px] leading-5 text-black">{item.text}</Text>
                  <Pressable onPress={() => startReply(item.id, item.name)} className="mt-1.5 self-start active:opacity-70">
                    <Text className="font-medium text-[12px]" style={{color: MUTED}}>
                      {t('comments.reply')}
                    </Text>
                  </Pressable>
                  {replyCount > 0 ? (
                    <Pressable
                      onPress={() =>
                        setExpanded((prev) => {
                          const next = new Set(prev);
                          if (next.has(item.id)) next.delete(item.id);
                          else next.add(item.id);
                          return next;
                        })
                      }
                      className="mt-2 flex-row items-center self-start active:opacity-70">
                      <Text className="mr-1 font-medium text-[12px]" style={{color: MUTED}}>
                        {isOpen ? t('comments.hideReplies') : t('comments.viewReplies', {count: replyCount})}
                      </Text>
                      <SVGS.Down
                        width={12}
                        height={12}
                        color={MUTED}
                        style={isOpen ? {transform: [{rotate: '180deg'}]} : undefined}
                      />
                    </Pressable>
                  ) : null}
                  {isOpen
                    ? item.replies.map((r) => (
                        <View key={r.id} className="mt-3 flex-row items-start">
                          <Image
                            source={r.image ? {uri: r.image} : IMAGES.user}
                            style={{width: 28, height: 28, borderRadius: 14}}
                            contentFit="cover"
                          />
                          <View className="ml-2 min-w-0 flex-1">
                            <View className="flex-row items-baseline">
                              <Text className="font-bold text-[13px] text-black" numberOfLines={1}>
                                {r.name}
                              </Text>
                              <Text className="ml-1.5 font-normal text-[11px]" style={{color: MUTED}}>
                                {r.time}
                              </Text>
                            </View>
                            <Text className="mt-0.5 font-normal text-[13px] leading-[18px] text-black">{r.text}</Text>
                          </View>
                          <LikeControl liked={r.liked} likes={r.likes} onPress={() => toggleLike(item.id, r.id)} />
                        </View>
                      ))
                    : null}
                </View>
                <LikeControl liked={item.liked} likes={item.likes} onPress={() => toggleLike(item.id)} />
              </View>
            );
          }}
        />
      </BottomSheetView>
    </AppBottomSheet>
  );
}
