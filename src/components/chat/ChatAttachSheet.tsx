import {Pressable, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';

const ITEMS = [
  {id: 'photos', label: 'chat.photos', Icon: SVGS.ChatPhotos},
  {id: 'document', label: 'chat.document', Icon: SVGS.ChatDocument},
  {id: 'location', label: 'chat.location', Icon: SVGS.ChatLocation},
  {id: 'contact', label: 'chat.contact', Icon: SVGS.ChatContact},
] as const;

export function ChatAttachSheet({visible, onClose}: {visible: boolean; onClose: () => void}) {
  const {t} = useTranslation();

  return (
    <AppBottomSheet visible={visible} onClose={onClose}>
      <View className="flex-row justify-between pb-2 pt-1">
        {ITEMS.map(({id, label, Icon}) => (
          <Pressable key={id} onPress={onClose} accessibilityRole="button" accessibilityLabel={t(label)} className="w-[72px] items-center">
            <View className="h-16 w-16 items-center justify-center rounded-[18px] bg-secondary">
              <Icon width={30} height={30} />
            </View>
            <Text className="font-NunitoSans_500Medium mt-2 text-center text-[13px] text-black">{t(label)}</Text>
          </Pressable>
        ))}
      </View>
    </AppBottomSheet>
  );
}
