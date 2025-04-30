
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      setSubmitted(true);
      toast({
        title: "পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে",
        description: "আপনার ইমেইল চেক করুন",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "পাসওয়ার্ড রিসেট ব্যর্থ",
        description: "দয়া করে আবার চেষ্টা করুন",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-bengali-cream/30 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg p-8 glass-card"
      >
        <div className="text-center mb-8">
          <Link to="/">
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold bengali-heading"
            >
              সংক্ষেপ
            </motion.h1>
          </Link>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {submitted 
              ? "আপনার ইমেইল চেক করুন পাসওয়ার্ড রিসেট লিংকের জন্য"
              : "পাসওয়ার্ড রিসেট করতে আপনার ইমেইল দিন"
            }
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                ইমেইল
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল"
                required
                disabled={loading}
                className="w-full glass-input"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "পাঠানো হচ্ছে..." : "রিসেট লিংক পাঠান"}
            </Button>

            <div className="mt-4 text-center">
              <Link to="/login" className="text-bengali-red hover:underline">
                সাইন ইন পেজে ফিরে যান
              </Link>
            </div>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <div className="mb-4 flex justify-center">
              <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে। অনুগ্রহ করে আপনার ইমেইল চেক করুন।
            </p>
            <Button
              variant="outline"
              onClick={() => setSubmitted(false)}
              className="mt-4"
            >
              আবার চেষ্টা করুন
            </Button>
            <div className="mt-4">
              <Link to="/login" className="text-bengali-red hover:underline">
                সাইন ইন পেজে ফিরে যান
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
