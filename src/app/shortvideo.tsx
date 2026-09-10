import {useEffect, useState, type ReactNode} from 'react';
import {Image, Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {useLocalSearchParams, useRouter, type Href} from 'expo-router';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {AiModeDropdown, type AiModeId} from '@/components/AiModeDropdown';

const MODE_COPY = {
  text_video: {label: 'Text to Video', blurb: 'Create cinematic videos from simple text ideas in seconds.'},
  text_image: {label: 'Text to image', blurb: 'Turn your words into stunning AI-generated visuals in seconds.'},
} as const;

const RATIOS = ['9:16', '3:4', '1:1', '4:3', '16:9'] as const;
const DURATIONS = ['5 sec', '10 sec', '15 sec', '20 sec'] as const;
const OUTPUTS = ['1', '2', '3', '4'] as const;
const RESOLUTIONS = [
  {id: '720P', pro: false},
  {id: '1080P', pro: true},
  {id: '4K', pro: true},
] as const;

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

type FormMode = 'text_video' | 'text_image';

function Chip({
  label,
  active,
  onPress,
  trailing,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  trailing?: ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`mr-2 flex-row items-center rounded-full px-4 py-2.5 ${active ? 'bg-primary' : 'bg-grey-800'}`}>
      <Text className={`text-[13px] ${active ? 'font-semibold text-white' : 'text-grey-100'}`}>{label}</Text>
      {trailing}
    </Pressable>
  );
}

export default function ShortVideo() {
  const {back, navigate, replace} = useRouter();
  const {mode: modeParam} = useLocalSearchParams<{mode?: AiModeId}>();
  const initial: FormMode = modeParam === 'text_image' ? 'text_image' : 'text_video';

  const [mode, setMode] = useState<FormMode>(initial);
  const [prompt, setPrompt] = useState('');
  const [ratio, setRatio] = useState<(typeof RATIOS)[number]>('9:16');
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>('5 sec');
  const [outputs, setOutputs] = useState<(typeof OUTPUTS)[number]>('1');
  const [resolution, setResolution] = useState<(typeof RESOLUTIONS)[number]['id']>('720P');
  const [modelId, setModelId] = useState(MODELS[0].id);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    if (modeParam === 'image_video') {
      replace('/image-to-video' as Href);
      return;
    }
    if (modeParam === 'text_image' || modeParam === 'text_video') setMode(modeParam);
  }, [modeParam, replace]);

  const insets = useSafeAreaInsets();
  const current = MODE_COPY[mode];
  const showDuration = mode === 'text_video';
  const showResolution = mode === 'text_video';
  const showOutputs = mode === 'text_image';

  const onGenerate = () => {
    navigate({
      pathname: '/shortvideo-result',
      params: {
        title: current.label,
        kind: mode === 'text_image' ? 'image' : 'video',
        prompt:
          prompt.trim() ||
          (mode === 'text_image' ? 'A futuristic city glowing at night' : 'Drone flying over mountains at sunrise'),
        ratio,
        duration,
        resolution,
        outputs,
      },
    } as unknown as Href);
  };

  const onPickMode = (id: AiModeId, href: string) => {
    setPickerOpen(false);
    if (id === 'image_video') {
      replace(href as Href);
      return;
    }
    if (id !== mode) setMode(id);
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
              <Text className="font-semibold text-[17px] text-white">{current.label}</Text>
              <View style={{transform: [{rotate: pickerOpen ? '-90deg' : '90deg'}]}} className="ml-1">
                <SVGS.ArrowRight width={14} height={14} className="text-white" />
              </View>
            </Pressable>
            {pickerOpen && <AiModeDropdown activeId={mode} onSelect={onPickMode} />}
          </View>
          <View className="w-10" />
        </View>

        {pickerOpen && <Pressable className="absolute inset-0 z-10" onPress={() => setPickerOpen(false)} />}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 110 + insets.bottom}}>
          <Text className="mt-1 text-[14px] text-grey-200">{current.blurb}</Text>

          <Text className="mb-3 mt-6 font-semibold text-[16px] text-white">Prompt</Text>
          <View className="min-h-[150px] rounded-2xl bg-grey-900 p-4">
            <TextInput
              multiline
              value={prompt}
              onChangeText={setPrompt}
              placeholder={
                mode === 'text_image'
                  ? "Describe the image you want... (e.g., 'A futuristic city glowing at night')"
                  : "Describe the video you want... (e.g., 'Drone flying over mountains at sunrise')"
              }
              placeholderTextColor="#7F7F7F"
              className="min-h-[100px] flex-1 text-[15px] text-white"
              style={{textAlignVertical: 'top'}}
            />
            <Pressable className="absolute bottom-3 right-3 flex-row items-center rounded-full bg-primary px-3 py-2">
              <SVGS.Ai width={14} height={14} className="text-white" />
              <Text className="ml-1.5 text-[12px] font-semibold text-white">Inspiration</Text>
            </Pressable>
          </View>

          <View className="mt-6">
            <Text className="mb-3 font-semibold text-[16px] text-white">Aspect ratio</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {RATIOS.map(item => (
                <Chip key={item} label={item} active={ratio === item} onPress={() => setRatio(item)} />
              ))}
            </ScrollView>
          </View>

          {showDuration && (
            <View className="mt-6">
              <Text className="mb-3 font-semibold text-[16px] text-white">Duration</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {DURATIONS.map(item => (
                  <Chip key={item} label={item} active={duration === item} onPress={() => setDuration(item)} />
                ))}
              </ScrollView>
            </View>
          )}

          {showOutputs && (
            <View className="mt-6">
              <Text className="mb-3 font-semibold text-[16px] text-white">Outputs</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {OUTPUTS.map(item => (
                  <Chip key={item} label={item} active={outputs === item} onPress={() => setOutputs(item)} />
                ))}
              </ScrollView>
            </View>
          )}

          {showResolution && (
            <View className="mt-6">
              <Text className="mb-3 font-semibold text-[16px] text-white">Resolution</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {RESOLUTIONS.map(item => (
                  <Chip
                    key={item.id}
                    label={item.id}
                    active={resolution === item.id}
                    onPress={() => setResolution(item.id)}
                    trailing={item.pro ? <Text className="ml-1 text-[12px] text-warning-700">★</Text> : undefined}
                  />
                ))}
              </ScrollView>
            </View>
          )}

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

          <View className="mt-6">
            <Text className="mb-3 font-semibold text-[16px] text-white">Upload image (optional)</Text>
            <Pressable className="h-24 w-24 items-center justify-center rounded-2xl border border-dashed border-grey-300">
              <SVGS.Plus width={22} height={22} className="text-white" />
              <Text className="mt-1 text-[12px] text-white">Upload</Text>
            </Pressable>
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
