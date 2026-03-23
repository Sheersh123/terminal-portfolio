import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ASCII_ART = `
 ███████╗██╗  ██╗███████╗███████╗██████╗ ███████╗██╗  ██╗
 ██╔════╝██║  ██║██╔════╝██╔════╝██╔══██╗██╔════╝██║  ██║
 ███████╗███████║█████╗  █████╗  ██████╔╝███████╗███████║
 ╚════██║██╔══██║██╔══╝  ██╔══╝  ██╔══██╗╚════██║██╔══██║
 ███████║██║  ██║███████╗███████╗██║  ██║███████║██║  ██║
 ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`;

const TerminalHeader = () => {
  const [showAscii, setShowAscii] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "DevOps Engineer | Cloud Architect | Automation Enthusiast";

  useEffect(() => {
    const timer = setTimeout(() => setShowAscii(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showAscii) return;
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [showAscii]);

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showAscii ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 overflow-x-auto"
      >
        <pre className="text-primary text-glow-strong text-[0.45rem] sm:text-[0.55rem] md:text-xs lg:text-sm leading-tight font-mono select-none">
          {ASCII_ART}
        </pre>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showAscii ? 1 : 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-1"
      >
        <p className="text-terminal-cyan text-sm sm:text-base">
          <span className="text-terminal-gray">$</span> cat ~/about/title.txt
        </p>
        <p className="text-foreground text-sm sm:text-base">
          {typedText}
          <span className="cursor-blink text-primary">█</span>
        </p>
      </motion.div>
    </div>
  );
};

export default TerminalHeader;
