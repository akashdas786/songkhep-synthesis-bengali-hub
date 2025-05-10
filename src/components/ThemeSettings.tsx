
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';
import { Check, Palette, X } from 'lucide-react';

interface ColorOptionProps {
  color: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

const ColorOption: React.FC<ColorOptionProps> = ({ color, name, isSelected, onClick }) => (
  <button
    className="relative rounded-full w-10 h-10 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    style={{ backgroundColor: color }}
    onClick={onClick}
    title={name}
  >
    {isSelected && (
      <Check className="absolute inset-0 m-auto text-white" size={16} />
    )}
  </button>
);

export const ThemeSettings: React.FC = () => {
  const { theme, setThemeColor } = useTheme();
  const { t } = useLanguage();
  const [customColor, setCustomColor] = useState(theme.customColor || '#E63946');
  const [isOpen, setIsOpen] = useState(false);

  const themeColors = [
    { name: 'Red', id: 'red', color: '#E63946' },
    { name: 'Green', id: 'green', color: '#2A9D8F' },
    { name: 'Purple', id: 'purple', color: '#8E44AD' },
    { name: 'Blue', id: 'blue', color: '#457B9D' },
  ];

  const handleColorChange = (colorId: 'red' | 'green' | 'purple' | 'blue') => {
    setThemeColor(colorId);
    setIsOpen(false);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
  };

  const applyCustomColor = () => {
    setThemeColor('custom', customColor);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full transition-colors hover:bg-bengali-cream/10 dark:hover:bg-bengali-green/20"
        >
          <Palette className="h-5 w-5" style={{ color: theme.color === 'custom' ? theme.customColor : undefined }} />
          <span className="sr-only">Theme settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-dropdown">
        <DialogHeader className="flex items-start justify-between">
          <DialogTitle className="bengali-heading">Color Theme</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <Tabs defaultValue="preset">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preset">Preset Colors</TabsTrigger>
            <TabsTrigger value="custom">Custom Color</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preset" className="mt-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {themeColors.map((themeColor) => (
                <ColorOption
                  key={themeColor.id}
                  color={themeColor.color}
                  name={themeColor.name}
                  isSelected={theme.color === themeColor.id}
                  onClick={() => handleColorChange(themeColor.id as any)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="mt-4">
            <div className="flex flex-col items-center gap-4">
              <input
                type="color"
                value={customColor}
                onChange={handleCustomColorChange}
                className="w-24 h-24 rounded-full cursor-pointer"
              />
              <div className="text-sm text-muted-foreground">{customColor}</div>
              <Button 
                variant="default" 
                className="mt-2"
                onClick={applyCustomColor}
              >
                Apply Custom Color
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
