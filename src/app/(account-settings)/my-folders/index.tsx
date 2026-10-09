import {useState} from 'react';
import {Pressable, Text, View, useWindowDimensions} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {Image} from 'expo-image';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {addMyFolder, useMyFolders, type MyFolder} from '@/mock-data/my-folders';

function folderLabel(folder: MyFolder, t: (key: string) => string) {
  return folder.nameKey ? t(`folders.${folder.nameKey}`) : (folder.name ?? '');
}

export default function MyFoldersScreen() {
  const {t} = useTranslation();
  const router = useRouter();
  const {width} = useWindowDimensions();
  const folders = useMyFolders();
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const cardWidth = (width - 16 * 2 - 12) / 2;

  const openCreate = () => {
    setName('');
    setCreateOpen(true);
  };

  const onCreate = () => {
    addMyFolder(name);
    setCreateOpen(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-3">
        <Pressable onPress={router.back} accessibilityRole="button" accessibilityLabel={t('folders.back')} className="w-8 active:opacity-70">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-[18px] text-black">{t('folders.title')}</Text>
        <Pressable
          onPress={openCreate}
          accessibilityRole="button"
          accessibilityLabel={t('bookmark.createTitle')}
          className="w-8 items-end active:opacity-70">
          <SVGS.Plus width={22} height={22} color="#111111" />
        </Pressable>
      </View>

      <View className="flex-row flex-wrap px-4 pt-2" style={{gap: 12}}>
        {folders.map((folder) => {
          const Icon = folder.privacy === 'private' ? SVGS.Lock : SVGS.Globe;
          return (
            <Pressable
              key={folder.id}
              onPress={() => router.push(`/my-folders/${folder.id}` as Href)}
              style={{width: cardWidth}}
              className="active:opacity-80">
              {folder.image ? (
                <Image source={{uri: folder.image}} style={{width: cardWidth, height: cardWidth * 0.78, borderRadius: 16}} contentFit="cover" />
              ) : (
                <View style={{width: cardWidth, height: cardWidth * 0.78, borderRadius: 16}} className="bg-[#F2F2F2]" />
              )}
              <Text className="mt-2 font-bold text-[15px] text-black" numberOfLines={1}>
                {folderLabel(folder, t)}
              </Text>
              <View className="mt-1 flex-row items-center">
                <Icon width={14} height={14} color="#9A9A9A" />
                <Text className="ml-1 font-medium text-[13px] text-[#9A9A9A]">{t('bookmark.reels', {count: folder.count})}</Text>
              </View>
            </Pressable>
          );
        })}

        <Pressable
          onPress={openCreate}
          accessibilityRole="button"
          accessibilityLabel={t('folders.newCollection')}
          style={{width: cardWidth, height: cardWidth * 0.78, borderStyle: 'dashed'}}
          className="items-center justify-center rounded-2xl border border-[#D4D4D4] active:opacity-80">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-[#F3F3F3]">
            <SVGS.Plus width={22} height={22} color="#111111" />
          </View>
          <Text className="mt-3 font-medium text-[14px] text-black">{t('folders.newCollection')}</Text>
        </Pressable>
      </View>

      <AppBottomSheet
        visible={createOpen}
        onClose={() => setCreateOpen(false)}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustPan">
        <Text className="mb-6 text-center font-bold text-[18px] text-black">{t('bookmark.createTitle')}</Text>
        <Text className="mb-3 font-semibold text-[15px] text-black">{t('bookmark.addName')}</Text>
        <BottomSheetTextInput
          value={name}
          onChangeText={setName}
          placeholder={t('bookmark.namePlaceholder')}
          placeholderTextColor="#A7A7A7"
          className="mb-8 rounded-xl border border-[#E6E6E6] px-4 py-3.5 font-medium text-[15px] text-black"
        />
        <Button title={t('bookmark.create')} className="rounded-2xl" disabled={!name.trim()} onPress={onCreate} />
      </AppBottomSheet>
    </SafeAreaView>
  );
}
