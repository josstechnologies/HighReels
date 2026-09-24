import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SVGS } from '@/assets';
import { ArchiveAllChatsSheet } from '@/components/ArchiveAllChatsSheet';
import { CHEVRON_COLOR } from '@/theme/colors';
import { API_ROUTES } from '@/constants';
import { archiveChatsActions } from '@/store';
import { API, apiErrorMessage, showToast } from '@/utils';
import type { SvgProps } from 'react-native-svg';
import type { ReactElement } from 'react';

const ICON_SIZE = 22;
const ICON_SLOT = 22;
const CHEVRON_SIZE = 16;
const DANGER = '#EC2727';

type RowProps = {
  label: string;
  Icon: (props: SvgProps) => ReactElement;
  onPress?: () => void;
  danger?: boolean;
  showChevron?: boolean;
};

function ChatsRow({ label, Icon, onPress, danger, showChevron = true }: RowProps) {
  const iconColor = danger ? DANGER : '#111111';
  const textColor = danger ? DANGER : '#111111';

  const isClearRow = label === 'Clear all chats';

  return (
    <Pressable onPress={onPress} className="flex-row items-center px-4 py-3.5 active:bg-grey-50" style={{ gap: 12 }}>
      <View
        style={{
          width: ICON_SLOT,
          height: ICON_SLOT,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isClearRow ? (
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              borderWidth: 1.5,
              borderColor: DANGER,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SVGS.Close width={12} height={12} color={DANGER} />
          </View>
        ) : (
          <Icon width={ICON_SIZE} height={ICON_SIZE} color={iconColor} />
        )}
      </View>
      <Text className="flex-1 font-bold" style={{ fontSize: 16, lineHeight: ICON_SLOT, color: textColor }}>
        {label}
      </Text>
      {showChevron ? (
        <View style={{ width: ICON_SLOT, height: ICON_SLOT, alignItems: 'center', justifyContent: 'center' }}>
          <SVGS.ArrowRight width={CHEVRON_SIZE} height={CHEVRON_SIZE} color={CHEVRON_COLOR} strokeWidth={2.2} />
        </View>
      ) : null}
    </Pressable>
  );
}

function Divider() {
  return <View className="ml-[50px] h-[1px] bg-grey-50" />;
}

export function ChatsScreen() {
  const { back } = useRouter();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [archiveVisible, setArchiveVisible] = useState(false);

  const handleComingSoon = (label: string) => {
    Alert.alert(label, 'Coming soon');
  };

  const archiveMutation = useMutation({
    mutationFn: async () => {
      const response = await API.post(API_ROUTES.CHATS.ARCHIVE_ALL);
      return response.data;
    },
    onSuccess: () => {
      // Sync to expo-sqlite via legend persisted observable
      archiveChatsActions.markArchived();
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      queryClient.invalidateQueries({ queryKey: ['chats', 'archived'] });
      setArchiveVisible(false);
      showToast('All chats archived');
      // Navigate to archive screen — staged: will be provided later
      setTimeout(() => {
        try {
          router.push('/archive' as Href);
        } catch {
          // ignore if route not yet registered
        }
      }, 150);
    },
    onError: (error: unknown) => {
      // Keep sheet open on error so user can retry; surface via toast
      showToast(apiErrorMessage(error, 'Could not archive chats. Please try again.'));
    },
  });

  const handleArchive = () => setArchiveVisible(true);

  const handleClear = () => {
    Alert.alert('Clear all chats', 'Are you sure you want to clear all chats? This will clear messages but keep chats in the list.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: () => handleComingSoon('Clear all chats') },
    ]);
  };

  const handleDelete = () => {
    Alert.alert('Delete all chats', 'Are you sure you want to delete all chats? This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => handleComingSoon('Delete all chats') },
    ]);
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="font-extrabold text-xl text-black">Chats</Text>
      </View>

      <ScrollView
        className="flex-1 bg-secondary"
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 8 }}
        showsVerticalScrollIndicator={false}>
        <View className="mt-3 overflow-hidden rounded-2xl bg-white" style={{ width: '100%', flex: 1 }}>
          <ChatsRow label="Custom chat theme" Icon={SVGS.Colors} onPress={() => router.push('/custom-chat-theme' as Href)} />
          <Divider />
          <ChatsRow label="Inbox backup" Icon={SVGS.Replay} onPress={() => router.push('/inbox-backup' as Href)} />
          <Divider />
          <ChatsRow label="Transfer chat" Icon={SVGS.Repost1} onPress={() => handleComingSoon('Transfer chat')} />
          <Divider />
          <ChatsRow label="Export chat" Icon={SVGS.Upload} onPress={() => router.push('/export-chat' as Href)} />
          <Divider />
          <ChatsRow label="Archive all chats" Icon={SVGS.Archive} showChevron={false} onPress={handleArchive} />
          <ChatsRow label="Clear all chats" Icon={SVGS.Close} danger showChevron={false} onPress={handleClear} />
          <ChatsRow label="Delete all chats" Icon={SVGS.Delete} danger showChevron={false} onPress={handleDelete} />
        </View>
      </ScrollView>

      <ArchiveAllChatsSheet
        visible={archiveVisible}
        onClose={() => {
          if (!archiveMutation.isPending) setArchiveVisible(false);
        }}
        onArchive={() => archiveMutation.mutate()}
        isPending={archiveMutation.isPending}
      />
    </SafeAreaView>
  );
}
