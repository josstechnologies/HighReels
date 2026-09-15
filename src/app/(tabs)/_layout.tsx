import type {ReactNode} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Tabs, usePathname, useRouter, type Href} from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SVGS} from '@/assets';

function AppTabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const {navigate} = useRouter();
  const onHome = pathname === '/' || pathname.endsWith('/index');
  const onTemplates = pathname.endsWith('/templates');
  const onCreate = pathname.endsWith('/create');
  const onAiLab = pathname.endsWith('/ailab');
  const onProfile = pathname.endsWith('/profile');

  return (
    <View className="bg-black px-2 pt-2" style={{paddingBottom: Math.max(insets.bottom, 10)}}>
      <View className="flex-row items-stretch">
        <TabItem label="Home" active={onHome} onPress={() => !onHome && navigate('/')}>
          <SVGS.Home width={20} height={20} color="#FFFFFF" fill={onHome ? '#FFFFFF' : 'none'} />
        </TabItem>
        <TabItem label="Templates" active={onTemplates} onPress={() => !onTemplates && navigate('/templates' as Href)}>
          <SVGS.Category width={20} height={20} color="#FFFFFF" fill={onTemplates ? '#FFFFFF' : 'none'} />
        </TabItem>
        <Pressable
          onPress={() => !onCreate && navigate('/create' as Href)}
          className="flex-1 items-center justify-center">
          <View className="h-9 w-11 items-center justify-center rounded-[14px] bg-white">
            <SVGS.Plus width={14} height={14} color="#000000" />
          </View>
        </Pressable>
        <TabItem label="Ai Lab" active={onAiLab} onPress={() => !onAiLab && navigate('/ailab' as Href)}>
          {onAiLab ? <SVGS.AiLabFill width={20} height={20} /> : <SVGS.AiLab width={20} height={20} />}
        </TabItem>
        <TabItem label="Profile" active={onProfile} onPress={() => !onProfile && navigate('/profile' as Href)}>
          {onProfile ? (
            <SVGS.AccountFill width={20} height={20} color="#FFFFFF" />
          ) : (
            <SVGS.Account width={20} height={20} color="#FFFFFF" />
          )}
        </TabItem>
      </View>
    </View>
  );
}

function TabItem({
  label,
  active,
  onPress,
  children,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  children: ReactNode;
}) {
  return (
    <Pressable onPress={onPress} className="flex-1 items-center" style={{opacity: active || !onPress ? 1 : 0.7}}>
      <View className="h-9 w-full items-center justify-center">{children}</View>
      <Text className="mt-1 text-[12px] font-normal text-white">{label}</Text>
    </Pressable>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={() => <AppTabBar />}
      screenOptions={{headerShown: false, sceneStyle: {backgroundColor: '#000000'}}}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="templates" />
      <Tabs.Screen name="create" />
      <Tabs.Screen name="ailab" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
