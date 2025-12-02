import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { VideoCard } from './components/VideoCard';
import { VideoPlayer } from './components/VideoPlayer';
import { CreatorStudio } from './components/CreatorStudio';
import { ViewState, Video } from './types';

// Mock Data Generation
const MOCK_VIDEOS: Video[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `v-${i}`,
  title: [
    "Exploring the Hidden Mountains of Japan", 
    "How to Build a React App in 10 Minutes", 
    "Top 10 Gaming Moments 2024",
    "Cooking the Perfect Steak: A Masterclass",
    "Understanding Quantum Physics",
    "Daily Vlog #402: Life in NYC",
    "ASMR Rain Sounds for Sleep",
    "Reviewing the New Tech Gadget"
  ][i % 8] + (i > 7 ? ` (Part ${i})` : ''),
  thumbnailUrl: `https://picsum.photos/seed/${i + 100}/640/360`,
  duration: `${Math.floor(Math.random() * 10) + 2}:${Math.floor(Math.random() * 50) + 10}`,
  channelName: `Creator ${i + 1}`,
  channelAvatar: `https://picsum.photos/seed/${i + 500}/50/50`,
  views: `${Math.floor(Math.random() * 900) + 1}K`,
  postedAt: `${Math.floor(Math.random() * 11) + 1} months ago`,
  description: "Join us in this amazing video where we explore deep topics and have fun."
}));

// Categories
const CATEGORIES = ["All", "Gaming", "Music", "Live", "Mixes", "Computers", "Programming", "Podcasts", "News", "Recently uploaded", "Watched"];

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setCurrentView(ViewState.WATCH);
    window.scrollTo(0, 0);
  };

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    if (view === ViewState.HOME) {
      setSelectedVideo(null);
    }
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.WATCH:
        return selectedVideo ? <VideoPlayer video={selectedVideo} /> : null;
      case ViewState.STUDIO:
        return <CreatorStudio />;
      case ViewState.HOME:
      default:
        return (
          <div className="pt-8 px-6 pb-12 max-w-[1920px] mx-auto">
            {/* Category Pills */}
            <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide mb-2 mask-linear-fade">
              {CATEGORIES.map((cat, i) => (
                <button 
                  key={cat}
                  className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 shadow-sm ${i === 0 ? 'bg-yt-text text-yt-base' : 'bg-yt-sidebar text-yt-text hover:bg-yt-hover hover:scale-105 border border-yt-border'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-10">
              {MOCK_VIDEOS.map((video) => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  onClick={handleVideoClick} 
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-yt-base text-yt-text font-sans">
      <Navbar 
        onMenuClick={toggleSidebar} 
        currentView={currentView}
        onNavigate={navigate}
      />
      
      <div className="flex pt-16">
        {/* Sidebar Logic: Always visible on large screens unless collapsed, overlaid on mobile */}
        <div className={`
          hidden md:block h-[calc(100vh-64px)] sticky top-16
          ${currentView === ViewState.WATCH ? 'w-0 overflow-hidden' : (isSidebarOpen ? 'w-64' : 'w-[88px]')}
          transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] z-40
        `}>
          <Sidebar 
            isOpen={isSidebarOpen && currentView !== ViewState.WATCH} 
            onNavigate={navigate}
            currentView={currentView}
          />
        </div>

        {/* Content Area */}
        <main className={`
          flex-1 min-h-[calc(100vh-64px)]
          ${currentView === ViewState.WATCH ? 'w-full' : ''}
        `}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;