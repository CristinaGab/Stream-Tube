export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  postedAt: string;
  description: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  likes: number;
  timeAgo: string;
}

export interface RevenueData {
  month: string;
  grossRevenue: number;
  views: number;
}

export enum ViewState {
  HOME = 'HOME',
  WATCH = 'WATCH',
  STUDIO = 'STUDIO'
}