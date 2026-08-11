import en from './en.json';
import fr from './fr.json';

import i18n, {Resource} from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: {translation: en},
  fr: {translation: fr},
};

const fallbackLng = 'en';

export type LanguageCode = keyof typeof resources;

const fallbackChecker = (resources: Resource, fallbackLng: string) => {
  const languages = Object.keys(resources);
  const hasFallback = languages.find((key) => fallbackLng === key);

  if (!hasFallback) {
    throw new Error(
      `fallbackLng  "${fallbackLng}", is not present in your resources, please check your config, languages available: ${languages.join(', ')}`
    );
  }
  return fallbackLng;
};

type Init18n = {resources: Resource; fallbackLng: string};

export const init18n = ({resources, fallbackLng}: Init18n) => {
  return i18n
    .use({
      type: 'languageDetector',
      detect: () => {
        const locales = Localization.getLocales();
        const firstLanguageCode = locales[0].languageCode ?? 'en';
        return firstLanguageCode;
      },
      init: () => {},
      cacheUserLanguage: () => {},
    })
    .use(initReactI18next)
    .init({resources, compatibilityJSON: 'v3', interpolation: {escapeValue: false}, fallbackLng: fallbackChecker(resources, fallbackLng)});
};

const i18nInstance = init18n({resources, fallbackLng});

export default i18nInstance;
