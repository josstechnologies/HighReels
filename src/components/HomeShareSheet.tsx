import {useEffect, useMemo, useRef, useState, type ReactNode} from 'react';
import {FlatList, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View} from 'react-native';
import {Image} from 'expo-image';
import {IMAGES, SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {AppBottomSheet} from '@/components/ui/AppBottomSheet';
import {Checkbox} from '@/components/ui/Checkbox';
import {useUIStore} from '@/store/uiStore';

type Mode = 'share' | 'search';

type Contact = {id: string; name: string; username: string; image: string};

const CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Dian',
    username: 'dianrides',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: '2',
    name: 'Fionce',
    username: 'fionce',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: '3',
    name: 'Harry',
    username: 'harryh',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: '4',
    name: 'Sunial',
    username: 'sunialchef',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: '5',
    name: 'Camea',
    username: 'camea',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: '6',
    name: 'Katty Abrahams',
    username: 'SootheEase',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: '7',
    name: 'Katty Abrahams',
    username: 'painFreenu',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: '8',
    name: 'John Smith',
    username: 'FitLifeCoach',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: '9',
    name: 'Marie Curie',
    username: 'ScienceChic',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab68c7c45e?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    id: '10',
    name: 'Leonardo da Vinci',
    username: 'RenaissanceArtist',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
  },
];

const SOCIAL = [
  {id: 'repost', label: 'Repost', image: IMAGES.repost},
  {id: 'whatsapp', label: 'WhatsApp', image: IMAGES.whatsapp},
  {id: 'messenger', label: 'Messenger', image: IMAGES.messenger},
  {id: 'snapchat', label: 'Snapchat', image: IMAGES.snapchat},
  {id: 'sms', label: 'SMS', image: IMAGES.sms},
] as const;

const ACTIONS = [
  {id: 'report', label: 'Report', Icon: SVGS.Report},
  {id: 'not-interested', label: 'Not interested', Icon: SVGS.HeartBreak},
  {id: 'copy', label: 'Copy Link', Icon: SVGS.CopyLink},
  {id: 'promote', label: 'Promote', Icon: SVGS.Fire},
  {id: 'download', label: 'Download', Icon: SVGS.Download},
] as const;

function CircleTile({label, onPress, children}: {label: string; onPress?: () => void; children: ReactNode}) {
  return (
    <Pressable onPress={onPress} className="w-[72px] items-center active:opacity-70">
      <View className="h-14 w-14 items-center justify-center overflow-hidden rounded-full">{children}</View>
      <Text className="mt-2 text-center font-medium text-[12px] text-black" numberOfLines={2}>
        {label}
      </Text>
    </Pressable>
  );
}

