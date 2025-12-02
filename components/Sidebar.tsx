import React from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, BarChart2 } from './Icons';
import { ViewState } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onNavigate, currentView }) => {
  const items = [
    { icon: Home, label: 'Home', view: ViewState.HOME },
    { icon: Compass, label: 'Shorts', view: null },
    { icon: PlaySquare, label: 'Subscriptions', view: null },
    { icon: BarChart2, label: 'Studio (Revenue)', view: ViewState.STUDIO, highlight: true },
  ];

  const secondaryItems = [
    { icon: Clock, label: 'History' },
    { icon: ThumbsUp, label: 'Liked videos' },
  ];

  if (!isOpen) {
    return (
      <aside className="fixed left-0 top-16 bottom-0 w-[88px] bg-yt-base/95 flex flex-col items-center py-6 z-40 hidden sm:flex border-r border-transparent">
        {items.map((item, idx) => (
          <button 
            key={idx} 
            onClick={() => item.view && onNavigate(item.view)}
            className={`flex flex-col items-center gap-1.5 p-3 w-16 hover:bg-yt-hover rounded-2xl mb-3 transition-all duration-200 group ${currentView === item.view ? 'text-yt-red bg-yt-hover/50' : 'text-gray-400'}`}
          >
            <item.icon className={`w-6 h-6 group-hover:scale-110 transition-transform ${item.highlight && currentView !== item.view ? 'text-yt-red' : ''}`} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-yt-base/95 backdrop-blur-sm overflow-y-auto px-4 py-6 z-40 border-r border-yt-border">
      <div className="mb-6 border-b border-yt-border pb-6">
        {items.map((item, idx) => (
          <button 
            key={idx}
            onClick={() => item.view && onNavigate(item.view)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-yt-hover transition-all duration-200 mb-1 ${currentView === item.view ? 'bg-yt-red text-white shadow-lg shadow-indigo-500/20 font-semibold' : 'text-gray-300'}`}
          >
            <item.icon className={`w-5 h-5 ${currentView === item.view ? 'fill-current' : ''} ${item.highlight && currentView !== item.view ? 'text-yt-red' : ''}`} />
            <span className="text-sm truncate tracking-wide">{item.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mb-6">
        <h3 className="px-4 py-2 text-sm font-bold text-gray-500 uppercase tracking-wider">You</h3>
        {secondaryItems.map((item, idx) => (
          <button key={idx} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-yt-hover text-gray-300 transition-colors mb-1">
            <item.icon className="w-5 h-5" />
            <span className="text-sm truncate tracking-wide">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto px-4 py-6 bg-yt-sidebar/50 rounded-2xl border border-yt-border mx-1">
         <p className="text-xs font-semibold text-gray-400">© 2024 StreamTube</p>
         <div className="mt-3 p-3 bg-yt-base rounded-xl border border-yt-border">
            <p className="text-[10px] text-yt-secondary leading-relaxed">
              <strong className="text-yt-red">Partner Policy:</strong><br/>
              Platform retains a 5% commission on all generated revenue.
            </p>
         </div>
      </div>
    </aside>
  );
};