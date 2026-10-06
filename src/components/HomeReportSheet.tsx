import {Pressable, Text, View} from 'react-native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {useUIStore} from '@/store/uiStore';
import {CHEVRON_COLOR} from '@/theme/colors';
import {showToast} from '@/utils';

const REASON_IDS = [
  'pornography',
  'violence',
  'hateSpeech',
  'selfHarm',
  'harassment',
  'childExploitation',
  'spam',
  'terrorism',
  'drugs',
  'mentalHealth',
  'substanceAbuse',
  'impersonation',
] as const;

/** Report reason list opened from the share sheet. Actions wired later. */
export function HomeReportSheet() {
  const {t} = useTranslation();
  const visible = useUIStore((s) => s.reportSheetVisible);
  const hideReportSheet = useUIStore((s) => s.hideReportSheet);

  const onReason = () => {
    hideReportSheet();
    showToast(t('report.thanks'));
  };

  return (
    <AppBottomSheet visible={visible} onClose={hideReportSheet} snapPoints={['75%']} enablePanDownToClose>
      <Text className="mb-1 text-center font-extrabold text-[20px] text-black">{t('report.title')}</Text>
      <Text className="mb-2 font-medium text-[14px] text-[#8a8a8a]">{t('report.selectReason')}</Text>

      <BottomSheetFlatList
        data={REASON_IDS}
        keyExtractor={(id) => id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 16}}
        renderItem={({item: id}) => (
          <Pressable onPress={onReason} className="flex-row items-center py-3.5 active:opacity-70">
            <Text className="flex-1 font-medium text-[15px] text-black">{t(`report.reasons.${id}`)}</Text>
            <SVGS.ArrowRight width={16} height={16} color={CHEVRON_COLOR} strokeWidth={2.2} />
          </Pressable>
        )}
      />
    </AppBottomSheet>
  );
}
