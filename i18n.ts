import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './public/locales/en/common.json';
import uk from './public/locales/uk/common.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: en },
      uk: { translation: uk },
    },
  });

export default i18n;