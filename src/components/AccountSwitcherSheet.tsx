import {Alert, Image, Modal, Pressable, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {useSelector} from '@legendapp/state/react';
import {SVGS} from '@/assets';
import {
  accountsState$,
  addAccountFlowActions,
  authActions,
  MAX_ACCOUNTS,
  type StoredAccount,
} from '@/store';
import {queryClient} from '@/utils';

type AccountSwitcherSheetProps = {
  visible: boolean;
  onClose: () => void;
};

function AccountAvatar({account, selected}: {account: StoredAccount; selected?: boolean}) {
  const ring = selected ? 'border-2 border-primary p-0.5' : '';
  if (account.avatar) {
    return (
      <View className={`rounded-full ${ring}`}>
        <Image key={account.avatar} source={{uri: account.avatar}} className="h-11 w-11 rounded-full bg-grey-50" />
      </View>
    );
  }
  const initial = (account.displayName || account.username || '?').charAt(0).toUpperCase();
  return (
    <View className={`rounded-full ${ring}`}>
      <View className="h-11 w-11 items-center justify-center rounded-full bg-grey-50">
        <Text className="font-semibold text-base text-black">{initial}</Text>
      </View>
    </View>
  );
}

export function AccountSwitcherSheet({visible, onClose}: AccountSwitcherSheetProps) {
  const {navigate, replace} = useRouter();
  const accounts = useSelector(() => accountsState$.accounts.get());
  const activeAccountId = useSelector(() => accountsState$.activeAccountId.get());

  const handleAddAccount = () => {
    if (accounts.length >= MAX_ACCOUNTS) {
      Alert.alert('Account limit', `You can add up to ${MAX_ACCOUNTS} accounts on this device. Log out of one to add another.`);
      return;
    }
    addAccountFlowActions.start();
    onClose();
    navigate('/login');
  };

  const handleSelectAccount = (accountId: string) => {
    if (accountId === activeAccountId) {
      onClose();
      return;
    }
    const ok = authActions.setActiveAccount(accountId);
    if (!ok) return;
    queryClient.clear();
    onClose();
    replace('/');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        <Pressable className="absolute inset-0 bg-black/40" onPress={onClose} />
        <View className="rounded-t-[28px] bg-white px-5 pb-8 pt-3">
          <View className="mb-4 items-center">
            <View className="h-1 w-10 rounded-full bg-grey-75" />
          </View>

          <Text className="text-center font-extrabold text-[22px] text-black">Add Account</Text>

          <View className="mt-6">
            <Pressable onPress={handleAddAccount} className="flex-row items-center py-3 active:opacity-70">
              <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-grey-50">
                <SVGS.Plus width={18} height={18} color="#111111" />
              </View>
              <Text className="flex-1 font-semibold text-[16px] text-black">Add Account</Text>
            </Pressable>

            {accounts.map(account => {
              const isActive = account.accountId === activeAccountId;
              return (
                <Pressable
                  key={account.accountId}
                  onPress={() => handleSelectAccount(account.accountId)}
                  className="flex-row items-center py-3 active:opacity-70">
                  <View className="mr-3">
                    <AccountAvatar account={account} selected={isActive} />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-[16px] text-black" numberOfLines={1}>
                      {account.displayName || account.username}
                    </Text>
                    <Text className="mt-0.5 font-medium text-[13px] text-grey-300" numberOfLines={1}>
                      @{account.username}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}
