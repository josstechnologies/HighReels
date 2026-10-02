import {useRouter} from 'expo-router';
import {PolicyDocument} from '@/components';

export default function DigitalAssetsPolicy() {
  const {back} = useRouter();
  return <PolicyDocument policyKey="digitalAssetsPolicy" onBack={back} />;
}
