import en from './en.json';
import fr from './fr.json';
import policiesEn from './policies.en.json';
import policiesFr from './policies.fr.json';

import i18n, {Resource} from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'expo-localization';

export const APP_LANGUAGES = [
  {code: 'en', labelKey: 'policies.languages.en'},
  {code: 'fr', labelKey: 'policies.languages.fr'},
] as const;

export type LanguageCode = (typeof APP_LANGUAGES)[number]['code'];

const resources = {
  en: {translation: {...en, policies: policiesEn}},
  fr: {translation: {...fr, policies: policiesFr}},
} satisfies Resource;

const fallbackLng: LanguageCode = 'en';

const fallbackChecker = (resourceMap: Resource, lng: string) => {
  const languages = Object.keys(resourceMap);
  const hasFallback = languages.find(key => lng === key);

  if (!hasFallback) {
    throw new Error(
      `fallbackLng  "${lng}", is not present in your resources, please check your config, languages available: ${languages.join(', ')}`
    );
  }
  return lng;
};

type Init18n = {resources: Resource; fallbackLng: string};

export const init18n = ({resources: resourceMap, fallbackLng: lng}: Init18n) => {
  return i18n
    .use({
      type: 'languageDetector',
      detect: () => {
        const locales = Localization.getLocales();
        const firstLanguageCode = locales[0]?.languageCode ?? 'en';
        return APP_LANGUAGES.some(l => l.code === firstLanguageCode) ? firstLanguageCode : fallbackLng;
      },
      init: () => {},
      cacheUserLanguage: () => {},
    })
    .use(initReactI18next)
    .init({
      resources: resourceMap,
      compatibilityJSON: 'v3',
      interpolation: {escapeValue: false},
      fallbackLng: fallbackChecker(resourceMap, lng),
    });
};

const i18nInstance = init18n({resources, fallbackLng});

export default i18nInstance;
