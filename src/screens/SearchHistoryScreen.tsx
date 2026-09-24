import {useState} from 'react';
import {Pressable, SectionList, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {SEARCH_HISTORY_SECTIONS, type SearchHistorySection} from '@/mock-data/search-history';

export function SearchHistoryScreen() {
  const {back} = useRouter();
  const [sections, setSections] = useState<SearchHistorySection[]>(SEARCH_HISTORY_SECTIONS);

  const removeSearch = (id: string) => {
    setSections((currentSections) =>
      currentSections
        .map((section) => ({...section, data: section.data.filter((item) => item.id !== id)}))
        .filter((section) => section.data.length > 0)
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">Search History</Text>
        <View className="w-8" />
      </View>

      <SectionList
        className="flex-1"
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32}}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({section}) => <Text className="mb-2 mt-3 font-medium text-base text-grey-500">{section.title}</Text>}
        renderItem={({item, index, section}) => {
          const isLast = index === section.data.length - 1;
          return (
            <View className={`bg-white px-4 ${index === 0 ? 'rounded-t-2xl' : ''} ${isLast ? 'rounded-b-2xl' : ''}`}>
              <View className="flex-row items-center py-3.5">
                <SVGS.History width={24} height={24} color="#111111" />
                <View className="mx-3 flex-1">
                  <Text className="font-medium text-base text-black">{item.query}</Text>
                  <Text className="mt-1 text-base text-grey-500">{item.time}</Text>
                </View>
                <Pressable
                  onPress={() => removeSearch(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${item.query} from search history`}
                  hitSlop={8}
                  className="rounded-full p-1 active:bg-grey-50">
                  <SVGS.Close width={24} height={24} color="#666666" />
                </Pressable>
              </View>
              {isLast ? null : <View className="ml-10 h-px bg-grey-50" />}
            </View>
          );
        }}
        ListEmptyComponent={
          <View className="items-center px-6 py-20">
            <SVGS.History width={32} height={32} color="#A7A7A7" />
            <Text className="mt-4 text-center font-medium text-base text-black">No search history</Text>
            <Text className="mt-1 text-center text-sm text-grey-500">Your recent searches will appear here.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
