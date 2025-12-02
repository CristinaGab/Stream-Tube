import React from 'react';
import { Video } from '../types';
import { ThumbsUp, ThumbsDown, Share2, MoreVertical, User } from './Icons';

interface VideoPlayerProps {
  video: Video;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 px-4 sm:px-6 lg:px-10 max-w-[1800px] mx-auto">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Player Placeholder */}
        <div className="aspect-video bg-black rounded-3xl overflow-hidden relative shadow-2xl ring-1 ring-white/5 group">
           <img 
             src={video.thumbnailUrl} 
             className="w-full h-full object-cover opacity-60 blur-md scale-105 group-hover:scale-100 transition-transform duration-700"
             alt="Background"
           />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-20 h-20 bg-yt-red/90 backdrop-blur-md rounded-3xl flex items-center justify-center pl-2 cursor-pointer hover:scale-110 hover:bg-yt-red transition-all duration-300 shadow-xl shadow-indigo-500/40">
               <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent"></div>
             </div>
           </div>
           {/* Progress Bar Mock */}
           <div className="absolute bottom-4 left-4 right-4 h-1.5 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
             <div className="w-1/3 h-full bg-yt-red relative shadow-[0_0_10px_rgba(99,102,241,0.5)]">
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform"></div>
             </div>
           </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold line-clamp-2 leading-tight tracking-tight">{video.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={video.channelAvatar} className="w-12 h-12 rounded-2xl border border-yt-border" alt="" />
              <div>
                <h3 className="font-bold text-base text-white">{video.channelName}</h3>
                <p className="text-xs text-yt-secondary">1.2M subscribers</p>
              </div>
              <button className="ml-4 bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
                Subscribe
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-yt-hover rounded-2xl overflow-hidden border border-yt-border">
                <button className="flex items-center gap-2 px-5 py-2.5 hover:bg-white/5 border-r border-yt-border transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="text-sm font-medium">12K</span>
                </button>
                <button className="px-5 py-2.5 hover:bg-white/5 transition-colors">
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>
              <button className="flex items-center gap-2 bg-yt-hover border border-yt-border px-5 py-2.5 rounded-2xl hover:bg-white/5 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
              <button className="bg-yt-hover border border-yt-border p-2.5 rounded-2xl hover:bg-white/5 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Description Box */}
        <div className="bg-yt-sidebar/50 backdrop-blur-sm border border-yt-border rounded-3xl p-5 text-sm hover:bg-yt-sidebar transition-colors">
          <div className="flex gap-4 font-bold mb-3 text-white">
            <span>{video.views} views</span>
            <span>{video.postedAt}</span>
          </div>
          <p className="text-gray-300 whitespace-pre-wrap font-normal leading-relaxed">
            {video.description}
            <br/><br/>
            This is a simulated video description. In a real application, this would contain the full text provided by the creator.
          </p>
        </div>

        {/* Comments Section */}
        <div className="pt-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            Comments <span className="text-gray-500 text-sm font-normal">(452)</span>
          </h3>
          
          <div className="flex gap-4 mb-8 items-start">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg">U</div>
             <div className="flex-1">
               <input 
                 type="text" 
                 placeholder="Add a comment..." 
                 className="w-full bg-transparent border-b border-yt-border pb-2 focus:border-yt-red outline-none text-sm transition-colors text-white placeholder-gray-500"
               />
             </div>
          </div>

          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-yt-hover border border-yt-border flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold bg-yt-hover px-2 py-0.5 rounded-lg border border-yt-border">@viewer{i}0{i}</span>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">This video is amazing! Really helpful explanation regarding the new geometry and color schemes.</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button className="flex items-center gap-1 group">
                       <ThumbsUp className="w-4 h-4 text-gray-400 group-hover:text-yt-red transition-colors" />
                       <span className="text-xs text-gray-400">24</span>
                    </button>
                    <button className="group">
                      <ThumbsDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                    <span className="text-xs font-bold cursor-pointer hover:text-yt-red transition-colors px-2 py-1 hover:bg-yt-hover rounded-lg">Reply</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Videos (Sidebar) */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex gap-3 cursor-pointer group p-2 hover:bg-yt-hover/30 rounded-2xl transition-colors">
            <div className="relative w-44 h-28 flex-shrink-0 rounded-2xl overflow-hidden bg-yt-sidebar shadow-md">
              <img 
                src={`https://picsum.photos/seed/${i + 20}/320/180`} 
                alt="Rec" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm border border-white/10 px-1.5 py-0.5 text-[10px] font-medium rounded-md text-white">12:4{i}</span>
            </div>
            <div className="flex flex-col gap-1.5 py-1">
              <h4 className="text-sm font-bold line-clamp-2 leading-tight group-hover:text-yt-red transition-colors text-gray-100">
                Recommended Video Title That Is Somewhat Long {i}
              </h4>
              <p className="text-xs text-yt-secondary hover:text-white transition-colors">Random Channel</p>
              <p className="text-xs text-yt-secondary">15K views • 1 year ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};