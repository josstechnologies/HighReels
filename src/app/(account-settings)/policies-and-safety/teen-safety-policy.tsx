import {useRouter} from 'expo-router';
import {PolicyDocument} from '@/modules/account-settings';

export default function TeenSafetyPolicy() {
  const {back} = useRouter();
  return <PolicyDocument policyKey="teenSafetyPolicy" onBack={back} />;
}
