
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface HistoryItem {
  id: string;
  text: string;
  summary: string;
  timestamp: Date;
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
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col w-64 lg:w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0" // Always visible on large screens
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-medium text-sidebar-foreground">আপনার ইতিহাস</h2>
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
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={cn(
                  "w-full px-4 py-3 text-left hover:bg-sidebar-accent transition-colors",
                  activeId === item.id && "bg-sidebar-accent"
                )}
              >
                <div className="text-sm font-medium line-clamp-2 font-bengali text-sidebar-foreground">
                  {item.text.length > 50 ? `${item.text.substring(0, 50)}...` : item.text}
                </div>
                <div className="text-xs text-sidebar-foreground/70">
                  {new Date(item.timestamp).toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex-grow flex items-center justify-center p-6 text-center">
          <p className="text-sidebar-foreground/70">কোন সংক্ষিপ্ত ইতিহাস নেই</p>
        </div>
      )}
    </div>
  );
};
