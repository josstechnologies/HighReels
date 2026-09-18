import {useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useRouter, type Href} from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import { AiLabScreen } from '@/screens';

export default function AiLab() {
  return <AiLabScreen />;
}
