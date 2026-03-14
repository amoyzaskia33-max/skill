import {
  ArrowLeft, Calendar, Clock, Share2, Bookmark,
  Bot, Workflow, Users, Zap, Terminal, Network, Battery,
  Cpu, Lightbulb, Brain, TrendingUp, AlertTriangle, DollarSign
} from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

export const EducationMDXComponents = {
  // Education (Light Mode/Paper) overrides
  h1: (props: any) => <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-10 leading-tight" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 border-b pb-3 border-gray-200" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-bold text-gray-800 mb-2 mt-4" {...props} />,
  
  p: (props: any) => <p className="text-gray-700 leading-relaxed mb-4 text-base" {...props} />,
  
  ul: (props: any) => <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4 leading-relaxed text-base" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5 text-gray-700 space-y-1 mb-4 leading-relaxed text-base" {...props} />,
  li: (props: any) => <li className="pl-1" {...props} />,
  
  strong: (props: any) => <strong className="font-bold text-gray-900" {...props} />,
  blockquote: (props: any) => (
      <blockquote className="border-l-4 border-blue-600 pl-6 py-2 my-8 bg-blue-50 text-gray-800 italic rounded-r-lg" {...props} />
  ),
  hr: (props: any) => <hr className="my-12 border-gray-200" {...props} />,
  
  // Custom Components & Icons
  Bot, Workflow, Users, Zap, Terminal, Network, Battery,
  Clock, Calendar, Cpu, Lightbulb, Brain, TrendingUp, AlertTriangle, DollarSign,
  Link,
  Image,
  
  // Layout Helpers (Adjusted for Light Theme)
  Callout: ({ children, className = "" }: any) => (
    <div className={`bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 ${className}`}>
      {children}
    </div>
  ),
  ScenarioBox: ({ children }: any) => (
    <div className="bg-white p-8 rounded-xl border-l-4 border-blue-500 my-8 shadow-sm">
      {children}
    </div>
  ),
  Grid: ({ children, cols = 1 }: any) => (
    <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-6 my-12`}>
        {children}
    </div>
  )
};
