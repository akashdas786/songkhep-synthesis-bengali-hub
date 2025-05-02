import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'bn';

interface Translations {
  [key: string]: {
    en: string;
    bn: string;
  };
}

const translations: Translations = {
  'app.name': {
    en: 'BengaliSum',
    bn: 'বাংলা সারসংক্ষেপ'
  },
  'app.beta': {
    en: 'BETA',
    bn: 'বেটা'
  },
  'app.signIn': {
    en: 'Sign In',
    bn: 'সাইন ইন'
  },
  'app.signOut': {
    en: 'Sign Out',
    bn: 'সাইন আউট'
  },
  'app.register': {
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
  'landing.heading': {
    en: 'Summarize Bengali Text with AI',
    bn: 'এআই দিয়ে বাংলা টেক্সট সংক্ষিপ্ত করুন'
  },
  'landing.subheading': {
    en: 'Get quick, accurate summaries of Bengali content in seconds',
    bn: 'সেকেন্ডে বাংলা কন্টেন্টের দ্রুত, সঠিক সারাংশ পান'
  },
  'landing.startFree': {
    en: 'Start for Free',
    bn: 'ফ্রিতে শুরু করুন'
  },
  'landing.signIn': {
    en: 'Sign In',
    bn: 'সাইন ইন'
  },
  'landing.feature1.title': {
    en: 'Fast Summarization',
    bn: 'দ্রুত সংক্ষিপ্তকরণ'
  },
  'landing.feature1.description': {
    en: 'Get summaries in seconds, not minutes',
    bn: 'মিনিট নয়, সেকেন্ডে সারাংশ পান'
  },
  'landing.feature2.title': {
    en: 'Accurate Results',
    bn: 'সঠিক ফলাফল'
  },
  'landing.feature2.description': {
    en: 'AI-powered summarization that preserves context and meaning',
    bn: 'AI-পাওয়ারড সংক্ষিপ্তকরণ যা প্রসঙ্গ এবং অর্থ বজায় রাখে'
  },
  'landing.feature3.title': {
    en: 'Mobile Friendly',
    bn: 'মোবাইল বান্ধব'
  },
  'landing.feature3.description': {
    en: 'Summarize on any device, anywhere',
    bn: 'যেকোনো ডিভাইসে, যেকোনো জায়গায় সংক্ষিপ্ত করুন'
  },
  'landing.howItWorks': {
    en: 'How It Works',
    bn: 'এটা কিভাবে কাজ করে'
  },
  'landing.step1.title': {
    en: 'Paste Your Text',
    bn: 'আপনার টেক্সট পেস্ট করুন'
  },
  'landing.step1.description': {
    en: 'Input any Bengali text you want to summarize',
    bn: 'আপনি যে বাংলা টেক্সট সংক্ষিপ্ত করতে চান তা ইনপুট করুন'
  },
  'landing.step2.title': {
    en: 'Choose Length',
    bn: 'দৈর্ঘ্য বাছাই করুন'
  },
  'landing.step2.description': {
    en: 'Select how condensed you want the summary to be',
    bn: 'আপনি সারাংশ কতটা সংক্ষিপ্ত চান তা নির্বাচন করুন'
  },
  'landing.step3.title': {
    en: 'Get Summary',
    bn: 'সারাংশ পান'
  },
  'landing.step3.description': {
    en: 'Instantly receive your accurately summarized text',
    bn: 'অবিলম্বে আপনার সঠিকভাবে সংক্ষিপ্ত টেক্সট পান'
  },
  'landing.copyright': {
    en: '© 2025 BengaliSum. All rights reserved.',
    bn: '© ২০২৫ বাংলা সারসংক্ষেপ। সর্বস্বত্ব সংরক্ষিত।'
  },
  'landing.about': {
    en: 'About',
    bn: 'সম্পর্কে'
  },
  'landing.contact': {
    en: 'Contact',
    bn: 'যোগাযোগ'
  },
  'landing.privacy': {
    en: 'Privacy',
    bn: 'গোপনীয়তা'
  },
  'language.toggle': {
    en: 'Toggle language',
    bn: 'ভাষা পরিবর্তন করুন'
  },
  'language.english': {
    en: 'English',
    bn: 'ইংরেজি'
  },
  'language.bengali': {
    en: 'Bengali',
    bn: 'বাংলা'
  },
  'auth.signIn.heading': {
    en: 'Sign in to your account',
    bn: 'আপনার অ্যাকাউন্টে সাইন ইন করুন'
  },
  'auth.register.heading': {
    en: 'Create an account',
    bn: 'একটি অ্যাকাউন্ট তৈরি করুন'
  },
  'auth.email': {
    en: 'Email',
    bn: 'ইমেইল'
  },
  'auth.emailPlaceholder': {
    en: 'Enter your email',
    bn: 'আপনার ইমেইল লিখুন'
  },
  'auth.password': {
    en: 'Password',
    bn: 'পাসওয়ার্ড'
  },
  'auth.passwordPlaceholder': {
    en: 'Enter your password',
    bn: 'আপনার পাসওয়ার্ড লিখুন'
  },
  'auth.passwordCreatePlaceholder': {
    en: 'Create a password',
    bn: 'একটি পাসওয়ার্ড তৈরি করুন'
  },
  'auth.forgotPassword': {
    en: 'Forgot password?',
    bn: 'পাসওয়ার্ড ভুলে গেছেন?'
  },
  'auth.noAccount': {
    en: "Don't have an account?",
    bn: 'অ্যাকাউন্ট নেই?'
  },
  'auth.hasAccount': {
    en: 'Already have an account?',
    bn: 'ইতিমধ্যে একটি অ্যাকাউন্ট আছে?'
  },
  'auth.register.button': {
    en: 'Sign Up',
    bn: 'সাইন আপ'
  },
  'auth.register.link': {
    en: 'Sign Up',
    bn: 'সাইন আপ'
  },
  'auth.signIn.button': {
    en: 'Sign In',
    bn: 'সাইন ইন'
  },
  'auth.signIn.link': {
    en: 'Sign In',
    bn: 'সাইন ইন'
  },
  'auth.signIn.success.title': {
    en: 'Sign In Successful',
    bn: 'সাইন ইন সফল'
  },
  'auth.signIn.success.description': {
    en: 'You have successfully signed in!',
    bn: 'আপনি সফলভাবে সাইন ইন করেছেন!'
  },
  'auth.signIn.error.title': {
    en: 'Sign In Failed',
    bn: 'সাইন ইন ব্যর্থ'
  },
  'auth.signIn.error.description': {
    en: 'Failed to sign in. Please check your credentials and try again.',
    bn: 'সাইন ইন করতে ব্যর্থ। আপনার তথ্য চেক করুন এবং আবার চেষ্টা করুন।'
  },
  'auth.register.success.title': {
    en: 'Registration Successful',
    bn: 'নিবন্ধন সফল'
  },
  'auth.register.success.description': {
    en: 'Your account has been successfully created!',
    bn: 'আপনার অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে!'
  },
  'auth.register.error.title': {
    en: 'Registration Failed',
    bn: 'নিবন্ধন ব্যর্থ'
  },
  'auth.register.error.description': {
    en: 'Failed to create your account. Please try again.',
    bn: 'আপনার অ্যাকাউন্ট তৈরি করতে ব্যর্থ। আবার চেষ্টা করুন।'
  },
  'common.loading': {
    en: 'Loading...',
    bn: 'লোড হচ্ছে...'
  }
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
