import {useState} from 'react';
import {Alert, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {OTHER_DEVICES, THIS_DEVICE, type ManagedDevice} from '@/mock-data/manage-devices';

export default function ManageDevicesScreen() {
  const {back} = useRouter();
  const [otherDevices, setOtherDevices] = useState(OTHER_DEVICES);

  const logoutDevice = (device: ManagedDevice) => {
    Alert.alert('Logout device', `Sign out of ${device.name}?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => setOtherDevices(current => current.filter(item => item.id !== device.id)),
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Manage Devices</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 32}} showsVerticalScrollIndicator={false}>
        <Text className="text-sm leading-5 text-grey-350">
          Review the devices that are currently logged in to your account. You can sign out of any device you don&apos;t recognize.
        </Text>

        <Text className="mb-3 mt-5 font-semibold text-sm text-grey-400">This device</Text>
        <View className="rounded-2xl bg-white px-4 py-4">
          <Text className="font-semibold text-base text-black">{THIS_DEVICE.name}</Text>
          <Text className="mt-1 text-sm text-grey-350">
            {THIS_DEVICE.location} • {THIS_DEVICE.activity}
          </Text>
          <Text className="mt-2 text-sm text-grey-200">{THIS_DEVICE.note}</Text>
        </View>

        <Text className="mb-3 mt-5 font-semibold text-sm text-grey-400">Other Devices</Text>
        <View className="overflow-hidden rounded-2xl bg-white">
          {otherDevices.length > 0 ? (
            otherDevices.map((device, index) => (
              <View key={device.id}>
                {index > 0 ? <View className="mx-4 h-px bg-grey-50" /> : null}
                <View className="flex-row items-center px-4 py-4">
                  <View className="mr-3 flex-1">
                    <Text className="font-semibold text-base text-black">{device.name}</Text>
                    <Text className="mt-1 text-sm text-grey-350">
                      {device.location} • {device.activity}
                    </Text>
                  </View>
                  <Button
                    title="Logout"
                    variant="dangerSoft"
                    onPress={() => logoutDevice(device)}
                    accessibilityLabel={`Logout ${device.name}`}
                    className="h-8 w-auto min-w-[72px] rounded-lg px-3"
                  />
                </View>
              </View>
            ))
          ) : (
            <View className="items-center px-4 py-8">
              <Text className="text-center text-sm text-grey-350">No other devices are signed in.</Text>
            </View>
          )}
        </View>

        <Text className="mt-6 text-center text-sm leading-5 text-grey-350">
          Review sign-ins from devices around Australia. Logging out suspicious devices can help keep your account safe.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
