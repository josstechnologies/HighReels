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
  const onProfile = pathname.endsWith('/profile');

  return (
    <View className="flex-row items-end bg-black px-2 pt-2" style={{paddingBottom: Math.max(insets.bottom, 10)}}>
      <TabItem label="Home" active={onHome} onPress={() => !onHome && navigate('/')}>
        <SVGS.Home width={24} height={24} color="#FFFFFF" fill={onHome ? '#FFFFFF' : 'none'} />
      </TabItem>
      <TabItem label="Templates">
        <SVGS.Grid width={24} height={24} color="#FFFFFF" />
      </TabItem>
      <TabItem label="">
        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-white">
          <SVGS.Plus width={22} height={22} color="#111111" />
        </View>
      </TabItem>
      <TabItem label="Ai Lab">
        <SVGS.Ai width={24} height={24} color="#FFFFFF" />
      </TabItem>
      <TabItem label="Profile" active={onProfile} onPress={() => !onProfile && navigate('/profile' as Href)}>
        {onProfile ? (
          <SVGS.AccountFill width={24} height={24} color="#FFFFFF" />
        ) : (
          <SVGS.Account width={24} height={24} color="#FFFFFF" />
        )}
      </TabItem>
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
    <Pressable onPress={onPress} className="flex-1 items-center justify-end pb-1" style={{opacity: active || !onPress ? 1 : 0.7}}>
      {children}
      {label ? <Text className="mt-1 font-medium text-[11px] text-white">{label}</Text> : <View className="h-4" />}
    </Pressable>
  );
}

export default function TabsLayout() {
  return (
    <Tabs tabBar={() => <AppTabBar />} screenOptions={{headerShown: false}}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
