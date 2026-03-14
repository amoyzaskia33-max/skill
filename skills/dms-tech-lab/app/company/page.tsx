'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import CompanyHero from './components/CompanyHero';
import AboutSection from './components/AboutSection';
import VisionSection from './components/VisionSection';
import ServicesSection from './components/ServicesSection';
import TechnologySection from './components/TechnologySection';
import TimelineSection from './components/TimelineSection';
import ValuesSection from './components/ValuesSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';

type TabType = 'about' | 'vision' | 'services' | 'technology' | 'history' | 'values' | 'team' | 'contact';

function CompanyContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('about');

  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabType;
    if (tabParam && ['about', 'vision', 'services', 'technology', 'history', 'values', 'team', 'contact'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const tabs = [
    { id: 'about' as TabType, label: 'About DMS', korean: '회사 소개' },
    { id: 'vision' as TabType, label: 'Vision & Mission', korean: '비전과 미션' },
    { id: 'services' as TabType, label: 'What We Do', korean: '주요 사업' },
    { id: 'technology' as TabType, label: 'Our Technology', korean: '기술' },
    { id: 'history' as TabType, label: 'History', korean: '연혁' },
    { id: 'values' as TabType, label: 'Core Values', korean: '핵심 가치' },
    { id: 'team' as TabType, label: 'Team', korean: '팀' },
    { id: 'contact' as TabType, label: 'Contact', korean: '연락처' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection />;
      case 'vision':
        return <VisionSection />;
      case 'services':
        return <ServicesSection />;
      case 'technology':
        return <TechnologySection />;
      case 'history':
        return <TimelineSection />;
      case 'values':
        return <ValuesSection />;
      case 'team':
        return <TeamSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <main className="relative w-full overflow-hidden">
      <CompanyHero />

      {/* Tab Navigation */}
      <div className="relative z-10 bg-[#0a0a1f] border-b border-white/10 sticky top-0 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <nav className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200'
                  }
                `}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <span>{tab.korean}</span>
                  <span className="text-xs opacity-60 hidden md:inline">| {tab.label}</span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </main>
  );
}

export default function CompanyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CompanyContent />
    </Suspense>
  );
}
