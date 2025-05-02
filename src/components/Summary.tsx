
import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

interface SummaryProps {
  summary: string;
  originalText: string;
}

export const Summary: React.FC<SummaryProps> = ({ summary, originalText }) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const handleCopy = (text: string, type: 'summary' | 'original') => {
    navigator.clipboard.writeText(text);
    toast({
      title: t('toast.copy.title'),
      description: type === 'summary' ? t('toast.copy.summary') : t('toast.copy.original'),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full"
    >
      <Card className="p-6 glass-card rounded-xl h-full">
        <div className="space-y-4 flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 bengali-heading">{t('summary.title')}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 h-8 w-8" 
                onClick={() => handleCopy(summary, 'summary')}
                title={t('summary.copy')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 bg-bengali-cream/40 dark:bg-bengali-green/20 backdrop-blur-sm rounded-md font-bengali text-gray-800 dark:text-gray-200 shadow-sm max-h-[40vh] overflow-y-auto">
              {summary}
            </div>
          </motion.div>
          
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400">{t('summary.original')}</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 h-8 w-8" 
                  onClick={() => handleCopy(originalText, 'original')}
                  title={t('summary.copy')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-3 glass-input rounded-md text-sm font-bengali text-gray-600 dark:text-gray-400 max-h-40 overflow-y-auto">
                {originalText}
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
