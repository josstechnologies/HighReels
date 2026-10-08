import {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Image} from 'expo-image';
import {LinearGradient} from 'expo-linear-gradient';
import {useRouter} from 'expo-router';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IMAGES, SVGS} from '@/assets';
import {showToast} from '@/utils';

const BALANCE = 500;
const PRIMARY = '#6F41EC';

const PACKS = [
  {id: '10000', coins: 10000, bonus: 6000, price: '59.99'},
  {id: '6000', coins: 6000, bonus: 3000, price: '39.99'},
  {id: '3000', coins: 3000, bonus: 1000, price: '19.99'},
  {id: '1500', coins: 1500, bonus: 500, price: '9.99'},
  {id: '1200', coins: 1200, bonus: 300, price: '7.99'},
  {id: '800', coins: 800, bonus: 200, price: '4.99'},
  {id: '500', coins: 500, bonus: 100, price: '2.99'},
  {id: '300', coins: 300, bonus: 50, price: '1.99'},
  {id: '100', coins: 100, bonus: 10, price: '0.99'},
  {id: '50', coins: 50, bonus: 5, price: '0.49'},
] as const;

/** Visual coin store. Pay does not charge or change the balance. */
export default function CoinStore() {
  const {t} = useTranslation();
  const {back} = useRouter();
  const [selectedId, setSelectedId] = useState<string>(PACKS[0].id);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-3">
        <Pressable
          onPress={back}
          accessibilityRole="button"
          accessibilityLabel={t('coinStore.back')}
          className="absolute left-4 z-10 p-1 active:opacity-70">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-[18px] text-black">{t('coinStore.title')}</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 24}} showsVerticalScrollIndicator={false}>
        <Text className="mb-4 font-medium text-[14px] text-[#8a8a8a]">{t('coinStore.subtitle')}</Text>

        <LinearGradient
          colors={['#FFFFFFA0', '#121212']}
          locations={[0.01, 0.4]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{borderRadius: 16, marginBottom: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16}}>
          <Image source={IMAGES.coin} style={{width: 44, height: 44}} contentFit="contain" />
          <View className="ml-3">
            <Text className="font-medium text-[13px] text-white">{t('coinStore.available')}</Text>
            <Text className="font-extrabold text-[28px] text-white">{BALANCE.toLocaleString()}</Text>
          </View>
        </LinearGradient>

        <View className="flex-row flex-wrap justify-between">
          {PACKS.map((pack) => {
            const selected = pack.id === selectedId;
            return (
              <Pressable
                key={pack.id}
                onPress={() => setSelectedId(pack.id)}
                className="mb-3 w-[31.5%] items-center rounded-2xl px-1 py-3 active:opacity-70"
                style={{
                  backgroundColor: '#F8F8F8',
                  borderWidth: selected ? 1.5 : 1.5,
                  borderColor: selected ? '#111111' : '#FFFFFF',
                }}>
                <Text className="font-extrabold text-[16px] text-black">{pack.coins.toLocaleString()}</Text>
                <Text className="mt-0.5 text-center font-medium text-[11px] text-[#8a8a8a]">{t('coinStore.bonus', {count: pack.bonus})}</Text>
                <Image source={IMAGES.coin} style={{width: 28, height: 28, marginVertical: 8}} contentFit="contain" />
                <Text className="font-semibold text-[13px] text-black">AUD {pack.price}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View className="px-4 pb-3 pt-2">
        <Pressable
          onPress={() => showToast(t('coinStore.purchased'))}
          className="h-12 flex-row items-center justify-center rounded-xl bg-primary active:opacity-80">
          <SVGS.Lock width={16} height={16} color="#FFFFFF" />
          <Text className="ml-2 font-bold text-[16px] text-white">{t('coinStore.pay')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
