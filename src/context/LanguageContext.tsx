import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Language = 'en' | 'bn';

type Translations = {
  [key: string]: {
    en: string;
    bn: string;
  };
};

const translations: Translations = {
  'app.name': {
    en: 'Sankkhep',
    bn: 'সংক্ষেপ'
  },
  'app.tagline': {
    en: 'Learn Bengali through technology',
    bn: 'প্রযুক্তির মাধ্যমে বাংলা শিখুন'
  },
  'nav.home': {
    en: 'Home',
    bn: 'হোম'
  },
  'nav.profile': {
    en: 'Edit Profile',
    bn: 'প্রোফাইল সম্পাদনা'
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
  'app.beta': {
    en: 'BETA',
    bn: 'বেটা'
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
  'profile.title': {
    en: 'Edit Profile',
    bn: 'প্রোফাইল সম্পাদনা'
  },
  'profile.name': {
    en: 'Name',
    bn: 'নাম'
  },
  'profile.email': {
    en: 'Email',
    bn: 'ইমেল'
  },
  'profile.photo': {
    en: 'Profile Photo',
    bn: 'প্রোফাইল ছবি'
  },
  'profile.upload': {
    en: 'Upload Photo',
    bn: 'ছবি আপলোড করুন'
  },
  'profile.uploading': {
    en: 'Uploading...',
    bn: 'আপলোড হচ্ছে...'
  },
  'profile.photo.uploaded': {
    en: 'Photo uploaded successfully',
    bn: 'ছবি সফলভাবে আপলোড করা হয়েছে'
  },
  'profile.photo.error': {
    en: 'Error uploading photo',
    bn: 'ছবি আপলোড করতে ত্রুটি'
  },
  'profile.save': {
    en: 'Save Changes',
    bn: 'পরিবর্তন সংরক্ষণ করুন'
  },
  'profile.success': {
    en: 'Profile updated successfully',
    bn: 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে'
  },
  'profile.error': {
    en: 'Failed to update profile',
    bn: 'প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে'
  },
  'profile.description': {
    en: 'Update your profile information',
    bn: 'আপনার প্রোফাইল তথ্য আপডেট করুন'
  },
  'common.loading': {
    en: 'Loading...',
    bn: 'লোড হচ্ছে...'
  },
  'toast.success.title': {
    en: 'Success',
    bn: 'সফল'
  },
  'toast.success.description': {
    en: 'Your text has been summarized successfully.',
    bn: 'আপনার টেক্সট সফলভাবে সংক্ষিপ্ত করা হয়েছে।'
  },
  'toast.error.title': {
    en: 'Error',
    bn: 'ত্রুটি'
  },
  'toast.error.description': {
    en: 'There was an error summarizing your text. Please try again.',
    bn: 'আপনার টেক্সট সংক্ষিপ্ত করার সময় একটি ত্রুটি ছিল। অনুগ্রহ করে আবার চেষ্টা করুন।'
  },
  'toast.copy.title': {
    en: 'Copied',
    bn: 'কপি করা হয়েছে'
  },
  'toast.copy.summary': {
    en: 'Summary copied to clipboard',
    bn: 'সারাংশ ক্লিপবোর্ডে কপি করা হয়েছে'
  },
  'toast.copy.original': {
    en: 'Original text copied to clipboard',
    bn: 'মূল টেক্সট ক্লিপবোর্ডে কপি করা হয়েছে'
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
  'landing.heading': {
    en: 'Simplify Bengali Text with AI',
    bn: 'এআই দিয়ে বাংলা টেক্সট সরলীকরণ করুন'
  },
  'landing.subheading': {
    en: 'Transform complex Bengali text into clear, concise summaries instantly',
    bn: 'জটিল বাংলা টেক্সট তাৎক্ষণিকভাবে পরিষ্কার, সংক্ষিপ্ত সারাংশে রূপান্তর করুন'
  },
  'landing.startFree': {
    en: 'Start for Free',
    bn: 'বিনামূল্যে শুরু করুন'
  },
  'landing.signIn': {
    en: 'Sign In',
    bn: 'সাইন ইন'
  },
  'landing.cta': {
    en: 'Get Started',
    bn: 'শুরু করুন'
  },
  'landing.feature1.title': {
    en: 'Fast Processing',
    bn: 'দ্রুত প্রক্রিয়াকরণ'
  },
  'landing.feature1.description': {
    en: 'Get instant summaries of your Bengali text in just seconds',
    bn: 'মাত্র কয়েক সেকেন্ডে আপনার বাংলা টেক্সটের তাৎক্ষণিক সারাংশ পান'
  },
  'landing.feature2.title': {
    en: 'Accurate Results',
    bn: 'সঠিক ফলাফল'
  },
  'landing.feature2.description': {
    en: 'Our AI understands Bengali context and nuances for better summaries',
    bn: 'আমাদের এআই বাংলা প্রসঙ্গ এবং সূক্ষ্মতা বোঝে ভালো সারাংশের জন্য'
  },
  'landing.feature3.title': {
    en: 'Mobile Friendly',
    bn: 'মোবাইল বান্ধব'
  },
  'landing.feature3.description': {
    en: 'Use on any device, anytime, anywhere with our responsive design',
    bn: 'আমাদের প্রতিক্রিয়াশীল ডিজাইনের সাথে যেকোনো ডিভাইসে, যেকোনো সময়, যেকোনো জায়গায় ব্যবহার করুন'
  },
  'landing.howItWorks': {
    en: 'How It Works',
    bn: 'এটি কীভাবে কাজ করে'
  },
  'landing.step1.title': {
    en: 'Paste Your Text',
    bn: 'আপনার টেক্সট পেস্ট করুন'
  },
  'landing.step1.description': {
    en: 'Enter or paste the Bengali text you want to summarize',
    bn: 'আপনি যে বাংলা টেক্সট সংক্ষিপ্ত করতে চান তা লিখুন বা পেস্ট করুন'
  },
  'landing.step2.title': {
    en: 'Choose Options',
    bn: 'বিকল্পগুলি বেছে নিন'
  },
  'landing.step2.description': {
    en: 'Select your desired summary length and style',
    bn: 'আপনার পছন্দসই সারাংশের দৈর্ঘ্য এবং শৈলী নির্বাচন করুন'
  },
  'landing.step3.title': {
    en: 'Get Summary',
    bn: 'সারাংশ পান'
  },
  'landing.step3.description': {
    en: 'Receive your polished Bengali summary instantly',
    bn: 'আপনার মসৃণ বাংলা সারাংশ অবিলম্বে পান'
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
  'landing.copyright': {
    en: '© 2023 BengaliBytes. All rights reserved.',
    bn: '© ২০২৩ বাংলা বাইটস। সর্বস্বত্ব সংরক্ষিত।'
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
  'input.label': {
    en: 'Enter your Bengali text',
    bn: 'আপনার বাংলা টেক্সট লিখুন'
  },
  'input.placeholder': {
    en: 'Paste or type your Bengali text here...',
    bn: 'আপনার বাংলা টেক্সট এখানে পেস্ট করুন বা টাইপ করুন...'
  },
  'summarize.level': {
    en: 'Summary Length',
    bn: 'সারাংশের দৈর্ঘ্য'
  },
  'summarize.processing': {
    en: 'Processing...',
    bn: 'প্রক্রিয়া করা হচ্ছে...'
  },
  'summarize.button': {
    en: 'Summarize',
    bn: 'সংক্ষিপ্ত করুন'
  },
  'summary.title': {
    en: 'Summary',
    bn: 'সারাংশ'
  },
  'summary.original': {
    en: 'Original Text',
    bn: 'মূল টেক্সট'
  },
  'summary.copy': {
    en: 'Copy to clipboard',
    bn: 'ক্লিপবোর্ডে কপি করুন'
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Try to get language preference from localStorage
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'bn')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
