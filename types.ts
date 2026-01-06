
export enum ServiceType {
  VIDEO_EDITING = 'video-editing',
  GRAPHIC_DESIGN = 'graphic-design',
  AI_AUTOMATION = 'ai-automation',
  WEB_DESIGN = 'web-design'
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ServiceType;
  thumbnail: string;
  videoUrl?: string; // Main showcase video
  processVideoUrl?: string; // "How it works" video
  description: string;
  problem?: string;
  solution?: string;
  result?: string;
  tools: string[];
  tags: string[];
  metrics?: string; // e.g., "300% Growth" or "20h/week saved"
  createdAt: string;
  views: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  service: ServiceType;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface CategoryData {
  id: ServiceType;
  label: string;
  icon: string;
  description: string;
  color: string;
  gradient: string;
}
