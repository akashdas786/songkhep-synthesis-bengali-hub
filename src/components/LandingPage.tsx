
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-bengali-cream dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold bengali-heading">
            {t('app.name')}
          </h1>
          <span className="ml-2 text-sm bg-bengali-cream dark:bg-bengali-green/20 px-2 py-0.5 rounded text-bengali-red">
            {t('app.beta')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <div className="space-x-3">
            <Link to="/login">
              <Button variant="outline">{t('app.signIn')}</Button>
            </Link>
            <Link to="/register">
              <Button>{t('app.register')}</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bengali-heading">
              {t('landing.heading')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              {t('landing.subheading')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="px-8 py-6 text-lg">
                  {t('landing.startFree')}
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  {t('landing.signIn')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Features section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-bengali-red/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('landing.feature1.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('landing.feature1.description')}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-bengali-gold/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('landing.feature2.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('landing.feature2.description')}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-bengali-green/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('landing.feature3.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('landing.feature3.description')}
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8">{t('landing.howItWorks')}</h2>
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-bengali-cream dark:bg-bengali-green/20 h-16 w-16 rounded-full flex items-center justify-center mb-4 text-2xl">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">{t('landing.step1.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('landing.step1.description')}
                </p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-bengali-cream dark:bg-bengali-green/20 h-16 w-16 rounded-full flex items-center justify-center mb-4 text-2xl">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">{t('landing.step2.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('landing.step2.description')}
                </p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-bengali-cream dark:bg-bengali-green/20 h-16 w-16 rounded-full flex items-center justify-center mb-4 text-2xl">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">{t('landing.step3.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('landing.step3.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold bengali-heading">{t('app.name')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('landing.copyright')}</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-bengali-red">
                {t('landing.about')}
              </Link>
              <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-bengali-red">
                {t('landing.contact')}
              </Link>
              <Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-bengali-red">
                {t('landing.privacy')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
