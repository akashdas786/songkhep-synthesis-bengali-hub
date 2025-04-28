
import React from 'react';
import { Card } from '@/components/ui/card';

interface SummaryProps {
  summary: string;
  originalText: string;
}

export const Summary: React.FC<SummaryProps> = ({ summary, originalText }) => {
  return (
    <Card className="p-6 shadow-md bg-white dark:bg-gray-900 border-bengali-cream dark:border-bengali-green/20">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">সংক্ষিপ্ত সারাংশ</h3>
          <div className="p-4 bg-bengali-cream/20 dark:bg-bengali-green/10 rounded-md font-bengali text-gray-800 dark:text-gray-200">
            {summary}
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">মূল টেক্সট</h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm font-bengali text-gray-600 dark:text-gray-400 max-h-40 overflow-y-auto">
            {originalText}
          </div>
        </div>
      </div>
    </Card>
  );
};
