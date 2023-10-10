// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import th from './locales/th/trans.json';
import en from './locales/en/trans.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      th: {
        translation: th
      }
    },
    lng: 'th', // ตั้งค่าภาษาเริ่มต้น
    fallbackLng: 'th', // ภาษาทดแทน
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
