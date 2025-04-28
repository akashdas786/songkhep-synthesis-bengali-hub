
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface TextInputProps {
  onSubmit: (text: string) => void;
  isProcessing: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ onSubmit, isProcessing }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <Card className="p-6 shadow-md bg-white dark:bg-gray-900 border-bengali-cream dark:border-bengali-green/20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="input-text" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter Bengali Text
          </label>
          <Textarea
            id="input-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="আপনার বাংলা টেক্সট এখানে লিখুন..."
            className="min-h-[200px] font-bengali"
            dir="auto"
          />
        </div>
        <Button 
          type="submit" 
          disabled={!text.trim() || isProcessing}
          className="w-full bg-bengali-red hover:bg-bengali-red/90 text-white transition-colors"
        >
          {isProcessing ? 'সংক্ষিপ্ত করা হচ্ছে...' : 'সংক্ষিপ্ত করুন'}
        </Button>
      </form>
    </Card>
  );
};
