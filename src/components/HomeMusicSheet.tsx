import {Text, View} from 'react-native';
import {Image} from 'expo-image';
import {IMAGES} from '@/assets';
import {Button} from '@/components/Button';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {useUIStore} from '@/store/uiStore';

/** Music audio sheet opened from the feed song row. */
export function HomeMusicSheet() {
  const visible = useUIStore((s) => s.songCardVisible);
  const data = useUIStore((s) => s.songCardData);
  const hideSongCard = useUIStore((s) => s.hideSongCard);

  const title = data?.templates?.name || 'Original Sound';
  const artist = data?.profiles?.name || data?.user?.name || 'Unknown artist';
  const cover = data?.user?.image || data?.url;

  return (
    <AppBottomSheet visible={visible} onClose={hideSongCard} enableDynamicSizing>
      <Text className="text-center font-extrabold text-[22px] text-black">Music</Text>

      <View className="mt-6 flex-row items-center">
        <Image
          source={cover ? {uri: cover} : IMAGES.user}
          style={{width: 64, height: 64, borderRadius: 12}}
          contentFit="cover"
        />
        <View className="ml-3 min-w-0 flex-1">
          <Text className="font-extrabold text-[17px] text-black" numberOfLines={1}>
            {title}
          </Text>
          <Text className="mt-1 font-medium text-[14px] text-[#8a8a8a]" numberOfLines={1}>
            {artist}
          </Text>
        </View>
      </View>

      {/* UI-only for now */}
      <View className="mt-8 mb-2">
        <Button title="Use Audio" onPress={() => {}} />
      </View>
    </AppBottomSheet>
  );
}
