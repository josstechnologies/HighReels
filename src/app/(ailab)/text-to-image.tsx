import {Redirect} from 'expo-router';

export default function TextToImageRedirect() {
  return <Redirect href="/generate?mode=text_image" />;
}
