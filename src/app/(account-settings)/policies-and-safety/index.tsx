import {Pressable, Text, View, ScrollView} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';

const CHEVRON_SIZE = 16;

type PolicyRowDef = {
  label: string;
  href?: Href;
};

const SECTIONS: {title: string; rows: PolicyRowDef[]}[] = [
  {
    title: 'Safety & Community',
    rows: [
      {label: 'Community Guidelines', href: '/policies-and-safety/community-guidelines' as Href},
      {label: 'Safety Hub', href: '/policies-and-safety/safety-hub' as Href},
    ],
  },
  {
    title: 'Legal & Policies',
    rows: [
      {label: 'Terms of Use', href: '/policies-and-safety/terms-of-use' as Href},
      {label: 'Privacy Policies', href: '/policies-and-safety/privacy-policy' as Href},
      {label: 'Rewards Policy', href: '/policies-and-safety/rewards-policy' as Href},
      {label: 'Digital Assets Policy', href: '/policies-and-safety/digital-assets-policy' as Href},
      {label: 'Teen Safety Policy', href: '/policies-and-safety/teen-safety-policy' as Href},
    ],
  },
];

function PolicyRow({label, onPress}: {label: string; onPress?: () => void}) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center px-4 py-4 active:bg-grey-50">
      <Text className="flex-1 font-medium text-black" style={{fontSize: 16}}>
        {label}
      </Text>
      <SVGS.ArrowRight width={CHEVRON_SIZE} height={CHEVRON_SIZE} color="#A7A7A7" />
    </Pressable>
  );
}

export default function PoliciesAndSafety() {
  const {back, navigate} = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="font-extrabold text-xl text-black">Policies & Safety</Text>
      </View>

      <ScrollView className="bg-secondary" contentContainerStyle={{paddingBottom: 32}} showsVerticalScrollIndicator={false}>
        <View className="mx-4 mt-3 rounded-2xl bg-white pb-2 pt-1">
          {SECTIONS.map((section, sectionIndex) => (
            <View key={section.title}>
              <Text
                className={`px-4 font-medium text-grey-200 ${sectionIndex === 0 ? 'mt-3 mb-1' : 'mt-5 mb-1'}`}
                style={{fontSize: 13}}>
                {section.title}
              </Text>
              {section.rows.map(row => {
                const href = row.href;
                return (
                  <PolicyRow
                    key={row.label}
                    label={row.label}
                    onPress={href ? () => navigate(href) : undefined}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
