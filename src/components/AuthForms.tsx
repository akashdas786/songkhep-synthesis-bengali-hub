
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "সাইন ইন সফল",
        description: "আপনি সফলভাবে সাইন ইন করেছেন",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "সাইন ইন ব্যর্থ",
        description: "দয়া করে আবার চেষ্টা করুন",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-bengali-cream/30 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-3xl font-bold bengali-heading">সংক্ষেপ</h1>
          </Link>
          <p className="mt-2 text-gray-600 dark:text-gray-300">আপনার অ্যাকাউন্টে সাইন ইন করুন</p>
        </div>

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
              className="w-full"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium">
                পাসওয়ার্ড
              </label>
              <Link to="/forgot-password" className="text-sm text-bengali-red hover:underline">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="আপনার পাসওয়ার্ড"
              required
              disabled={loading}
              className="w-full"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "লোড হচ্ছে..." : "সাইন ইন করুন"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            অ্যাকাউন্ট নেই?{" "}
            <Link to="/register" className="text-bengali-red hover:underline">
              রেজিস্ট্রেশন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "রেজিস্ট্রেশন সফল",
        description: "দয়া করে আপনার ইমেইল চেক করুন",
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        title: "রেজিস্ট্রেশন ব্যর্থ",
        description: "দয়া করে আবার চেষ্টা করুন",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-bengali-cream/30 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-3xl font-bold bengali-heading">সংক্ষেপ</h1>
          </Link>
          <p className="mt-2 text-gray-600 dark:text-gray-300">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

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
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              পাসওয়ার্ড
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="পাসওয়ার্ড তৈরি করুন"
              required
              disabled={loading}
              className="w-full"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "লোড হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link to="/login" className="text-bengali-red hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
