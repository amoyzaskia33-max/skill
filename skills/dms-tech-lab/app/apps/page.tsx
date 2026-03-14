'use client';

import { motion } from 'framer-motion';
import AppsHero from './components/AppsHero';
import AppCardsSection from './components/AppCardsSection';

export default function AppsPage() {
  return (
    <main className="relative w-full overflow-hidden">
      <AppsHero />
      <AppCardsSection />
    </main>
  );
}
