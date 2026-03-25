import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import NavBar from "@/components/NavBar";
import TerminalHeader from "@/components/TerminalHeader";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MatrixRain from "@/components/MatrixRain";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import useClickSound from "@/hooks/useClickSound";
import BackToTop from "@/components/BackToTop";

const tabs = [
  { id: "about", label: "about", icon: "📋", cmd: "cat ~/about/README.md" },
  { id: "skills", label: "skills", icon: "⚙️", cmd: "./list-skills.sh" },
  { id: "projects", label: "projects", icon: "📁", cmd: "ls ~/projects/" },
  { id: "education", label: "education", icon: "🎓", cmd: "cat ~/education/degree.json" },
  { id: "contact", label: "contact", icon: "📬", cmd: "./send-message.sh --to sheersh" },
  { id: "terminal", label: "terminal", icon: "💻", cmd: "bash --interactive" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [direction, setDirection] = useState(1);
  const playSound = useClickSound();

  const tabIds = tabs.map((t) => t.id);

  const handleTabChange = (newTab: string) => {
    const oldIndex = tabIds.indexOf(activeTab);
    const newIndex = tabIds.indexOf(newTab);
    setDirection(newIndex >= oldIndex ? 1 : -1);
    setActiveTab(newTab);
    playSound("whoosh");
  };

  const bootSequence = [
    "[  0.000] Initializing portfolio kernel...",
    "[  0.120] Loading modules: react, framer-motion, tailwind",
    "[  0.340] Mounting filesystem: ~/about ~/skills ~/projects",
    "[  0.510] Starting display server... [OK]",
    "[  0.680] Loading profile: Sheersh Sinha",
    "[  0.820] Establishing network connections... [OK]",
    "[  1.000] System ready. Welcome!",
  ];

  useEffect(() => {
    let i = 0;
    const lines = [...bootSequence];
    const interval = setInterval(() => {
      if (i < lines.length) {
        const line = lines[i];
        i++;
        setBootLines((prev) => [...prev, line]);
      } else {
        clearInterval(interval);
        setTimeout(() => setBooted(true), 400);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  const renderSection = () => {
    switch (activeTab) {
      case "about": return <AboutSection />;
      case "skills": return <SkillsSection />;
      case "projects": return <ProjectsSection />;
      case "education": return <EducationSection />;
      case "contact": return <ContactSection />;
      case "terminal": return (
        <div className="space-y-2">
          <p className="text-terminal-gray text-xs font-mono">
            💡 Type <span className="text-primary">'help'</span> to see commands • Tab to autocomplete • ↑↓ for history
          </p>
          <InteractiveTerminal />
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background scanlines relative cursor-none" id="top">
      <CustomCursor />
      <MatrixRain />
      <AnimatePresence mode="wait">
        {!booted ? (
          <motion.div
            key="boot"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-2xl w-full font-mono">
              <div className="border border-border rounded border-glow bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-terminal-red opacity-80" />
                    <div className="w-3 h-3 rounded-full bg-terminal-yellow opacity-80" />
                    <div className="w-3 h-3 rounded-full bg-primary opacity-80" />
                  </div>
                  <span className="text-terminal-gray text-xs ml-2">boot — bash</span>
                </div>
                <div className="space-y-1">
                  {bootLines.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`text-xs sm:text-sm ${
                        line.includes("[OK]") || line.includes("Welcome")
                          ? "text-primary text-glow"
                          : "text-terminal-gray"
                      }`}
                    >
                      {line}
                    </motion.p>
                  ))}
                  <span className="cursor-blink text-primary text-sm">█</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <NavBar activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="max-w-4xl mx-auto px-4 pt-20 pb-12">
              <TerminalHeader />

              {/* Tab bar */}
              <div className="flex flex-wrap gap-1 mb-2 border border-border rounded bg-muted p-2 cursor-none group/tabs">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative px-3 py-2 text-xs sm:text-sm font-mono rounded transition-all duration-200 flex items-center gap-1.5 cursor-none ${
                      activeTab === tab.id
                        ? "text-primary bg-background border border-primary/30 border-glow"
                        : "text-terminal-gray hover:text-terminal-white hover:bg-background/50"
                    }`}
                    onHoverStart={() => playSound("hover")}
                    whileHover={{
                      scale: 1.06,
                      textShadow: "0 0 8px hsl(120 100% 55% / 0.6)",
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      whileHover={{ rotate: [0, -15, 15, 0], scale: 1.3 }}
                      transition={{ duration: 0.4 }}
                    >
                      {tab.icon}
                    </motion.span>
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute -bottom-[2px] left-2 right-2 h-[2px] bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Command echo */}
              <motion.div
                key={activeTab + "-cmd"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 px-1"
              >
                <div className="flex items-center gap-1 text-xs text-terminal-gray font-mono">
                  <span className="text-terminal-cyan">sheersh</span>
                  <span>@</span>
                  <span className="text-terminal-magenta">portfolio</span>
                  <span>:~$</span>
                  <span className="text-primary ml-1">
                    {tabs.find((t) => t.id === activeTab)?.cmd}
                  </span>
                </div>
              </motion.div>

              {/* Active section */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeTab}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: direction * -60, filter: "blur(6px)" }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <ScrollReveal>
                    {renderSection()}
                  </ScrollReveal>
                </motion.div>
              </AnimatePresence>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
