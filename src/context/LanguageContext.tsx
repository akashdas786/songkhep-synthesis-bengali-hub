
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
    'app.register': 'Register',
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
    
    // Landing page
    'landing.heading': 'Summarize Bengali Text Easily',
    'landing.subheading': 'Use our AI-powered tool to quickly and accurately summarize any Bengali text',
    'landing.startFree': 'Start for Free',
    'landing.signIn': 'Sign In',
    
    'landing.feature1.title': 'Fast Summarization',
    'landing.feature1.description': 'Summarize your long text in seconds, saving you time',
    'landing.feature2.title': 'Accurate Summaries',
    'landing.feature2.description': 'AI-powered technology preserves the most important content',
    'landing.feature3.title': 'All Devices',
    'landing.feature3.description': 'Use from any device, always with you',
    
    'landing.howItWorks': 'How It Works',
    'landing.step1.title': 'Paste Text',
    'landing.step1.description': 'Paste the text you want to summarize',
    'landing.step2.title': 'Summarize',
    'landing.step2.description': 'Click the button to start summarization',
    'landing.step3.title': 'Get Results',
    'landing.step3.description': 'Copy or save your summarized text',
    
    'landing.copyright': '© 2025 Songkkhep. All rights reserved.',
    'landing.about': 'About Us',
    'landing.contact': 'Contact',
    'landing.privacy': 'Privacy Policy',
    
    // Auth forms
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.resetPassword': 'Reset Password',
    'auth.sendResetLink': 'Send Reset Link',
    'auth.newPassword': 'New Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.alreadyAccount': 'Already have an account?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.resetInstructions': 'Enter your email and we\'ll send you a link to reset your password',
  },
  bn: {
    // General
    'app.name': 'সংক্ষেপ',
    'app.beta': 'বেটা',
    'app.signIn': 'সাইন ইন',
    'app.signOut': 'সাইন আউট',
    'app.register': 'রেজিস্ট্রেশন',
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
    
    // Landing page
    'landing.heading': 'বাংলা টেক্সট সংক্ষিপ্ত করুন সহজেই',
    'landing.subheading': 'আমাদের এআই-চালিত টুল ব্যবহার করে যেকোনো বাংলা টেক্সট দ্রুত ও নির্ভুলভাবে সংক্ষিপ্ত করুন',
    'landing.startFree': 'বিনামূল্যে শুরু করুন',
    'landing.signIn': 'সাইন ইন করুন',
    
    'landing.feature1.title': 'দ্রুত সংক্ষিপ্তকরণ',
    'landing.feature1.description': 'সেকেন্ডের মধ্যে আপনার দীর্ঘ টেক্সট সংক্ষিপ্ত করুন, সময় বাঁচান',
    'landing.feature2.title': 'সঠিক সংক্ষিপ্তকরণ',
    'landing.feature2.description': 'কৃত্রিম বুদ্ধিমত্তা দিয়ে সবচেয়ে গুরুত্বপূর্ণ বিষয়বস্তু বজায় রাখুন',
    'landing.feature3.title': 'সকল ডিভাইসে',
    'landing.feature3.description': 'যেকোনো ডিভাইস থেকে ব্যবহার করুন, সর্বদা আপনার সাথে থাকুন',
    
    'landing.howItWorks': 'কিভাবে কাজ করে',
    'landing.step1.title': 'টেক্সট পেস্ট করুন',
    'landing.step1.description': 'আপনার সংক্ষিপ্ত করতে চাওয়া টেক্সট পেস্ট করুন',
    'landing.step2.title': 'সংক্ষিপ্ত করুন',
    'landing.step2.description': 'বাটন ক্লিক করে সংক্ষিপ্তকরণ শুরু করুন',
    'landing.step3.title': 'ফলাফল পান',
    'landing.step3.description': 'সংক্ষিপ্ত টেক্সট কপি করুন বা সেভ করুন',
    
    'landing.copyright': '© ২০২৫ সংক্ষেপ। সর্বস্বত্ব সংরক্ষিত।',
    'landing.about': 'আমাদের সম্পর্কে',
    'landing.contact': 'যোগাযোগ',
    'landing.privacy': 'গোপনীয়তা নীতি',
    
    // Auth forms
    'auth.email': 'ইমেইল',
    'auth.password': 'পাসওয়ার্ড',
    'auth.login': 'লগইন',
    'auth.register': 'রেজিস্ট্রেশন',
    'auth.forgotPassword': 'পাসওয়ার্ড ভুলে গেছেন?',
    'auth.resetPassword': 'পাসওয়ার্ড রিসেট করুন',
    'auth.sendResetLink': 'রিসেট লিঙ্ক পাঠান',
    'auth.newPassword': 'নতুন পাসওয়ার্ড',
    'auth.confirmPassword': 'পাসওয়ার্ড নিশ্চিত করুন',
    'auth.alreadyAccount': 'ইতিমধ্যে একাউন্ট আছে?',
    'auth.noAccount': 'একাউন্ট নেই?',
    'auth.resetInstructions': 'আপনার ইমেইল দিন, আমরা আপনাকে পাসওয়ার্ড রিসেট করার লিঙ্ক পাঠাবো',
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
