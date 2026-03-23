import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalPrompt from "./TerminalPrompt";

const skillCategories = [
  {
    name: "Cloud Platforms",
    icon: "☁️",
    skills: ["AWS EC2", "VPC", "IAM", "EKS", "ECR", "CloudWatch"],
    color: "text-terminal-cyan",
  },
  {
    name: "DevOps & CI/CD",
    icon: "⚙️",
    skills: ["Jenkins", "AWS CodePipeline", "CodeBuild", "CodeDeploy"],
    color: "text-terminal-yellow",
  },
  {
    name: "Containers",
    icon: "🐳",
    skills: ["Docker", "Kubernetes", "EKS", "ECR"],
    color: "text-terminal-blue",
  },
  {
    name: "IaC & Scripting",
    icon: "📜",
    skills: ["Terraform", "Python", "Bash", "SQL"],
    color: "text-terminal-magenta",
  },
  {
    name: "Monitoring",
    icon: "📊",
    skills: ["CloudWatch Logs", "Deployment Monitoring", "Debugging"],
    color: "text-primary",
  },
  {
    name: "Tools & OS",
    icon: "🛠️",
    skills: ["Linux (Ubuntu)", "Git", "GitHub", "Nginx"],
    color: "text-terminal-red",
  },
];

const SkillsSection = () => {
  return (
    <TerminalWindow title="skills.sh — bash" delay={0.15}>
      <TerminalPrompt command="./list-skills.sh --verbose" path="~/skills" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-muted rounded p-3 border border-border hover:border-glow transition-all duration-300 group"
          >
            <div className={`text-xs mb-2 ${cat.color} font-bold flex items-center gap-2`}>
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-xs rounded bg-background border border-border text-terminal-white 
                    group-hover:border-primary/30 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </TerminalWindow>
  );
};

export default SkillsSection;
