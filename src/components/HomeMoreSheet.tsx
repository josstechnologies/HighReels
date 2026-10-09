import type {ReactNode} from 'react';
import {Pressable, Text, View} from 'react-native';
import type {SvgProps} from 'react-native-svg';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {useUIStore} from '@/store/uiStore';
import {showToast} from '@/utils';

const ICON = '#111111';

type Row = {
  id: string;
  Icon: (props: SvgProps) => ReactNode;
  title: string;
  hint?: string;
  toast?: string;
  action: 'toast' | 'bookmark' | 'report' | 'copy' | 'none';
};

const GROUPS: Row[][] = [
  [
    {
      id: 'interested',
      Icon: SVGS.HeartOutline,
      title: 'reelMenu.interested',
      hint: 'reelMenu.interestedHint',
      toast: 'reelMenu.interestedDone',
      action: 'toast',
    },
    {
      id: 'notInterested',
      Icon: SVGS.HeartBreak,
      title: 'reelMenu.notInterested',
      hint: 'reelMenu.notInterestedHint',
      toast: 'reelMenu.notInterestedDone',
      action: 'toast',
    },
  ],
  [
    {id: 'save', Icon: SVGS.Bookmark, title: 'reelMenu.save', hint: 'reelMenu.saveHint', action: 'bookmark'},
    {id: 'remix', Icon: SVGS.Remix, title: 'reelMenu.remix', hint: 'reelMenu.remixOff', action: 'none'},
  ],
  [
    {id: 'captions', Icon: SVGS.Caption, title: 'reelMenu.captions', toast: 'reelMenu.captionsSoon', action: 'toast'},
    {id: 'copy', Icon: SVGS.CopyLink, title: 'reelMenu.copy', action: 'copy'},
  ],
  [
    {id: 'views', Icon: SVGS.Eye, title: 'reelMenu.views', toast: 'reelMenu.viewsSoon', action: 'toast'},
    {id: 'report', Icon: SVGS.Report, title: 'reelMenu.report', action: 'report'},
  ],
];

/** Reel menu opened from the feed ⋮ button. */
export function HomeMoreSheet() {
  const {t} = useTranslation();
  const visible = useUIStore((s) => s.moreSheetVisible);
  const data = useUIStore((s) => s.moreSheetData);
  const hideMoreSheet = useUIStore((s) => s.hideMoreSheet);
  const showBookmarkSheet = useUIStore((s) => s.showBookmarkSheet);
  const showReportSheet = useUIStore((s) => s.showReportSheet);

  const onRow = (row: Row) => {
    if (row.action === 'none' || !data) return;
    if (row.action === 'bookmark') {
      showBookmarkSheet(data);
      return;
    }
    if (row.action === 'report') {
      showReportSheet(data);
      return;
    }
    if (row.action === 'copy') {
      const id = data.id ?? '';
      void import('expo-clipboard')
        .then((Clipboard) => Clipboard.setStringAsync(`https://highreels.app/reel/${id}`))
        .then(() => {
          hideMoreSheet();
          showToast(t('reelMenu.copied'));
        })
        .catch(() => {});
      return;
    }
    hideMoreSheet();
    if (row.toast) showToast(t(row.toast));
  };

  return (
    <AppBottomSheet visible={visible} onClose={hideMoreSheet} enableDynamicSizing>
      {GROUPS.map((group, index) => (
        <View key={group[0].id}>
          {index > 0 ? <View className="my-2 h-px bg-[#EDEDED]" /> : null}
          {group.map((row) => {
            const body = (
              <>
                <View className="w-7 items-center">
                  <row.Icon width={22} height={22} color={ICON} />
                </View>
                <View className="min-w-0 flex-1">
                  <Text className="font-semibold text-[16px] text-black">{t(row.title)}</Text>
                  {row.hint ? <Text className="mt-0.5 font-medium text-[13px] text-[#8a8a8a]">{t(row.hint)}</Text> : null}
                </View>
              </>
            );
            if (row.action === 'none') {
              return (
                <View key={row.id} className="flex-row items-center gap-3 py-2.5">
                  {body}
                </View>
              );
            }
            return (
              <Pressable key={row.id} onPress={() => onRow(row)} className="flex-row items-center gap-3 py-2.5 active:opacity-70">
                {body}
              </Pressable>
            );
          })}
        </View>
      ))}
    </AppBottomSheet>
  );
}
