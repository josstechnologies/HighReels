import {useEffect, useState} from 'react';
import {Alert, ActivityIndicator, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {useMutation, useQuery} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {Button, RadioOption} from '@/components';
import {API_ROUTES} from '@/constants';
import {authState$} from '@/store';
import {API, apiErrorMessage, ApiEnvelope, readEnvelope} from '@/utils';

type SectionId = 'stories' | 'savedPosts' | 'messages';

type PrivacyOption = {
  value: string;
  label: string;
  description: string;
};

type PrivacySection = {
  id: SectionId;
  title: string;
  description: string;
  options: PrivacyOption[];
};

const SECTIONS: PrivacySection[] = [
  {
    id: 'stories',
    title: 'Stories Privacy',
    description: 'Manage who can view and interact with your stories',
    options: [
      {value: 'followers', label: 'Followers', description: 'Only your followers can view your stories'},
      {value: 'everyone', label: 'Everyone', description: 'Your stories are visible to all users'},
    ],
  },
  {
    id: 'savedPosts',
    title: 'Saved Posts',
    description: 'Control who can see the posts you’ve saved.',
    options: [
      {value: 'only_me', label: 'Only Me', description: 'Your saved posts are private and visible only to you'},
      {
        value: 'followers',
        label: 'Followers',
        description: 'Allow followers to view your saved collections',
      },
    ],
  },
  {
    id: 'messages',
    title: 'Messages',
    description: 'Who can message you?',
    options: [
      {value: 'followers', label: 'Followers', description: 'Only people who follow you can send messages'},
      {value: 'everyone', label: 'Everyone', description: 'Anyone on the platform can message you'},
      {value: 'no_one', label: 'No One', description: 'Selecting this setting will disable incoming messages'},
    ],
  },
];

type PrivacyValues = {
  stories: string;
  savedPosts: string;
  messages: string;
};

const DEFAULT_VALUES: PrivacyValues = {
  stories: 'everyone',
  savedPosts: 'only_me',
  messages: 'followers',
};

function isPrivacyValues(value: unknown): value is PrivacyValues {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return typeof v.stories === 'string' && typeof v.savedPosts === 'string' && typeof v.messages === 'string';
}

function privacyErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.startsWith('UNEXPECTED_')) {
    return 'Something went wrong. Please try again.';
  }
  if (error instanceof Error && error.message === 'NOT_SIGNED_IN') {
    return 'Please sign in again to update privacy settings.';
  }
  return apiErrorMessage(error, 'Something went wrong. Please try again.');
}

export default function AccountPrivacy() {
  const {back} = useRouter();
  const [expanded, setExpanded] = useState<Record<SectionId, boolean>>({
    stories: false,
    savedPosts: false,
    messages: false,
  });
  const [draft, setDraft] = useState<PrivacyValues>(DEFAULT_VALUES);
  const [saved, setSaved] = useState<PrivacyValues>(DEFAULT_VALUES);

  const privacyQuery = useQuery({
    queryKey: ['profile', 'privacy'],
    retry: 1,
    queryFn: async () => {
      if (!authState$.accessToken.get()) throw new Error('NOT_SIGNED_IN');
      const response = await API.get<ApiEnvelope<PrivacyValues>>(API_ROUTES.PROFILE.PRIVACY);
      const data = readEnvelope<PrivacyValues>(response.data);
      if (!isPrivacyValues(data)) throw new Error('UNEXPECTED_PRIVACY');
      return data;
    },
  });

  useEffect(() => {
    if (!privacyQuery.data) return;
    setDraft(privacyQuery.data);
    setSaved(privacyQuery.data);
  }, [privacyQuery.data]);

  useEffect(() => {
    if (!privacyQuery.isError) return;
    Alert.alert('Account Privacy', privacyErrorMessage(privacyQuery.error));
  }, [privacyQuery.isError, privacyQuery.error]);

  const saveMutation = useMutation({
    mutationFn: async (values: PrivacyValues) => {
      if (!authState$.accessToken.get()) throw new Error('NOT_SIGNED_IN');
      const response = await API.patch<ApiEnvelope<PrivacyValues>>(API_ROUTES.PROFILE.PRIVACY, values);
      const data = readEnvelope<PrivacyValues>(response.data);
      if (!isPrivacyValues(data)) throw new Error('UNEXPECTED_PRIVACY');
      return data;
    },
    onSuccess: data => {
      setDraft(data);
      setSaved(data);
    },
    onError: error => {
      Alert.alert('Account Privacy', privacyErrorMessage(error));
    },
  });

  const toggleSection = (id: SectionId) => {
    setExpanded(prev => ({...prev, [id]: !prev[id]}));
  };

  const selectOption = (sectionId: SectionId, value: string) => {
    setDraft(prev => ({...prev, [sectionId]: value}));
  };

  const handleSave = () => {
    if (saveMutation.isPending) return;
    saveMutation.mutate(draft);
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-center bg-secondary px-4 py-3">
        <Pressable onPress={back} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="font-extrabold text-xl text-black">Account Privacy</Text>
        {privacyQuery.isFetching ? (
          <View className="absolute right-4">
            <ActivityIndicator color="#6F41EC" />
          </View>
        ) : null}
      </View>

      <ScrollView
        className="flex-1 bg-secondary"
        contentContainerStyle={{paddingBottom: 24}}
        showsVerticalScrollIndicator={false}>
        <Text className="mx-4 mt-2 font-medium text-[14px] leading-5 text-grey-300">
          Manage who can see your content, interact with you, and access your activity
        </Text>

        <View className="mx-4 mt-5 gap-3">
          {SECTIONS.map(section => {
            const isOpen = expanded[section.id];
            return (
              <View key={section.id} className="overflow-hidden rounded-2xl bg-white">
                <Pressable
                  onPress={() => toggleSection(section.id)}
                  className="flex-row items-center justify-between px-4 py-4 active:bg-grey-50">
                  <Text className="flex-1 font-semibold text-[16px] text-black">{section.title}</Text>
                  {isOpen ? (
                    <SVGS.Up width={20} height={20} color="#111111" />
                  ) : (
                    <SVGS.Down width={20} height={20} color="#111111" />
                  )}
                </Pressable>

                {isOpen ? (
                  <View className="border-t border-grey-50 px-4 pb-3 pt-3">
                    <Text className="mb-2 font-medium text-[13px] leading-5 text-grey-300">{section.description}</Text>
                    {section.options.map(option => (
                      <RadioOption
                        key={option.value}
                        label={option.label}
                        description={option.description}
                        selected={draft[section.id] === option.value}
                        onPress={() => selectOption(section.id, option.value)}
                      />
                    ))}
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View className="border-t border-grey-50 bg-secondary px-4 pb-4 pt-3">
        <Button title="Save Settings" onPress={handleSave} loading={saveMutation.isPending} />
      </View>
    </SafeAreaView>
  );
}
