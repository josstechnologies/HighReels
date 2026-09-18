import {useRouter} from 'expo-router';
import {PolicyDocument} from '@/components';

export default function TeenSafetyPolicy() {
  const {back} = useRouter();
  return <PolicyDocument policyKey="teenSafetyPolicy" onBack={back} />;
}
