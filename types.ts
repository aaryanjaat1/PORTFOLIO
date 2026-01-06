
export enum ServiceType {
  VIDEO_EDITING = 'video-editing',
  GRAPHIC_DESIGN = 'graphic-design',
  AI_AUTOMATION = 'ai-automation',
  WEB_DESIGN = 'web-design'
}

export type AspectRatio = '16:9' | '9:16';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ServiceType;
  thumbnail: string;
  videoUrl?: string;
  aspectRatio: AspectRatio;
  description: string;
  problem?: string;
  solution?: string;
  result?: string;
  tools: string[];
  tags: string[];
  metrics?: string;
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
