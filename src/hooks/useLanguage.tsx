import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, getTranslation, stateToLanguage, Translation } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  setLanguageByState: (stateId: string) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [t, setT] = useState<Translation>(getTranslation('en'));

  useEffect(() => {
    // Try to detect language from browser
    const browserLang = navigator.language.split('-')[0] as Language;
    if (translations[browserLang]) {
      setLanguage(browserLang);
      setT(getTranslation(browserLang));
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setT(getTranslation(lang));
    localStorage.setItem('kisanLanguage', lang);
  };

  const setLanguageByState = (stateId: string) => {
    const lang = stateToLanguage[stateId] || 'en';
    handleSetLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, setLanguageByState, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
