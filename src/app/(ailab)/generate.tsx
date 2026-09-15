import {useLocalSearchParams} from 'expo-router';
import {GenerationForm, parseGenMode} from '@/modules/ailab';

export default function GenerateScreen() {
  const {mode} = useLocalSearchParams<{mode?: string}>();
  return <GenerationForm initialMode={parseGenMode(mode)} />;
}
