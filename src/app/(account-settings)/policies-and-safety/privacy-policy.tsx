import {useRouter} from 'expo-router';
import {PolicyDocument} from '@/modules/account-settings';

export default function PrivacyPolicy() {
  const {back} = useRouter();
  return <PolicyDocument policyKey="privacyPolicy" onBack={back} />;
}
