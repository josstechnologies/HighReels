import {Pressable, Text, View} from 'react-native';
import {SVGS} from '@/assets';

export function UploadImage({onPress}: {onPress?: () => void}) {
  return (
    <View className="mt-6">
      <Text className="mb-3 font-semibold text-base text-white">Image</Text>
      <Pressable
        onPress={onPress}
        className="h-[12.5rem] items-center justify-center rounded-[1.25rem] border border-grey-900 bg-grey-900">
        <SVGS.ImageUpload width={32} height={32} className="text-grey-300" />
        <Text className="mt-3 text-sm font-semibold text-grey-300">Upload Your Image</Text>
      </Pressable>
    </View>
  );
}

export function UploadImageModel({onPress}: {onPress?: () => void}) {
  return (
    <View className="mt-6">
      <Text className="mb-3 font-semibold text-base text-white">Upload image (optional)</Text>
      <Pressable onPress={onPress} className="w-[4.5rem]">
        <View className="aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-grey-250 bg-grey-700">
          <SVGS.Plus width={22} height={22} className="text-grey-450" />
        </View>
        <Text className="mt-2 text-center text-xs font-medium text-white" numberOfLines={1}>
          Upload
        </Text>
      </Pressable>
    </View>
  );
}
