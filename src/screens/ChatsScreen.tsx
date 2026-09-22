import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SVGS } from '@/assets';
import { CHEVRON_COLOR } from '@/theme/colors';
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
    <Pressable onPress={onPress} className="flex-row items-center px-4 py-3.5 active:bg-grey-50">
      <View
        style={{
          width: ICON_SLOT,
          height: ICON_SLOT,
          marginRight: 12,
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
      ) : (
        <View style={{ width: ICON_SLOT, height: ICON_SLOT }} />
      )}
    </Pressable>
  );
}

function Divider() {
  return <View className="ml-[50px] h-[1px] bg-grey-50" />;
}

export function ChatsScreen() {
  const { back } = useRouter();

  const handleComingSoon = (label: string) => {
    Alert.alert(label, 'Coming soon');
  };

  const handleArchive = () => {
    Alert.alert('Archive all chats', 'Are you sure you want to archive all chats?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Archive', onPress: () => handleComingSoon('Archive all chats') },
    ]);
  };

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
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="font-extrabold text-xl text-black">Chats</Text>
      </View>

      <ScrollView
        className="flex-1 bg-secondary"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-3 overflow-hidden rounded-2xl bg-white">
          <ChatsRow label="Custom chat theme" Icon={SVGS.Colors} onPress={() => handleComingSoon('Custom chat theme')} />
          <Divider />
          <ChatsRow label="Inbox backup" Icon={SVGS.Replay} onPress={() => handleComingSoon('Inbox backup')} />
          <Divider />
          <ChatsRow label="Transfer chat" Icon={SVGS.Repost1} onPress={() => handleComingSoon('Transfer chat')} />
          <Divider />
          <ChatsRow label="Export chat" Icon={SVGS.Upload} onPress={() => handleComingSoon('Export chat')} />
          <Divider />
          <ChatsRow label="Archive all chats" Icon={SVGS.Archive} showChevron={false} onPress={handleArchive} />
          <ChatsRow label="Clear all chats" Icon={SVGS.Close} danger showChevron={false} onPress={handleClear} />
          <ChatsRow label="Delete all chats" Icon={SVGS.Delete} danger showChevron={false} onPress={handleDelete} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
