"use client";

import { useState } from "react";
import { VIBE_APPS, VibeCategory } from "@/lib/vibe-data";
import Sidebar from "./Sidebar";
import AppCard from "./AppCard";
import { motion, AnimatePresence } from "framer-motion";

export default function VibeContainer() {
  const [selectedCategory, setSelectedCategory] = useState<VibeCategory>("All");

  const filteredApps = selectedCategory === "All"
    ? VIBE_APPS
    : VIBE_APPS.filter(app => app.category === selectedCategory);

  return (
    <div className="flex flex-col md:flex-row gap-8 relative">
      <Sidebar 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      <div className="flex-1 min-h-[600px]">
        {/* Grid */}
        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            <AnimatePresence mode='popLayout'>
                {filteredApps.map((app) => (
                    <motion.div
                        key={app.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <AppCard app={app} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {filteredApps.length === 0 && (
            <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500 border border-white/5 rounded-2xl bg-white/5">
                <p>No apps found in this category.</p>
            </div>
        )}
      </div>
    </div>
  );
}
