
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'bn';

// Define language context props
interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Translations dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // General
    'app.name': 'Songkkhep',
    'app.beta': 'Beta',
    'app.signIn': 'Sign In',
    'app.signOut': 'Sign Out',
    'app.loading': 'Loading...',
    
    // Text input
    'input.placeholder': 'Enter Bengali text to summarize...',
    'input.button': 'Summarize',
    'input.processing': 'Summarizing...',
    
    // Summary
    'summary.title': 'Summary',
    'summary.originalText': 'Original Text',
    
    // Empty state
    'empty.title': 'No Summary Yet',
    'empty.description': 'Enter text in Bengali to generate a summary',
    
    // Notifications
    'toast.success.title': 'Summarization Completed!',
    'toast.success.description': 'Your text has been successfully summarized.',
    'toast.error.title': 'Problem Occurred',
    'toast.error.description': 'There was an issue summarizing the text. Please try again.',
    
    // Language
    'language.english': 'English',
    'language.bengali': 'Bengali',
  },
  bn: {
    // General
    'app.name': 'সংক্ষেপ',
    'app.beta': 'বেটা',
    'app.signIn': 'সাইন ইন',
    'app.signOut': 'সাইন আউট',
    'app.loading': 'লোড হচ্ছে...',
    
    // Text input
    'input.placeholder': 'সংক্ষিপ্ত করার জন্য বাংলা টেক্সট লিখুন...',
    'input.button': 'সংক্ষিপ্ত করুন',
    'input.processing': 'সংক্ষিপ্ত করা হচ্ছে...',
    
    // Summary
    'summary.title': 'সংক্ষিপ্ত সারাংশ',
    'summary.originalText': 'মূল টেক্সট',
    
    // Empty state
    'empty.title': 'এখনো কোনো সারাংশ নেই',
    'empty.description': 'সারাংশ তৈরি করতে বাংলা টেক্সট লিখুন',
    
    // Notifications
    'toast.success.title': 'সংক্ষিপ্তকরণ সম্পন্ন হয়েছে!',
    'toast.success.description': 'আপনার টেক্সট সফলভাবে সংক্ষিপ্ত করা হয়েছে।',
    'toast.error.title': 'সমস্যা দেখা দিয়েছে',
    'toast.error.description': 'টেক্সট সংক্ষিপ্তকরণে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
    
    // Language
    'language.english': 'ইংরেজি',
    'language.bengali': 'বাংলা',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize language from localStorage or default to Bengali
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'bn') ? savedLanguage : 'bn';
  });

  // Update language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Update language in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
