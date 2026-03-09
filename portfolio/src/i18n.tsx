import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Language = 'sv' | 'en';

export type LocalizedText = {
  sv: string;
  en: string;
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'portfolio-language';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'sv';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'sv' || stored === 'en') {
    return stored;
  }

  const browserLang =
    window.navigator.language || (window.navigator as any).userLanguage || 'sv';
  if (browserLang.toLowerCase().startsWith('sv')) return 'sv';
  if (browserLang.toLowerCase().startsWith('en')) return 'en';

  return 'sv';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage());

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'sv' ? 'en' : 'sv');
  }, [language, setLanguage]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
    }),
    [language, setLanguage, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}

export function getLocalized(text: LocalizedText, language: Language): string {
  return language === 'en' ? text.en : text.sv;
}

