
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, translations } from './translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;  // Changed from keyof typeof translations['en'] to string
  getProductName: (id: string) => string;
  getProductDescription: (id: string) => string;
  isRtl: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<Language>("fr");

  const setLanguage = (value: Language) => {
    setLang(value);
  };

  const t = (key: string) => {
    // Allow any string key, fallback to the key itself if translation not found
    return translations[lang][key as keyof typeof translations['fr']] || key;
  };

  const getProductName = (id: string) => {
    const key = `product${id}` as keyof typeof translations['fr'];
    // Fallback to original product name if translation doesn't exist
    return translations[lang][key] || `Product ${id}`;
  };

  const getProductDescription = (id: string) => {
    const key = `product${id}Desc` as keyof typeof translations['fr'];
    // Fallback to original description if translation doesn't exist
    return translations[lang][key] || `Description for product ${id}`;
  };

  const contextValue = {
    language: lang,
    setLanguage,
    t,
    getProductName,
    getProductDescription,
    isRtl: lang === "ar",
  };

  useEffect(() => {
    // Apply RTL direction when language is Arabic
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={lang === "ar" ? "font-arabic" : ""}>
      <LanguageContext.Provider value={contextValue}>
        {children}
      </LanguageContext.Provider>
    </div>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
