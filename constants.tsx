
import { ServiceType, CategoryData, Project } from './types';

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
    description: 'A 4K cinematic journey through the Swiss Alps, focused on color grading and atmospheric sound design.',
    metrics: '5M+ Global Views',
    tools: ['Davinci Resolve', 'After Effects'],
    tags: ['Cinema', 'Color Grading'],
    createdAt: '2024-02-10',
    views: 520000
  },
  {
    id: 'des-1',
    title: 'Arcade Theory',
    client: 'Retro Studios',
    category: ServiceType.GRAPHIC_DESIGN,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
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
    description: 'A custom AI agent built to qualify leads, schedule calls, and update CRM records automatically.',
    metrics: '25h/week manual labor saved',
    tools: ['Make.com', 'OpenAI API', 'HubSpot'],
    tags: ['Automation', 'SaaS'],
    createdAt: '2024-03-05',
    views: 890
  },
  {
    id: 'web-1',
    title: 'Vanguard OS',
    client: 'Vanguard Tech',
    category: ServiceType.WEB_DESIGN,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    description: 'High-performance web dashboard with real-time data visualization and biometric authentication.',
    metrics: '99/100 Lighthouse Score',
    tools: ['React', 'Framer Motion', 'Three.js'],
    tags: ['Web App', 'Dashboard'],
    createdAt: '2024-03-12',
    views: 3100
  }
];
