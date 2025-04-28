
import React, { useState } from 'react';
import { TextInput } from '@/components/TextInput';
import { Summary } from '@/components/Summary';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';
import { ThemeProvider } from '@/context/ThemeContext';
import { summarizeText } from '@/utils/summarize';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface HistoryItem {
  id: string;
  text: string;
  summary: string;
  timestamp: Date;
  user_id: string; // Added the user_id property to match Dashboard.tsx
}

const Index: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeItem, setActiveItem] = useState<HistoryItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (text: string) => {
    setIsProcessing(true);
    
    try {
      const summary = await summarizeText(text);
      
      const newItem: HistoryItem = {
        id: uuidv4(),
        text,
        summary,
        timestamp: new Date(),
        user_id: 'guest', // We'll use 'guest' for non-authenticated users
      };
      
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
    <ThemeProvider>
      <div className="min-h-screen bg-background bengali-pattern">
        <Header onToggleSidebar={toggleSidebar} />
        
        <div className="relative">
          {/* Mobile sidebar backdrop */}
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
    </ThemeProvider>
  );
};

export default Index;
