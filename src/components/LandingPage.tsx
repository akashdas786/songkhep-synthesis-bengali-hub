
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-bengali-cream dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold bengali-heading">সংক্ষেপ</h1>
          <span className="ml-2 text-sm bg-bengali-cream dark:bg-bengali-green/20 px-2 py-0.5 rounded text-bengali-red">
            বেটা
          </span>
        </div>
        <div className="space-x-3">
          <Link to="/login">
            <Button variant="outline">সাইন ইন</Button>
          </Link>
          <Link to="/register">
            <Button>রেজিস্ট্রেশন</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bengali-heading">
              বাংলা টেক্সট সংক্ষিপ্ত করুন সহজেই
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              আমাদের এআই-চালিত টুল ব্যবহার করে যেকোনো বাংলা টেক্সট দ্রুত ও নির্ভুলভাবে সংক্ষিপ্ত করুন
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="px-8 py-6 text-lg">
                  বিনামূল্যে শুরু করুন
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  সাইন ইন করুন
                </Button>
              </Link>
            </div>
          </div>

          {/* Features section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-bengali-red/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-2">দ্রুত সংক্ষিপ্তকরণ</h3>
              <p className="text-gray-600 dark:text-gray-300">
                সেকেন্ডের মধ্যে আপনার দীর্ঘ টেক্সট সংক্ষিপ্ত করুন, সময় বাঁচান
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-bengali-gold/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-2">সঠিক সংক্ষিপ্তকরণ</h3>
              <p className="text-gray-600 dark:text-gray-300">
                কৃত্রিম বুদ্ধিমত্তা দিয়ে সবচেয়ে গুরুত্বপূর্ণ বিষয়বস্তু বজায় রাখুন
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-bengali-green/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold mb-2">সকল ডিভাইসে</h3>
              <p className="text-gray-600 dark:text-gray-300">
                যেকোনো ডিভাইস থেকে ব্যবহার করুন, সর্বদা আপনার সাথে থাকুন
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8">কিভাবে কাজ করে</h2>
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-bengali-cream dark:bg-bengali-green/20 h-16 w-16 rounded-full flex items-center justify-center mb-4 text-2xl">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">টেক্সট পেস্ট করুন</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  আপনার সংক্ষিপ্ত করতে চাওয়া টেক্সট পেস্ট করুন
                </p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-bengali-cream dark:bg-bengali-green/20 h-16 w-16 rounded-full flex items-center justify-center mb-4 text-2xl">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">সংক্ষিপ্ত করুন</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  বাটন ক্লিক করে সংক্ষিপ্তকরণ শুরু করুন
                </p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="bg-bengali-cream dark:bg-bengali-green/20 h-16 w-16 rounded-full flex items-center justify-center mb-4 text-2xl">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">ফলাফল পান</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  সংক্ষিপ্ত টেক্সট কপি করুন বা সেভ করুন
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold bengali-heading">সংক্ষেপ</h2>
              <p className="text-gray-600 dark:text-gray-300">© 2025 সংক্ষেপ। সর্বস্বত্ব সংরক্ষিত।</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-bengali-red">
                আমাদের সম্পর্কে
              </Link>
              <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-bengali-red">
                যোগাযোগ
              </Link>
              <Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-bengali-red">
                গোপনীয়তা নীতি
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
