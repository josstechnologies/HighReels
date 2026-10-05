import type {ReactNode} from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
};

/** Centered confirm dialog — dimmed backdrop + white card. Actions via children. */
export function ConfirmModal({visible, title, description, onClose, children}: ConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View className="flex-1 items-center justify-center bg-black/40 px-8">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          onPress={onClose}
          className="absolute inset-0"
        />
        <View className="w-full rounded-3xl bg-white px-5 pb-5 pt-6">
          <Text className="text-center font-bold text-lg leading-6 text-black">{title}</Text>
          <Text className="mt-3 text-center text-sm leading-5 text-grey-400">{description}</Text>
          <View className="mt-5 gap-2.5">{children}</View>
        </View>
      </View>
    </Modal>
  );
}

type ConfirmModalActionProps = {
  title: string;
  onPress: () => void;
  /** Purple label (primary action) vs black (secondary). */
  tone?: 'primary' | 'default';
};

export function ConfirmModalAction({title, onPress, tone = 'default'}: ConfirmModalActionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      className="h-12 items-center justify-center rounded-2xl bg-secondary active:opacity-80">
      <Text className={`font-semibold text-15 ${tone === 'primary' ? 'text-primary' : 'text-black'}`}>{title}</Text>
    </Pressable>
  );
}
