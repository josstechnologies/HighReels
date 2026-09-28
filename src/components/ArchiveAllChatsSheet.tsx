import { Pressable, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { AppBottomSheet } from '@/components/ui/AppBottomSheet';
import type { ReactNode } from 'react';

type ArchiveAllChatsSheetProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon: ReactNode;
  title: string;
  description: string;
  confirmText: string;
  tone?: 'primary' | 'danger';
  isPending?: boolean;
};

export function ArchiveAllChatsSheet({
  visible,
  onClose,
  onConfirm,
  icon,
  title,
  description,
  confirmText,
  tone = 'primary',
  isPending = false,
}: ArchiveAllChatsSheetProps) {
  return (
    <AppBottomSheet visible={visible} onClose={onClose} enablePanDownToClose={!isPending}>
      <View className="flex-col items-center">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-secondary">{icon}</View>

        <Text className="mt-5 text-center font-bold text-lg leading-7 text-black">{title}</Text>

        <Text className="mt-3 px-2 text-center text-sm leading-6 text-grey-300">{description}</Text>

        <View className="mt-7 w-full flex-col">
          <Button title={confirmText} variant={tone} onPress={onConfirm} loading={isPending} className="rounded-xl" />

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
