import {useState, type ReactElement, type ReactNode} from 'react';
import {Alert, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import type {SvgProps} from 'react-native-svg';
import {SVGS} from '@/assets';
import {ArchiveAllChatsSheet} from '@/components/ArchiveAllChatsSheet';
import {SettingsListCard, SettingsListRow} from '@/components/SettingsListRow';
import {API_ROUTES} from '@/constants';
import {archiveChatsActions} from '@/store';
import {API, apiErrorMessage, showToast} from '@/utils';

const DANGER = '#EC2727';

type SheetType = 'archive' | 'clear' | 'delete';

type ChatRow = {
  label: string;
  Icon?: (props: SvgProps) => ReactElement;
  leading?: ReactNode;
  danger?: boolean;
  showChevron?: boolean;
  onPress: () => void;
};

const ClearLeading = (
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
);

export default function ChatsScreen() {
  const {back} = useRouter();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [sheet, setSheet] = useState<SheetType>('archive');
  const [sheetVisible, setSheetVisible] = useState(false);

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
      queryClient.invalidateQueries({queryKey: ['chats']});
      queryClient.invalidateQueries({queryKey: ['chats', 'archived']});
      setSheetVisible(false);
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

  const openSheet = (type: SheetType) => {
    setSheet(type);
    setSheetVisible(true);
  };

  const handleArchive = () => openSheet('archive');
  const handleClear = () => openSheet('clear');
  const handleDelete = () => openSheet('delete');

  const closeAndComingSoon = (label: string) => {
    setSheetVisible(false);
    handleComingSoon(label);
  };

  const SHEETS = {
    archive: {
      icon: <SVGS.Archive width={36} height={36} color="#111111" />,
      title: 'Archive all chats?',
      description: 'All your chats will be moved to the Archive folder. You can still receive new messages.',
      confirmText: 'Archive',
      tone: 'primary',
      onConfirm: () => archiveMutation.mutate(),
    },
    clear: {
      icon: <SVGS.Close2 width={36} height={36} color={DANGER} />,
      title: 'Clear all chats?',
      description: 'This will permanently delete all messages from your chats. This action cannot be undone.',
      confirmText: 'Clear all chats',
      tone: 'danger',
      onConfirm: () => closeAndComingSoon('Clear all chats'),
    },
    delete: {
      icon: <SVGS.Delete width={36} height={36} color={DANGER} />,
      title: 'Delete all chats?',
      description: 'This will permanently delete all your chats, messages, and media. This action cannot be undone.',
      confirmText: 'Delete',
      tone: 'danger',
      onConfirm: () => closeAndComingSoon('Delete all chats'),
    },
  } as const;

  const ROWS: ChatRow[] = [
    {label: 'Custom chat theme', Icon: SVGS.Colors, onPress: () => router.push('/custom-chat-theme' as Href)},
    {label: 'Inbox backup', Icon: SVGS.Replay, onPress: () => router.push('/inbox-backup' as Href)},
    {label: 'Transfer chat', Icon: SVGS.Repost1, onPress: () => handleComingSoon('Transfer chat')},
    {label: 'Export chat', Icon: SVGS.Upload, onPress: () => router.push('/export-chat' as Href)},
    {label: 'Archive all chats', Icon: SVGS.Archive, showChevron: false, onPress: handleArchive},
    {label: 'Clear all chats', leading: ClearLeading, danger: true, showChevron: false, onPress: handleClear},
    {label: 'Delete all chats', Icon: SVGS.Delete, danger: true, showChevron: false, onPress: handleDelete},
  ];

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
        contentContainerStyle={{paddingBottom: 24}}
        showsVerticalScrollIndicator={false}>
        <SettingsListCard className="mt-3">
          {ROWS.map(row => (
            <SettingsListRow
              key={row.label}
              label={row.label}
              Icon={row.Icon}
              leading={row.leading}
              danger={row.danger}
              showChevron={row.showChevron}
              onPress={row.onPress}
            />
          ))}
        </SettingsListCard>
      </ScrollView>

      <ArchiveAllChatsSheet
        visible={sheetVisible}
        onClose={() => {
          if (!archiveMutation.isPending) setSheetVisible(false);
        }}
        {...SHEETS[sheet]}
        isPending={sheet === 'archive' && archiveMutation.isPending}
      />
    </SafeAreaView>
  );
}
