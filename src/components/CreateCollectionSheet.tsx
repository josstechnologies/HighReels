import {useEffect, useState} from 'react';
import {Keyboard, Platform, Pressable, Text, View} from 'react-native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {Toggle} from '@/components/ui/Toggle';
import {cn} from '@/utils';

type CreateCollectionSheetProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  namePlaceholder?: string;
  publicLabel?: string;
  publicHint?: string;
  contributorsLabel?: string;
  contributorsHint?: string;
};

export function CreateCollectionSheet({
  visible,
  onClose,
  title = 'Create a collection',
  namePlaceholder = 'Type a collection name',
  publicLabel = 'Set the collection to public',
  publicHint = 'Visible to everyone',
  contributorsLabel = 'Add Contributors',
  contributorsHint = 'Build a collection with friends',
}: CreateCollectionSheetProps) {
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [addContributors, setAddContributors] = useState(true);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    if (!visible) {
      setName('');
      setIsPublic(true);
      setAddContributors(true);
      setKeyboardOpen(false);
    }
  }, [visible]);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const show = Keyboard.addListener(showEvent, () => setKeyboardOpen(true));
    const hide = Keyboard.addListener(hideEvent, () => setKeyboardOpen(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleDone = () => {
    // ponytail: local-only UI for now; wire create API later
    // AppBottomSheet dismisses keyboard before/with the sheet when visible flips.
    onClose();
  };

  return (
    <AppBottomSheet
      visible={visible}
      onClose={onClose}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustPan"
      enableBlurKeyboardOnGesture>
      <View className={cn(keyboardOpen ? 'pb-0' : 'pb-10')}>
        <View className="flex-row items-center">
          <View className="w-12" />
          <Text className="flex-1 text-center font-bold text-base text-black">{title}</Text>
          <Pressable onPress={handleDone} accessibilityRole="button" accessibilityLabel="Done" className="w-12 items-end active:opacity-70">
            <Text className="font-semibold text-15" style={{color: '#007AFF'}}>
              Done
            </Text>
          </Pressable>
        </View>

        <BottomSheetTextInput
          value={name}
          onChangeText={setName}
          placeholder={namePlaceholder}
          placeholderTextColor="#A7A7A7"
          className="mt-5 rounded-xl border border-grey-75 px-4 py-3.5 font-medium text-15 text-black"
          accessibilityLabel="Collection name"
        />

        <View className="mt-6 flex-row items-center justify-between">
          <View className="mr-4 flex-1">
            <Text className="font-semibold text-15 text-black">{publicLabel}</Text>
            <Text className="mt-0.5 text-sm text-grey-300">{publicHint}</Text>
          </View>
          <Toggle checked={isPublic} onCheckedChange={setIsPublic} accessibilityLabel={publicLabel} />
        </View>

        <View className="mt-5 flex-row items-center justify-between">
          <View className="mr-4 flex-1">
            <Text className="font-semibold text-15 text-black">{contributorsLabel}</Text>
            <Text className="mt-0.5 text-sm text-grey-300">{contributorsHint}</Text>
          </View>
          <Toggle checked={addContributors} onCheckedChange={setAddContributors} accessibilityLabel={contributorsLabel} />
        </View>
      </View>
    </AppBottomSheet>
  );
}
