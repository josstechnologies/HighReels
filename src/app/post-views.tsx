import {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {Image} from 'expo-image';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';

type Person = {
  id: string;
  name: string;
  image: string;
  action: 'viewed' | 'liked' | 'commented' | 'shared';
  time: 'min10' | 'hour1' | 'hour3' | 'today';
};

const PEOPLE: Person[] = [
  {
    id: 'jamie',
    name: 'Jamie Fox',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    action: 'viewed',
    time: 'min10',
  },
  {
    id: 'kelly',
    name: 'Kelly Clarkson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
    action: 'liked',
    time: 'hour1',
  },
  {
    id: 'usher',
    name: 'Usher Raymond',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    action: 'commented',
    time: 'hour3',
  },
  {
    id: 'gewan',
    name: 'Gewan Stefni',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200&q=80',
    action: 'shared',
    time: 'today',
  },
];

export default function PostViews() {
  const {t} = useTranslation();
  const {back} = useRouter();
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  const detail = (person: Person) => {
    const action = person.action === 'commented' ? t('postViews.commented', {text: t('postViews.comment')}) : t(`postViews.${person.action}`);
    return `${action} • ${t(`postViews.${person.time}`)}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-3">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel={t('postViews.back')} className="w-8 active:opacity-70">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-[18px] text-black">{t('postViews.title')}</Text>
        <View className="w-8" />
      </View>

      {PEOPLE.length === 0 ? (
        <View className="flex-1 items-center justify-center px-10">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-[#F3F3F3]">
            <SVGS.PostViews width={40} height={40} color="#111111" />
          </View>
          <Text className="mt-5 font-bold text-[16px] text-black">{t('postViews.emptyTitle')}</Text>
          <Text className="mt-2 text-center font-medium text-[14px] leading-5 text-[#8a8a8a]">{t('postViews.emptyBody')}</Text>
        </View>
      ) : (
        <ScrollView className="flex-1" contentContainerStyle={{paddingBottom: 24}} showsVerticalScrollIndicator={false}>
          <Text className="px-4 pb-2 pt-1 font-medium text-[14px] text-[#8a8a8a]">{t('postViews.subtitle')}</Text>
          {PEOPLE.map((person) => {
            const isFollowing = !!following[person.id];
            return (
              <View key={person.id} className="flex-row items-center px-4 py-3">
                <Image source={{uri: person.image}} style={{width: 44, height: 44, borderRadius: 22}} contentFit="cover" />
                <View className="ml-3 min-w-0 flex-1">
                  <Text className="font-bold text-[15px] text-black" numberOfLines={1}>
                    {person.name}
                  </Text>
                  <Text className="mt-0.5 font-medium text-[13px] text-[#8a8a8a]" numberOfLines={2}>
                    {detail(person)}
                  </Text>
                </View>
                <Pressable
                  onPress={() => setFollowing((current) => ({...current, [person.id]: !current[person.id]}))}
                  accessibilityRole="button"
                  accessibilityLabel={t(isFollowing ? 'postViews.following' : 'postViews.follow')}
                  className="ml-3 min-w-[88px] items-center rounded-lg bg-primary px-4 py-2 active:opacity-80">
                  <Text className="font-semibold text-[14px] text-white">{t(isFollowing ? 'postViews.following' : 'postViews.follow')}</Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
