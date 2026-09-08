import {useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {useQuery} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {EditPictureSheet, PhotosSheet} from '@/components';
import {API_ROUTES} from '@/constants';
import {API, ApiEnvelope, readEnvelope} from '@/utils';
import {setPendingAvatarUri} from '@/utils/avatarPick';

type ProfileMePayload = {
  id?: string;
  email?: string | null;
  phone?: string | null;
  profile?: {
    username?: string | null;
    displayName?: string | null;
    bio?: string | null;
    avatar?: string | null;
    address?: string | null;
    dob?: string | null;
  };
};

const STATIC = {
  socialLink: 'facebook.com/user_profile',
  domain: 'www.user_profile.com',
  region: 'Australia',
  flags: ['🇦🇺', '🇵🇰'] as const,
};

function formatDob(iso: string | null | undefined): string {
  if (!iso) return '-';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
}

function displayOrDash(value: string | null | undefined): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : '-';
}

function Bone({className}: {className: string}) {
  return <View className={`bg-grey-75 ${className}`} />;
}

function PersonalDetailsSkeleton() {
  return (
    <ScrollView className="flex-1" contentContainerStyle={{paddingBottom: 40}} showsVerticalScrollIndicator={false}>
      <Bone className="mx-4 mt-1 h-10 rounded-xl" />
      <View className="mt-6 items-center">
        <Bone className="h-28 w-28 rounded-full" />
        <Bone className="mt-3 h-4 w-24 rounded-full" />
      </View>
      <View className="mx-4">
        <Bone className="mb-3 mt-6 h-4 w-32 rounded-full" />
        <View className="gap-3">
          <Bone className="h-16 rounded-2xl" />
          <Bone className="h-16 rounded-2xl" />
          <Bone className="h-16 rounded-2xl" />
          <Bone className="h-16 rounded-2xl" />
          <Bone className="h-16 rounded-2xl" />
        </View>
        <Bone className="mb-3 mt-6 h-4 w-36 rounded-full" />
        <View className="gap-3">
          <Bone className="h-16 rounded-2xl" />
          <Bone className="h-16 rounded-2xl" />
          <Bone className="h-16 rounded-2xl" />
        </View>
      </View>
    </ScrollView>
  );
}

function PersonalDetailsError({onRetry}: {onRetry: () => void}) {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <Text className="text-center font-semibold text-[16px] text-black">Couldn&apos;t load your details</Text>
      <Text className="mt-2 text-center font-medium text-[14px] text-grey-300">
        Check your connection and try again.
      </Text>
      <Pressable onPress={onRetry} className="mt-5 active:opacity-70">
        <Text className="font-semibold text-[15px] text-primary">Retry</Text>
      </Pressable>
    </View>
  );
}

function FieldCard({label, value}: {label: string; value: string}) {
  return (
    <View className="rounded-2xl bg-secondary px-4 py-3">
      <Text className="font-medium text-[12px] text-grey-300">{label}</Text>
      <Text className="mt-1 font-semibold text-[15px] leading-5 text-black">{value}</Text>
    </View>
  );
}

function SectionTitle({title}: {title: string}) {
  return <Text className="mb-3 mt-6 font-bold text-[16px] text-black">{title}</Text>;
}

