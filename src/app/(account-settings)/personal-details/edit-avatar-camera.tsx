import {useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {CameraView, useCameraPermissions, type FlashMode} from 'expo-camera';
import {manipulateAsync, SaveFormat} from 'expo-image-manipulator';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import {SVGS} from '@/assets';
import {setPendingAvatarUri} from '@/utils/avatarPick';

export default function EditAvatarCamera() {
  const {back, push} = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('front');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [busy, setBusy] = useState(false);

  const takePicture = async () => {
    if (!cameraRef.current || busy) return;
    setBusy(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({quality: 0.9, skipProcessing: false});
      if (!photo?.uri) return;
      // New file every shot so crop/profile do not reuse the last camera photo.
      const unique = await manipulateAsync(photo.uri, [], {compress: 0.92, format: SaveFormat.JPEG});
      setPendingAvatarUri(unique.uri);
      push('/personal-details/edit-avatar-crop' as Href);
    } finally {
      setBusy(false);
    }
  };

  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-black px-8">
        <Text className="text-center font-medium text-[15px] text-white">
          Camera access is needed to take a profile picture.
        </Text>
        <Pressable onPress={requestPermission} className="mt-4 active:opacity-70">
          <Text className="font-semibold text-[15px] text-primary">Grant permission</Text>
        </Pressable>
        <Pressable onPress={back} className="mt-6 active:opacity-70">
          <Text className="font-medium text-[15px] text-grey-200">Cancel</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={facing}
        flash={flash}
        mirror={facing === 'front'}
      />

      <SafeAreaView className="flex-1 justify-between" pointerEvents="box-none">
        <View className="flex-row items-start justify-between px-4 pt-2">
          <Pressable onPress={back} className="rounded-full p-2 active:opacity-70">
            <SVGS.Close width={28} height={28} color="#FFFFFF" />
          </Pressable>
          <View className="items-end gap-4">
            <Pressable
              onPress={() => setFacing(f => (f === 'front' ? 'back' : 'front'))}
              className="rounded-full p-2 active:opacity-70">
              <SVGS.FlipCamera width={26} height={26} color="#FFFFFF" />
            </Pressable>
            <Pressable
              onPress={() => setFlash(f => (f === 'off' ? 'on' : 'off'))}
              className="rounded-full p-2 active:opacity-70">
              <SVGS.FlashOff width={26} height={26} color={flash === 'off' ? '#FFFFFF' : '#D3D3D3'} />
            </Pressable>
          </View>
        </View>

        <View className="items-center pb-10">
          <Pressable
            onPress={takePicture}
            disabled={busy}
            className="h-20 w-20 items-center justify-center rounded-full border-4 border-white active:opacity-80"
            style={{opacity: busy ? 0.5 : 1}}>
            <View className="h-16 w-16 rounded-full bg-white" />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
