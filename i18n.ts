 
import i18n from 'i18next';
import { initReactI18next  } from 'react-i18next';
import en from './public/locales/en'
import fr from './public/locales/fr'
import ar from './public/locales/ar'


i18n
  .use(initReactI18next) // Connects i18n to React
  .init({
    resources: {
      en,
      fr,
      ar,
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    debug: true,
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });

export default i18n;
  // export const switchLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };
