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

const BIO_MAX = 150;

type ProfileMePayload = {
  id?: string;
  profile?: {
    bio?: string | null;
  };
};

export default function EditBio() {
  const {back} = useRouter();
  const queryClient = useQueryClient();
  const [bio, setBio] = useState('');
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
    setBio(profileQuery.data.profile?.bio ?? '');
    setSeeded(true);
  }, [profileQuery.data, seeded]);

  const currentBio = profileQuery.data?.profile?.bio?.trim() ?? '';

  const saveMutation = useMutation({
    mutationFn: async (nextBio: string) => {
      const response = await API.patch<ApiEnvelope<ProfileMePayload>>(API_ROUTES.PROFILE.ME, {
        bio: nextBio,
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
    const trimmed = bio.trim();
    if (trimmed === currentBio) {
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
          <Text className="font-extrabold text-xl text-black">Edit Bio</Text>
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
            contentContainerStyle={{paddingBottom: 40, flexGrow: 1}}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View className="mx-4 mt-4 flex-1">
              <View className="min-h-[120px] rounded-2xl bg-secondary px-4 py-3">
                <Text className="font-medium text-[12px] text-grey-300">Bio</Text>
                <TextInput
                  value={bio}
                  onChangeText={text => setBio(text.slice(0, BIO_MAX))}
                  editable={!busy}
                  placeholder="Write a short bio"
                  placeholderTextColor="#A7A7A7"
                  multiline
                  textAlignVertical="top"
                  maxLength={BIO_MAX}
                  className="mt-1 min-h-[72px] p-0 font-semibold text-[15px] leading-5 text-black"
                />
              </View>
              <Text className="mt-2 self-end font-medium text-[12px] text-grey-300">
                {bio.length}/{BIO_MAX}
              </Text>

              <View className="mt-auto pt-10">
                <Pressable
                  disabled
                  className="flex-row items-center justify-center gap-2 rounded-2xl bg-secondary py-4 opacity-90">
                  <SVGS.Views width={20} height={20} color="#111111" />
                  <Text className="font-semibold text-[15px] text-black">View as profile</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
