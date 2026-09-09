import {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Pressable, SectionList, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {SvgProps} from 'react-native-svg';
import type {ReactElement} from 'react';
import {SVGS} from '@/assets';
import {API_ROUTES} from '@/constants';
import {API, apiErrorMessage, ApiEnvelope, readEnvelope, showToast} from '@/utils';

type HistoryType = 'account_created' | 'email_verified' | 'phone_verified' | 'password_updated' | 'account_logged_in';

type HistoryItem = {
  id: string;
  type: HistoryType;
  title: string;
  body: string;
  createdAt: string;
};

type HistoryPage = {
  items: HistoryItem[];
  nextCursor: string | null;
};

const ICONS: Record<HistoryType, (props: SvgProps) => ReactElement> = {
  account_created: SVGS.Account,
  email_verified: SVGS.Contact,
  phone_verified: SVGS.Contact,
  password_updated: SVGS.Key,
  account_logged_in: SVGS.Account,
};

function dayLabel(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {day: 'numeric', month: 'long'});
}

function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'});
}

function groupItems(items: HistoryItem[]) {
  const sections: {title: string; data: HistoryItem[]}[] = [];
  for (const item of items) {
    const title = dayLabel(item.createdAt);
    const last = sections.at(-1);
    if (last?.title === title) last.data.push(item);
    else sections.push({title, data: [item]});
  }
  return sections;
}

export default function AccountHistory() {
  const {back} = useRouter();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const load = useCallback(async (cursor?: string) => {
    const response = await API.get<ApiEnvelope<HistoryPage>>(API_ROUTES.PROFILE.ACCOUNT_HISTORY, {
      params: cursor ? {cursor, limit: 20} : {limit: 20},
    });
    const page = readEnvelope<HistoryPage>(response.data);
    if (!page?.items) throw new Error('UNEXPECTED_HISTORY');
    return page;
  }, []);

  useEffect(() => {
    let cancelled = false;
    load()
      .then(page => {
        if (cancelled) return;
        setItems(page.items);
        setNextCursor(page.nextCursor);
      })
      .catch(error => {
        if (!cancelled) showToast(apiErrorMessage(error, 'Could not load account history'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [load]);

  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore || loading) return;
    setLoadingMore(true);
    try {
      const page = await load(nextCursor);
      setItems(current => {
        const seen = new Set(current.map(item => item.id));
        return [...current, ...page.items.filter(item => !seen.has(item.id))];
      });
      setNextCursor(page.nextCursor);
    } catch (error) {
      showToast(apiErrorMessage(error, 'Could not load account history'));
    } finally {
      setLoadingMore(false);
    }
  }, [load, loading, loadingMore, nextCursor]);

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="font-extrabold text-xl text-black">Account History</Text>
      </View>

      <SectionList
        className="flex-1"
        sections={groupItems(items)}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 32, paddingHorizontal: 16}}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListHeaderComponent={
          <View className="mb-4 mt-2 flex-row rounded-2xl bg-white px-4 py-3">
            <SVGS.Info width={18} height={18} color="#111111" />
            <Text className="ml-3 flex-1 text-sm text-black">
              Account history from the day you signed up will be shown here. If you don't recognize any activity, review your Account
              information or Manage devices.
            </Text>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator className="mt-8" color="#111111" />
          ) : null
        }
        ListFooterComponent={loadingMore ? <ActivityIndicator className="mt-4" color="#111111" /> : null}
        renderSectionHeader={({section}) => (
          <Text className="mb-2 mt-3 font-medium text-sm text-grey-500">{section.title}</Text>
        )}
        renderItem={({item, index, section}) => {
          const Icon = ICONS[item.type] ?? SVGS.Account;
          const last = index === section.data.length - 1;
          return (
            <View className={`bg-white px-4 ${index === 0 ? 'rounded-t-2xl pt-3' : ''} ${last ? 'rounded-b-2xl pb-3' : ''}`}>
              <View className="flex-row py-2.5">
                <Icon width={20} height={20} color="#111111" />
                <View className="ml-3 flex-1">
                  <View className="flex-row items-start justify-between">
                    <Text className="mr-3 flex-1 font-semibold text-black">{item.title}</Text>
                    <Text className="text-xs text-grey-500">{timeLabel(item.createdAt)}</Text>
                  </View>
                  <Text className="mt-1 text-sm text-grey-500">{item.body}</Text>
                </View>
              </View>
              {last ? null : <View className="ml-8 h-px bg-grey-50" />}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
