import {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Image} from 'expo-image';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {RadioDot} from '@/components/RadioOption';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {useUIStore} from '@/store/uiStore';
import {showToast} from '@/utils';

type Folder = {
  id: string;
  nameKey?: string;
  name?: string;
  privacy: 'private' | 'public';
  count: number;
  image: string;
};

const SEED: Folder[] = [
  {
    id: 'all',
    nameKey: 'allSaved',
    privacy: 'private',
    count: 12,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80',
  },
  {
    id: 'travel',
    nameKey: 'travel',
    privacy: 'public',
    count: 5,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=160&h=160&q=80',
  },
];

/** Feed “Save to Folder” sheet. Folders added here last for the session only. */
export function HomeBookmarkSheet() {
  const {t} = useTranslation();
  const visible = useUIStore((s) => s.bookmarkSheetVisible);
  const hideBookmarkSheet = useUIStore((s) => s.hideBookmarkSheet);
  const [folders, setFolders] = useState<Folder[]>(SEED);
  const [selectedId, setSelectedId] = useState(SEED[0].id);
  const [mode, setMode] = useState<'list' | 'create'>('list');
  const [name, setName] = useState('');

  useEffect(() => {
    if (visible) return;
    setMode('list');
    setName('');
    setSelectedId(SEED[0].id);
  }, [visible]);

  const folderName = (folder: Folder) => (folder.nameKey ? t(`bookmark.${folder.nameKey}`) : folder.name ?? '');

  const onCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const id = `folder-${Date.now()}`;
    setFolders((current) => [
      ...current,
      {
        id,
        name: trimmed,
        privacy: 'private',
        count: 0,
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=160&h=160&q=80',
      },
    ]);
    setSelectedId(id);
    setName('');
    setMode('list');
  };

  return (
    <AppBottomSheet
      visible={visible}
      onClose={hideBookmarkSheet}
      keyboardBehavior={mode === 'create' ? 'interactive' : undefined}
      keyboardBlurBehavior={mode === 'create' ? 'restore' : undefined}
      android_keyboardInputMode={mode === 'create' ? 'adjustPan' : undefined}>
      {mode === 'list' ? (
        <>
          <View className="mb-4 h-8 items-center justify-center">
            <Text className="font-bold text-[18px] text-black">{t('bookmark.saveTitle')}</Text>
            <Pressable
              onPress={() => setMode('create')}
              accessibilityRole="button"
              accessibilityLabel={t('bookmark.createTitle')}
              className="absolute right-0 p-1 active:opacity-70">
              <SVGS.Plus width={22} height={22} color="#111111" />
            </Pressable>
          </View>

          {folders.map((folder, index) => {
            const selected = folder.id === selectedId;
            const Icon = folder.privacy === 'private' ? SVGS.Lock : SVGS.Globe;
            return (
              <Pressable
                key={folder.id}
                onPress={() => setSelectedId(folder.id)}
                className="flex-row items-center py-3 active:opacity-70"
                style={index < folders.length - 1 ? {borderBottomWidth: 1, borderBottomColor: '#F0F0F0'} : undefined}>
                <Image source={{uri: folder.image}} style={{width: 52, height: 52, borderRadius: 12}} contentFit="cover" />
                <View className="ml-3 min-w-0 flex-1">
                  <Text className="font-bold text-[15px] text-black" numberOfLines={1}>
                    {folderName(folder)}
                  </Text>
                  <View className="mt-1 flex-row items-center">
                    <Icon width={14} height={14} color="#8a8a8a" />
                    <Text className="ml-1 font-medium text-[13px] text-[#8a8a8a]">
                      {t(folder.privacy === 'private' ? 'bookmark.private' : 'bookmark.public')}
                      {' · '}
                      {t('bookmark.reels', {count: folder.count})}
                    </Text>
                  </View>
                </View>
                <RadioDot selected={selected} />
              </Pressable>
            );
          })}

          <View className="mt-4">
            <Button title={t('bookmark.save')} className="rounded-2xl" onPress={() => {
              hideBookmarkSheet();
              showToast(t('bookmark.saved'));
            }} />
          </View>
        </>
      ) : (
        <>
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
        </>
      )}
    </AppBottomSheet>
  );
}
