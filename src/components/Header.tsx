
import React from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ThemeSettings } from '@/components/ThemeSettings';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogIn, History as HistoryIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';
import { UserAvatar } from '@/components/UserAvatar';

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onToggleHistory }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <Link to="/" className="flex items-center group">
            <h1 className="text-2xl font-bold bengali-heading group-hover:scale-105 transition-transform">
              {t('app.name')}
            </h1>
            <span className="ml-2 text-sm bg-bengali-cream/70 dark:bg-bengali-green/20 px-2 py-0.5 rounded text-bengali-red backdrop-blur-sm">
              {t('app.beta')}
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-300"
            onClick={onToggleHistory}
          >
            <HistoryIcon className="h-5 w-5" />
            <span className="sr-only">Toggle history</span>
          </Button>
          
          <div className="h-6 w-px bg-gray-200/50 dark:bg-gray-700/50 mx-1 hidden md:block"></div>
          <LanguageToggle />
          <ThemeSettings />
          <ThemeToggle />
          
          {user ? (
            <UserAvatar />
          ) : (
            <Link to="/login">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden md:inline">{t('app.signIn')}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
