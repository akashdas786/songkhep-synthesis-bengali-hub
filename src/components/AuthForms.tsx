
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Define login form schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setAuthError(null);
    
    try {
      const { error } = await signIn(values.email, values.password);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: t('auth.signIn.success.title'),
        description: t('auth.signIn.success.description'),
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      setAuthError(error.message || t('auth.signIn.error.description'));
      toast({
        title: t('auth.signIn.error.title'),
        description: error.message || t('auth.signIn.error.description'),
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

        {authError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.email')}</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email" 
                      placeholder={t('auth.emailPlaceholder')}
                      disabled={loading}
                      className="glass-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <FormLabel htmlFor="password">{t('auth.password')}</FormLabel>
                <Link to="/forgot-password" className="text-sm text-bengali-red hover:underline">
                  {t('auth.forgotPassword')}
                </Link>
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password" 
                        placeholder={t('auth.passwordPlaceholder')}
                        disabled={loading}
                        className="glass-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('common.loading') : t('auth.signIn.button')}
            </Button>
          </form>
        </Form>

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

// Define registration form schema with password confirmation
const registerSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    setAuthError(null);
    
    try {
      const { error } = await signUp(values.email, values.password);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: t('auth.register.success.title'),
        description: t('auth.register.success.description'),
      });
      
      navigate('/login');
    } catch (error: any) {
      setAuthError(error.message || t('auth.register.error.description'));
      toast({
        title: t('auth.register.error.title'),
        description: error.message || t('auth.register.error.description'),
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
          <p className="mt-2 text-gray-600 dark:text-gray-300">{t('auth.register.heading')}</p>
        </div>

        {authError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.email')}</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email" 
                      placeholder={t('auth.emailPlaceholder')}
                      disabled={loading}
                      className="glass-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.password')}</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="password" 
                      placeholder={t('auth.passwordCreatePlaceholder')}
                      disabled={loading}
                      className="glass-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.confirmPassword')}</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="password" 
                      placeholder={t('auth.confirmPasswordPlaceholder')}
                      disabled={loading}
                      className="glass-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('common.loading') : t('auth.register.button')}
            </Button>
          </form>
        </Form>

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
