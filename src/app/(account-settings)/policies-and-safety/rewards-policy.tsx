import {useRouter} from 'expo-router';
import {PolicyDocument} from '@/components';

export default function RewardsPolicy() {
  const {back} = useRouter();
  return <PolicyDocument policyKey="rewardsPolicy" onBack={back} />;
}
