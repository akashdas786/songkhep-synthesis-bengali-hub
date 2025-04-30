
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "পাসওয়ার্ড মিলছে না",
        description: "দুটি পাসওয়ার্ড একই হতে হবে",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "পাসওয়ার্ড পরিবর্তন সফল",
        description: "আপনি এখন নতুন পাসওয়ার্ড দিয়ে সাইন ইন করতে পারবেন",
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "পাসওয়ার্ড পরিবর্তন ব্যর্থ",
        description: "দয়া করে আবার চেষ্টা করুন বা সাইন ইন করে পুনরায় চেষ্টা করুন",
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
            নতুন পাসওয়ার্ড সেট করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              নতুন পাসওয়ার্ড
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="নতুন পাসওয়ার্ড"
              required
              disabled={loading}
              className="w-full glass-input"
              minLength={6}
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="পাসওয়ার্ড আবার লিখুন"
              required
              disabled={loading}
              className="w-full glass-input"
              minLength={6}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "পরিবর্তন হচ্ছে..." : "পাসওয়ার্ড পরিবর্তন করুন"}
          </Button>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-bengali-red hover:underline">
              সাইন ইন পেজে ফিরে যান
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
