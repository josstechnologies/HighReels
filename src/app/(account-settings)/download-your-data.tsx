import {useMemo, useState} from 'react';
import {Alert, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {Checkbox} from '@/components/ui/Checkbox';
import {
  DOWNLOAD_DATA_CATEGORIES,
  READY_DOWNLOADS,
  type DownloadDataTab,
} from '@/mock-data/download-your-data';
import {cn} from '@/utils';

const TABS: {id: DownloadDataTab; label: string}[] = [
  {id: 'request', label: 'Request Data'},
  {id: 'download', label: 'Download Data'},
];

export default function DownloadYourDataScreen() {
  const {back} = useRouter();
  const [tab, setTab] = useState<DownloadDataTab>('request');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allIds = useMemo(() => DOWNLOAD_DATA_CATEGORIES.map(item => item.id), []);
  const allSelected = allIds.length > 0 && allIds.every(id => selected.has(id));
  const selectedCount = selected.size;

  const toggle = (id: string) => {
    setSelected(current => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(allIds));
  };

  const handleRequest = () => {
    // ponytail: local-only mock; wire download-request API later
    Alert.alert('Request submitted', `Requested ${selectedCount} categor${selectedCount === 1 ? 'y' : 'ies'}.`);
    setSelected(new Set());
    setTab('download');
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Download your data</Text>
        <Pressable
          onPress={() => Alert.alert('Add', 'Coming soon')}
          accessibilityRole="button"
          accessibilityLabel="Add"
          className="rounded-full p-1 active:bg-grey-50">
          <SVGS.PlusOutline width={24} height={24} color="#111111" />
        </Pressable>
      </View>

      {/* Figma: white pill track + purple pill segment (~356×44) */}
      <View className="mx-4 h-11 flex-row rounded-full bg-white p-1">
        {TABS.map(item => {
          const active = tab === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => setTab(item.id)}
              accessibilityRole="tab"
              accessibilityState={{selected: active}}
              className={cn(
                'h-full flex-1 items-center justify-center rounded-full',
                active ? 'bg-primary' : 'bg-transparent active:opacity-70',
              )}>
              <Text className={cn('font-semibold text-sm', active ? 'text-white' : 'text-black')}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {tab === 'request' ? (
        <>
          <ScrollView className="flex-1" contentContainerStyle={{paddingBottom: 24}} showsVerticalScrollIndicator={false}>
            <View className="mx-4 mt-4 overflow-hidden rounded-2xl bg-white">
              <Pressable onPress={toggleAll} className="flex-row items-center px-4 py-4 active:bg-grey-50">
                <SVGS.CameraSquare width={28} height={28} />
                <Text className="ml-2.5 flex-1 font-bold text-base text-black">Highreels</Text>
                <Text className="mr-2 font-medium text-sm text-black">Select all</Text>
                <Checkbox checked={allSelected} onCheckedChange={toggleAll} accessibilityLabel="Select all" />
              </Pressable>

              {DOWNLOAD_DATA_CATEGORIES.map(item => {
                const checked = selected.has(item.id);
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => toggle(item.id)}
                    className="flex-row items-start px-4 py-3.5 active:bg-grey-50">
                    <View className="mr-3 flex-1">
                      <Text className="font-medium text-base text-black">{item.label}</Text>
                      {item.description ? (
                        <Text className="mt-1 text-sm leading-5 text-grey-300">{item.description}</Text>
                      ) : null}
                    </View>
                    <View className="pt-0.5">
                      <Checkbox checked={checked} onCheckedChange={() => toggle(item.id)} accessibilityLabel={item.label} />
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          <View className="bg-secondary px-4 pb-4 pt-3">
            <Button
              title={selectedCount > 0 ? `Request Data (${selectedCount})` : 'Request Data'}
              disabled={selectedCount === 0}
              onPress={handleRequest}
              className="rounded-2xl"
            />
          </View>
        </>
      ) : (
        <ScrollView className="flex-1" contentContainerStyle={{paddingBottom: 32}} showsVerticalScrollIndicator={false}>
          {READY_DOWNLOADS.length > 0 ? (
            <View className="mx-4 mt-4 overflow-hidden rounded-2xl bg-white">
              {READY_DOWNLOADS.map((item, index) => (
                <View key={item.id} className={cn('flex-row items-center px-4 py-4', index > 0 && 'border-t border-grey-50')}>
                  <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-grey-75">
                    <SVGS.Download width={20} height={20} color="#111111" />
                  </View>
                  <View className="mr-3 flex-1">
                    <Text className="font-semibold text-base text-black">{item.title}</Text>
                    <Text className="mt-1 text-sm text-grey-350">
                      {item.readyAt} · {item.size}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => Alert.alert('Download', `${item.title} — coming soon`)}
                    accessibilityRole="button"
                    accessibilityLabel={`Download ${item.title}`}
                    className="rounded-lg bg-primary px-3 py-2 active:opacity-80">
                    <Text className="font-semibold text-13 text-white">Download</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          ) : (
            <View className="mx-4 mt-16 items-center px-6">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-white">
                <SVGS.Download width={28} height={28} color="#A7A7A7" />
              </View>
              <Text className="mt-4 text-center font-semibold text-base text-black">No downloads yet</Text>
              <Text className="mt-2 text-center text-sm leading-5 text-grey-350">
                Request data from the Request Data tab. Ready files will show up here.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
