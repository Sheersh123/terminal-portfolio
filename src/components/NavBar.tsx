import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { id: "about", label: "~/about", icon: "📋" },
  { id: "skills", label: "~/skills", icon: "⚙️" },
  { id: "projects", label: "~/projects", icon: "📁" },
  { id: "education", label: "~/education", icon: "🎓" },
  { id: "contact", label: "~/contact", icon: "📬" },
  { id: "terminal", label: "~/terminal", icon: "💻" },
];

interface NavBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavBar = ({ activeTab, onTabChange }: NavBarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: string) => {
    onTabChange(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <motion.button
          onClick={() => handleNav("about")}
          className="text-primary text-glow font-bold text-sm font-mono"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          sheersh@portfolio:~$
        </motion.button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <motion.button
              key={s.id}
              onClick={() => handleNav(s.id)}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all duration-200 relative ${
                activeTab === s.id
                  ? "text-primary bg-muted"
                  : "text-terminal-gray hover:text-primary hover:bg-muted"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {s.label}
              {activeTab === s.id && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-1 right-1 h-[2px] bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
          <motion.a
            href="https://github.com/Sheersh123"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-mono text-terminal-cyan hover:text-primary hover:bg-muted 
              rounded transition-all duration-200 ml-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            [GitHub]
          </motion.a>
          <ThemeToggle />
          <motion.a
            href="/Sheersh_Sinha.pdf"
            download="Sheersh_Sinha_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-primary-foreground bg-primary hover:bg-primary/80 rounded transition-all duration-200 ml-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={12} />
            Resume
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-primary p-1"
          whileTap={{ scale: 0.9, rotate: 90 }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="px-4 py-2 space-y-1">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => handleNav(s.id)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`block w-full text-left px-3 py-2 text-sm font-mono rounded transition-colors ${
                    activeTab === s.id
                      ? "text-primary bg-muted border-l-2 border-primary"
                      : "text-terminal-gray hover:text-primary hover:bg-muted"
                  }`}
                >
                  <span className="mr-2">{s.icon}</span>
                  {s.label}
                </motion.button>
              ))}
              <motion.a
                href="/Sheersh_Sinha.pdf"
                download="Sheersh_Sinha_Resume.pdf"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: sections.length * 0.05 }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm font-mono text-background bg-primary hover:bg-primary/80 rounded transition-colors"
              >
                <Download size={14} />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
