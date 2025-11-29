import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en";

// Define the structure of your translations
export const resources = {
	en: { translation: en }
} as const;

// Initialize i18next
i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		debug: import.meta.env.DEV, // Enable debug only in development
		lng: "en", // default language
		fallbackLng: "en", // fallback language
		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});

export default i18n;
