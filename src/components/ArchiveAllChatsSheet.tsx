import { Pressable, Text, View } from 'react-native';
import { SVGS } from '@/assets';
import { Button } from '@/components/Button';
import { AppBottomSheet } from '@/components/ui/AppBottomSheet';

type ArchiveAllChatsSheetProps = {
  visible: boolean;
  onClose: () => void;
  onArchive: () => void;
  isPending?: boolean;
};

export function ArchiveAllChatsSheet({ visible, onClose, onArchive, isPending = false }: ArchiveAllChatsSheetProps) {
  return (
    <AppBottomSheet visible={visible} onClose={onClose} enablePanDownToClose={!isPending}>
      <View className="flex-col items-center">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <SVGS.Archive width={32} height={32} color="#111111" />
        </View>

        <Text className="mt-5 text-center font-extrabold text-[22px] leading-7 text-black">Archive all chats?</Text>

        <Text className="mt-3 px-2 text-center font-medium text-[15px] leading-6 text-grey-300">
          All your chats will be moved to the Archive folder. You can still receive new messages.
        </Text>

        <View className="mt-7 w-full flex-col">
          <Button title="Archive" variant="primary" onPress={onArchive} loading={isPending} className="rounded-2xl" />

          <Pressable
            onPress={onClose}
            disabled={isPending}
            className="mt-1 w-full items-center justify-center py-4 active:opacity-70"
            style={{ opacity: isPending ? 0.5 : 1 }}>
            <Text className="font-semibold text-[16px] text-black">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </AppBottomSheet>
  );
}
