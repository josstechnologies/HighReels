import {useEffect, useState} from 'react';
import {Keyboard, Platform, Pressable, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {ChatAttachSheet} from '@/components/chat/ChatAttachSheet';

const MUTED = '#8E8E8E';

export function ChatInputBar({onSend}: {onSend?: (text: string) => void}) {
  const {t} = useTranslation();
  const [text, setText] = useState('');
  const [attachOpen, setAttachOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const hasText = text.trim().length > 0;

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSubscription = Keyboard.addListener(showEvent, () => setIsKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener(hideEvent, () => setIsKeyboardVisible(false));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const send = () => {
    const next = text.trim();
    if (!next) return;
    onSend?.(next);
    setText('');
  };

  return (
    <>
    <View className="w-full bg-white pt-2" style={{paddingBottom: isKeyboardVisible ? 8 : Math.max(insets.bottom, 12)}}>
      <View className="flex-row items-end px-3">
        <View className="min-h-[44px] flex-1 flex-row items-center rounded-full border border-[#E8E8E8] bg-white py-1 pl-3 pr-3">
          <View className="mr-2">
            <SVGS.Smily width={22} height={22} color={MUTED} />
          </View>
          <TextInput
            className="font-NunitoSans_400Regular max-h-24 flex-1 py-2 text-[15px] text-black"
            placeholder={t('chat.placeholder')}
            placeholderTextColor="#8E8E8E"
            value={text}
            onChangeText={setText}
            multiline
          />
          <View className="ml-2 flex-row items-center gap-3">
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                setAttachOpen(true);
              }}
              accessibilityRole="button"
              accessibilityLabel={t('chat.attach')}
              hitSlop={8}>
              <SVGS.Clip width={20} height={20} />
            </Pressable>
            <SVGS.Camera width={22} height={22} color={MUTED} />
          </View>
        </View>
        {hasText ? (
          <Pressable
            accessibilityRole="button"
            onPress={send}
            className="ml-2 h-11 w-11 items-center justify-center rounded-full bg-primary">
            <SVGS.ArrowRight2 width={18} height={14} />
          </Pressable>
        ) : (
          <View className="ml-2 h-11 w-11 items-center justify-center rounded-full bg-primary">
            <SVGS.Mic width={20} height={20} color="#FFFFFF" />
          </View>
        )}
      </View>
    </View>
    <ChatAttachSheet visible={attachOpen} onClose={() => setAttachOpen(false)} />
    </>
  );
}
