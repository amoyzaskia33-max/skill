"use client";

import { useState } from "react";
import { AutomationCategory, AutomationTemplate } from "@/lib/automation-data";
import AutomationSidebar from "./AutomationSidebar";
import TemplateCard from "./TemplateCard";
import { motion, AnimatePresence } from "framer-motion";

interface AutomationContainerProps {
  initialTemplates?: AutomationTemplate[];
}

export default function AutomationContainer({ initialTemplates = [] }: AutomationContainerProps) {
  const [selectedCategory, setSelectedCategory] = useState<AutomationCategory>("All");

  const templatesToDisplay = initialTemplates;

  const filteredTemplates = selectedCategory === "All"
    ? templatesToDisplay
    : templatesToDisplay.filter(t => t.category === selectedCategory);

  return (
    <div className="flex flex-col md:flex-row gap-8 relative">
      <AutomationSidebar 
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
                {filteredTemplates.map((template) => (
                    <motion.div
                        key={template.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TemplateCard template={template} /> 
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {filteredTemplates.length === 0 && (
            <div className="w-full h-64 flex flex-col items-center justify-center text-gray-500 border border-white/5 rounded-2xl bg-white/5">
                <p>No workflows found in this category.</p>
            </div>
        )}
      </div>
    </div>
  );
}
