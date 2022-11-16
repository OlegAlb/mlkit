import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './localization/en.json';
import ru from './localization/ru.json';
import {LangType} from './types/Lang';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
  lng: LangType.EN,
  interpolation: {
    escapeValue: false,
  },
});

export const Localization = i18n;
