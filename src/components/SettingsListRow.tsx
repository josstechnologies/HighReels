import type {ReactElement, ReactNode} from 'react';
import {Pressable, Text, View, type ViewProps} from 'react-native';
import type {SvgProps} from 'react-native-svg';
import {SVGS} from '@/assets';
import {CHEVRON_COLOR} from '@/theme/colors';
import {cn} from '@/utils';

export const SETTINGS_ICON_SIZE = 22;
export const SETTINGS_ICON_SLOT = 22;
export const SETTINGS_CHEVRON_SIZE = 16;

const ICON_COLOR = '#111111';
const DANGER_COLOR = '#EC2727';

type SettingsListRowProps = {
  label: string;
  Icon?: (props: SvgProps) => ReactElement;
  leading?: ReactNode;
  onPress?: () => void;
  danger?: boolean;
  showChevron?: boolean;
};

export function SettingsListRow({
  label,
  Icon,
  leading,
  onPress,
  danger = false,
  showChevron = true,
}: SettingsListRowProps) {
  const tint = danger ? DANGER_COLOR : ICON_COLOR;

  return (
    <Pressable onPress={onPress} className="flex-row items-center px-4 py-3.5 active:bg-grey-50">
      <View
        style={{
          width: SETTINGS_ICON_SLOT,
          height: SETTINGS_ICON_SLOT,
          marginRight: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {leading ?? (Icon ? <Icon width={SETTINGS_ICON_SIZE} height={SETTINGS_ICON_SIZE} color={tint} /> : null)}
      </View>
      <Text className={cn('flex-1 font-medium text-sm', danger ? 'text-danger-700' : 'text-black')}>{label}</Text>
      {showChevron ? (
        <View style={{width: SETTINGS_ICON_SLOT, height: SETTINGS_ICON_SLOT, alignItems: 'center', justifyContent: 'center'}}>
          <SVGS.ArrowRight width={SETTINGS_CHEVRON_SIZE} height={SETTINGS_CHEVRON_SIZE} color={CHEVRON_COLOR} strokeWidth={2.2} />
        </View>
      ) : null}
    </Pressable>
  );
}

type SettingsListCardProps = ViewProps & {
  children: ReactNode;
  className?: string;
};

/** White rounded card that groups settings rows. No dividers — spacing comes from row padding. */
export function SettingsListCard({children, className, ...props}: SettingsListCardProps) {
  return (
    <View className={cn('mx-4 rounded-2xl bg-white', className)} {...props}>
      {children}
    </View>
  );
}
