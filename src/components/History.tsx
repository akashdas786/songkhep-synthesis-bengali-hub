
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { X, Clock, HistoryIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoryItem {
  id: string;
  text: string;
  summary: string;
  timestamp: Date;
  user_id: string;
  level?: number;
}

interface HistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  activeId: string | null;
  onSelectItem: (item: HistoryItem) => void;
}

export const History: React.FC<HistoryProps> = ({ 
  isOpen, 
  onClose, 
  history, 
  activeId, 
  onSelectItem 
}) => {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* History panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="history-section open"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-800/50">
              <h3 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                {t('sidebar.history')}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close history</span>
              </Button>
            </div>

            {history.length > 0 ? (
              <ScrollArea className="h-full py-2">
                {history.map((item) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    className={`w-full px-4 py-3 text-left border-b border-gray-100 dark:border-gray-800/30 ${
                      activeId === item.id ? 'bg-primary/10' : ''
                    }`}
                    onClick={() => onSelectItem(item)}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="text-sm font-medium line-clamp-2">
                        {item.text.length > 50 ? `${item.text.substring(0, 50)}...` : item.text}
                      </div>
                      {item.level && (
                        <span className="text-xs px-1.5 py-0.5 bg-primary/20 rounded whitespace-nowrap">
                          {item.level}x
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </div>
                  </motion.button>
                ))}
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 p-4">
                <HistoryIcon className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                <p className="text-muted-foreground text-center">{t('sidebar.empty')}</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
