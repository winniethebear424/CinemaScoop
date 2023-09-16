import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init ({
    fallbackLng: "en",  // as this project's Default language~
    debug:true,
    interpolation: {
        escapeValue:false
    },
    // backend: {
    //   loadPath: 'cinemascoop-frontend/src/i18n.js', 
    // },
  });

  // Set up languageChanged event listener
  i18n.on('languageChanged', (lng) => {
    console.log(`Language changed to ${lng}`);
  });

export default i18n;
