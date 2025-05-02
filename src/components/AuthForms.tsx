
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: t('auth.signIn.success.title'),
        description: t('auth.signIn.success.description'),
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: t('auth.signIn.error.title'),
        description: t('auth.signIn.error.description'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-bengali-cream/30 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg p-8 glass-card">
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-3xl font-bold bengali-heading">{t('app.name')}</h1>
          </Link>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{t('auth.signIn.heading')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              {t('auth.email')}
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.emailPlaceholder')}
              required
              disabled={loading}
              className="w-full glass-input"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium">
                {t('auth.password')}
              </label>
              <Link to="/forgot-password" className="text-sm text-bengali-red hover:underline">
                {t('auth.forgotPassword')}
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.passwordPlaceholder')}
              required
              disabled={loading}
              className="w-full glass-input"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('common.loading') : t('auth.signIn.button')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {t('auth.noAccount')}{" "}
            <Link to="/register" className="text-bengali-red hover:underline">
              {t('auth.register.link')}
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
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: t('auth.register.success.title'),
        description: t('auth.register.success.description'),
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        title: t('auth.register.error.title'),
        description: t('auth.register.error.description'),
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
            <h1 className="text-3xl font-bold bengali-heading">{t('app.name')}</h1>
          </Link>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{t('auth.register.heading')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              {t('auth.email')}
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('auth.emailPlaceholder')}
              required
              disabled={loading}
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              {t('auth.password')}
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.passwordCreatePlaceholder')}
              required
              disabled={loading}
              className="w-full"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('common.loading') : t('auth.register.button')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {t('auth.hasAccount')}{" "}
            <Link to="/login" className="text-bengali-red hover:underline">
              {t('auth.signIn.link')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
