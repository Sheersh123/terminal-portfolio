import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalPrompt from "./TerminalPrompt";

const skillCategories = [
  {
    name: "Cloud Platforms",
    icon: "☁️",
    skills: ["AWS EC2", "VPC", "IAM", "EKS", "ECR", "CloudWatch"],
    color: "text-terminal-cyan",
    barColor: "bg-terminal-cyan",
    level: 85,
  },
  {
    name: "DevOps & CI/CD",
    icon: "⚙️",
    skills: ["Jenkins", "AWS CodePipeline", "CodeBuild", "CodeDeploy"],
    color: "text-terminal-yellow",
    barColor: "bg-terminal-yellow",
    level: 80,
  },
  {
    name: "Containers & Orchestration",
    icon: "🐳",
    skills: ["Docker", "Kubernetes", "EKS", "ECR"],
    color: "text-terminal-blue",
    barColor: "bg-terminal-blue",
    level: 82,
  },
  {
    name: "IaC & Scripting",
    icon: "📜",
    skills: ["Terraform", "Python", "Bash", "SQL"],
    color: "text-terminal-magenta",
    barColor: "bg-terminal-magenta",
    level: 78,
  },
  {
    name: "Monitoring & Observability",
    icon: "📊",
    skills: ["CloudWatch Logs", "Deployment Monitoring", "Debugging"],
    color: "text-primary",
    barColor: "bg-primary",
    level: 75,
  },
  {
    name: "Tools & OS",
    icon: "🛠️",
    skills: ["Linux (Ubuntu)", "Git", "GitHub", "Nginx"],
    color: "text-terminal-red",
    barColor: "bg-terminal-red",
    level: 88,
  },
];

const SkillsSection = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <TerminalWindow title="skills.sh — bash">
      <TerminalPrompt command="./list-skills.sh --verbose" path="~/skills" />
      <div className="space-y-2">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <motion.button
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              className={`w-full text-left px-3 py-3 rounded border transition-all duration-300 group ${
                expandedIdx === i
                  ? "bg-muted border-primary/30 border-glow"
                  : "bg-muted/50 border-border hover:border-primary/20 hover:bg-muted"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className={`text-xs font-bold flex items-center gap-2 ${cat.color}`}>
                  <motion.span
                    animate={{ rotate: expandedIdx === i ? 15 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-base"
                  >
                    {cat.icon}
                  </motion.span>
                  <span>{cat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-terminal-gray text-[10px]">{cat.level}%</span>
                  <motion.span
                    animate={{ rotate: expandedIdx === i ? 90 : 0 }}
                    className="text-terminal-gray text-xs"
                  >
                    ▸
                  </motion.span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-background rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${cat.barColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.level}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  style={{ opacity: 0.7 }}
                />
              </div>
            </motion.button>

            <AnimatePresence>
              {expandedIdx === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 py-3 flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: si * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-2.5 py-1 text-xs rounded bg-background border border-border text-terminal-white 
                          hover:border-primary/50 hover:text-primary cursor-default transition-colors duration-200"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </TerminalWindow>
  );
};

export default SkillsSection;
