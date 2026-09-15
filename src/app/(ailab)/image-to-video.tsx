import {Redirect} from 'expo-router';

export default function ImageToVideoRedirect() {
  return <Redirect href="/generate?mode=image_video" />;
}
