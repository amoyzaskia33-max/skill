import {
  ArrowLeft, Calendar, Clock, Share2, Bookmark,
  Bot, Workflow, Users, Zap, Terminal, Network, Battery,
  Cpu, Lightbulb, Brain, TrendingUp, AlertTriangle, DollarSign
} from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

export const MDXComponents = {
  // Standard HTML overrides
  h1: (props: any) => <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 mt-12" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold text-white mb-6 mt-12 flex items-center gap-3" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold text-white mb-4 mt-8" {...props} />,
  p: (props: any) => <p className="text-gray-300 leading-relaxed mb-6 whitespace-pre-line" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6" {...props} />,
  li: (props: any) => <li className="" {...props} />,
  strong: (props: any) => <strong className="font-bold text-white" {...props} />,
  
  // Custom Components & Icons
  Bot,
  Workflow,
  Users,
  Zap,
  Terminal,
  Network,
  Battery,
  Clock,
  Calendar,
  Cpu,
  Lightbulb,
  Brain,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Link,
  Image,
  
  // Layout Helpers
  Callout: ({ children, className = "" }: any) => (
    <div className={`bg-[#0A1124] p-6 rounded-xl border border-white/10 mb-8 ${className}`}>
      {children}
    </div>
  ),
  ScenarioBox: ({ children }: any) => (
    <div className="bg-[#1A1F36] p-8 rounded-xl border-l-4 border-blue-500 my-8">
      {children}
    </div>
  ),
  Grid: ({ children, cols = 1 }: any) => (
    <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-6 my-12`}>
      {children}
    </div>
  ),
  Card: ({ children, icon, color = "blue", title }: any) => {
    const iconMap: Record<string, any> = {
      Bot, Zap, Workflow, Users, Terminal, Network, Battery, Clock, Calendar,
      Cpu, Lightbulb, Brain, TrendingUp, AlertTriangle, DollarSign
    };
    const Icon = typeof icon === 'string' ? iconMap[icon] : icon;

    const colorClasses = {
      blue: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 hover:border-blue-500/50",
      teal: "bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20 hover:border-teal-500/50",
    };
    const activeColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

    return (
      <div className={`bg-[#0A1124] p-6 rounded-xl border border-white/10 transition-colors group ${activeColor.split(' ').pop()}`}>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${activeColor.split(' ').slice(0, 3).join(' ')}`}>
           {Icon && <Icon className="w-6 h-6" />}
        </div>
        <h4 className="font-bold text-white mb-2">{title}</h4>
        {children}
      </div>
    );
  }
};
