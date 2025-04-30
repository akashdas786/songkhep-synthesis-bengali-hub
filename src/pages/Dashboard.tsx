
import React, { useState, useEffect } from 'react';
import { TextInput } from '@/components/TextInput';
import { Summary } from '@/components/Summary';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';
import { summarizeText } from '@/utils/summarize';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import type { Database } from '@/integrations/supabase/types';

interface HistoryItem {
  id: string;
  text: string;
  summary: string;
  timestamp: Date;
  user_id: string;
}

const Dashboard: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeItem, setActiveItem] = useState<HistoryItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load existing summaries when component mounts and user is authenticated
  useEffect(() => {
    const loadSummaries = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('summaries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error loading summaries:', error);
          return;
        }
        
        if (data) {
          const formattedData = data.map(item => ({
            id: item.id,
            text: item.text,
            summary: item.summary,
            timestamp: new Date(item.created_at),
            user_id: item.user_id
          }));
          
          setHistory(formattedData);
          
          // Set active item to the most recent summary if available
          if (formattedData.length > 0) {
            setActiveItem(formattedData[0]);
          }
        }
      } catch (error) {
        console.error('Failed to load summaries:', error);
      }
    };
    
    loadSummaries();
  }, [user]);

  const handleSubmit = async (text: string) => {
    setIsProcessing(true);
    
    try {
      const summary = await summarizeText(text);
      
      const newItem: HistoryItem = {
        id: uuidv4(),
        text,
        summary,
        timestamp: new Date(),
        user_id: user?.id || '',
      };
      
      // Save summary to Supabase if user is authenticated
      if (user) {
        const { error } = await supabase
          .from('summaries')
          .insert({
            id: newItem.id,
            text: newItem.text,
            summary: newItem.summary,
            user_id: user.id,
          });
        
        if (error) {
          console.error('Error saving summary:', error);
          toast({
            title: "সংরক্ষণে সমস্যা",
            description: "সারাংশ সংরক্ষণ করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
            variant: "destructive",
          });
          return;
        }
      }
      
      setHistory(prev => [newItem, ...prev]);
      setActiveItem(newItem);
      
      toast({
        title: "সংক্ষিপ্তকরণ সম্পন্ন হয়েছে!",
        description: "আপনার টেক্সট সফলভাবে সংক্ষিপ্ত করা হয়েছে।",
      });
    } catch (error) {
      toast({
        title: "সমস্যা দেখা দিয়েছে",
        description: "টেক্সট সংক্ষিপ্তকরণে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background bengali-pattern">
      <Header onToggleSidebar={toggleSidebar} />
      
      <div className="relative">
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-10 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
        
        <Sidebar 
          history={history} 
          activeId={activeItem?.id || null}
          onSelectItem={setActiveItem}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />
        
        <div className="lg:pl-72 p-4 md:p-8">
          <main className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <TextInput 
                  onSubmit={handleSubmit} 
                  isProcessing={isProcessing} 
                />
              </div>
              
              <div>
                {activeItem ? (
                  <Summary
                    summary={activeItem.summary}
                    originalText={activeItem.text}
                  />
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
