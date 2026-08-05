import {View, Text, Pressable} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Controller, useForm, useWatch} from 'react-hook-form';
import Svg, {Path} from 'react-native-svg';
import {SVGS} from '@/assets';
import {Button, DateParts, DatePickerWheel, datePartsFromDate, formatBirthdayLabel, isAtLeastAge} from '@/components';

const MIN_AGE = 13;

type FormData = {birthday: DateParts};

export default function Birthday() {
  const {back, navigate} = useRouter();
  const {t} = useTranslation();

  const {control} = useForm<FormData>({
    defaultValues: {birthday: datePartsFromDate(new Date())},
  });
  const birthday = useWatch({control, name: 'birthday'}) ?? datePartsFromDate(new Date());
  const canContinue = isAtLeastAge(birthday, MIN_AGE);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <View className="pt-2">
          <Pressable onPress={back} className="self-start rounded-full p-2 active:bg-zinc-100">
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
              <Path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>
        </View>

        <View className="mt-6 flex-row items-center">
          <SVGS.BirthdayBG width={58} height={58} />
          <Text className="ml-4 flex-1 text-[28px] font-extrabold leading-9 text-[#111111]">{t('signup.birthdayTitle')}</Text>
        </View>

        <Text className="mt-10 text-center text-2xl font-extrabold text-[#111111]">{formatBirthdayLabel(birthday)}</Text>

        <View className="mt-10">
          <Controller
            name="birthday"
            control={control}
            render={({field: {value, onChange}}) => <DatePickerWheel value={value} onChange={onChange} />}
          />
        </View>

        <View className="mt-auto pb-4 pt-10">
          <Button title={t('signup.continue')} disabled={!canContinue} onPress={() => navigate('/username')} />
        </View>

      </View>
    </SafeAreaView>
  );
}
