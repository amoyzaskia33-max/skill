import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertVariant = "success" | "warning" | "error" | "info";

interface AlertProps {
  variant: AlertVariant;
  message: string;
  onClose?: () => void;
  className?: string;
}

const alertConfig = {
  success: {
    icon: CheckCircle2,
    className: "bg-green-500/10 border-green-500/20 text-green-500",
  },
  warning: {
    icon: AlertCircle,
    className: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
  },
  error: {
    icon: XCircle,
    className: "bg-red-500/10 border-red-500/20 text-red-500",
  },
  info: {
    icon: Info,
    className: "bg-blue-500/10 border-blue-500/20 text-blue-500",
  },
};

export function Alert({ variant, message, onClose, className }: AlertProps) {
  const config = alertConfig[variant];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg border backdrop-blur-sm",
        config.className,
        className
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}
