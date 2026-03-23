import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalPrompt from "./TerminalPrompt";

const projects = [
  {
    name: "cloud-native-deploy",
    description: "Cloud-Native Application Deployment",
    tech: ["Jenkins", "Terraform", "AWS EKS", "Docker", "Kubernetes"],
    bullets: [
      { text: "Engineered Jenkins-based CI/CD pipelines", metric: "↓ 70% manual steps", metricColor: "text-primary" },
      { text: "Provisioned AWS infra using Terraform (VPC, EC2, IAM)", metric: "20min → 8min", metricColor: "text-terminal-cyan" },
      { text: "Orchestrated containerized React app on AWS EKS", metric: "Scalable", metricColor: "text-terminal-yellow" },
    ],
  },
  {
    name: "container-web-deploy",
    description: "Containerized Web Application Deployment",
    tech: ["Docker", "Bash", "AWS EC2", "SSH Hardening"],
    bullets: [
      { text: "Optimized Docker workflows with Bash automation", metric: "↑ 65% faster", metricColor: "text-primary" },
      { text: "Consistent dev/prod environments, minimal config drift", metric: "Zero drift", metricColor: "text-terminal-cyan" },
      { text: "Hardened EC2 security — SSH restricted to trusted IP", metric: "Secured", metricColor: "text-terminal-yellow" },
    ],
  },
  {
    name: "aws-native-cicd",
    description: "AWS-Native CI/CD Deployment",
    tech: ["CodePipeline", "CodeBuild", "CodeDeploy", "EKS", "ECR", "CloudWatch"],
    bullets: [
      { text: "AWS-native CI/CD with CodePipeline orchestration", metric: "↓ 70% release time", metricColor: "text-primary" },
      { text: "Standardized K8s deployments with declarative manifests", metric: "Consistent", metricColor: "text-terminal-cyan" },
      { text: "Docker lifecycle + centralized CloudWatch logging", metric: "↓ 50% debug time", metricColor: "text-terminal-yellow" },
    ],
  },
];

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <TerminalWindow title="projects.sh — bash">
      <TerminalPrompt command="ls -la ~/projects/" path="~/projects" />

      <div className="space-y-2 mb-4">
        {projects.map((p, i) => (
          <motion.button
            key={p.name}
            onClick={() => setActiveProject(activeProject === i ? null : i)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 8 }}
            whileTap={{ scale: 0.98 }}
            className={`block w-full text-left px-4 py-3 rounded border transition-all duration-300 ${
              activeProject === i
                ? "bg-muted border-primary/40 border-glow"
                : "bg-muted/30 border-border hover:border-primary/20 hover:bg-muted/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: activeProject === i ? 90 : 0 }}
                  className="text-terminal-gray text-xs"
                >
                  ▸
                </motion.span>
                <span className="text-terminal-blue text-xs">drwxr-xr-x</span>
                <span className={`text-sm font-bold ${activeProject === i ? "text-primary text-glow" : "text-terminal-cyan"}`}>
                  {p.name}/
                </span>
              </div>
              <span className="text-terminal-gray text-[10px] hidden sm:inline">
                {p.tech.length} technologies
              </span>
            </div>
            {activeProject !== i && (
              <p className="text-terminal-gray text-xs mt-1 ml-7">{p.description}</p>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeProject !== null && (
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border border-border rounded p-4 bg-muted">
              <TerminalPrompt
                command={`cat ${projects[activeProject].name}/README.md`}
                path="~/projects"
              />
              <h3 className="text-primary text-glow text-base font-bold mb-3">
                {projects[activeProject].description}
              </h3>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {projects[activeProject].tech.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    className="px-2 py-0.5 text-xs rounded bg-background border border-terminal-cyan/30 text-terminal-cyan 
                      hover:border-primary/50 hover:text-primary cursor-default transition-colors duration-200"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              <div className="space-y-3">
                {projects[activeProject].bullets.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.12 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 text-sm text-terminal-white p-2 rounded hover:bg-background/50 transition-colors"
                  >
                    <span className="text-terminal-yellow mt-0.5 shrink-0">→</span>
                    <div className="flex-1">
                      <span>{b.text}</span>
                      <motion.span
                        className={`ml-2 text-xs font-bold px-1.5 py-0.5 rounded bg-background/80 ${b.metricColor}`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {b.metric}
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TerminalWindow>
  );
};

export default ProjectsSection;
