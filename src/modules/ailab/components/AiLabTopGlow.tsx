import {LinearGradient} from 'expo-linear-gradient';
import {AiLabGradient, AI_LAB_GRADIENT} from '@/modules/ailab/theme';

const GLOW_HEIGHT = 9 * 16;

interface AiLabTopGlowProps {
  gradient?: AiLabGradient;
}

export function AiLabTopGlow({gradient = 'wash'}: AiLabTopGlowProps) {
  return (
    <LinearGradient
      colors={AI_LAB_GRADIENT[gradient]}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      pointerEvents="none"
      style={{position: 'absolute', top: 0, left: 0, right: 0, height: GLOW_HEIGHT, zIndex: 0}}
    />
  );
}
