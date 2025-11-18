import instance from '../../node_modules/i18next/dist/esm/i18next-BuYueOpO.js';
import en from '../locales/en.json-CIfmU4NQ.js';
import { initReactI18next } from '../../node_modules/react-i18next/dist/es/initReactI18next-D5er19Yk.js';

const resources = {
  en: { translation: en }
};
instance.use(initReactI18next).init({
  resources,
  debug: false,
  // Enable debug only in development
  lng: "en",
  // default language
  fallbackLng: "en",
  // fallback language
  interpolation: {
    escapeValue: false
    // react already safes from xss
  }
});

export { instance as default, resources };
//# sourceMappingURL=i18n-BbWYxphn.js.map
