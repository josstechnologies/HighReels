import {useState} from 'react';
import {Alert, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';

type SubStatus = 'active' | 'ending' | 'expired';

type DetailLine = {text: string; bold?: string};

type StatusConfig = {
  badge: string;
  badgeClass: string;
  intro: string | null;
  details: DetailLine[];
  footer: string | null;
};

const PLAN_TITLE = 'Monthly – $39.99/month';

const CONFIG: Record<SubStatus, StatusConfig> = {
  active: {
    badge: 'Active Plan',
    badgeClass: 'text-primary',
    intro: null,
    details: [
      {text: 'Renews on ', bold: '24 Mar 2026'},
      {text: 'Auto-renewal is ', bold: 'On'},
      {text: 'Subscriber since ', bold: '24 Feb 2026'},
    ],
    footer: null,
  },
  ending: {
    badge: 'Subscription Ending',
    badgeClass: 'text-primary',
    intro: 'Your subscription has been cancelled. You can continue using premium features until it expires.',
    details: [
      {text: 'Renews on ', bold: '24 Mar 2026'},
      {text: 'Auto-renewal is ', bold: 'On'},
      {text: 'Subscriber since ', bold: '24 Feb 2026'},
    ],
    footer: "You'll lose access to premium features after the expiry date.",
  },
  expired: {
    badge: 'Plan Expired',
    badgeClass: 'text-danger-700',
    intro: 'Your premium access has ended. Renew to continue using all features.',
    details: [
      {text: 'Renews on ', bold: '24 Mar 2026'},
      {text: 'Premium features are no longer available'},
    ],
    footer: "You'll lose access to premium features after the expiry date.",
  },
};

function DetailRow({line}: {line: DetailLine}) {
  return (
    <View className="flex-row items-start">
      <Text className="mr-2 font-medium text-[15px] leading-6 text-black">•</Text>
      <Text className="flex-1 font-medium text-[15px] leading-6 text-black">
        {line.text}
        {line.bold ? <Text className="font-bold text-black">{line.bold}</Text> : null}
      </Text>
    </View>
  );
}

export default function Subscriptions() {
  const {back} = useRouter();
  const [status, setStatus] = useState<SubStatus>('active');
  const config = CONFIG[status];

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="font-extrabold text-xl text-black">Subscription</Text>
      </View>

      <ScrollView
        className="flex-1 bg-secondary"
        contentContainerStyle={{paddingBottom: 32}}
        showsVerticalScrollIndicator={false}>
        {config.intro ? (
          <Text className="mx-4 mt-2 font-medium text-[14px] leading-5 text-grey-300">{config.intro}</Text>
        ) : null}

        <View className="mx-4 mt-4 rounded-2xl bg-white px-4 py-5">
          <Text className={`font-semibold text-[13px] ${config.badgeClass}`}>{config.badge}</Text>
          <Text className="mt-2 font-extrabold text-[20px] text-black">{PLAN_TITLE}</Text>

          <Text className="mt-5 font-medium text-[13px] text-grey-300">Details</Text>
          <View className="mt-2 gap-2">
            {config.details.map(line => (
              <DetailRow key={line.text + (line.bold ?? '')} line={line} />
            ))}
          </View>

          <View className="mt-6">
            {status === 'active' ? (
              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => setStatus('ending')}
                  className="h-12 flex-1 items-center justify-center rounded-xl bg-grey-50 active:opacity-80">
                  <Text className="font-semibold text-base text-danger-700">Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={() => Alert.alert('Pause', 'Coming soon.')}
                  className="h-12 flex-1 items-center justify-center rounded-xl bg-primary active:opacity-90">
                  <Text className="font-semibold text-base text-white">Pause</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={() => setStatus('active')}
                className="h-12 w-full items-center justify-center rounded-xl bg-primary active:opacity-90">
                <Text className="font-semibold text-base text-white">
                  {status === 'ending' ? 'Renew Subscription' : 'Subscribe Again'}
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        {config.footer ? (
          <Text className="mx-4 mt-4 font-medium text-[13px] leading-5 text-grey-300">{config.footer}</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
