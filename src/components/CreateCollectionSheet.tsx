import {useEffect, useState} from 'react';
import {Keyboard, Platform, Pressable, Text, View} from 'react-native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {Toggle} from '@/components/ui/Toggle';
import {cn} from '@/utils';

type CreateCollectionSheetProps = {
  visible: boolean;
  onClose: () => void;
};

export function CreateCollectionSheet({visible, onClose}: CreateCollectionSheetProps) {
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
          <Text className="flex-1 text-center font-bold text-base text-black">Create a collection</Text>
          <Pressable onPress={handleDone} accessibilityRole="button" accessibilityLabel="Done" className="w-12 items-end active:opacity-70">
            <Text className="font-semibold text-15" style={{color: '#007AFF'}}>
              Done
            </Text>
          </Pressable>
        </View>

        <BottomSheetTextInput
          value={name}
          onChangeText={setName}
          placeholder="Type a collection name"
          placeholderTextColor="#A7A7A7"
          className="mt-5 rounded-xl border border-grey-75 px-4 py-3.5 font-medium text-15 text-black"
          accessibilityLabel="Collection name"
        />

        <View className="mt-6 flex-row items-center justify-between">
          <View className="mr-4 flex-1">
            <Text className="font-semibold text-15 text-black">Set the collection to public</Text>
            <Text className="mt-0.5 text-sm text-grey-300">Visible to everyone</Text>
          </View>
          <Toggle checked={isPublic} onCheckedChange={setIsPublic} accessibilityLabel="Set the collection to public" />
        </View>

        <View className="mt-5 flex-row items-center justify-between">
          <View className="mr-4 flex-1">
            <Text className="font-semibold text-15 text-black">Add Contributors</Text>
            <Text className="mt-0.5 text-sm text-grey-300">Build a collection with friends</Text>
          </View>
          <Toggle checked={addContributors} onCheckedChange={setAddContributors} accessibilityLabel="Add Contributors" />
        </View>
      </View>
    </AppBottomSheet>
  );
}
