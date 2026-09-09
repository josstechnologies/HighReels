import {Pressable, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from '@legendapp/state/react';
import {SVGS} from '@/assets';
import {authState$} from '@/store';

export default function Profile() {
  const {navigate} = useRouter();
  const hasSession = useSelector(() => !!(authState$.accessToken.get() && authState$.refreshToken.get()));

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="absolute left-0 right-0 top-0 z-10" edges={['top']}>
        <View className="px-4 py-3">
          {hasSession ? (
            <Pressable
              onPress={() => navigate('/account-settings')}
              className="h-10 w-10 items-center justify-center rounded-full active:bg-grey-50">
              <SVGS.Menu width={22} height={22} color="#111111" />
            </Pressable>
          ) : null}
        </View>
      </SafeAreaView>
      <View className="flex-1 items-center justify-center">
        <Text className="font-semibold text-[16px] text-black">Profile Screen</Text>
      </View>
    </View>
  );
}
