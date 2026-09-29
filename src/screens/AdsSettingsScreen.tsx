import {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {RadioOption} from '@/components/RadioOption';
import {showToast} from '@/utils';

type AdsAudience = 'followers' | 'everyone' | 'only_me';

const OPTIONS: {value: AdsAudience; label: string}[] = [
  {value: 'followers', label: 'Followers'},
  {value: 'everyone', label: 'Everyone'},
  {value: 'only_me', label: 'Only Me'},
];

export function AdsSettingsScreen() {
  const {back} = useRouter();
  const [audience, setAudience] = useState<AdsAudience>('everyone');

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">Ads Settings</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 24}} showsVerticalScrollIndicator={false}>
        <Text className="text-sm leading-5 text-grey-400">Control how ads appear on your content and who can see them.</Text>

        <View className="mt-4 rounded-2xl bg-white px-4 pb-4 pt-3">
          <Text className="mb-1 font-semibold text-base text-grey-500">Who can see ads on your content?</Text>
          {OPTIONS.map((option) => (
            <RadioOption
              key={option.value}
              label={option.label}
              selected={audience === option.value}
              onPress={() => setAudience(option.value)}
            />
          ))}
          <Text className="mt-3 text-sm leading-5 text-grey-400">
            These settings apply to ads shown on your profile, posts, and shared content.
          </Text>
        </View>
      </ScrollView>

      <View className="bg-secondary px-4 pb-4 pt-3">
        <Button title="Save Settings" onPress={() => showToast('Ads settings saved')} className="rounded-2xl" />
      </View>
    </SafeAreaView>
  );
}
