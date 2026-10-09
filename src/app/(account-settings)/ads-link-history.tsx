import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {ADS_LINK_HISTORY} from '@/mock-data/ads-link-history';

export default function AdsLinkHistoryScreen() {
  const {back} = useRouter();
  const items = ADS_LINK_HISTORY;
  // empty state
  // const items = [];

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Ads Link History</Text>
        <View className="w-8" />
      </View>

      <Text className="px-4 text-sm leading-5 text-grey-400">
        See the ads you interacted with in the last 30 days. Only ads you tapped or opened will appear here.
      </Text>

      {items.length > 0 ? (
        <>
          <ScrollView className="flex-1" contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24}} showsVerticalScrollIndicator={false}>
            <View className="rounded-2xl bg-white px-4">
              {items.map((item, index) => (
                <View key={item.id}>
                  {index > 0 ? <View className="h-px bg-grey-50" /> : null}
                  <View className="flex-row items-center py-4">
                    <Image source={{uri: item.logo}} className="h-12 w-12 rounded-full bg-grey-50" />
                    <View className="mx-2.5 flex-1">
                      <Text numberOfLines={2} className="font-semibold text-sm leading-5 text-black">
                        {item.title}
                      </Text>
                      <Text className="mt-2 text-xs text-grey-350">Viewed on {item.viewedOn}</Text>
                    </View>
                    <View>
                      <SVGS.CrossArrow width={12} height={12} color="#111111" />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <Text className="px-6 pb-4 pt-2 text-center text-sm leading-6 text-black">
            Your ad interaction history is visible only to you. Items older than 30 days are automatically removed.
          </Text>
        </>
      ) : (
        <View className="flex-1 items-center justify-center px-8 pb-24">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-white">
            <SVGS.Link width={54} height={54} color="#111111" />
          </View>
          <Text className="mt-6 text-center font-semibold text-base text-black">No link activity yet</Text>
          <Text className="mt-2 text-center text-sm leading-5 text-grey-400">
            Links from your ads will appear here once users start interacting with them.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
