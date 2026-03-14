import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CardProps, BaseComponentProps } from "@/types";

export function Card({
  children,
  className,
  hoverable = false,
  clickable = false,
  onClick,
  ...props
}: CardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white/5 border border-white/10 rounded-2xl p-6",
        hoverable && "hover:bg-white/10 hover:border-white/20",
        clickable && "cursor-pointer hover:-translate-y-1",
        className
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={hoverable ? { scale: 1.02 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: BaseComponentProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  );
}
