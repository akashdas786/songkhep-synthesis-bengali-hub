
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { history } from 'lucide-react';

interface HistoryItem {
  id: string;
  text: string;
  summary: string;
  timestamp: Date;
  user_id: string;
  level?: number;
}

interface SidebarProps {
  history: HistoryItem[];
  activeId: string | null;
  onSelectItem: (item: HistoryItem) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  history,
  activeId,
  onSelectItem,
  isOpen,
  onToggle,
}) => {
  const { t } = useLanguage();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed inset-y-0 left-0 z-20 flex flex-col w-64 lg:w-72 bg-sidebar glass border-r border-sidebar-border shadow-xl",
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border/50 backdrop-blur-sm">
              <h2 className="text-lg font-medium text-sidebar-foreground bengali-heading flex items-center gap-2">
                <history className="h-5 w-5" />
                {t('sidebar.history')}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="lg:hidden"
                aria-label="Close sidebar"
              >
                ✕
              </Button>
            </div>

            {history.length > 0 ? (
              <ScrollArea className="flex-grow">
                <div className="py-2">
                  {history.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      onClick={() => onSelectItem(item)}
                      className={cn(
                        "w-full px-4 py-3 text-left hover:bg-sidebar-accent/30 transition-all duration-200",
                        activeId === item.id && "bg-sidebar-accent/50 backdrop-blur-sm"
                      )}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="text-sm font-medium line-clamp-2 font-bengali text-sidebar-foreground">
                          {item.text.length > 50 ? `${item.text.substring(0, 50)}...` : item.text}
                        </div>
                        {item.level && (
                          <span className="text-xs px-1.5 py-0.5 bg-bengali-red/20 text-bengali-red rounded ml-1 whitespace-nowrap">
                            {item.level}x
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-sidebar-foreground/70 mt-1">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex-grow flex items-center justify-center p-6 text-center">
                <motion.p 
                  className="text-sidebar-foreground/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {t('sidebar.empty')}
                </motion.p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Toggle button for desktop */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`fixed left-0 top-20 z-10 p-2 bg-sidebar-accent/70 hover:bg-sidebar-accent text-sidebar-foreground rounded-r-md shadow-md backdrop-blur-sm hidden lg:flex items-center justify-center ${isOpen ? 'lg:hidden' : ''}`}
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <history className="h-5 w-5" />
      </motion.button>
    </>
  );
};
