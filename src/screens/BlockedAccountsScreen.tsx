import {useState} from 'react';
import {Alert, FlatList, Image, Pressable, Text, TextInput, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {showToast} from '@/utils';
import {BLOCKED_ACCOUNTS, type BlockedAccount} from '@/mock-data/blocked-accounts';

export function BlockedAccountsScreen() {
  const {back} = useRouter();
  const [query, setQuery] = useState('');
  const [accounts, setAccounts] = useState<BlockedAccount[]>(BLOCKED_ACCOUNTS);

  const unblock = (account: BlockedAccount) => {
    setAccounts((current) => current.filter((item) => item.id !== account.id));
    showToast(`${account.name} unblocked`);
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Blocked Accounts</Text>
        <Pressable
          onPress={() => Alert.alert('Block account', 'Coming soon')}
          accessibilityRole="button"
          accessibilityLabel="Block an account"
          className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Plus width={16} height={16} color="#111111" />
        </Pressable>
      </View>

      <View className="mx-4 h-12 flex-row items-center rounded-2xl bg-white px-4">
        <SVGS.Search width={20} height={20} color="#7F7F7F" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search..."
          placeholderTextColor="#A7A7A7"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Search blocked accounts"
          className="ml-3 flex-1 font-medium text-base text-black"
        />
      </View>

      <FlatList
        className="flex-1"
        data={accounts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32, gap: 16}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({item}) => (
          <View className="flex-row items-center">
            <Image source={{uri: item.avatar}} className="h-14 w-14 rounded-full bg-grey-50" />
            <View className="mx-3 flex-1">
              <Text numberOfLines={1} className="font-semibold text-sm text-black">
                {item.name}
              </Text>
              <Text numberOfLines={1} className="mt-1 text-sm text-grey-350">
                {item.username}
              </Text>
            </View>
            <Button
              title="Unblock"
              onPress={() => unblock(item)}
              accessibilityLabel={`Unblock ${item.name}`}
              className="h-9 w-24 rounded-lg"
            />
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center px-6 py-20">
            <SVGS.Block width={32} height={32} color="#A7A7A7" />
            <Text className="mt-4 text-center font-medium text-base text-black">No blocked accounts</Text>
            <Text className="mt-1 text-center text-sm text-grey-500">People you block will appear here.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
