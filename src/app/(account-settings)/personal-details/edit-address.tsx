import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useRouter} from 'expo-router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {API_ROUTES} from '@/constants';
import {API, apiErrorMessage, ApiEnvelope, readEnvelope, showToast} from '@/utils';

type ProfileMePayload = {
  id?: string;
  profile?: {
    address?: string | null;
  };
};

export default function EditAddress() {
  const {back} = useRouter();
  const queryClient = useQueryClient();
  const [address, setAddress] = useState('');
  const [seeded, setSeeded] = useState(false);

  const profileQuery = useQuery({
    queryKey: ['profile', 'me'],
    retry: 1,
    queryFn: async () => {
      const response = await API.get<ApiEnvelope<ProfileMePayload>>(API_ROUTES.PROFILE.ME);
      const data = readEnvelope<ProfileMePayload>(response.data);
      if (!data?.id) throw new Error('UNEXPECTED_PROFILE');
      return data;
    },
  });

  useEffect(() => {
    if (!profileQuery.data || seeded) return;
    setAddress(profileQuery.data.profile?.address?.trim() ?? '');
    setSeeded(true);
  }, [profileQuery.data, seeded]);

  const currentAddress = profileQuery.data?.profile?.address?.trim() ?? '';

  const saveMutation = useMutation({
    mutationFn: async (nextAddress: string) => {
      const response = await API.patch<ApiEnvelope<ProfileMePayload>>(API_ROUTES.PROFILE.ME, {
        address: nextAddress,
      });
      const data = readEnvelope<ProfileMePayload>(response.data);
      if (!data?.id) throw new Error('UNEXPECTED_PROFILE');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['profile', 'me']});
      back();
    },
    onError: error => {
      showToast(apiErrorMessage(error, 'Something went wrong. Please try again.'));
    },
  });

  const handleDone = () => {
    if (saveMutation.isPending || profileQuery.isLoading) return;
    const trimmed = address.trim();
    if (trimmed === currentAddress) {
      back();
      return;
    }
    saveMutation.mutate(trimmed);
  };

  const busy = saveMutation.isPending || profileQuery.isLoading;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <View className="flex-row items-center justify-center bg-white px-4 py-3">
          <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
            <SVGS.Back width={24} height={24} color="#111111" />
          </Pressable>
          <Text className="font-extrabold text-xl text-black">Edit Home Address</Text>
          <Pressable
            onPress={handleDone}
            disabled={busy}
            className="absolute right-4 rounded-full px-2 py-1 active:opacity-70"
            style={{opacity: busy ? 0.4 : 1}}>
            {saveMutation.isPending ? (
              <ActivityIndicator color="#6F41EC" />
            ) : (
              <Text className="font-semibold text-[15px] text-black">Done</Text>
            )}
          </Pressable>
        </View>

        {profileQuery.isLoading && !seeded ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator color="#6F41EC" />
          </View>
        ) : (
          <ScrollView
            className="flex-1"
            contentContainerStyle={{paddingBottom: 40}}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View className="mx-4 mt-4">
              <View className="rounded-2xl bg-secondary px-4 py-3">
                <Text className="font-medium text-[12px] text-grey-300">Address</Text>
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  editable={!busy}
                  placeholder="Enter your home address"
                  placeholderTextColor="#A7A7A7"
                  autoCapitalize="words"
                  multiline
                  className="mt-1 min-h-[24px] p-0 font-semibold text-[15px] leading-5 text-black"
                />
              </View>

              <Text className="mt-4 font-medium text-[12px] leading-4 text-grey-300">
                The home address you share with us is used for gifts you earn from others users. If you don't enter the
                correct home address you may not be able to receive gifts.
              </Text>
              <Text className="mt-3 font-medium text-[12px] leading-4 text-grey-300">
                You only share your address with you give us with selective users who send actual gifts which need to
                be sent by registered mail and with our suppliers if applicable
              </Text>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
