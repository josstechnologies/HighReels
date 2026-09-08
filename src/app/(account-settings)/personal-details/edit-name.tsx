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
import {authActions, getActiveAccount} from '@/store';
import {API, apiErrorMessage, ApiEnvelope, readEnvelope, showToast} from '@/utils';

type ProfileMePayload = {
  id?: string;
  profile?: {
    displayName?: string | null;
    canChangeDisplayName?: boolean;
    displayNameNextChangeAt?: string | null;
  };
};

function formatNextChange(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
}

export default function EditName() {
  const {back} = useRouter();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
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
    setName(profileQuery.data.profile?.displayName?.trim() ?? '');
    setSeeded(true);
  }, [profileQuery.data, seeded]);

  const canChange = profileQuery.data?.profile?.canChangeDisplayName !== false;
  const nextChangeLabel = formatNextChange(profileQuery.data?.profile?.displayNameNextChangeAt);
  const currentName = profileQuery.data?.profile?.displayName?.trim() ?? '';

  const saveMutation = useMutation({
    mutationFn: async (displayName: string) => {
      const response = await API.patch<ApiEnvelope<ProfileMePayload>>(API_ROUTES.PROFILE.ME, {
        displayName,
      });
      const data = readEnvelope<ProfileMePayload>(response.data);
      if (!data?.id) throw new Error('UNEXPECTED_PROFILE');
      return data;
    },
    onSuccess: data => {
      const nextDisplayName = data.profile?.displayName ?? name.trim();
      const active = getActiveAccount();
      if (active) {
        authActions.upsertAccount({...active, displayName: nextDisplayName});
      }
      queryClient.invalidateQueries({queryKey: ['profile', 'me']});
      back();
    },
    onError: error => {
      showToast(apiErrorMessage(error, 'Something went wrong. Please try again.'));
    },
  });

  const handleDone = () => {
    if (saveMutation.isPending || profileQuery.isLoading) return;
    const trimmed = name.trim();
    if (!trimmed) {
      showToast('Display name is required');
      return;
    }
    if (!canChange) {
      showToast(
        nextChangeLabel
          ? `You can change your name once every 7 days. Try again on ${nextChangeLabel}.`
          : 'You can change your name once every 7 days.'
      );
      return;
    }
    if (trimmed === currentName) {
      back();
      return;
    }
    saveMutation.mutate(trimmed);
  };

  const saving = saveMutation.isPending || profileQuery.isLoading;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <View className="flex-row items-center justify-center bg-white px-4 py-3">
          <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
            <SVGS.Back width={24} height={24} color="#111111" />
          </Pressable>
          <Text className="font-extrabold text-xl text-black">Edit Name</Text>
          <Pressable
            onPress={handleDone}
            disabled={saving}
            className="absolute right-4 rounded-full px-2 py-1 active:opacity-70"
            style={{opacity: saving || !canChange ? 0.4 : 1}}>
            {saveMutation.isPending ? (
              <ActivityIndicator color="#6F41EC" />
            ) : (
              <Text className="font-semibold text-[15px] text-primary">Done</Text>
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
                <Text className="font-medium text-[12px] text-grey-300">Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  editable={canChange && !saveMutation.isPending}
                  placeholder="Enter your name"
                  placeholderTextColor="#A7A7A7"
                  autoCapitalize="words"
                  autoCorrect={false}
                  className="mt-1 p-0 font-semibold text-[15px] leading-5 text-black"
                />
              </View>

              <Text className="mt-3 font-medium text-[12px] leading-4 text-grey-300">
                This is the name that will be displayed on your profile. You can change your name once every 7 days.
              </Text>
              {!canChange && nextChangeLabel ? (
                <Text className="mt-2 font-medium text-[12px] leading-4 text-grey-300">
                  Next change available on {nextChangeLabel}.
                </Text>
              ) : null}
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
