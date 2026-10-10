import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Currency, ThemeMode } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('ummon_lang') as Language) || 'en';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem('ummon_currency') as Currency) || 'USD';
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('ummon_theme') as ThemeMode) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('ummon_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('ummon_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('ummon_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setCurrency = (cur: Currency) => {
    setCurrencyState(cur);
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        theme,
        toggleTheme,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
