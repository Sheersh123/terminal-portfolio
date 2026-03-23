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
      "Engineered Jenkins-based CI/CD pipelines, reducing manual deployment steps by 70%",
      "Provisioned AWS infra using Terraform (VPC, EC2, IAM), reducing provisioning time from 20min to 8min",
      "Orchestrated containerized React app on AWS EKS with Kubernetes service abstraction",
    ],
  },
  {
    name: "container-web-deploy",
    description: "Containerized Web Application Deployment",
    tech: ["Docker", "Bash", "AWS EC2", "SSH Hardening"],
    bullets: [
      "Optimized Docker-based workflows using Bash automation, accelerating deployment by 65%",
      "Established consistent dev/prod environments, minimizing configuration drift",
      "Hardened security on AWS EC2 by restricting SSH to single trusted IP",
    ],
  },
  {
    name: "aws-native-cicd",
    description: "AWS-Native CI/CD Deployment",
    tech: ["CodePipeline", "CodeBuild", "CodeDeploy", "EKS", "ECR", "CloudWatch"],
    bullets: [
      "Implemented AWS-native CI/CD pipelines, reducing release time by 70%",
      "Standardized Kubernetes deployments on EKS using declarative manifests",
      "Integrated Docker lifecycle with ECR and centralized logging via CloudWatch, reducing debug time by 50%",
    ],
  },
];

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <TerminalWindow title="projects.sh — bash" delay={0.2}>
      <TerminalPrompt command="ls -la ~/projects/" path="~/projects" />

      {/* File listing */}
      <div className="mb-4 space-y-1">
        {projects.map((p, i) => (
          <motion.button
            key={p.name}
            onClick={() => setActiveProject(i)}
            className={`block w-full text-left px-3 py-1.5 rounded text-sm transition-all duration-200 ${
              activeProject === i
                ? "bg-primary/10 text-primary border border-primary/30"
                : "text-terminal-white hover:bg-muted hover:text-primary"
            }`}
            whileHover={{ x: 5 }}
          >
            <span className="text-terminal-gray mr-2">{activeProject === i ? "▸" : " "}</span>
            <span className="text-terminal-blue">drwxr-xr-x</span>{" "}
            <span className={activeProject === i ? "text-primary text-glow" : "text-terminal-cyan"}>
              {p.name}/
            </span>
          </motion.button>
        ))}
      </div>

      {/* Project detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="border border-border rounded p-4 bg-muted"
        >
          <TerminalPrompt
            command={`cat ${projects[activeProject].name}/README.md`}
            path="~/projects"
          />
          <h3 className="text-primary text-glow text-base font-bold mb-2">
            {projects[activeProject].description}
          </h3>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {projects[activeProject].tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs rounded bg-background border border-terminal-cyan/30 text-terminal-cyan"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Bullets */}
          <div className="space-y-2">
            {projects[activeProject].bullets.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-terminal-white"
              >
                <span className="text-terminal-yellow mt-0.5 shrink-0">→</span>
                <span>{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </TerminalWindow>
  );
};

export default ProjectsSection;
