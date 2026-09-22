import {useEffect} from 'react';
import {Pressable} from 'react-native';
import Animated, {Easing, interpolateColor, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

const TRACK_WIDTH = 51;
const PADDING = 2;
const THUMB_SIZE = 21;

/**
 * Travel distance for thumb: inner width (track - 2*padding) - thumb
 * 51 - 4 - 21 = 26
 * Reuse this constant so all toggles stay consistent.
 */
export const TOGGLE_TRAVEL = TRACK_WIDTH - THUMB_SIZE - PADDING * 2;

type ToggleProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  accessibilityLabel?: string;
};

export function Toggle({checked, onCheckedChange, accessibilityLabel}: ToggleProps) {
  const progress = useSharedValue(checked ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: 200,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, [checked, progress]);

  const trackAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#DFDFDF', '#6F41EC']),
  }));

  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: progress.value * TOGGLE_TRAVEL}],
  }));

  return (
    <Pressable
      onPress={() => onCheckedChange(!checked)}
      accessibilityRole="switch"
      accessibilityState={{checked}}
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      className="rounded-full active:opacity-90">
      <Animated.View className="w-toggle h-toggle justify-center rounded-full p-[2px]" style={trackAnimatedStyle}>
        <Animated.View className="h-thumb w-thumb rounded-full bg-white shadow-sm" style={thumbAnimatedStyle} />
      </Animated.View>
    </Pressable>
  );
}
