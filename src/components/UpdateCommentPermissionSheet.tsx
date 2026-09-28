import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Button} from '@/components/Button';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {Checkbox} from '@/components/ui/Checkbox';

export type CommentPermission = 'allow' | 'disallow';

const OPTIONS: {value: CommentPermission; label: string}[] = [
  {value: 'allow', label: 'OK to comment on my post'},
  {value: 'disallow', label: "I don't want anyone to comment on this post"},
];

type UpdateCommentPermissionSheetProps = {
  visible: boolean;
  onClose: () => void;
  selectedCount: number;
  onUpdate: (permission: CommentPermission) => void;
};

export function UpdateCommentPermissionSheet({visible, onClose, selectedCount, onUpdate}: UpdateCommentPermissionSheetProps) {
  const [permission, setPermission] = useState<CommentPermission>('allow');

  return (
    <AppBottomSheet visible={visible} onClose={onClose}>
      <Text className="text-center font-extrabold text-xl text-black">Update selected posts</Text>

      <View className="mt-6 rounded-2xl bg-secondary px-4">
        {OPTIONS.map((option) => {
          const checked = permission === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => setPermission(option.value)}
              className="flex-row items-center py-3.5 active:opacity-70">
              <Text className="mr-3 flex-1 font-medium text-base text-black">{option.label}</Text>
              <Checkbox checked={checked} onCheckedChange={() => setPermission(option.value)} accessibilityLabel={option.label} />
            </Pressable>
          );
        })}
      </View>

      <Button title={`Update (${selectedCount})`} onPress={() => onUpdate(permission)} className="mt-8 rounded-2xl" />
    </AppBottomSheet>
  );
}
