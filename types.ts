export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  additionalImages?: string[];
  description: string;
  longDescription?: string;
  hoverEffect?: 'parallax' | 'glow' | 'tilt' | 'ken-burns' | 'shine';
  liveUrl?: string;
  repoUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}