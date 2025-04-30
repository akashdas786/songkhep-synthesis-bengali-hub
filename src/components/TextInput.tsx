
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 glass-card rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <motion.label 
              htmlFor="input-text" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Enter Bengali Text
            </motion.label>
            <Textarea
              id="input-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="আপনার বাংলা টেক্সট এখানে লিখুন..."
              className="min-h-[200px] font-bengali glass-input rounded-lg"
              dir="auto"
            />
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              disabled={!text.trim() || isProcessing}
              className="w-full bg-bengali-red hover:bg-bengali-red/90 text-white transition-colors shadow-md"
            >
              {isProcessing ? 
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  সংক্ষিপ্ত করা হচ্ছে...
                </span> : 
                'সংক্ষিপ্ত করুন'
              }
            </Button>
          </motion.div>
        </form>
      </Card>
    </motion.div>
  );
};
