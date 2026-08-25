import {useRouter} from 'expo-router';
import {PolicyDocument} from '@/components';

export default function SafetyHub() {
  const {back} = useRouter();
  return <PolicyDocument policyKey="safetyHub" onBack={back} />;
}
