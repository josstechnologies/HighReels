import {useState, type ReactNode} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {Textarea} from '@/components/ui/textarea';
import {cn} from '@/utils';

const TAGS = [
  {id: 'smooth', label: 'Smooth experience', emoji: '✨'},
  {id: 'interface', label: 'Great Interface', emoji: '📦'},
  {id: 'overall', label: 'Good overall', emoji: '👍'},
  {id: 'issues', label: 'Minor issues', emoji: '🔧'},
  {id: 'support', label: 'Helpful support', emoji: '💬'},
] as const;

function RatingStar({filled, onPress}: {filled: boolean; onPress: () => void}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" hitSlop={6} className="active:opacity-80">
      <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12.222 2.079a.53.53 0 0 0-.195.215l-2.31 4.679a2.122 2.122 0 0 1-1.596 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.122 2.122 0 0 1 .61 1.879l-.88 5.139a.53.53 0 0 0 .77.56l4.617-2.428a2.122 2.122 0 0 1 1.973 0l4.618 2.428a.53.53 0 0 0 .77-.56l-.881-5.14a2.124 2.124 0 0 1 .61-1.878l3.737-3.638a.53.53 0 0 0-.294-.904l-5.166-.756a2.123 2.123 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.755-.214Z"
          fill={filled ? '#6F41EC' : 'none'}
          stroke={filled ? '#6F41EC' : '#C4C4C4'}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
}

function FeedbackCard({title, children}: {title: string; children: ReactNode}) {
  return (
    <View className="mt-3 rounded-2xl bg-white px-4 py-4">
      <Text className="font-bold text-15 leading-5 text-black">{title}</Text>
      <View className="mt-3">{children}</View>
    </View>
  );
}

export default function ShareYourFeedbackScreen() {
  const {back} = useRouter();
  const [rating, setRating] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>(['smooth']);
  const [improveText, setImproveText] = useState('');
  const [ideaText, setIdeaText] = useState('');

  const toggleTag = (id: string) => {
    setSelectedTags(prev => (prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]));
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-3">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Share Your Feedback</Text>
        <View className="w-8" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 4, paddingBottom: 16}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View className="rounded-2xl bg-primary px-4 py-4">
          <Text className="mt-1 font-bold text-lg leading-6 text-white">We&apos;d love your thoughts!</Text>
          <Text className="mt-2 text-sm leading-5 text-white/90">
            Your feedback shapes the future of our app. Help us build the perfect cooking companion and tool for you.
          </Text>
        </View>

        <FeedbackCard title="How would you rate the app?">
          <View className="flex-row items-center gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <RatingStar key={star} filled={star <= rating} onPress={() => setRating(star)} />
            ))}
          </View>
        </FeedbackCard>

        <FeedbackCard title="What did you like the most?">
          <View className="flex-row flex-wrap gap-2">
            {TAGS.map(tag => {
              const active = selectedTags.includes(tag.id);
              return (
                <Pressable
                  key={tag.id}
                  onPress={() => toggleTag(tag.id)}
                  accessibilityRole="button"
                  accessibilityState={{selected: active}}
                  className={cn(
                    'flex-row items-center rounded-xl px-3 py-2.5 active:opacity-80',
                    active ? 'bg-primary' : 'bg-secondary',
                  )}>
                  <Text className={cn('text-13', active ? 'text-white' : 'text-black')}>
                    {active ? '✓ ' : `${tag.emoji} `}
                    {tag.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </FeedbackCard>

        <FeedbackCard title="Anything we can do better?">
          <Textarea
            value={improveText}
            onChangeText={setImproveText}
            placeholder="Share your thoughts or suggestions..."
            placeholderTextColor="#A7A7A7"
            className="min-h-[110px] rounded-2xl bg-secondary px-3 py-3 text-sm text-black"
          />
        </FeedbackCard>

        <FeedbackCard title="Would you like to contribute any idea that might be helpful to make a better user experience?">
          <Textarea
            value={ideaText}
            onChangeText={setIdeaText}
            placeholder="Share your thoughts or suggestions..."
            placeholderTextColor="#A7A7A7"
            className="min-h-[110px] rounded-2xl bg-secondary px-3 py-3 text-sm text-black"
          />
        </FeedbackCard>
      </ScrollView>

      <View className="bg-secondary px-4 pb-4 pt-2">
        <Button title="Send Feedback" onPress={() => {}} className="rounded-2xl" />
        <Button title="Skip for now" variant="text" onPress={() => {}} className="mt-1" />
      </View>
    </SafeAreaView>
  );
}
