import {useEffect, useState} from 'react';
import {Image, Pressable, ScrollView, Text, View, useWindowDimensions} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';
import {AiModeDropdown, type AiModeId} from '@/modules/ailab/components/AiModeDropdown';
import {AiLabTopGlow} from '@/modules/ailab/components/AiLabTopGlow';
import {ChipGroup} from '@/modules/ailab/components/ChipGroup';
import {PromptField} from '@/modules/ailab/components/PromptField';
import {UploadImage, UploadImageModel} from '@/modules/ailab/components/UploadImage';
import {cn} from '@/utils';

export type GenMode = AiModeId;

export const MODE_CONFIG = {
  text_video: {
    title: 'Text to Video',
    blurb: 'Create cinematic videos from simple text ideas in seconds.',
    placeholder: "Describe the video you want... (e.g., 'Drone flying over mountains at sunrise')",
    defaultPrompt: 'Drone flying over mountains at sunrise',
    fields: {ratio: true, duration: true, resolution: true, outputs: false, upload: 'optional' as const},
    result: '/video-result' as const,
  },
  text_image: {
    title: 'Text to Image',
    blurb: 'Create cinematic videos from simple text ideas in seconds.',
    placeholder: "Describe the video you want... (e.g., 'Drone flying over mountains at sunrise')",
    defaultPrompt: 'A futuristic city glowing at night',
    fields: {ratio: true, duration: false, resolution: false, outputs: true, upload: 'optional' as const},
    result: '/image-result' as const,
  },
  image_video: {
    title: 'Image to Video',
    blurb: 'Create cinematic videos from simple text ideas in seconds.',
    placeholder: 'Describe your idea...',
    defaultPrompt: 'Describe your idea...',
    fields: {ratio: true, duration: true, resolution: true, outputs: false, upload: 'required' as const},
    result: '/video-result' as const,
  },
} as const;

export function parseGenMode(value?: string | string[]): GenMode {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === 'text_image' || raw === 'image_video' || raw === 'text_video') return raw;
  return 'text_video';
}

const RATIOS = ['9:16', '3:4', '1:1', '4:3', '16:9'] as const;
const DURATIONS = ['5 sec', '10 sec', '15 sec', '20 sec'] as const;
const OUTPUTS = ['1', '2', '3', '4'] as const;
const RESOLUTIONS = ['720P', '1080P', '4K'] as const;

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

export function GenerationForm({initialMode = 'text_video'}: {initialMode?: GenMode}) {
  const {back, navigate, setParams} = useRouter();
  const {height: windowHeight} = useWindowDimensions();
  const promptHeight = Math.round(Math.min(320, Math.max(260, windowHeight * 0.32)));

  const [mode, setMode] = useState<GenMode>(initialMode);
  const [prompt, setPrompt] = useState('');
  const [ratio, setRatio] = useState<(typeof RATIOS)[number]>('9:16');
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>('5 sec');
  const [outputs, setOutputs] = useState<(typeof OUTPUTS)[number]>('1');
  const [resolution, setResolution] = useState<(typeof RESOLUTIONS)[number]>('720P');
  const [modelId, setModelId] = useState(MODELS[0].id);

  const config = MODE_CONFIG[mode];

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const onGenerate = () => {
    navigate({
      pathname: config.result,
      params: {
        title: config.title,
        prompt: prompt.trim() || config.defaultPrompt,
        ratio,
        duration,
        resolution,
        outputs,
      },
    } as unknown as Href);
  };

  const onPickMode = (id: AiModeId) => {
    if (id === mode) return;
    setMode(id);
    setParams({mode: id});
  };

  return (
    <View className="flex-1 bg-black">
      <AiLabTopGlow gradient="soft20" />
      <SafeAreaView className="flex-1 px-4" edges={['top', 'bottom']}>
        <View className="z-20 flex-row items-center py-4">
          <Pressable onPress={back} className="h-10 w-10 items-center justify-center" hitSlop={8}>
            <SVGS.Back width={24} height={24} className="text-white" />
          </Pressable>
          <View className="flex-1 items-center">
            <AiModeDropdown activeId={mode} title={config.title} onSelect={onPickMode} />
          </View>
          <View className="w-10" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <Text className="mt-4 text-base text-grey-200">{config.blurb}</Text>

          {config.fields.upload === 'required' && <UploadImage />}

          <Text className="mb-3 mt-6 font-bold text-base text-white">Prompt</Text>
          <PromptField
            value={prompt}
            onChangeText={setPrompt}
            placeholder={config.placeholder}
            height={promptHeight}
          />

          {config.fields.ratio && (
            <View className="mt-6">
              <Text className="mb-3 font-semibold text-base text-white">Aspect ratio</Text>
              <ChipGroup options={RATIOS} value={ratio} onChange={setRatio} shape="square" />
            </View>
          )}

          {config.fields.duration && (
            <View className="mt-6">
              <Text className="mb-3 font-semibold text-base text-white">Duration</Text>
              <ChipGroup options={DURATIONS} value={duration} onChange={setDuration} />
            </View>
          )}

          {config.fields.outputs && (
            <View className="mt-6">
              <Text className="mb-3 font-semibold text-base text-white">Outputs</Text>
              <ChipGroup options={OUTPUTS} value={outputs} onChange={setOutputs} />
            </View>
          )}

          {config.fields.resolution && (
            <View className="mt-6">
              <Text className="mb-3 font-semibold text-base text-white">Resolution</Text>
              <ChipGroup options={RESOLUTIONS} value={resolution} onChange={setResolution} />
            </View>
          )}

          <View className="mt-6">
            <Text className="mb-3 font-semibold text-base text-white">Models</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {MODELS.map(item => {
                const active = modelId === item.id;
                return (
                  <Pressable key={item.id} onPress={() => setModelId(item.id)} className="mr-3 w-[4.5rem]">
                    <View className={cn('overflow-hidden rounded-2xl border-2', active ? 'border-primary' : 'border-transparent')}>
                      <Image source={{uri: item.image}} className="aspect-square w-full bg-grey-800" />
                    </View>
                    <Text className="mt-2 text-center text-xs font-medium text-white" numberOfLines={1}>
                      {item.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {config.fields.upload === 'optional' && <UploadImageModel />}

          <View className="pt-10 pb-10">
            <Pressable onPress={onGenerate} className="h-14 flex-row items-center justify-center rounded-xl bg-primary">
              <SVGS.Ai width={20} height={20} className="text-white" />
              <Text className="ml-2 font-semibold text-base text-white">Generate</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
