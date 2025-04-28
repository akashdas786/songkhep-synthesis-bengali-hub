
import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="h-24 w-24 rounded-full bg-bengali-cream dark:bg-bengali-green/20 flex items-center justify-center mb-6">
        <span className="text-4xl">📝</span>
      </div>
      <h3 className="text-xl font-bold bengali-heading mb-2">স্বাগতম "সংক্ষেপ" এ</h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md">
        বাংলা ভাষার টেক্সট সংক্ষেপ করতে বাম দিকের ফর্মটি ব্যবহার করুন। ফলাফল এখানে প্রদর্শিত হবে।
      </p>
    </div>
  );
};
