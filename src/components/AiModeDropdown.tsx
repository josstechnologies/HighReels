import { Text, Pressable, View } from 'react-native';
import { SVGS } from '@/assets';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/utils';

export const AI_MODE_OPTIONS = [
  { id: 'text_image', label: 'Text to image', Icon: SVGS.TextToImage, href: '/shortvideo?mode=text_image' },
  { id: 'text_video', label: 'Text to Video', Icon: SVGS.TextToVideo, href: '/shortvideo?mode=text_video' },
  { id: 'image_video', label: 'Image to Video', Icon: SVGS.ImageToVideo, href: '/image-to-video' },
] as const;

export type AiModeId = (typeof AI_MODE_OPTIONS)[number]['id'];

type AiModeDropdownProps = {
  activeId: AiModeId;
  title?: string;
  onSelect: (id: AiModeId, href?: string) => void;
};

export function AiModeDropdown({ activeId, title, onSelect }: AiModeDropdownProps) {
  if (title === undefined) {
    return (
      <View className="absolute top-full z-30 mt-2 min-w-[200px] overflow-hidden rounded-2xl bg-grey-800">
        {AI_MODE_OPTIONS.map(item => {
          const active = item.id === activeId;
          const Icon = item.Icon;
          return (
            <Pressable
              key={item.id}
              onPress={() => onSelect(item.id, item.href)}
              className={cn('flex-row items-center px-4 py-3.5', active && 'bg-grey-700')}>
              <Icon width={18} height={18} className="text-white" />
              <Text className={cn('ml-3 text-[15px] text-white', active && 'font-semibold')}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Pressable className="flex-row items-center gap-2">
          <Text className="text-base font-bold text-white">{title}</Text>
          <SVGS.ArrowDown width={10} height={10} className="text-white" />
        </Pressable>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="bottom" sideOffset={8} className="min-w-[12.5rem]">
        {AI_MODE_OPTIONS.map(item => {
          const active = item.id === activeId;
          const Icon = item.Icon;
          return (
            <DropdownMenuItem
              key={item.id}
              onPress={() => onSelect(item.id)}
              className={cn('gap-2', active && 'bg-grey-700')}>
              <Icon width={18} height={18} className="mt-0.5 text-white" />
              <Text className={cn('text-base text-white', active && 'font-medium')}>{item.label}</Text>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
