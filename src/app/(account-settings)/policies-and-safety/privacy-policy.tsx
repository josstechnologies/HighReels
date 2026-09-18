import {useRouter} from 'expo-router';
import {PolicyDocument} from '@/components';

export default function PrivacyPolicy() {
  const {back} = useRouter();
  return <PolicyDocument policyKey="privacyPolicy" onBack={back} />;
}
