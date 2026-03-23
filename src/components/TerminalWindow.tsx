import { ReactNode } from "react";
import { motion } from "framer-motion";

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  delay?: number;
}

const TerminalWindow = ({ title, children, delay = 0 }: TerminalWindowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="rounded border border-border border-glow bg-card overflow-hidden"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-muted border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-terminal-red opacity-80" />
          <div className="w-3 h-3 rounded-full bg-terminal-yellow opacity-80" />
          <div className="w-3 h-3 rounded-full bg-primary opacity-80" />
        </div>
        <span className="text-terminal-gray text-xs font-mono ml-2">{title}</span>
      </div>
      {/* Content */}
      <div className="p-4 sm:p-6 font-mono text-sm">
        {children}
      </div>
    </motion.div>
  );
};

export default TerminalWindow;
