import {useRouter} from 'expo-router';
import {PolicyDocument} from '@/modules/account-settings';

export default function CommunityGuidelines() {
  const {back} = useRouter();
  return <PolicyDocument policyKey="communityGuidelines" onBack={back} />;
}
