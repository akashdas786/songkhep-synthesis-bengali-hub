
import React, { useState, useEffect } from 'react';
import { TextInput } from '@/components/TextInput';
import { Summary } from '@/components/Summary';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';
import { History } from '@/components/History';
import { summarizeText } from '@/utils/summarize';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface HistoryItem {
  id: string;
  text: string;
  summary: string;
  timestamp: Date;
  user_id: string;
  level: number;
}

const Dashboard: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeItem, setActiveItem] = useState<HistoryItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  // Load history from Supabase on component mount
  useEffect(() => {
    if (!user) return;

    const loadHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('summaries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          // Convert data to HistoryItem format
          const formattedHistory: HistoryItem[] = data.map(item => ({
            id: item.id,
            text: item.text,
            summary: item.summary,
            timestamp: new Date(item.created_at),
            user_id: item.user_id,
            level: 1, // default level if not stored
          }));

          setHistory(formattedHistory);
          // Set the most recent item as active
          setActiveItem(formattedHistory[0]);
        }
      } catch (error) {
        console.error("Error loading history:", error);
      }
    };

    loadHistory();
  }, [user]);

  const handleSubmit = async (text: string, level: number) => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please login to save your summaries",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const summary = await summarizeText(text, level);
      
      // Generate a unique ID for the insert
      const newId = uuidv4();
      
      // Save to Supabase
      const { data: savedItem, error } = await supabase
        .from('summaries')
        .insert({
          id: newId,
          text,
          summary,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;

      const newItem: HistoryItem = {
        id: savedItem.id,
        text,
        summary,
        timestamp: new Date(savedItem.created_at),
        user_id: user.id,
        level,
      };
      
      setHistory(prev => [newItem, ...prev]);
      setActiveItem(newItem);
      
      toast({
        title: t('toast.success.title'),
        description: t('toast.success.description'),
      });

      // Auto-open sidebar on mobile when first item is created
      if (isMobile && history.length === 0) {
        setSidebarOpen(true);
      }
    } catch (error) {
      console.error("Error saving summary:", error);
      toast({
        title: t('toast.error.title'),
        description: t('toast.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleHistory = () => {
    setHistoryOpen(!historyOpen);
  };

  // Create a handler function that correctly handles the type
  const handleSelectItem = (item: HistoryItem) => {
    setActiveItem(item);
  };

  return (
    <div className="min-h-screen bg-background bengali-pattern">
      <Header 
        onToggleSidebar={toggleSidebar}
        onToggleHistory={toggleHistory}  
      />
      
      <div className="relative flex">
        <Sidebar 
          history={history} 
          activeId={activeItem?.id || null}
          onSelectItem={handleSelectItem}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />

        <History
          isOpen={historyOpen}
          onClose={toggleHistory}
          history={history}
          activeId={activeItem?.id || null}
          onSelectItem={handleSelectItem}
        />
        
        <motion.div 
          className="flex-grow p-4 md:p-8 md:pl-4 lg:pl-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <main className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6 h-full">
              <div className="h-full">
                <TextInput 
                  onSubmit={handleSubmit} 
                  isProcessing={isProcessing} 
                />
              </div>
              
              <div className="h-full">
                <AnimatePresence mode="wait">
                  {activeItem ? (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <Summary
                        summary={activeItem.summary}
                        originalText={activeItem.text}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <EmptyState />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </main>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
