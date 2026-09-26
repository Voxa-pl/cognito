import React from 'react';
import {
  Calculator,
  Zap,
  FlaskConical,
  Dna,
  BookOpen,
  Landmark,
  Globe,
  Languages,
  Home,
  Brain,
  User,
  Gamepad2,
  Sparkles,
  Flame,
  Shield,
  Star,
  Heart,
  Trophy,
  Target,
  Clock,
  Play,
  Lock,
  Unlock,
  Check,
  X,
  Shuffle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Swords,
  Infinity as InfinityIcon,
  Award,
  Compass,
  Lightbulb,
  BookText,
  FileQuestion,
  HelpCircle,
  TrendingUp,
  Layers,
  ThumbsUp,
  Sprout,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  // Subjects
  calculator: Calculator,
  zap: Zap,
  'flask-conical': FlaskConical,
  flask: FlaskConical,
  dna: Dna,
  'book-open': BookOpen,
  book: BookOpen,
  'book-text': BookText,
  landmark: Landmark,
  history: Landmark,
  globe: Globe,
  geography: Globe,
  languages: Languages,
  english: Languages,
  
  // Navigation & General
  home: Home,
  brain: Brain,
  user: User,
  gamepad: Gamepad2,
  sparkles: Sparkles,
  flame: Flame,
  shield: Shield,
  star: Star,
  heart: Heart,
  trophy: Trophy,
  target: Target,
  clock: Clock,
  play: Play,
  lock: Lock,
  unlock: Unlock,
  check: Check,
  x: X,
  shuffle: Shuffle,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'rotate-ccw': RotateCcw,
  swords: Swords,
  infinity: InfinityIcon,
  award: Award,
  compass: Compass,
  lightbulb: Lightbulb,
  'file-question': FileQuestion,
  'help-circle': HelpCircle,
  'trending-up': TrendingUp,
  layers: Layers,
  'thumbs-up': ThumbsUp,
  thumbsup: ThumbsUp,
  sprout: Sprout,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
  className?: string;
}

export function AppIcon({ name, size = 20, className = '', ...props }: IconProps) {
  const normalized = (name || '').toLowerCase().trim();
  const IconComponent = iconMap[normalized] || HelpCircle;
  return <IconComponent size={size} className={className} {...(props as any)} />;
}

export default AppIcon;
