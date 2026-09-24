import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { SVGS } from '@/assets';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/Button';

type ExportFormat = 'txt' | 'pdf' | 'html';

const FORMAT_OPTIONS: { value: ExportFormat; labelKey: string }[] = [
  { value: 'txt', labelKey: 'exportChat.textFile' },
  { value: 'pdf', labelKey: 'exportChat.pdf' },
  { value: 'html', labelKey: 'exportChat.html' },
];

export function ExportChatScreen() {
  const { back } = useRouter();
  const { t } = useTranslation();
  const [includeMedia, setIncludeMedia] = useState(true);
  const [format, setFormat] = useState<ExportFormat>('txt');

  const handleExport = () => {
    // No file-system yet — keep placeholder until library added
    Alert.alert(t('exportChat.title'), `${t('exportChat.exportButton')} — ${format}${includeMedia ? ' + media' : ''}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      {/* Header — flex row without absolute positioning */}
      <View className="flex-row items-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">{t('exportChat.title')}</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        className="flex-1 bg-secondary"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}>
        {/* Include Media card */}
        <View className="mx-4 mt-3 flex-row items-center justify-between rounded-2xl bg-white px-4 py-4">
          <Text className="flex-1 pr-3 font-semibold text-black" style={{ fontSize: 16 }}>
            {t('exportChat.includeMedia')}
          </Text>
          <Toggle checked={includeMedia} onCheckedChange={setIncludeMedia} accessibilityLabel={t('exportChat.includeMedia')} />
        </View>

        <Text className="mx-4 mt-2 font-medium text-[14px] leading-5 text-grey-300">{t('exportChat.mediaHint')}</Text>

        {/* Format */}
        <Text className="mx-4 mt-6 font-medium text-[13px] tracking-wide text-grey-300">{t('exportChat.format')}</Text>

        <View className="mx-4 mt-3 overflow-hidden rounded-2xl bg-white">
          {FORMAT_OPTIONS.map(option => {
            const selected = format === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => setFormat(option.value)}
                className="flex-row items-center justify-between px-4 py-4 active:bg-grey-50">
                <Text className="flex-1 pr-3 font-semibold text-black" style={{ fontSize: 16 }}>
                  {t(option.labelKey)}
                </Text>
                {selected ? (
                  <SVGS.Tick width={20} height={20} color="#111111" />
                ) : (
                  <View style={{ width: 20, height: 20 }} />
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Export button — top padding from container, not absolute */}
        <View className="mx-4 mt-12">
          <Button title={t('exportChat.exportButton')} onPress={handleExport} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
