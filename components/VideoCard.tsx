import React from 'react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div 
      className="flex flex-col gap-3 cursor-pointer group p-2 hover:bg-yt-hover/30 rounded-3xl transition-colors duration-300"
      onClick={() => onClick(video)}
    >
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-yt-sidebar border border-yt-border shadow-md">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-1 rounded-lg text-xs font-medium text-white">
          {video.duration}
        </div>
      </div>
      <div className="flex gap-4 px-1">
        <img 
          src={video.channelAvatar} 
          alt={video.channelName} 
          className="w-10 h-10 rounded-xl object-cover mt-0.5 border border-yt-border shadow-sm"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold line-clamp-2 leading-snug text-gray-100 group-hover:text-yt-red transition-colors">
            {video.title}
          </h3>
          <div className="flex flex-col">
             <p className="text-xs text-yt-secondary hover:text-white transition-colors font-medium">
                {video.channelName}
             </p>
             <p className="text-xs text-yt-secondary/80">
                {video.views} views • {video.postedAt}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};