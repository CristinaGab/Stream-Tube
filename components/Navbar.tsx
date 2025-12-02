import React, { useState } from 'react';
import { Menu, Search, Mic, Video, Bell, User } from './Icons';
import { ViewState } from '../types';

interface NavbarProps {
  onMenuClick: () => void;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, currentView, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-yt-base/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-yt-border">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="p-2 hover:bg-yt-hover rounded-2xl transition-all duration-200">
          <Menu className="w-6 h-6 text-white" />
        </button>
        <div 
          onClick={() => onNavigate(ViewState.HOME)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-yt-red to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-display">StreamTube</span>
        </div>
      </div>

      <div className="hidden sm:flex items-center flex-1 max-w-[720px] ml-10">
        <div className="flex flex-1 items-center group focus-within:ring-2 focus-within:ring-yt-red/50 rounded-2xl transition-all">
          <div className="flex flex-1 items-center bg-yt-sidebar border border-yt-border rounded-l-2xl overflow-hidden ml-8 h-10 transition-colors group-focus-within:border-yt-red">
            <div className="pl-4 pr-2">
               <Search className="w-4 h-4 text-gray-400 hidden md:block" />
            </div>
            <input 
              type="text" 
              placeholder="Search content..." 
              className="w-full bg-transparent text-white px-2 py-2 outline-none placeholder-gray-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-6 h-10 bg-yt-hover border border-l-0 border-yt-border rounded-r-2xl hover:bg-yt-border transition-colors flex items-center justify-center">
            <Search className="w-5 h-5 text-gray-300" />
          </button>
        </div>
        <button className="ml-4 p-2.5 bg-yt-sidebar hover:bg-yt-hover border border-yt-border rounded-xl transition-colors">
          <Mic className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button 
          onClick={() => onNavigate(ViewState.STUDIO)}
          className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-yt-hover transition-all duration-200 ${currentView === ViewState.STUDIO ? 'bg-yt-red text-white shadow-lg shadow-indigo-500/30' : 'bg-yt-hover/50 text-gray-300'}`}
        >
          <Video className="w-5 h-5" />
          <span className="text-sm font-semibold">Create</span>
        </button>
        <button className="p-2.5 hover:bg-yt-hover rounded-xl transition-colors hidden sm:block relative">
          <Bell className="w-6 h-6 text-gray-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-yt-red rounded-full"></span>
        </button>
        <button className="p-0.5 sm:px-3 sm:py-1.5 flex items-center gap-2 hover:bg-yt-hover rounded-xl transition-colors">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-sm font-bold shadow-md">
            U
          </div>
        </button>
      </div>
    </nav>
  );
};