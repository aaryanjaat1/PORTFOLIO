
import { ServiceType, CategoryData, Project, Lead } from './types';

export interface ExtendedCategoryData extends CategoryData {}

export const CATEGORIES: ExtendedCategoryData[] = [
  {
    id: ServiceType.VIDEO_EDITING,
    label: 'Video Editing',
    icon: '🎬',
    description: 'Cinematic storytelling and viral short-form content.',
    color: '#a855f7',
    gradient: 'from-purple-500 to-red-500'
  },
  {
    id: ServiceType.GRAPHIC_DESIGN,
    label: 'Graphic Design',
    icon: '🎨',
    description: 'Bold visual identities and high-conversion assets.',
    color: '#06b6d4',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: ServiceType.AI_AUTOMATION,
    label: 'AI Automation',
    icon: '🤖',
    description: 'Intelligent workflows that scale your business.',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: ServiceType.WEB_DESIGN,
    label: 'Web Development',
    icon: '🌐',
    description: 'High-performance digital experiences and interfaces.',
    color: '#f97316',
    gradient: 'from-orange-500 to-amber-500'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'vid-1',
    title: 'The Silent Path',
    client: 'Mountain Peak Films',
    category: ServiceType.VIDEO_EDITING,
    thumbnail: 'https://images.unsplash.com/photo-1492691523567-307300298ff9?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    aspectRatio: '16:9',
    description: 'A 4K cinematic journey through the Swiss Alps, focused on color grading and atmospheric sound design.',
    metrics: '5M+ Global Views',
    tools: ['Davinci Resolve', 'After Effects'],
    tags: ['Cinema', 'Color Grading'],
    createdAt: '2024-02-10',
    views: 520000
  },
  {
    id: 'vid-short',
    title: 'Viral Reel Concept',
    client: 'Influencer Brand',
    category: ServiceType.VIDEO_EDITING,
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    aspectRatio: '9:16',
    description: 'Fast-paced vertical edit designed for high-retention social media platforms.',
    metrics: '25% CTR boost',
    tools: ['Premiere Pro', 'CapCut'],
    tags: ['Reels', 'Shorts'],
    createdAt: '2024-03-20',
    views: 89000
  },
  {
    id: 'des-1',
    title: 'Arcade Theory',
    client: 'Retro Studios',
    category: ServiceType.GRAPHIC_DESIGN,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    description: 'Full brand identity including logo, typography, and apparel design for a vintage arcade bar.',
    metrics: 'Brand Awareness +40%',
    tools: ['Illustrator', 'Photoshop'],
    tags: ['Branding', 'Illustration'],
    createdAt: '2024-01-15',
    views: 1240
  },
  {
    id: 'ai-1',
    title: 'Cognitive CRM',
    client: 'ScaleFast Inc.',
    category: ServiceType.AI_AUTOMATION,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    aspectRatio: '16:9',
    description: 'A custom AI agent built to qualify leads, schedule calls, and update CRM records automatically.',
    metrics: '25h/week manual labor saved',
    tools: ['Make.com', 'OpenAI API', 'HubSpot'],
    tags: ['Automation', 'SaaS'],
    createdAt: '2024-03-05',
    views: 890
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'Sarah Jenkins',
    email: 'sarah@vortex.media',
    service: ServiceType.VIDEO_EDITING,
    message: 'Hey Aryan! I saw your mountain path video. We need a high-end trailer for our next documentary. Do you have availability in May?',
    createdAt: '2024-04-12T10:30:00Z',
    status: 'new'
  },
  {
    id: 'l2',
    name: 'Marcus Chen',
    email: 'm.chen@techsolutions.io',
    service: ServiceType.AI_AUTOMATION,
    message: 'Interested in automating our LinkedIn outreach. We currently have a team of 3 doing this manually. Can you build an agent for this?',
    createdAt: '2024-04-11T15:45:00Z',
    status: 'contacted'
  }
];
