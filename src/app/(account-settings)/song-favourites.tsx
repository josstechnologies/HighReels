import {useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {CreateCollectionSheet} from '@/components/CreateCollectionSheet';
import {
  FAVOURITE_SONGS,
  SONG_PLAYLISTS,
  type FavouriteSong,
  type SongPlaylist,
} from '@/mock-data/song-favourites';

function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="h-24 w-24 items-center justify-center rounded-full bg-white">
        <SVGS.AudioEmpty width={54} height={54} color="#111111" />
      </View>
      <Text className="mt-6 text-center font-semibold text-base text-black">No favourites songs yet</Text>
      <Text className="mt-2 text-center text-sm leading-5 text-grey-400">
        Save songs you like and they will appear here for quick access.
      </Text>
    </View>
  );
}

function SongCard({item}: {item: FavouriteSong}) {
  return (
    <View className="mr-3 w-[132px]">
      <Image source={{uri: item.artwork}} className="aspect-square w-full rounded-2xl bg-grey-75" />
      <Text numberOfLines={1} className="mt-2 font-semibold text-13 text-black">
        {item.title}
      </Text>
      <Text numberOfLines={1} className="mt-0.5 text-xs text-grey-400">
        {item.artist}
      </Text>
    </View>
  );
}

function PlaylistCard({item}: {item: SongPlaylist}) {
  return (
    <View className="mb-4 w-[31%]">
      <View className="aspect-square w-full overflow-hidden rounded-2xl bg-grey-75 p-0.5">
        <View className="flex-1 flex-row">
          <Image source={{uri: item.covers[0]}} className="m-0.5 flex-1 rounded-md bg-grey-75" />
          <Image source={{uri: item.covers[1]}} className="m-0.5 flex-1 rounded-md bg-grey-75" />
        </View>
        <View className="flex-1 flex-row">
          <Image source={{uri: item.covers[2]}} className="m-0.5 flex-1 rounded-md bg-grey-75" />
          <View className="m-0.5 flex-1 overflow-hidden rounded-md bg-grey-75">
            <Image source={{uri: item.covers[3]}} className="h-full w-full" />
            {item.moreCount > 0 ? (
              <View className="absolute inset-0 items-center justify-center bg-black/55">
                <Text className="font-semibold text-xs text-white">+{item.moreCount}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      <Text numberOfLines={1} className="mt-2 font-semibold text-13 text-black">
        {item.title}
      </Text>
      <Text numberOfLines={1} className="mt-0.5 text-xs text-grey-400">
        {item.visibility}
      </Text>
    </View>
  );
}

export default function SongFavouritesScreen() {
  const {back} = useRouter();
  const [createOpen, setCreateOpen] = useState(false);

  const isEmpty = FAVOURITE_SONGS.length === 0 && SONG_PLAYLISTS.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center bg-secondary px-4 py-4">
        <Pressable onPress={back} accessibilityRole="button" accessibilityLabel="Go back" className="rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="flex-1 text-center font-bold text-lg text-black">Song Favourites</Text>
        <View className="w-8" />
      </View>

      <View className="bg-secondary px-4 pb-4">
        <Text className="text-sm leading-5 text-grey-400">Your favourite tracks in one place. Listen anytime.</Text>
      </View>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <ScrollView className="flex-1" contentContainerStyle={{paddingBottom: 32}} showsVerticalScrollIndicator={false}>
          <Text className="mb-3 px-4 font-bold text-base text-black">Recently Saved</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 16, paddingRight: 32}}>
            {FAVOURITE_SONGS.map(item => (
              <SongCard key={item.id} item={item} />
            ))}
          </ScrollView>

          <View className="mt-6 flex-row items-center justify-between px-4">
            <Text className="font-bold text-base text-black">Collections</Text>
            <Pressable
              onPress={() => setCreateOpen(true)}
              accessibilityRole="button"
              accessibilityLabel="Create playlist"
              className="flex-row items-center gap-1.5 active:opacity-70">
              <View className="h-6 w-6 items-center justify-center">
                <SVGS.AddNew width={24} height={24} color="#111111" />
              </View>
              <Text
                className="font-medium text-13 leading-6 text-black"
                style={{includeFontPadding: false, textAlignVertical: 'center'}}>
                Create Playlist
              </Text>
            </Pressable>
          </View>

          <View className="mt-3 flex-row flex-wrap justify-between px-4">
            {SONG_PLAYLISTS.map(item => (
              <PlaylistCard key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      )}

      <CreateCollectionSheet
        visible={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create a playlist"
        namePlaceholder="Type a playlist name"
        publicLabel="Set the playlist to public"
        publicHint="Visible to everyone"
        contributorsLabel="Add Contributors"
        contributorsHint="Build a playlist with friends"
      />
    </SafeAreaView>
  );
}