export default function PersonalDetails() {
  const {back, push} = useRouter();
  const [pictureSheetOpen, setPictureSheetOpen] = useState(false);
  const [photosSheetOpen, setPhotosSheetOpen] = useState(false);

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

  const data = profileQuery.data;
  const showSkeleton = !data && (profileQuery.isLoading || profileQuery.isFetching);
  const showError = !data && profileQuery.isError;
  const username = data?.profile?.username?.trim() || '';
  const profileLink = username ? `highreels.com/${username}` : '-';
  const usernameDisplay = username ? `@${username}` : '-';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-center bg-white px-4 py-3">
        <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="font-extrabold text-xl text-black">Personal Details</Text>
      </View>

      {showSkeleton ? (
        <PersonalDetailsSkeleton />
      ) : showError ? (
        <PersonalDetailsError onRetry={() => profileQuery.refetch()} />
      ) : (
        <ScrollView
          className="flex-1 bg-white"
          contentContainerStyle={{paddingBottom: 40}}
          showsVerticalScrollIndicator={false}>
          <Text className="mx-4 mt-1 font-medium text-[14px] leading-5 text-grey-300">
            Review your personal details that you have added to this account. You can edit or add more details here.
          </Text>

          <View className="mt-6 items-center">
            {data?.profile?.avatar ? (
              <Image
                key={data.profile.avatar}
                source={{uri: data.profile.avatar}}
                className="h-28 w-28 rounded-full bg-grey-50"
              />
            ) : (
              <View className="h-28 w-28 items-center justify-center rounded-full bg-secondary">
                <Text className="font-extrabold text-3xl text-grey-300">
                  {(data?.profile?.displayName || username || '?').charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Pressable onPress={() => setPictureSheetOpen(true)} className="mt-3 active:opacity-70">
              <Text className="font-semibold text-[15px] text-primary">Edit Picture</Text>
            </Pressable>
          </View>

          <View className="mx-4">
            <SectionTitle title="Profile Details" />
            <View className="gap-3">
              <Pressable
                onPress={() => push('/personal-details/edit-name' as Href)}
                className="active:opacity-80">
                <FieldCard label="Name" value={displayOrDash(data?.profile?.displayName)} />
              </Pressable>
              <Pressable
                onPress={() => push('/personal-details/edit-email' as Href)}
                className="active:opacity-80">
                <FieldCard label="Email" value={displayOrDash(data?.email)} />
              </Pressable>
              <Pressable
                onPress={() => push('/personal-details/edit-phone' as Href)}
                className="active:opacity-80">
                <FieldCard label="Phone" value={displayOrDash(data?.phone)} />
              </Pressable>
              <Pressable
                onPress={() => push('/personal-details/edit-address' as Href)}
                className="active:opacity-80">
                <FieldCard label="Address" value={displayOrDash(data?.profile?.address)} />
              </Pressable>
              <FieldCard label="Date of Birth" value={formatDob(data?.profile?.dob)} />
            </View>

            <SectionTitle title="Account Details" />
            <View className="gap-3">
              <FieldCard label="Username" value={usernameDisplay} />
              <FieldCard label="Profile Link" value={profileLink} />
              <FieldCard label="Account ID" value={displayOrDash(data?.id)} />
              <View className="rounded-2xl bg-secondary px-4 py-3">
                <Text className="font-medium text-[12px] text-grey-300">Display Country Flag</Text>
                <View className="mt-2 flex-row gap-2">
                  {STATIC.flags.map(flag => (
                    <Text key={flag} className="text-[28px] leading-9">
                      {flag}
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            <SectionTitle title="Social and Links" />
            <View className="gap-3">
              <Pressable
                onPress={() => push('/personal-details/edit-bio' as Href)}
                className="active:opacity-80">
                <View className="min-h-[88px] rounded-2xl bg-secondary px-4 py-3">
                  <Text className="font-medium text-[12px] text-grey-300">Bio</Text>
                  <Text className="mt-1 font-semibold text-[15px] leading-5 text-black">
                    {displayOrDash(data?.profile?.bio)}
                  </Text>
                </View>
              </Pressable>
              <FieldCard label="Add Social Link" value={STATIC.socialLink} />
              <FieldCard label="Add Domain" value={STATIC.domain} />
              <Pressable className="flex-row items-center justify-between rounded-2xl bg-secondary px-4 py-4 active:opacity-80">
                <Text className="font-medium text-[15px] text-black">Region</Text>
                <View className="flex-row items-center gap-1">
                  <Text className="font-semibold text-[15px] text-black">{STATIC.region}</Text>
                  <SVGS.ArrowRight width={16} height={16} color="#A7A7A7" />
                </View>
              </Pressable>
              <Text className="font-medium text-[12px] leading-4 text-grey-300">
                Your region is automatically set based on the details you entered upon registration
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      <EditPictureSheet
        visible={pictureSheetOpen}
        hasAvatar={Boolean(data?.profile?.avatar)}
        onClose={() => setPictureSheetOpen(false)}
        onTakePhoto={() => push('/personal-details/edit-avatar-camera' as Href)}
        onChooseGallery={() => setPhotosSheetOpen(true)}
      />
      <PhotosSheet
        visible={photosSheetOpen}
        onClose={() => setPhotosSheetOpen(false)}
        onOpenCamera={() => push('/personal-details/edit-avatar-camera' as Href)}
        onSelectUri={uri => {
          setPendingAvatarUri(uri);
          push('/personal-details/edit-avatar-crop' as Href);
        }}
      />
    </SafeAreaView>
  );
}
