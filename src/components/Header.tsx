
import React from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bengali-heading">
              সংক্ষেপ
            </h1>
            <span className="ml-2 text-sm bg-bengali-cream dark:bg-bengali-green/20 px-2 py-0.5 rounded text-bengali-red">
              বেটা
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <Button 
            variant="outline" 
            className="hidden md:inline-flex"
          >
            সাইন ইন
          </Button>
        </div>
      </div>
    </header>
  );
};
