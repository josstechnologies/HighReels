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
  onUpdate: (permissions: CommentPermission[]) => void;
};

export function UpdateCommentPermissionSheet({visible, onClose, selectedCount, onUpdate}: UpdateCommentPermissionSheetProps) {
  const [permissions, setPermissions] = useState<Set<CommentPermission>>(new Set());

  const toggle = (value: CommentPermission) => {
    setPermissions((current) => {
      const next = new Set(current);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  return (
    <AppBottomSheet visible={visible} onClose={onClose}>
      <Text className="text-center font-bold text-lg text-black">Update selected posts</Text>

      <View className="mt-6 rounded-2xl bg-secondary px-4">
        {OPTIONS.map((option) => {
          const checked = permissions.has(option.value);
          return (
            <Pressable
              key={option.value}
              onPress={() => toggle(option.value)}
              className="flex-row items-center py-3.5 active:opacity-70">
              <Text className="mr-3 flex-1 font-medium text-sm text-black">{option.label}</Text>
              <Checkbox checked={checked} onCheckedChange={() => toggle(option.value)} accessibilityLabel={option.label} />
            </Pressable>
          );
        })}
      </View>

      <Button
        title={`Update (${selectedCount})`}
        disabled={permissions.size === 0}
        onPress={() => onUpdate([...permissions])}
        className="mt-8 rounded-2xl"
      />
    </AppBottomSheet>
  );
}
