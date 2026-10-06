import {Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {CHEVRON_COLOR} from '@/theme/colors';

const INTRO = 'Turn your creativity into earnings. Explore ways to grow and monetise your content.';

const EMOJI_SIZE = 28;

type EarnRow = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  invitedOnly?: boolean;
};

const EARN_ROWS: EarnRow[] = [
  {
    id: 'fan-support',
    title: 'Fan Support (Gifts & Tips)',
    description: 'Let your audience support you through virtual gifts and tips during videos.',
    emoji: '⭐',
  },
  {
    id: 'subscriptions',
    title: 'Creator Subscriptions',
    description: 'Offer exclusive content and perks to your subscribers with recurring income.',
    emoji: '💎',
  },
  {
    id: 'ad-revenue',
    title: 'Ad Revenue Sharing',
    description: 'Earn from ads shown on your eligible high-performing videos.',
    emoji: '🎬',
    invitedOnly: true,
  },
  {
    id: 'creator-store',
    title: 'Creator Store',
    description: 'Sell premium videos, templates, or custom content directly to your audience.',
    emoji: '🛍️',
    invitedOnly: true,
  },
];

function StatBox({value, label}: {value: string; label: string}) {
  return (
    <View className="flex-1 justify-center rounded-xl bg-secondary p-4">
      <Text className="font-semibold text-base text-black">{value}</Text>
      <Text className="mt-2 text-xs text-grey-900">{label}</Text>
    </View>
  );
}

function EarnCard({row}: {row: EarnRow}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={row.title}
      className="flex-row items-start rounded-2xl bg-white px-3.5 py-3.5 active:opacity-90">
      <Text style={{fontSize: EMOJI_SIZE, lineHeight: EMOJI_SIZE}}>{row.emoji}</Text>
      <View className="ml-2.5 flex-1 pr-2">
        <Text className="font-bold text-sm text-black">{row.title}</Text>
        <Text className="mt-1.5 text-xs leading-4 text-black">{row.description}</Text>
        {row.invitedOnly ? (
          <View className="mt-2 self-start rounded-3xl border border-grey-50 bg-secondary px-3.5 py-1.5">
            <Text className="text-xs font-medium text-grey-400">Invited Only</Text>
          </View>
        ) : null}
      </View>
      <View className="self-center">
        <SVGS.ArrowRight width={16} height={16} color={CHEVRON_COLOR} strokeWidth={2.2} />
      </View>
    </Pressable>
  );
}

export function MonetizeScreen() {
  const {back} = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-3">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Monetize</Text>
        <Pressable
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel="Add"
          className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Plus width={20} height={20} color="#111111" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 4, paddingBottom: 24}}
        showsVerticalScrollIndicator={false}>
        <Text className="text-sm leading-5 text-grey-400">{INTRO}</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Partnership ads"
          className="mt-4 rounded-2xl bg-white px-4 py-4 active:opacity-90">
          <View className="flex-row items-center">
            <SVGS.Bag width={18} height={18} color="#111111" />
            <Text className="ml-2.5 flex-1 font-semibold text-15 text-black">Partnership ads</Text>
            <SVGS.ArrowRight width={16} height={16} color={CHEVRON_COLOR} strokeWidth={2.2} />
          </View>
          <View className="mt-3.5 flex-row gap-2.5">
            <StatBox value="0" label="Requests" />
            <StatBox value="0" label="Active Deals" />
          </View>
        </Pressable>

        <Text className="mb-2.5 mt-5 font-semibold text-base text-black">Unlock More Earnings</Text>
        <View className="gap-2.5">
          {EARN_ROWS.map(row => (
            <EarnCard key={row.id} row={row} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
