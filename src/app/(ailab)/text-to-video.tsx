import {Redirect} from 'expo-router';

export default function TextToVideoRedirect() {
  return <Redirect href="/generate?mode=text_video" />;
}
