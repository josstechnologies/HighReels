import {useState} from 'react';
import {FlatList, Platform, Pressable, Text, View} from 'react-native';
import {useRouter} from 'expo-router';
import {Image} from 'expo-image';
import {LinearGradient} from 'expo-linear-gradient';
import {IMAGES, SVGS} from '@/assets';

const gifts = [
  {id: '1', icon: '🕶️', price: 115},
  {id: '2', icon: '🎉', price: 623},
  {id: '3', icon: '🎲', price: 234},
  {id: '4', icon: '🧸', price: 987},
  {id: '5', icon: '🍬', price: 765},
  {id: '6', icon: '💖', price: 345},
  {id: '7', icon: '🗣️', price: 543},
  {id: '8', icon: '🐙', price: 892},
];

const tabs = ['Exclusive', 'Interactive', 'Premium'];
const STATIC_BALANCE = 2480;

export default function GiftSheetScreen() {
  const router = useRouter();
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(gifts[0].id);
  const [selectedTab, setSelectedTab] = useState('Exclusive');

  return (
    <View className="flex-1 bg-white">
      {Platform.OS === 'android' && (
        <View className="items-center pt-2">
          <View className="h-1.5 w-12 rounded-full bg-gray-300" />
        </View>
      )}
      <View className="flex-1 px-3">
        <FlatList
          data={selectedTab === 'Exclusive' ? gifts : []}
          numColumns={5}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View>
              <View className="my-4 w-full flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-black">Gifts</Text>
                <Pressable onPress={() => router.back()} className="rounded-full border border-black">
                  <SVGS.Add height={24} width={24} bgColor="#fff" className="rotate-45" />
                </Pressable>
              </View>
              <View className="mb-5 w-full flex-row items-center justify-between">
                <View className="h-9 flex-row rounded-full bg-gray-100 p-0.5">
                  {tabs.map((tab) => {
                    const isActive = selectedTab === tab;
                    return (
                      <Pressable
                        key={tab}
                        onPress={() => setSelectedTab(tab)}
                        className={`h-full items-center justify-center rounded-full px-2 ${isActive ? 'bg-[#0088ff]' : ''}`}>
                        <Text className={`text-sm ${isActive ? 'font-NunitoSans_700Bold text-white' : 'font-NunitoSans_500Medium text-gray-500'}`}>{tab}</Text>
                      </Pressable>
                    );
                  })}
                </View>
                <View className="h-9 flex-row items-center rounded-xl border border-gray-100 bg-white px-1.5">
                  <Image source={IMAGES.coin} style={{width: 14, height: 14}} />
                  <Text className="font-NunitoSans_600SemiBold text-sm text-black">{STATIC_BALANCE.toLocaleString()}</Text>
                </View>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View className="items-center py-20">
              <Text className="text-lg text-black">Coming soon</Text>
            </View>
          }
          renderItem={({item}) => {
            const isSelected = selectedGiftId === item.id;
            return (
              <View className="aspect-square w-[20%] items-center justify-center">
                <Pressable
                  onPress={() => setSelectedGiftId(item.id)}
                  className={`aspect-square h-[90%] w-[90%] items-center justify-between overflow-hidden rounded-xl ${
                    isSelected ? 'border-[1.5px] border-[#028CF3] bg-blue-50' : 'border border-gray-100 bg-white'
                  }`}>
                  <View className="flex-1 items-center justify-center pt-2">
                    <Text className="text-4xl">{item.icon}</Text>
                  </View>
                  {isSelected ? (
                    <LinearGradient colors={['#2FEAA8', '#028CF3']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} className="w-full items-center py-1">
                      <Text className="text-xs font-bold text-black">Send</Text>
                    </LinearGradient>
                  ) : (
                    <View className="mb-1 flex-row items-center gap-1">
                      <Image source={IMAGES.coin} style={{width: 16, height: 16}} />
                      <Text className="text-xs font-medium text-black">{item.price}</Text>
                    </View>
                  )}
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
