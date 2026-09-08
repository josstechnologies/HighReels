import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useFocusEffect, useRouter, type Href} from 'expo-router';
import {manipulateAsync, SaveFormat} from 'expo-image-manipulator';
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Circle, Defs, Mask, Rect} from 'react-native-svg';
import {SVGS} from '@/assets';
import {API_ROUTES} from '@/constants';
import {authActions, getActiveAccount} from '@/store';
import {squareCropFromTransform} from '@/utils/avatarCrop';
import {peekPendingAvatarPick} from '@/utils/avatarPick';
import {API, apiErrorMessage, ApiEnvelope, readEnvelope, showToast} from '@/utils';

const OUTPUT = 1024;

type ProfileMePayload = {
  id?: string;
  profile?: {avatar?: string | null};
};

function coverScale(imageWidth: number, imageHeight: number, stageWidth: number, stageHeight: number, circle: number) {
  if (!imageWidth || !imageHeight || !stageWidth) return 1;
  const fullWidth = stageWidth / imageWidth;
  const fillCircle = Math.max(circle / imageWidth, circle / imageHeight);
  return Math.max(fullWidth, fillCircle);
}

export default function EditAvatarCrop() {
  const {back, dismissTo} = useRouter();
  const queryClient = useQueryClient();
  const [pick, setPick] = useState(() => peekPendingAvatarPick());
  const sourceUri = pick.uri;

  useFocusEffect(
    useCallback(() => {
      setPick(peekPendingAvatarPick());
    }, [])
  );

  const [readyUri, setReadyUri] = useState('');
  const [preparing, setPreparing] = useState(true);
  const [stage, setStage] = useState({width: 0, height: 0});

  const imageWidth = useSharedValue(1);
  const imageHeight = useSharedValue(1);
  const stageWidth = useSharedValue(1);
  const stageHeight = useSharedValue(1);
  const circleSize = useSharedValue(1);
  const fitted = useSharedValue(1);
  const zoom = useSharedValue(1);
  const savedZoom = useSharedValue(1);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const savedTx = useSharedValue(0);
  const savedTy = useSharedValue(0);

  const circle = stage.width > 0 ? Math.min(stage.width - 24, stage.height * 0.62) : 0;

  useEffect(() => {
    if (!sourceUri) {
      setPreparing(false);
      return;
    }

    let cancelled = false;
    setReadyUri('');
    setPreparing(true);
    (async () => {
      try {
        // Re-encode so EXIF rotation matches what we display and crop.
        const normalized = await manipulateAsync(sourceUri, [], {compress: 1, format: SaveFormat.JPEG});
        if (cancelled) return;
        imageWidth.value = normalized.width;
        imageHeight.value = normalized.height;
        setReadyUri(normalized.uri);
      } catch {
        const size = await new Promise<{width: number; height: number}>((resolve, reject) => {
          Image.getSize(sourceUri, (width, height) => resolve({width, height}), reject);
        }).catch(() => null);
        if (cancelled) return;
        if (size?.width && size.height) {
          imageWidth.value = size.width;
          imageHeight.value = size.height;
        }
        setReadyUri(sourceUri);
      } finally {
        if (!cancelled) setPreparing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [imageHeight, imageWidth, pick.pick, sourceUri]);

  useEffect(() => {
    if (!stage.width || !stage.height || !readyUri) return;
    const nextCircle = Math.min(stage.width - 24, stage.height * 0.62);
    stageWidth.value = stage.width;
    stageHeight.value = stage.height;
    circleSize.value = nextCircle;
    fitted.value = coverScale(imageWidth.value, imageHeight.value, stage.width, stage.height, nextCircle);
    zoom.value = 1;
    savedZoom.value = 1;
    tx.value = 0;
    ty.value = 0;
    savedTx.value = 0;
    savedTy.value = 0;
  }, [circleSize, fitted, imageHeight, imageWidth, readyUri, savedTx, savedTy, savedZoom, stage.height, stage.width, stageHeight, stageWidth, tx, ty, zoom]);

  const clampPan = (nextTx: number, nextTy: number, nextZoom: number) => {
    'worklet';
    const displayW = imageWidth.value * fitted.value * nextZoom;
    const displayH = imageHeight.value * fitted.value * nextZoom;
    const maxX = Math.max(0, (displayW - circleSize.value) / 2);
    const maxY = Math.max(0, (displayH - circleSize.value) / 2);
    return {
      tx: Math.min(maxX, Math.max(-maxX, nextTx)),
      ty: Math.min(maxY, Math.max(-maxY, nextTy)),
    };
  };

  const pinch = Gesture.Pinch()
    .onUpdate(e => {
      const nextZoom = Math.max(1, Math.min(4, savedZoom.value * e.scale));
      zoom.value = nextZoom;
      const clamped = clampPan(savedTx.value, savedTy.value, nextZoom);
      tx.value = clamped.tx;
      ty.value = clamped.ty;
    })
    .onEnd(() => {
      savedZoom.value = zoom.value;
      savedTx.value = tx.value;
      savedTy.value = ty.value;
    });

  const pan = Gesture.Pan()
    .onUpdate(e => {
      const clamped = clampPan(savedTx.value + e.translationX, savedTy.value + e.translationY, zoom.value);
      tx.value = clamped.tx;
      ty.value = clamped.ty;
    })
    .onEnd(() => {
      savedTx.value = tx.value;
      savedTy.value = ty.value;
    });

  const composed = Gesture.Simultaneous(pinch, pan);

  const imageStyle = useAnimatedStyle(() => {
    const displayW = imageWidth.value * fitted.value * zoom.value;
    const displayH = imageHeight.value * fitted.value * zoom.value;
    return {
      position: 'absolute',
      width: displayW,
      height: displayH,
      left: (stageWidth.value - displayW) / 2 + tx.value,
      top: (stageHeight.value - displayH) / 2 + ty.value,
    };
  });

  const uploadMutation = useMutation({
    mutationFn: async (fileUri: string) => {
      const form = new FormData();
      form.append('file', {
        uri: fileUri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      } as unknown as Blob);

      const response = await API.post<ApiEnvelope<ProfileMePayload>>(API_ROUTES.PROFILE.AVATAR, form, {
        timeout: 60000,
      });
      const data = readEnvelope<ProfileMePayload>(response.data);
      if (!data?.id) throw new Error('UNEXPECTED_PROFILE');
      return data;
    },
    onSuccess: data => {
      const active = getActiveAccount();
      if (active) {
        authActions.upsertAccount({...active, avatar: data.profile?.avatar ?? null});
      }
      queryClient.setQueryData(['profile', 'me'], data);
      queryClient.invalidateQueries({queryKey: ['profile', 'me']});
      // Pop camera/crop back to the Personal Details already on the stack.
      dismissTo('/personal-details' as Href);
    },
    onError: error => {
      showToast(apiErrorMessage(error, 'Something went wrong. Please try again.'));
    },
  });

  const handleDone = async () => {
    if (!readyUri || uploadMutation.isPending || preparing) return;

    const displayW = imageWidth.value * fitted.value * zoom.value;
    const displayH = imageHeight.value * fitted.value * zoom.value;
    const crop = squareCropFromTransform({
      imageWidth: imageWidth.value,
      imageHeight: imageHeight.value,
      displayWidth: displayW,
      displayHeight: displayH,
      imageLeft: (stageWidth.value - displayW) / 2 + tx.value,
      imageTop: (stageHeight.value - displayH) / 2 + ty.value,
      circleLeft: (stageWidth.value - circleSize.value) / 2,
      circleTop: (stageHeight.value - circleSize.value) / 2,
      circleSize: circleSize.value,
    });

    if (crop.width < 1 || crop.height < 1) {
      showToast('Could not crop this image. Try another photo.');
      return;
    }

    try {
      const cropped = await manipulateAsync(
        readyUri,
        [{crop}, {resize: {width: OUTPUT, height: OUTPUT}}],
        {compress: 0.9, format: SaveFormat.JPEG}
      );
      uploadMutation.mutate(cropped.uri);
    } catch {
      showToast('Could not crop this image. Try another photo.');
    }
  };

  if (!sourceUri) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">Missing photo</Text>
        <Pressable onPress={back} className="mt-4">
          <Text className="text-primary">Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <GestureDetector gesture={composed}>
        <View
          style={styles.stage}
          onLayout={event => {
            const {width, height} = event.nativeEvent.layout;
            if (width && height) setStage({width, height});
          }}>
          {readyUri ? (
            <Animated.Image source={{uri: readyUri}} style={imageStyle} resizeMode="stretch" />
          ) : null}

          {circle > 0 ? (
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
              <Svg width={stage.width} height={stage.height}>
                <Defs>
                  <Mask id="avatar-crop-mask">
                    <Rect width={stage.width} height={stage.height} fill="#fff" />
                    <Circle cx={stage.width / 2} cy={stage.height / 2} r={circle / 2} fill="#000" />
                  </Mask>
                </Defs>
                <Rect
                  width={stage.width}
                  height={stage.height}
                  fill="rgba(0,0,0,0.55)"
                  mask="url(#avatar-crop-mask)"
                />
                <Circle
                  cx={stage.width / 2}
                  cy={stage.height / 2}
                  r={circle / 2}
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth={1.5}
                  fill="none"
                />
              </Svg>
            </View>
          ) : null}

          {preparing ? (
            <View style={styles.preparing}>
              <ActivityIndicator color="#FFFFFF" />
            </View>
          ) : null}
        </View>
      </GestureDetector>

      <SafeAreaView style={styles.toolbar} pointerEvents="box-none">
        <View className="flex-row items-center justify-between bg-black/80 px-4 py-3">
          <Pressable onPress={back} className="rounded-full p-1 active:opacity-70">
            <SVGS.Close width={24} height={24} color="#FFFFFF" />
          </Pressable>
          <Text className="font-extrabold text-[17px] text-white">Move and scale</Text>
          <Pressable
            onPress={handleDone}
            disabled={uploadMutation.isPending || preparing}
            className="min-w-[48px] items-end active:opacity-70">
            {uploadMutation.isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="font-semibold text-[15px] text-white">Done</Text>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  stage: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  preparing: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});
