import * as ProgressPrimitive from '@rn-primitives/progress';
import {Platform, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {cn} from '@/utils';

function Progress({
  className,
  value,
  indicatorClassName,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string;
}) {
  return (
    <ProgressPrimitive.Root
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className)}
      value={value}
      {...props}>
      <Indicator value={value} className={indicatorClassName} />
    </ProgressPrimitive.Root>
  );
}

const Indicator = Platform.select({
  web: WebIndicator,
  native: NativeIndicator,
  default: NullIndicator,
})!;

type IndicatorProps = {
  value: number | undefined | null;
  className?: string;
};

function WebIndicator({value, className}: IndicatorProps) {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View className="h-full w-full flex-1 bg-primary">
      <ProgressPrimitive.Indicator
        className={cn('h-full bg-primary transition-all', className)}
        style={{transform: `translateX(-${100 - (value ?? 0)}%)`}}
      />
    </View>
  );
}

function NativeIndicator({value, className}: IndicatorProps) {
  const progress = useDerivedValue(() => value ?? 0);

  const indicator = useAnimatedStyle(() => ({
    width: withSpring(`${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`, {
      overshootClamping: true,
    }),
  }));

  if (Platform.OS === 'web') {
    return null;
  }

  return (
    <ProgressPrimitive.Indicator asChild>
      <Animated.View style={indicator} className={cn('h-full bg-primary', className)} />
    </ProgressPrimitive.Indicator>
  );
}

function NullIndicator(_props: IndicatorProps) {
  return null;
}

export {Progress};
