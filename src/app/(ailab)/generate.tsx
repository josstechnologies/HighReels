import { useLocalSearchParams } from 'expo-router';
import { GenerationForm, parseGenMode } from '@/components';

export default function GenerateScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  return <GenerationForm initialMode={parseGenMode(mode)} />;
}
