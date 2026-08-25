import {useRouter} from 'expo-router';
import {PolicyDocument} from '@/components';

export default function CommunityGuidelines() {
  const {back} = useRouter();
  return <PolicyDocument policyKey="communityGuidelines" onBack={back} />;
}
