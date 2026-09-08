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
import {API, apiErrorMessage, ApiEnvelope, parsePhoneE164, readEnvelope, showToast} from '@/utils';

type ProfileMePayload = {
  id?: string;
  phone?: string | null;
  canDeletePhone?: boolean;
};

type OtpSendPayload = {sessionId?: string};

export default function EditPhone() {
  const {back, navigate} = useRouter();
  const queryClient = useQueryClient();
  const [phone, setPhone] = useState('');
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
    setPhone(profileQuery.data.phone?.trim() ?? '');
    setSeeded(true);
  }, [profileQuery.data, seeded]);

  const canDelete = profileQuery.data?.canDeletePhone === true;
  const currentPhone = profileQuery.data?.phone?.trim() ?? '';
  const hasPhone = Boolean(currentPhone);

  const sendOtpMutation = useMutation({
    mutationFn: async (nextPhone: string) => {
      const response = await API.post<ApiEnvelope<OtpSendPayload>>(API_ROUTES.PROFILE.PHONE_OTP_SEND, {
        phone: nextPhone,
      });
      const data = readEnvelope<OtpSendPayload>(response.data);
      if (!data?.sessionId) throw new Error('UNEXPECTED_PHONE_OTP_SEND');
      return {sessionId: data.sessionId, phone: nextPhone};
    },
    onSuccess: ({sessionId, phone: nextPhone}) => {
      navigate({
        pathname: '/otp',
        params: {flow: 'phone_change', type: 'phone', value: nextPhone, sessionId},
      });
    },
    onError: error => {
      showToast(apiErrorMessage(error, 'Something went wrong. Please try again.'));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await API.delete<ApiEnvelope<ProfileMePayload>>(API_ROUTES.PROFILE.PHONE);
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
    const e164 = parsePhoneE164(phone);
    if (!e164) {
      showToast('Enter a valid phone number with country code');
      return;
    }
    if (e164 === currentPhone) {
      back();
      return;
    }
    sendOtpMutation.mutate(e164);
  };

  const handleDelete = () => {
    if (!canDelete || busy || !hasPhone) return;
    Alert.alert('Delete Number', 'Are you sure you want to delete the phone number on this account?', [
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
          <Text className="font-extrabold text-xl text-black">Edit Contact Number</Text>
          <Pressable
            onPress={handleDone}
            disabled={busy}
            className="absolute right-4 rounded-full px-2 py-1 active:opacity-70"
            style={{opacity: busy ? 0.4 : 1}}>
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
                <Text className="font-medium text-[12px] text-grey-300">Phone</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  editable={!busy}
                  placeholder="+61..."
                  placeholderTextColor="#A7A7A7"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="phone-pad"
                  className="mt-1 p-0 font-semibold text-[15px] leading-5 text-black"
                />
              </View>

              <Pressable className="mt-2 self-end active:opacity-70">
                <Text className="font-medium text-[12px] text-primary">Who can see my phone number</Text>
              </Pressable>

              <Text className="mt-4 font-medium text-[12px] leading-4 text-grey-300">
                We use the contact number you shared with us for verifying your account and to reach you in case if we
                need anything. We will not send any notifications of any kind to this number and we won't spam you.
              </Text>
              <Text className="mt-3 font-medium text-[12px] leading-4 text-grey-300">
                Receiving a spam SMS from unknown number means someone is trying to improvise our identity. Please use
                our{' '}
                <Text className="font-medium text-[12px] text-primary">Security Checklist</Text> to check for unknown
                activities on your account.
              </Text>

              <View className="mt-auto pt-10">
                <Pressable
                  onPress={handleDelete}
                  disabled={!canDelete || busy || !hasPhone}
                  className="items-center rounded-2xl py-4 active:opacity-80"
                  style={{
                    backgroundColor: '#FCE8E8',
                    opacity: canDelete && hasPhone ? 1 : 0.45,
                  }}>
                  {deleteMutation.isPending ? (
                    <ActivityIndicator color="#EC2727" />
                  ) : (
                    <Text className="font-semibold text-[15px] text-danger-700">Delete this number</Text>
                  )}
                </Pressable>

                <Text className="mt-3 font-medium text-[12px] leading-4 text-grey-300">
                  Deleting your phone number may affect you from resetting your password and/or verifying your account.
                  Make sure you have an active phone number to get verification codes if needed.
                </Text>
                <Text className="mt-2 font-medium text-[12px] leading-4 text-grey-300">
                  Please note, if you don't have a verified email address number you cannot delete phone number
                  associated with your account
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
