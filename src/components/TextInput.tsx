
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Copy } from 'lucide-react';

interface TextInputProps {
  onSubmit: (text: string, level: number) => void;
  isProcessing: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ onSubmit, isProcessing }) => {
  const [text, setText] = useState('');
  const [level, setLevel] = useState(3); // Default level is 3x
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text, level);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="p-6 glass-card rounded-xl h-full flex flex-col">
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col flex-1">
          <div className="space-y-2 flex-1">
            <motion.label 
              htmlFor="input-text" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {t('input.label')}
            </motion.label>
            <Textarea
              id="input-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('input.placeholder')}
              className="min-h-[200px] font-bengali glass-input rounded-lg flex-1"
              dir="auto"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col xs:flex-row justify-between items-center gap-4">
              <div className="w-full">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  {t('summarize.level')}
                </label>
                <div className="flex gap-2 justify-between">
                  {[2, 3, 5].map((l) => (
                    <Button
                      key={l}
                      type="button"
                      variant={level === l ? "default" : "outline"}
                      className={`flex-1 ${level === l ? 'bg-bengali-red hover:bg-bengali-red/90' : ''}`}
                      onClick={() => setLevel(l)}
                    >
                      {l}x
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Button 
                type="submit" 
                disabled={!text.trim() || isProcessing}
                className="w-full bg-bengali-red hover:bg-bengali-red/90 text-white transition-colors shadow-md"
              >
                {isProcessing ? 
                  <span className="flex items-center">
                    <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                    {t('summarize.processing')}
                  </span> : 
                  t('summarize.button')
                }
              </Button>
            </motion.div>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};
