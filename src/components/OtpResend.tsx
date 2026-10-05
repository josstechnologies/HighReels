import {View, Text, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {cn} from '@/utils';

export const RESEND_SECONDS = 60;

type OtpResendProps = {
  timer: number;
  onResend: () => void;
  disabled?: boolean;
  resendInLabel?: string;
  resendCodeLabel?: string;
  className?: string;
};

export function OtpResend({timer, onResend, disabled, resendInLabel, resendCodeLabel, className}: OtpResendProps) {
  const {t} = useTranslation();
  const timerLabel = `00:${timer < 10 ? `0${timer}` : timer}`;

  return (
    <View className={cn('items-start', className)}>
      {timer > 0 ? (
        <Text className="font-medium text-15 text-[#a7a7a7]">
          {resendInLabel ?? t('signup.resendIn')} <Text className="font-semibold text-[#111111]">{timerLabel}</Text>
        </Text>
      ) : (
        <Pressable
          onPress={onResend}
          disabled={disabled}
          className="flex-row items-center rounded-full border border-[#ececec] px-4 py-2.5 active:opacity-70">
          <SVGS.Resend width={14} height={14} />
          <Text className="ml-2 font-semibold text-sm text-[#111111]">{resendCodeLabel ?? t('signup.resendCode')}</Text>
        </Pressable>
      )}
    </View>
  );
}
