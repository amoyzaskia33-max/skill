import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/types";

interface SectionHeaderProps extends BaseComponentProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn("space-y-4", align === "center" && "text-center", className)}
      {...props}
    >
      {badge && (
        <div
          className={cn(
            "flex items-center gap-3 mb-4",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-[1px] w-12 bg-neon-sky" />
          <span className="text-neon-sky font-poppins font-semibold tracking-widest text-sm uppercase">
            {badge}
          </span>
          <span className="h-[1px] w-12 bg-neon-sky" />
        </div>
      )}
      <h2
        className={cn(
          "text-4xl md:text-5xl font-bold text-white tracking-tight",
          align !== "left" && "text-center"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg text-white/60 leading-relaxed",
            align === "center" && "max-w-2xl mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
