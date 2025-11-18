import instance from "../node_modules/i18next/dist/esm/i18next-5XPcL8s0.js";
import en from "../locales/en.json-DZGgx3LD.js";
import { initReactI18next } from "../node_modules/react-i18next/dist/es/initReactI18next-BeIWXHW3.js";
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
export {
  instance as default,
  resources
};
//# sourceMappingURL=i18n-CMu8DXyd.js.map
