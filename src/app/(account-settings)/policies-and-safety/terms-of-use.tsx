import {useRouter} from 'expo-router';
import {PolicyDocument} from '@/components';

export default function TermsOfUse() {
  const {back} = useRouter();
  return <PolicyDocument policyKey="termsOfUse" onBack={back} />;
}
