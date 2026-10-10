import {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {BottomSheetScrollView, BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {CHAT_LANGUAGES, setChatLanguage, useChatLanguage} from '@/mock-data/chats';

export function ChatLanguageSheet({visible, chatId, onClose}: {visible: boolean; chatId: string; onClose: () => void}) {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const saved = useChatLanguage(chatId);
  const [draft, setDraft] = useState(saved);
  const [query, setQuery] = useState('');
  const languages = CHAT_LANGUAGES.filter((language) => language.name.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (!visible) return;
    setDraft(saved);
    setQuery('');
  }, [visible, saved]);

  return (
    <AppBottomSheet visible={visible} onClose={onClose} snapPoints={['78%']}>
      <BottomSheetScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingHorizontal: 20, paddingTop: 8, paddingBottom: Math.max(insets.bottom, 16)}}>
        <Text className="font-NunitoSans_700Bold mb-4 text-center text-[18px] text-black">{t('chat.chooseLanguage')}</Text>
        <View className="mb-4 h-11 flex-row items-center rounded-full bg-secondary px-4">
          <SVGS.Search width={18} height={18} color="#A7A7A7" />
          <BottomSheetTextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t('chat.search')}
            placeholderTextColor="#A7A7A7"
            className="font-NunitoSans_400Regular ml-2 flex-1 text-[15px] text-black"
          />
        </View>
        <Text className="font-NunitoSans_400Regular mb-2 text-[13px] text-grey-200">{t('chat.translateHint')}</Text>
        {languages.map((language) => {
          const selected = language.id === draft;
          return (
            <Pressable
              key={language.id}
              onPress={() => setDraft(language.id)}
              accessibilityRole="radio"
              accessibilityState={{selected}}
              className="flex-row items-center justify-between py-3.5">
              <Text className="font-NunitoSans_600SemiBold text-[16px] text-black">{language.name}</Text>
              <View className={`h-6 w-6 items-center justify-center rounded-full border-2 ${selected ? 'border-primary' : 'border-grey-100'}`}>
                {selected ? <View className="h-3 w-3 rounded-full bg-primary" /> : null}
              </View>
            </Pressable>
          );
        })}
        <Button
          title={t('chat.done')}
          className="mt-4 rounded-2xl"
          onPress={() => {
            setChatLanguage(chatId, draft);
            onClose();
          }}
        />
      </BottomSheetScrollView>
    </AppBottomSheet>
  );
}
