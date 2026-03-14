"use client";

import { motion } from "framer-motion";
import SeriesCard from "@/components/blog/SeriesCard";
import { BlogSeries } from "@/lib/blog-data";

interface SeriesListProps {
  series: (BlogSeries & { postCount: number })[];
}

export default function SeriesList({ series }: SeriesListProps) {
  return (
    <section className="px-6 pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {series.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <SeriesCard {...item} postCount={item.postCount} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
