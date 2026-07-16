import {Text, Pressable} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Login() {
  const {navigate} = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white p-6">
      <Text className="mb-2 text-2xl font-bold text-zinc-900">Login Screen</Text>
      <Text className="mb-8 text-center text-zinc-500">This is a placeholder for the login screen.</Text>
      <Pressable onPress={() => navigate('/')} className="rounded-xl bg-purple-600 px-6 py-3 active:bg-purple-700">
        <Text className="font-bold text-white">Go to Home</Text>
      </Pressable>
    </SafeAreaView>
  );
}
