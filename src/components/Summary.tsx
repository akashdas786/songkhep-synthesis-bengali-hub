
import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface SummaryProps {
  summary: string;
  originalText: string;
}

export const Summary: React.FC<SummaryProps> = ({ summary, originalText }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 glass-card rounded-xl">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 bengali-heading">সংক্ষিপ্ত সারাংশ</h3>
            <div className="p-4 bg-bengali-cream/40 dark:bg-bengali-green/20 backdrop-blur-sm rounded-md font-bengali text-gray-800 dark:text-gray-200 shadow-sm">
              {summary}
            </div>
          </motion.div>
          
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">মূল টেক্সট</h4>
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
