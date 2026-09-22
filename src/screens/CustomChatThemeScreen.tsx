import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from '@legendapp/state/react';
import { SVGS } from '@/assets';
import { chatThemeActions, chatThemeState$, type ChatThemeId } from '@/store';

type ThemeItem = {
  id: ChatThemeId | 'ai';
  bg: string;
  topBubble: string;
  bottomBubble: string;
  gradient?: string[];
  isAI?: boolean;
  imagePlaceholder?: string;
};

// Approximations for bottom row images – solid colors until real images supplied
const THEMES: ThemeItem[] = [
  { id: 'default-dark', bg: '#0A0A0A', topBubble: '#2E2E2E', bottomBubble: '#1B5E2A' },
  { id: 'ai', bg: '#1E2A4A', topBubble: '', bottomBubble: '', isAI: true, gradient: ['#1A2E5A', '#2D1B4E'] },
  { id: 'dark-crack', bg: '#0F0F0F', topBubble: '#2E2E2E', bottomBubble: '#1B5E2A' },
  { id: 'dark-blue', bg: '#0A0A0A', topBubble: '#2E2E2E', bottomBubble: '#2B6BFF' },
  // bottom row – placeholder colors matching screenshot hues
  { id: 'swirl', bg: '#D6D0F5', topBubble: '#1A1A1A', bottomBubble: '#4F30FF' },
  { id: 'petals', bg: '#F5CFCF', topBubble: '#1A1A1A', bottomBubble: '#A020F0' },
  { id: 'gold', bg: '#8B5A2B', topBubble: '#1A1A1A', bottomBubble: '#C1462B' },
  { id: 'sunset', bg: '#FDEBD7', topBubble: '#1A1A1A', bottomBubble: '#0E8B8B' },
];

function ThemePreview({ item, selected, onPress }: { item: ThemeItem; selected: boolean; onPress: () => void }) {
  const borderColor = selected ? '#6F41EC' : 'transparent';

  if (item.isAI) {
    return (
      <Pressable
        onPress={onPress}
        style={{
          width: '23%',
          aspectRatio: 0.72,
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: selected ? 3 : 0,
          borderColor,
        }}>
        <LinearGradient
          colors={item.gradient as unknown as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, padding: 8, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <SVGS.Ai width={28} height={28} color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700', textAlign: 'center', lineHeight: 14 }}>
            Create{'\n'}with AI
          </Text>
        </LinearGradient>
      </Pressable>
    );
  }

  // Use placeholder solid bg; when images arrive replace View with ImageBackground
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '23%',
        aspectRatio: 0.72,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: selected ? 3 : 0,
        borderColor,
        backgroundColor: item.bg,
      }}>
      <View style={{ flex: 1, padding: 8, flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* top bubble */}
        <View
          style={{
            alignSelf: 'flex-start',
            width: '72%',
            height: 18,
            borderRadius: 6,
            backgroundColor: item.topBubble,
          }}
        />
        {/* bottom bubble */}
        <View
          style={{
            alignSelf: item.id === 'default-dark' ? 'center' : item.id === 'dark-blue' ? 'flex-end' : 'center',
            width: '78%',
            height: 20,
            borderRadius: 7,
            backgroundColor: item.bottomBubble,
            marginBottom: item.id === 'dark-crack' || item.id === 'dark-blue' ? 18 : 22,
          }}
        />
        {/* checkmark for selected */}
        {selected ? (
          <View
            style={{
              alignSelf: 'center',
              width: 28,
              height: 28,
              borderRadius: 14,
              borderWidth: 1.5,
              borderColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 6,
            }}>
            <SVGS.Tick width={14} height={14} color="#FFFFFF" />
          </View>
        ) : (
          <View style={{ height: 28, marginBottom: 6 }} />
        )}
      </View>
    </Pressable>
  );
}

export function CustomChatThemeScreen() {
  const { back } = useRouter();
  const selectedId = useSelector(() => chatThemeState$.selectedThemeId.get());

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      {/* Header – flex only, no absolute */}
      <View className="flex-row items-center justify-between bg-secondary px-4 py-3">
        <Pressable onPress={back} className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-extrabold text-xl text-black">Custom chat theme</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        className="flex-1 bg-secondary"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}>
        <Text className="mx-4 mt-3 text-[15px] font-medium" style={{ color: '#8A8A8A' }}>
          Themes
        </Text>

        <View className="mx-4 mt-2 rounded-2xl bg-white p-3">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'flex-start' }}>
            {THEMES.map(item => {
              const isSelected = selectedId === item.id;
              const handlePress = () => {
                if (item.isAI) return;
                chatThemeActions.select(item.id as ChatThemeId);
              };
              return <ThemePreview key={item.id} item={item} selected={isSelected} onPress={handlePress} />;
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
