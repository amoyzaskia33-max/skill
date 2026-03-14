import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonProps } from "@/types";

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-neon-sky text-[#050B1B] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]",
    secondary:
      "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30",
    ghost: "bg-transparent text-white hover:bg-white/5",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </motion.button>
  );
}

export function LinkButton({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  ...props
}: Omit<ButtonProps, "type" | "disabled" | "loading" | "onClick"> & {
  href: string;
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-neon-sky text-[#050B1B] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]",
    secondary:
      "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30",
    ghost: "bg-transparent text-white hover:bg-white/5",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <Link
      href={href}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
      {variant === "primary" && <ArrowRight className="w-4 h-4" />}
    </Link>
  );
}
