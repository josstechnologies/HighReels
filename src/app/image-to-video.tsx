import {useState} from 'react';
import {Image, Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {AiModeDropdown, type AiModeId} from '@/components/AiModeDropdown';

const MODELS = [
  {
    id: 'action',
    name: 'Action Figure',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80',
  },
  {
    id: 'celeb-1',
    name: 'Celebrity',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
  {
    id: 'celeb-2',
    name: 'Celebrity',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
  },
  {
    id: 'hero',
    name: 'Super Hero',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80',
  },
];

export default function ImageToVideo() {
  const {back, replace, navigate} = useRouter();
  const insets = useSafeAreaInsets();
  const [prompt, setPrompt] = useState('');
  const [modelId, setModelId] = useState(MODELS[0].id);
  const [pickerOpen, setPickerOpen] = useState(false);

  const onGenerate = () => {
    navigate({
      pathname: '/shortvideo-result',
      params: {
        title: 'Image to video',
        kind: 'video',
        prompt: prompt.trim() || 'Describe your idea...',
        ratio: '9:16',
        duration: '10 sec',
        resolution: '1080P',
      },
    } as unknown as Href);
  };

  const onPickMode = (id: AiModeId, href: string) => {
    setPickerOpen(false);
    if (id === 'image_video') return;
    replace(href as Href);
  };

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="z-20 flex-row items-center px-4 py-2">
          <Pressable onPress={back} className="h-10 w-10 items-center justify-center">
            <SVGS.Back width={22} height={22} className="text-white" />
          </Pressable>
          <View className="relative flex-1 items-center">
            <Pressable onPress={() => setPickerOpen(open => !open)} className="flex-row items-center">
              <Text className="font-semibold text-[17px] text-white">Image to video</Text>
              <View style={{transform: [{rotate: pickerOpen ? '-90deg' : '90deg'}]}} className="ml-1">
                <SVGS.ArrowRight width={14} height={14} className="text-white" />
              </View>
            </Pressable>
            {pickerOpen && <AiModeDropdown activeId="image_video" onSelect={onPickMode} />}
          </View>
          <View className="w-10" />
        </View>

        {pickerOpen && <Pressable className="absolute inset-0 z-10" onPress={() => setPickerOpen(false)} />}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 110 + insets.bottom}}>
          <Text className="mt-1 text-[14px] text-grey-200">
            Turn your images into engaging AI-generated videos in seconds.
          </Text>

          <Text className="mb-3 mt-6 font-semibold text-[16px] text-white">Prompt</Text>
          <Pressable className="h-[160px] items-center justify-center rounded-2xl bg-grey-900">
            <SVGS.Upload width={28} height={28} className="text-white" />
            <Text className="mt-3 text-[15px] font-medium text-white">Upload Your Image</Text>
          </Pressable>

          <Text className="mb-3 mt-6 font-semibold text-[16px] text-white">Prompt</Text>
          <View className="min-h-[140px] rounded-2xl bg-grey-900 p-4">
            <TextInput
              multiline
              value={prompt}
              onChangeText={setPrompt}
              placeholder="Describe your idea..."
              placeholderTextColor="#7F7F7F"
              className="min-h-[90px] flex-1 text-[15px] text-white"
              style={{textAlignVertical: 'top'}}
            />
            <Pressable className="absolute bottom-3 right-3 flex-row items-center rounded-full bg-primary px-3 py-2">
              <SVGS.Ai width={14} height={14} className="text-white" />
              <Text className="ml-1.5 text-[12px] font-semibold text-white">Inspiration</Text>
            </Pressable>
          </View>

          <View className="mt-6">
            <Text className="mb-3 font-semibold text-[16px] text-white">Models</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {MODELS.map(item => {
                const active = modelId === item.id;
                return (
                  <Pressable key={item.id} onPress={() => setModelId(item.id)} className="mr-3 w-[88px]">
                    <View className={`overflow-hidden rounded-2xl ${active ? 'border-2 border-primary' : 'border-2 border-transparent'}`}>
                      <Image source={{uri: item.image}} className="aspect-square w-full bg-grey-800" />
                    </View>
                    <Text className="mt-2 text-center text-[12px] text-grey-100" numberOfLines={1}>
                      {item.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 bg-black px-4 pt-2" style={{paddingBottom: Math.max(insets.bottom, 16)}}>
          <Pressable onPress={onGenerate} className="h-14 flex-row items-center justify-center rounded-full bg-primary">
            <SVGS.Ai width={18} height={18} className="text-white" />
            <Text className="ml-2 font-semibold text-[16px] text-white">Generate</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
