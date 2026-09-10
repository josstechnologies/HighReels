import {Pressable, Text, View} from 'react-native';
import {SVGS} from '@/assets';

export const AI_MODE_OPTIONS = [
  {id: 'text_image', label: 'Text to image', Icon: SVGS.Text, href: '/shortvideo?mode=text_image'},
  {id: 'text_video', label: 'Text to Video', Icon: SVGS.Play, href: '/shortvideo?mode=text_video'},
  {id: 'image_video', label: 'Image to Video', Icon: SVGS.Photos, href: '/image-to-video'},
] as const;

export type AiModeId = (typeof AI_MODE_OPTIONS)[number]['id'];

export function AiModeDropdown({
  activeId,
  onSelect,
}: {
  activeId: AiModeId;
  onSelect: (id: AiModeId, href: string) => void;
}) {
  return (
    <View className="absolute top-full z-30 mt-2 min-w-[200px] overflow-hidden rounded-2xl bg-grey-800">
      {AI_MODE_OPTIONS.map(item => {
        const active = item.id === activeId;
        const Icon = item.Icon;
        return (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item.id, item.href)}
            className={`flex-row items-center px-4 py-3.5 ${active ? 'bg-grey-700' : ''}`}>
            <Icon width={18} height={18} className="text-white" />
            <Text className={`ml-3 text-[15px] ${active ? 'font-semibold text-white' : 'text-white'}`}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
