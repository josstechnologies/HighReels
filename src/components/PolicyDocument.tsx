import {useEffect, useMemo, useState, type ReactNode} from 'react';
import {Modal, Pressable, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {SVGS} from '@/assets';
import {Button} from '@/components/Button';
import {RadioDot} from '@/components/RadioOption';
import {APP_LANGUAGES, type LanguageCode} from '@/i18n';

export type PolicyKey =
  | 'communityGuidelines'
  | 'safetyHub'
  | 'termsOfUse'
  | 'privacyPolicy'
  | 'rewardsPolicy'
  | 'digitalAssetsPolicy'
  | 'teenSafetyPolicy';

type PolicyFaq = {question: string; answer: string};

type PolicySectionRaw = {
  title: string;
  kind: 'text' | 'bullets' | 'textBullets' | 'faq';
  body?: string;
  items?: string[] | PolicyFaq[];
};

type PolicyDocRaw = {
  title: string;
  intro?: string;
  sections: PolicySectionRaw[];
};

type PolicyDocumentProps = {
  policyKey: PolicyKey;
  onBack: () => void;
};

function Card({children}: {children: ReactNode}) {
  return <View className="rounded-2xl bg-white px-4 py-4">{children}</View>;
}

function Paragraph({text}: {text: string}) {
  return <Text className="font-medium text-[15px] leading-6 text-black">{text}</Text>;
}

function BulletList({items}: {items: string[]}) {
  return (
    <View>
      {items.map(item => (
        <View key={item} className="mb-2 flex-row last:mb-0">
          <Text className="mr-2 font-medium text-[15px] leading-6 text-black">{'\u2022'}</Text>
          <Text className="flex-1 font-medium text-[15px] leading-6 text-black">{item}</Text>
        </View>
      ))}
    </View>
  );
}

function FaqList({items}: {items: PolicyFaq[]}) {
  return (
    <View>
      {items.map((item, index) => (
        <View key={item.question} className={index === items.length - 1 ? '' : 'mb-4'}>
          <Text className="mb-1 font-bold text-[15px] leading-6 text-black">{item.question}</Text>
          <Text className="font-medium text-[15px] leading-6 text-black">{item.answer}</Text>
        </View>
      ))}
    </View>
  );
}

function SectionBody({section}: {section: PolicySectionRaw}) {
  if (section.kind === 'text') return <Paragraph text={section.body ?? ''} />;
  if (section.kind === 'bullets') return <BulletList items={(section.items as string[]) ?? []} />;
  if (section.kind === 'faq') return <FaqList items={(section.items as PolicyFaq[]) ?? []} />;
  return (
    <View>
      <Paragraph text={section.body ?? ''} />
      <View className="mt-3">
        <BulletList items={(section.items as string[]) ?? []} />
      </View>
    </View>
  );
}

export function PolicyDocument({policyKey, onBack}: PolicyDocumentProps) {
  const {t, i18n} = useTranslation();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [draftCode, setDraftCode] = useState<LanguageCode>('en');

  const doc = useMemo(() => {
    const value = t(`policies.${policyKey}`, {returnObjects: true});
    return value as PolicyDocRaw;
  }, [t, i18n.language, policyKey]);

  const currentCode = (APP_LANGUAGES.some(l => l.code === i18n.language) ? i18n.language : 'en') as LanguageCode;

  useEffect(() => {
    if (pickerOpen) setDraftCode(currentCode);
  }, [pickerOpen, currentCode]);

  const confirmLanguage = () => {
    void i18n.changeLanguage(draftCode);
    setPickerOpen(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-center bg-secondary px-4 py-3">
        <Pressable onPress={onBack} className="absolute left-4 rounded-full p-1 active:bg-grey-50">
          <SVGS.Back width={24} height={24} color="#111111" />
        </Pressable>
        <Text className="max-w-[220px] text-center font-extrabold text-xl text-black">{doc.title}</Text>
        <Pressable onPress={() => setPickerOpen(true)} className="absolute right-4 rounded-full p-1 active:bg-grey-50">
          <SVGS.Globe width={22} height={22} color="#111111" />
        </Pressable>
      </View>

      <ScrollView className="bg-secondary" contentContainerStyle={{paddingBottom: 32}} showsVerticalScrollIndicator={false}>
        {doc.intro ? <Text className="mx-4 mt-4 font-medium text-[15px] leading-6 text-grey-300">{doc.intro}</Text> : null}

        {doc.sections.map(section => (
          <View key={section.title} className="mx-4 mt-5">
            <Text className="mb-2 font-bold text-base text-black">{section.title}</Text>
            <Card>
              <SectionBody section={section} />
            </Card>
          </View>
        ))}
      </ScrollView>

      <Modal visible={pickerOpen} transparent animationType="slide" onRequestClose={() => setPickerOpen(false)}>
        <View className="flex-1 justify-end">
          <Pressable className="absolute inset-0 bg-black/40" onPress={() => setPickerOpen(false)} />
          <View className="rounded-t-[28px] bg-white px-5 pb-8 pt-3">
            <View className="mb-4 items-center">
              <View className="h-1 w-10 rounded-full bg-grey-75" />
            </View>

            <Text className="text-center font-extrabold text-[22px] text-black">{t('policies.languagePickerTitle')}</Text>
            <Text className="mt-2 text-center font-medium text-[14px] leading-5 text-black">
              {t('policies.languagePickerSubtitle')}
            </Text>

            <View className="mt-6">
              {APP_LANGUAGES.map(lang => {
                const selected = lang.code === draftCode;
                return (
                  <Pressable
                    key={lang.code}
                    onPress={() => setDraftCode(lang.code)}
                    className="flex-row items-center justify-between py-4 active:opacity-70">
                    <Text className="font-medium text-[16px] text-black">{t(lang.labelKey)}</Text>
                    <RadioDot selected={selected} />
                  </Pressable>
                );
              })}
            </View>

            <Button title={t('policies.languagePickerDone')} onPress={confirmLanguage} className="mt-4" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
