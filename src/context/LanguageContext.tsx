
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'bn';

type Translations = {
  [key: string]: {
    en: string;
    bn: string;
  };
};

const translations: Translations = {
  'app.name': {
    en: 'BengaliBytes',
    bn: 'বাংলা বাইটস'
  },
  'app.tagline': {
    en: 'Learn Bengali through technology',
    bn: 'প্রযুক্তির মাধ্যমে বাংলা শিখুন'
  },
  'nav.home': {
    en: 'Home',
    bn: 'হোম'
  },
  'auth.signIn.link': {
    en: 'Sign In',
    bn: 'সাইন ইন'
  },
  'auth.register.link': {
    en: 'Register',
    bn: 'নিবন্ধন'
  },
  'nav.dashboard': {
    en: 'Dashboard',
    bn: 'ড্যাশবোর্ড'
  },
  'nav.features': {
    en: 'Features',
    bn: 'বৈশিষ্ট্য'
  },
  'sidebar.history': {
    en: 'Your History',
    bn: 'আপনার ইতিহাস'
  },
  'landing.cta': {
    en: 'Get Started',
    bn: 'শুরু করুন'
  },
  'auth.signIn.heading': {
    en: 'Sign in to your account',
    bn: 'আপনার অ্যাকাউন্টে সাইন ইন করুন'
  },
  'auth.register.heading': {
    en: 'Create your account',
    bn: 'আপনার অ্যাকাউন্ট তৈরি করুন'
  },
  'auth.email': {
    en: 'Email',
    bn: 'ইমেল'
  },
  'auth.password': {
    en: 'Password',
    bn: 'পাসওয়ার্ড'
  },
  'auth.confirmPassword': {
    en: 'Confirm Password',
    bn: 'পাসওয়ার্ড নিশ্চিত করুন'
  },
  'auth.emailPlaceholder': {
    en: 'Enter your email',
    bn: 'আপনার ইমেল লিখুন'
  },
  'auth.passwordPlaceholder': {
    en: 'Enter your password',
    bn: 'আপনার পাসওয়ার্ড লিখুন'
  },
  'auth.passwordCreatePlaceholder': {
    en: 'Create a secure password',
    bn: 'একটি নিরাপদ পাসওয়ার্ড তৈরি করুন'
  },
  'auth.confirmPasswordPlaceholder': {
    en: 'Confirm your password',
    bn: 'আপনার পাসওয়ার্ড নিশ্চিত করুন'
  },
  'auth.forgotPassword': {
    en: 'Forgot Password?',
    bn: 'পাসওয়ার্ড ভুলে গেছেন?'
  },
  'auth.noAccount': {
    en: 'Don\'t have an account?',
    bn: 'অ্যাকাউন্ট নেই?'
  },
  'auth.hasAccount': {
    en: 'Already have an account?',
    bn: 'ইতিমধ্যে একটি অ্যাকাউন্ট আছে?'
  },
  'auth.signIn.button': {
    en: 'Sign In',
    bn: 'সাইন ইন'
  },
  'auth.register.button': {
    en: 'Register',
    bn: 'নিবন্ধন করুন'
  },
  'auth.signIn.success.title': {
    en: 'Welcome back!',
    bn: 'ফিরে আসার জন্য স্বাগতম!'
  },
  'auth.signIn.success.description': {
    en: 'You have successfully signed in.',
    bn: 'আপনি সফলভাবে সাইন ইন করেছেন।'
  },
  'auth.signIn.error.title': {
    en: 'Sign in failed',
    bn: 'সাইন ইন ব্যর্থ হয়েছে'
  },
  'auth.signIn.error.description': {
    en: 'Invalid email or password. Please try again.',
    bn: 'অবৈধ ইমেল বা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।'
  },
  'auth.register.success.title': {
    en: 'Registration successful!',
    bn: 'নিবন্ধন সফল!'
  },
  'auth.register.success.description': {
    en: 'Your account has been created. Please check your email for verification.',
    bn: 'আপনার অ্যাকাউন্ট তৈরি করা হয়েছে। অনুগ্রহ করে যাচাইয়ের জন্য আপনার ইমেল চেক করুন।'
  },
  'auth.register.error.title': {
    en: 'Registration failed',
    bn: 'নিবন্ধন ব্যর্থ হয়েছে'
  },
  'auth.register.error.description': {
    en: 'There was an error creating your account. Please try again.',
    bn: 'আপনার অ্যাকাউন্ট তৈরি করার সময় একটি ত্রুটি ছিল। অনুগ্রহ করে আবার চেষ্টা করুন।'
  },
  'common.loading': {
    en: 'Loading...',
    bn: 'লোড হচ্ছে...'
  },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
