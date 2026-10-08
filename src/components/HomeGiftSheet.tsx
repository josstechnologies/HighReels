import {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {Image} from 'expo-image';
import {useRouter} from 'expo-router';
import {useTranslation} from 'react-i18next';
import {IMAGES} from '@/assets';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {useUIStore} from '@/store/uiStore';
import {showToast} from '@/utils';

const BALANCE = 500;
const PRIMARY = '#6F41EC';

const TABS = ['exclusive', 'interactive', 'premium'] as const;
type Tab = (typeof TABS)[number];

type Gift = {id: string; nameKey: string; emoji: string; price: number};

/** Mock catalog. Emoji stand-ins until gift art lands. */
const GIFTS: Gift[] = [
  {id: 'cool', nameKey: 'coolGuy', emoji: '😎', price: 250},
  {id: 'specs-1', nameKey: 'specs', emoji: '🕶️', price: 115},
  {id: 'party-1', nameKey: 'party', emoji: '🎉', price: 623},
  {id: 'candy-1', nameKey: 'candy', emoji: '🍬', price: 765},
  {id: 'bear-1', nameKey: 'bear', emoji: '🧸', price: 987},
  {id: 'dance', nameKey: 'dance', emoji: '👯', price: 543},
  {id: 'heart', nameKey: 'sweetBite', emoji: '💖', price: 345},
  {id: 'octo', nameKey: 'octo', emoji: '🐙', price: 892},
  {id: 'party-2', nameKey: 'party', emoji: '🎉', price: 623},
  {id: 'specs-2', nameKey: 'specs', emoji: '🕶️', price: 115},
  {id: 'candy-2', nameKey: 'candy', emoji: '🍬', price: 765},
  {id: 'bear-2', nameKey: 'bear', emoji: '🧸', price: 987},
];

function GiftGlyph({emoji, selected}: {emoji: string; selected: boolean}) {
  const scale = useSharedValue(selected ? 1.15 : 1);

  useEffect(() => {
    scale.value = withSpring(selected ? 1.15 : 1, {damping: 14, stiffness: 220});
  }, [selected, scale]);

  const style = useAnimatedStyle(() => ({transform: [{scale: scale.value}]}));

  return <Animated.Text style={[{fontSize: 32}, style]}>{emoji}</Animated.Text>;
}

/** Feed gift picker. Send is UI-only — balance is not charged. */
export function HomeGiftSheet() {
  const {t} = useTranslation();
  const router = useRouter();
  const visible = useUIStore((s) => s.giftSheetVisible);
  const hideGiftSheet = useUIStore((s) => s.hideGiftSheet);
  const [tab, setTab] = useState<Tab>('exclusive');
  const [selectedId, setSelectedId] = useState(GIFTS[0].id);

  useEffect(() => {
    if (!visible) return;
    setTab('exclusive');
    setSelectedId(GIFTS[0].id);
  }, [visible]);

  const onSend = (gift: Gift) => {
    if (BALANCE < gift.price) {
      showToast(t('gifts.notEnough'));
      return;
    }
    hideGiftSheet();
    showToast(t('gifts.sent'));
  };

  return (
    <AppBottomSheet visible={visible} onClose={hideGiftSheet}>
      <View className="mb-4 h-9 items-center justify-center">
        <Text className="font-bold text-[18px] text-black">{t('gifts.title')}</Text>
        <View className="absolute left-0 flex-row items-center">
          <Image source={IMAGES.coin} style={{width: 18, height: 18}} contentFit="contain" />
          <Text className="ml-1 font-bold text-[15px] text-black">{BALANCE}</Text>
        </View>
        <Pressable
          onPress={() => {
            hideGiftSheet();
            router.push('/coin-store');
          }}
          className="absolute right-0 rounded-full px-3 py-1.5 active:opacity-70"
          style={{backgroundColor: PRIMARY}}>
          <Text className="font-semibold text-[13px] text-white">{t('gifts.recharge')}</Text>
        </Pressable>
      </View>

      <View className="mb-4 flex-row gap-2">
        {TABS.map((id) => {
          const active = tab === id;
          return (
            <Pressable
              key={id}
              onPress={() => setTab(id)}
              className="rounded-full px-3.5 py-1.5 active:opacity-70"
              style={{backgroundColor: active ? '#111111' : '#F3F3F3'}}>
              <Text className="font-semibold text-[13px]" style={{color: active ? '#FFFFFF' : '#7F7F7F'}}>
                {t(`gifts.tabs.${id}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {tab === 'exclusive' ? (
        <View className="flex-row flex-wrap">
          {GIFTS.map((gift) => {
            const selected = gift.id === selectedId;
            return (
              <View key={gift.id} className="mb-3 w-1/4 items-center">
                <Pressable
                  onPress={() => setSelectedId(gift.id)}
                  className="w-[92%] overflow-hidden rounded-2xl"
                  style={{
                    aspectRatio: 0.78,
                    backgroundColor: '#F6F6F6',
                    borderWidth: selected ? 1.5 : 1,
                    borderColor: selected ? PRIMARY : '#ECECEC',
                  }}>
                  <View className="flex-1 items-center justify-center">
                    <GiftGlyph emoji={gift.emoji} selected={selected} />
                  </View>
                  {selected ? (
                    <Pressable onPress={() => onSend(gift)} className="items-center py-1.5" style={{backgroundColor: PRIMARY}}>
                      <Text className="font-bold text-[12px] text-white">{t('gifts.send')}</Text>
                    </Pressable>
                  ) : (
                    <View className="items-center pb-2">
                      <Text className="font-medium text-[11px] text-black" numberOfLines={1}>
                        {t(`gifts.items.${gift.nameKey}`)}
                      </Text>
                      <View className="mt-0.5 flex-row items-center">
                        <Image source={IMAGES.coin} style={{width: 12, height: 12}} contentFit="contain" />
                        <Text className="ml-0.5 font-semibold text-[11px] text-black">{gift.price}</Text>
                      </View>
                    </View>
                  )}
                </Pressable>
              </View>
            );
          })}
        </View>
      ) : (
        <Text className="py-16 text-center font-medium text-[15px] text-[#8a8a8a]">{t('gifts.comingSoon')}</Text>
      )}
    </AppBottomSheet>
  );
}