/** Custom “Send to” share sheet (replaces native Share.share on the feed). */
export function HomeShareSheet() {
  const visible = useUIStore((s) => s.shareSheetVisible);
  const shareSheetData = useUIStore((s) => s.shareSheetData);
  const hideShareSheet = useUIStore((s) => s.hideShareSheet);
  const showReportSheet = useUIStore((s) => s.showReportSheet);
  const {height} = useWindowDimensions();
  const searchRef = useRef<TextInput>(null);

  const [mode, setMode] = useState<Mode>('share');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!visible) {
      setMode('share');
      setQuery('');
      setSelected(new Set());
      return;
    }
    if (mode === 'search') {
      const t = setTimeout(() => searchRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [visible, mode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CONTACTS;
    return CONTACTS.filter((c) => c.name.toLowerCase().includes(q) || c.username.toLowerCase().includes(q));
  }, [query]);

  const toggle = (id: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const goSearch = () => setMode('search');
  const backToShare = () => {
    setMode('share');
    setQuery('');
    setSelected(new Set());
  };

  const handleSend = () => {
    // UI-only — send API not wired yet
    setSelected(new Set());
    setQuery('');
    setMode('share');
  };

  const searchBodyHeight = height * 0.65;

  return (
    <AppBottomSheet
      visible={visible}
      onClose={hideShareSheet}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustPan">
      {mode === 'share' ? (
        <>
          <View className="mb-1 flex-row items-center">
            <Pressable onPress={goSearch} className="absolute left-0 z-10 p-1 active:opacity-70">
              <SVGS.Search width={22} height={22} color="#111111" />
            </Pressable>
            <Text className="flex-1 text-center font-extrabold text-[20px] text-black">Send to</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5" contentContainerStyle={{gap: 14, paddingRight: 8}}>
            {CONTACTS.slice(0, 6).map((c) => (
              <CircleTile key={c.id} label={c.name} onPress={() => {}}>
                <Image source={{uri: c.image}} style={{width: 56, height: 56, borderRadius: 28}} contentFit="cover" />
              </CircleTile>
            ))}
          </ScrollView>

          <View className="my-4 h-px bg-[#ececec]" />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 14, paddingRight: 8}}>
            {SOCIAL.map((item) => (
              <CircleTile key={item.id} label={item.label} onPress={() => {}}>
                <Image source={item.image} style={{width: 56, height: 56}} contentFit="cover" />
              </CircleTile>
            ))}
          </ScrollView>

          <View className="my-4 h-px bg-[#ececec]" />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2" contentContainerStyle={{gap: 14, paddingRight: 8}}>
            {ACTIONS.map((item) => (
              <CircleTile
                key={item.id}
                label={item.label}
                onPress={item.id === 'report' ? () => showReportSheet(shareSheetData) : undefined}>
                <View className="h-14 w-14 items-center justify-center rounded-full bg-[#f3f3f3]">
                  <item.Icon width={22} height={22} color="#616161" />
                </View>
              </CircleTile>
            ))}
          </ScrollView>
        </>
      ) : (
        <View style={{height: searchBodyHeight}} className="flex-1">
          <View className="mb-3 flex-row items-center">
            <Text className="flex-1 text-center font-extrabold text-[20px] text-black">Send to</Text>
            <Pressable onPress={backToShare} className="absolute right-0 p-1 active:opacity-70">
              <SVGS.Close2 width={22} height={22} color="#111111" />
            </Pressable>
          </View>

          <View className="mb-3 h-11 flex-row items-center rounded-full bg-[#f3f3f3] px-3.5">
            <SVGS.Search width={18} height={18} color="#A7A7A7" />
            <TextInput
              ref={searchRef}
              value={query}
              onChangeText={setQuery}
              placeholder="Search..."
              placeholderTextColor="#A7A7A7"
              className="ml-2 flex-1 font-medium text-[15px] text-black"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
            />
          </View>

          <FlatList
            style={{flex: 1}}
            data={filtered}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{paddingBottom: 8}}
            ListEmptyComponent={<Text className="mt-8 text-center font-medium text-[14px] text-[#8a8a8a]">No people found</Text>}
            renderItem={({item}) => {
              const checked = selected.has(item.id);
              return (
                <Pressable onPress={() => toggle(item.id)} className="flex-row items-center py-2.5 active:opacity-70">
                  <Image source={{uri: item.image}} style={{width: 48, height: 48, borderRadius: 24}} contentFit="cover" />
                  <View className="ml-3 min-w-0 flex-1">
                    <Text className="font-bold text-[15px] text-black" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text className="mt-0.5 font-medium text-[13px] text-[#8a8a8a]" numberOfLines={1}>
                      {item.username}
                    </Text>
                  </View>
                  <Checkbox checked={checked} onCheckedChange={() => toggle(item.id)} accessibilityLabel={`Select ${item.name}`} />
                </Pressable>
              );
            }}
          />

          <View className="pt-3">
            <Button title="Send" onPress={handleSend} disabled={selected.size === 0} />
          </View>
        </View>
      )}
    </AppBottomSheet>
  );
}
