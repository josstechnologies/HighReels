import {Pressable, Text, View} from 'react-native';
import {Image} from 'expo-image';
import {SVGS} from '@/assets';
import type {ChatMessage} from '@/mock-data/chats';

export function MessageBubble({
  message,
  showTime,
  grouped,
  avatarUrl,
  selected,
  joinBelow,
  onPress,
  onLongPress,
}: {
  message: ChatMessage;
  showTime: boolean;
  grouped: boolean;
  avatarUrl?: string;
  selected?: boolean;
  /** Next message is selected too, so the highlight should run into it. */
  joinBelow?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}) {
  const {isSender, text, timestamp, pinned} = message;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className={`w-full ${selected ? 'bg-[#F3EEFF] py-1.5' : ''} ${joinBelow ? '' : grouped ? 'mb-1' : 'mb-4'}`}>
      <View className={`w-full flex-row px-4 ${isSender ? 'justify-end' : 'justify-start'}`}>
      {avatarUrl ? <Image source={{uri: avatarUrl}} style={{width: 28, height: 28, borderRadius: 14, marginRight: 8}} contentFit="cover" /> : null}
      <View className="max-w-[78%]">
        <View className={`rounded-[18px] px-4 py-2.5 ${isSender ? 'bg-primary' : 'bg-secondary'}`}>
          <Text className={`font-NunitoSans_400Regular text-[15px] leading-5 ${isSender ? 'text-white' : 'text-black'}`}>{text}</Text>
        </View>
        {showTime || pinned ? (
          <View className={`mt-1 flex-row items-center gap-1 ${isSender ? 'justify-end' : ''}`}>
            {pinned ? <SVGS.ChatPin width={12} height={12} color="#6F41EC" /> : null}
            {showTime ? <Text className="font-NunitoSans_400Regular text-[11px] text-grey-200">{timestamp}</Text> : null}
          </View>
        ) : null}
      </View>
      </View>
    </Pressable>
  );
}
