
import React from 'react';
import { motion } from 'framer-motion';

export const EmptyState: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col items-center justify-center p-8 glass-card rounded-xl text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        className="mb-6"
      >
        <div className="text-5xl">📝</div>
      </motion.div>
      
      <motion.h3 
        className="text-xl font-medium text-gray-800 dark:text-gray-200 bengali-heading mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        কোন সারাংশ নেই
      </motion.h3>
      
      <motion.p 
        className="text-gray-600 dark:text-gray-400 max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        টেক্সট সংক্ষিপ্ত করতে বাম দিকের ইনপুট ফর্মে আপনার বাংলা টেক্সট লিখুন বা পেস্ট করুন।
      </motion.p>
    </motion.div>
  );
};
