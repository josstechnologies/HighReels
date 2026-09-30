import {useState} from 'react';
import {Alert, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {Toggle} from '@/components/ui/Toggle';

type SyncSource = 'contacts' | 'facebook' | 'instagram' | 'tiktok' | 'snapchat';

const SECTIONS: {id: SyncSource; section: string; title: string; description: string; removeLabel: string; footer: string}[] = [
  {
    id: 'contacts',
    section: 'Contacts',
    title: 'Sync Contacts',
    description: 'Sync contacts to connect with people, discover mutual connections, and grow your network. You can turn this off anytime.',
    removeLabel: 'Remove Synced Contacts',
    footer: 'Delete synced contacts from servers and stop future syncing. This will remove contact suggestions.',
  },
  {
    id: 'facebook',
    section: 'Facebook Friends',
    title: 'Sync Facebook Friends',
    description:
      'Sync your Facebook friends to find connections already on the app and receive relevant friend suggestions. You can turn this off anytime.',
    removeLabel: 'Remove Synced Facebook Friends',
    footer: 'Delete all synced Facebook friend data from our servers and stop future syncing across all devices.',
  },
  {
    id: 'instagram',
    section: 'Instagram Connections',
    title: 'Sync Instagram Connections',
    description: 'Discover and connect with your Instagram followers and friends.',
    removeLabel: 'Remove Synced Instagram Data',
    footer: 'Remove all synced Instagram connections from your account.',
  },
  {
    id: 'tiktok',
    section: 'TikTok Friends',
    title: 'Sync TikTok Friends',
    description: 'Find people you follow on TikTok who are on this app.',
    removeLabel: 'Remove Synced Tiktok Data',
    footer: 'Clear synced TikTok connections and stop syncing.',
  },
  {
    id: 'snapchat',
    section: 'Snapchat Friends',
    title: 'Sync Snapchat Friends',
    description: 'Connect with your Snapchat friends already using the app.',
    removeLabel: 'Remove Synced Snapchat Data',
    footer: 'Delete synced Snapchat friends and disable syncing.',
  },
];

export function SyncContactsScreen() {
  const {back} = useRouter();
  const [enabled, setEnabled] = useState<Record<SyncSource, boolean>>({
    contacts: true,
    facebook: true,
    instagram: true,
    tiktok: true,
    snapchat: true,
  });

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Sync Contacts & Connections</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 32}} showsVerticalScrollIndicator={false}>
        <Text className="text-sm leading-5 text-grey-350">
          Sync phone contacts and Facebook friends to find people you know and grow your network. Control syncing and remove data anytime.
        </Text>

        {SECTIONS.map((item) => (
          <View key={item.id}>
            <Text className="mb-3 mt-5 font-semibold text-sm text-grey-400">{item.section}</Text>
            <View className="rounded-2xl bg-white p-4">
              <View className="flex-row items-center justify-between">
                <Text className="mr-3 flex-1 font-semibold text-sm text-black">{item.title}</Text>
                <Toggle
                  checked={enabled[item.id]}
                  onCheckedChange={(value) => setEnabled((current) => ({...current, [item.id]: value}))}
                  accessibilityLabel={item.title}
                />
              </View>
              <Text className="mt-1 text-13 leading-5 text-grey-350">{item.description}</Text>

              <Button
                title={item.removeLabel}
                variant="dangerSoft"
                onPress={() => Alert.alert(item.removeLabel, 'Coming soon')}
                className="mt-4 h-9 rounded-lg"
              />

              <Text className="mt-3 text-xs leading-4 text-grey-350">{item.footer}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
