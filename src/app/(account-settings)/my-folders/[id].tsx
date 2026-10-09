import {Pressable, Text, View, useWindowDimensions} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Image} from 'expo-image';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {reelsFor, useMyFolders} from '@/mock-data/my-folders';

export default function FolderReelsScreen() {
  const {t} = useTranslation();
  const {back} = useRouter();
  const {id} = useLocalSearchParams<{id: string}>();
  const {width} = useWindowDimensions();
  const folder = useMyFolders().find((item) => item.id === id);
  const reels = reelsFor(typeof id === 'string' ? id : '');
  const title = folder?.nameKey ? t(`folders.${folder.nameKey}`) : (folder?.name ?? '');
  const size = (width - 4) / 3;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-3">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel={t('folders.back')} className="w-8 active:opacity-70">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-[18px] text-black" numberOfLines={1}>
          {title}
        </Text>
        <View className="w-8" />
      </View>

      <View className="flex-row flex-wrap" style={{gap: 2}}>
        {reels.map((reel) => (
          <View key={reel.id} style={{width: size, height: size}}>
            <Image source={{uri: reel.image}} style={{width: size, height: size}} contentFit="cover" />
            <View className="absolute bottom-1.5 left-1.5 flex-row items-center">
              <SVGS.Play width={11} height={11} color="#FFFFFF" />
              <Text
                className="ml-1 font-semibold text-[12px] text-white"
                style={{textShadowColor: 'rgba(0,0,0,0.45)', textShadowOffset: {width: 0, height: 1}, textShadowRadius: 2}}>
                {reel.views}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
