import {useRouter} from 'expo-router';
import {PolicyDocument} from '@/modules/account-settings';

export default function SafetyHub() {
  const {back} = useRouter();
  return <PolicyDocument policyKey="safetyHub" onBack={back} />;
}
