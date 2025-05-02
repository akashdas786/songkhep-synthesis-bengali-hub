import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'bn';

interface Translations {
  [key: string]: {
    en: string;
    bn: string;
  };
}

const translations: Translations = {
  'sidebar.history': {
    en: 'Your History',
    bn: 'আপনার ইতিহাস'
  },
  'sidebar.empty': {
    en: 'No summary history yet',
    bn: 'কোন সংক্ষিপ্ত ইতিহাস নেই'
  },
  'summary.title': {
    en: 'Summarized Text',
    bn: 'সংক্ষিপ্ত সারাংশ'
  },
  'summary.original': {
    en: 'Original Text',
    bn: 'মূল টেক্সট'
  },
  'summary.copy': {
    en: 'Copy to clipboard',
    bn: 'ক্লিপবোর্ডে কপি করুন'
  },
  'input.label': {
    en: 'Enter Bengali Text',
    bn: 'বাংলা টেক্সট লিখুন'
  },
  'input.placeholder': {
    en: 'Write your Bengali text here...',
    bn: 'আপনার বাংলা টেক্সট এখানে লিখুন...'
  },
  'summarize.button': {
    en: 'Summarize',
    bn: 'সংক্ষিপ্ত করুন'
  },
  'summarize.processing': {
    en: 'Summarizing...',
    bn: 'সংক্ষিপ্ত করা হচ্ছে...'
  },
  'summarize.level': {
    en: 'Summarization Level',
    bn: 'সংক্ষিপ্তকরণ স্তর'
  },
  'toast.success.title': {
    en: 'Success',
    bn: 'সফল'
  },
  'toast.success.description': {
    en: 'Your text has been summarized!',
    bn: 'আপনার টেক্সট সংক্ষিপ্ত করা হয়েছে!'
  },
  'toast.error.title': {
    en: 'Error',
    bn: 'ত্রুটি'
  },
  'toast.error.description': {
    en: 'Failed to summarize your text',
    bn: 'আপনার টেক্সট সংক্ষিপ্ত করতে ব্যর্থ'
  },
  'toast.copy.title': {
    en: 'Copied!',
    bn: 'কপি করা হয়েছে!'
  },
  'toast.copy.summary': {
    en: 'Summary copied to clipboard',
    bn: 'সারাংশ ক্লিপবোর্ডে কপি করা হয়েছে'
  },
  'toast.copy.original': {
    en: 'Original text copied to clipboard',
    bn: 'মূল টেক্সট ক্লিপবোর্ডে কপি করা হয়েছে'
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
