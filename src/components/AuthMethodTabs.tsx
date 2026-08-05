import {View, Text, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';

export type AuthTab = 'email' | 'phone';

type AuthMethodTabsProps = {
  activeTab: AuthTab;
  onChange: (tab: AuthTab) => void;
};

export function AuthMethodTabs({activeTab, onChange}: AuthMethodTabsProps) {
  const {t} = useTranslation();

  return (
    <View className="mb-7 flex-row border-b border-[#f4f4f4]">
      <Pressable
        onPress={() => onChange('email')}
        className={`flex-1 items-center pb-3 ${activeTab === 'email' ? '-mb-[1px] border-b-2 border-[#111111]' : ''}`}>
        <Text className={`text-base ${activeTab === 'email' ? 'font-semibold text-[#111111]' : 'font-medium text-[#a7a7a7]'}`}>
          {t('signup.email')}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChange('phone')}
        className={`flex-1 items-center pb-3 ${activeTab === 'phone' ? '-mb-[1px] border-b-2 border-[#111111]' : ''}`}>
        <Text className={`text-base ${activeTab === 'phone' ? 'font-semibold text-[#111111]' : 'font-medium text-[#a7a7a7]'}`}>
          {t('signup.phone')}
        </Text>
      </Pressable>
    </View>
  );
}
