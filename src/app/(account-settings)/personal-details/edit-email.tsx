import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
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
  email?: string | null;
  canDeleteEmail?: boolean;
  profile?: {
    canChangeEmail?: boolean;
    emailNextChangeAt?: string | null;
  };
};

type OtpSendPayload = {sessionId?: string};

function formatNextChange(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
}

export default function EditEmail() {
  const {back, navigate} = useRouter();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
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
    setEmail(profileQuery.data.email?.trim() ?? '');
    setSeeded(true);
  }, [profileQuery.data, seeded]);

  const canChange = profileQuery.data?.profile?.canChangeEmail !== false;
  const canDelete = profileQuery.data?.canDeleteEmail === true;
  const nextChangeLabel = formatNextChange(profileQuery.data?.profile?.emailNextChangeAt);
  const currentEmail = profileQuery.data?.email?.trim().toLowerCase() ?? '';
  const hasEmail = Boolean(currentEmail);

  const sendOtpMutation = useMutation({
    mutationFn: async (nextEmail: string) => {
      const response = await API.post<ApiEnvelope<OtpSendPayload>>(API_ROUTES.PROFILE.EMAIL_OTP_SEND, {
        email: nextEmail,
      });
      const data = readEnvelope<OtpSendPayload>(response.data);
      if (!data?.sessionId) throw new Error('UNEXPECTED_EMAIL_OTP_SEND');
      return {sessionId: data.sessionId, email: nextEmail};
    },
    onSuccess: ({sessionId, email: nextEmail}) => {
      navigate({
        pathname: '/otp',
        params: {flow: 'email_change', type: 'email', value: nextEmail, sessionId},
      });
    },
    onError: error => {
      showToast(apiErrorMessage(error, 'Something went wrong. Please try again.'));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await API.delete<ApiEnvelope<ProfileMePayload>>(API_ROUTES.PROFILE.EMAIL);
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

  const busy = sendOtpMutation.isPending || deleteMutation.isPending || profileQuery.isLoading;

  const handleDone = () => {
    if (busy) return;
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      showToast('Enter a valid email address');
      return;
    }
    if (!canChange) {
      showToast(
        nextChangeLabel
          ? `You can change email once every 7 days. Try again on ${nextChangeLabel}.`
          : 'You can change email once every 7 days.'
      );
      return;
    }
    if (trimmed === currentEmail) {
      back();
      return;
    }
    sendOtpMutation.mutate(trimmed);
  };

  const handleDelete = () => {
    if (!canDelete || busy || !hasEmail) return;
    Alert.alert('Delete Email', 'Are you sure you want to delete the email on this account?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate()},
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <View className="flex-row items-center justify-center bg-white px-4 py-3">
          <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
            <SVGS.Back width={24} height={24} color="#111111" />
          </Pressable>
          <Text className="font-extrabold text-xl text-black">Edit Email</Text>
          <Pressable
            onPress={handleDone}
            disabled={busy}
            className="absolute right-4 rounded-full px-2 py-1 active:opacity-70"
            style={{opacity: busy || !canChange ? 0.4 : 1}}>
            {sendOtpMutation.isPending ? (
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
              <View
                className={`rounded-2xl bg-secondary px-4 py-3 ${
                  canDelete ? '' : 'border border-danger-700'
                }`}>
                <Text className="font-medium text-[12px] text-grey-300">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  editable={canChange && !busy}
                  placeholder="Enter your email"
                  placeholderTextColor="#A7A7A7"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  className="mt-1 p-0 font-semibold text-[15px] leading-5 text-black"
                />
              </View>

              <Pressable className="mt-2 self-end active:opacity-70">
                <Text className="font-medium text-[12px] text-primary">Who can see my email</Text>
              </Pressable>

              <Text className="mt-4 font-medium text-[12px] leading-4 text-grey-300">
                This is the email you signed up with. To change it, you need to enter a valid email address and verify
                it before you can use it.
              </Text>
              <Text className="mt-2 font-medium text-[12px] leading-4 text-grey-300">
                You can change email once every 7 days
              </Text>
              {!canChange && nextChangeLabel ? (
                <Text className="mt-2 font-medium text-[12px] leading-4 text-grey-300">
                  Next change available on {nextChangeLabel}.
                </Text>
              ) : null}

              <View className="mt-auto pt-10">
                <Pressable
                  onPress={handleDelete}
                  disabled={!canDelete || busy || !hasEmail}
                  className="items-center rounded-2xl bg-secondary py-4 active:opacity-80"
                  style={{opacity: canDelete && hasEmail ? 1 : 0.45}}>
                  {deleteMutation.isPending ? (
                    <ActivityIndicator color="#EC2727" />
                  ) : (
                    <Text className="font-semibold text-[15px] text-danger-700">Delete Email</Text>
                  )}
                </Pressable>

                <Text className="mt-3 font-medium text-[12px] leading-4 text-grey-300">
                  Deleting your email may affect you from resetting your password and/or verifying your account. Make
                  sure you have an active phone number to get verification codes if needed.
                </Text>
                <Text className="mt-2 font-medium text-[12px] leading-4 text-grey-300">
                  Please note, if you don't have an active phone number you cannot delete email address associated with
                  your account
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
