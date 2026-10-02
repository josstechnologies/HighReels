import {useState} from 'react';
import {FlatList, Image, Pressable, Text, TextInput, View} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IMAGES} from '@/assets';
import {STATIC_COMMENTS} from '@/mock-data/home-feed';

type Row = {id: string; name: string; text: string; likes: number; liked: boolean};

export default function CommentsSheet() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {postId} = useLocalSearchParams<{postId?: string}>();
  const [rows, setRows] = useState<Row[]>(() =>
    STATIC_COMMENTS.filter((comment) => comment.postId === postId).map((comment) => ({...comment, liked: false}))
  );
  const [draft, setDraft] = useState('');

  return (
    <View className="flex-1 bg-white" style={{paddingTop: insets.top}}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text className="text-lg font-bold text-black">Comments</Text>
        <Pressable onPress={() => router.back()}>
          <Text className="font-semibold text-[#04BFCE]">Close</Text>
        </Pressable>
      </View>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}
        ListEmptyComponent={<Text className="mt-10 text-center text-gray-400">No comments yet.</Text>}
        renderItem={({item}) => (
          <View className="mb-5 flex-row">
            <Image source={IMAGES.user} style={{width: 40, height: 40, borderRadius: 20, marginRight: 12}} />
            <View className="flex-1">
              <Text className="text-base font-bold text-black">{item.name}</Text>
              <Text className="mt-1 text-base text-black">{item.text}</Text>
            </View>
            <Pressable
              onPress={() =>
                setRows((current) =>
                  current.map((row) =>
                    row.id === item.id ? {...row, liked: !row.liked, likes: row.likes + (row.liked ? -1 : 1)} : row
                  )
                )
              }>
              <Text className="text-sm text-gray-500">{item.liked ? '♥' : '♡'} {item.likes}</Text>
            </Pressable>
          </View>
        )}
      />
      <View className="flex-row items-center gap-2 border-t border-gray-100 px-4 py-3" style={{paddingBottom: insets.bottom + 12}}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Add a comment"
          placeholderTextColor="#9ca3af"
          className="flex-1 rounded-full bg-gray-100 px-4 py-3 text-black"
        />
        <Pressable
          onPress={() => {
            const text = draft.trim();
            if (!text) return;
            setRows((current) => [{id: `local-${Date.now()}`, name: 'You', text, likes: 0, liked: false}, ...current]);
            setDraft('');
          }}>
          <Text className="font-bold text-[#04BFCE]">Post</Text>
        </Pressable>
      </View>
    </View>
  );
}
