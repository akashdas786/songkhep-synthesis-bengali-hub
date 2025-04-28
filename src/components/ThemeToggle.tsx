
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      onClick={toggleTheme} 
      variant="ghost" 
      size="icon"
      className="rounded-full transition-colors hover:bg-bengali-cream/10 dark:hover:bg-bengali-green/20"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-bengali-green" />
      ) : (
        <Sun className="h-5 w-5 text-bengali-gold" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
