import {Stack} from 'expo-router';

export default function AiLabLayout() {
  return (
    <Stack screenOptions={{headerShown: false, contentStyle: {backgroundColor: '#000000'}}}>
      <Stack.Screen name="generate" />
      <Stack.Screen name="effects" />
      <Stack.Screen name="effect-filters" />
      <Stack.Screen name="text-to-video" options={{animation: 'none'}} />
      <Stack.Screen name="text-to-image" options={{animation: 'none'}} />
      <Stack.Screen name="image-to-video" options={{animation: 'none'}} />
      <Stack.Screen name="video-result" options={{animation: 'fade'}} />
      <Stack.Screen name="image-result" options={{animation: 'fade'}} />
    </Stack>
  );
}
