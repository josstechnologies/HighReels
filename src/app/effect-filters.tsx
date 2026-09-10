import {useState} from 'react';
import {FlatList, Image, Pressable, ScrollView, Text, View, useWindowDimensions} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';

const CARDS = [
  {id: 'richman', name: 'Richman', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80'},
  {id: 'alex', name: 'Alex', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80'},
  {id: 'hanery', name: 'Hanery', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80'},
  {id: 'jack', name: 'Jack', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80'},
  {id: 'leo', name: 'Leo', image: 'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=600&q=80'},
  {id: 'noah', name: 'Noah', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80'},
];

const GAP = 12;

function CardFace({item}: {item: (typeof CARDS)[number]}) {
  return (
    <View className="flex-1 overflow-hidden rounded-3xl">
      <Image source={{uri: item.image}} className="h-full w-full bg-secondary" />
      <View className="absolute left-3 top-3 flex-row items-center rounded-full bg-black/55 px-2.5 py-1">
        <SVGS.Heart width={12} height={12} className="text-white" />
        <Text className="ml-1 text-[11px] text-white">Pro</Text>
      </View>
      <Text className="absolute bottom-4 left-4 font-medium text-[16px] text-white">{item.name}</Text>
    </View>
  );
}

export default function EffectFilters() {
  const {back} = useRouter();
  const {title} = useLocalSearchParams<{title?: string}>();
  const [grid, setGrid] = useState(true);
  const {width, height} = useWindowDimensions();
  const cardWidth = Math.round(width * 0.78);
  const side = (width - cardWidth) / 2;
  const snap = cardWidth + GAP;

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-row items-center px-4 py-2">
          <Pressable onPress={back} className="h-10 w-10 items-center justify-center">
            <SVGS.Back width={22} height={22} className="text-black" />
          </Pressable>
          <Text className="flex-1 text-center font-semibold text-[17px] text-black">{title || 'AI Photoshoot Male'}</Text>
          <View className="flex-row items-center">
            <Pressable onPress={() => setGrid(true)} className="h-9 w-9 items-center justify-center">
              <SVGS.Grid width={20} height={20} className={grid ? 'text-black' : 'text-grey-100'} />
            </Pressable>
            <Pressable onPress={() => setGrid(false)} className="h-9 w-9 items-center justify-center">
              <SVGS.Layout width={20} height={20} className={grid ? 'text-grey-100' : 'text-black'} />
            </Pressable>
          </View>
        </View>

        {grid ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding: 12, paddingBottom: 28}}>
            <View className="flex-row flex-wrap justify-between">
              {CARDS.map(item => (
                <View key={item.id} className="mb-3 aspect-[3/4] w-[48.5%]">
                  <CardFace item={item} />
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <FlatList
            horizontal
            style={{flex: 1}}
            data={CARDS}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            disableIntervalMomentum
            snapToAlignment="start"
            snapToOffsets={CARDS.map((_, index) => index * snap)}
            contentContainerStyle={{paddingHorizontal: side, alignItems: 'center'}}
            renderItem={({item}) => (
              <View style={{width: cardWidth, height: Math.round(height * 0.68), marginRight: GAP}}>
                <CardFace item={item} />
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
}
