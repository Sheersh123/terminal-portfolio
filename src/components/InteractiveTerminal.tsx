import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { motion } from "framer-motion";

const useTypingSound = () => {
  const ctxRef = useRef<AudioContext | null>(null);

  const play = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Random frequency for mechanical key feel
    osc.frequency.value = 1800 + Math.random() * 600;
    osc.type = "square";
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.06);
  }, []);

  return play;
};

interface HistoryEntry {
  command: string;
  output: string;
  isHtml?: boolean;
}

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  about       - Display professional summary
  skills      - List technical skills
  projects    - Show project highlights
  education   - Show education & certifications
  contact     - Display contact information
  github      - Open GitHub profile
  linkedin    - Open LinkedIn profile
  resume      - Download resume
  clear       - Clear terminal
  neofetch    - System info
  whoami      - Who am I?
  date        - Current date
  uptime      - Career uptime`,

  about: `┌─────────────────────────────────────────────────┐
│  SHEERSH SINHA — DevOps Engineer                │
│─────────────────────────────────────────────────│
│  Engineering graduate focused on building       │
│  scalable cloud-native solutions through        │
│  CI/CD automation, container orchestration,     │
│  and Infrastructure as Code on AWS.             │
│                                                 │
│  📍 Bengaluru, Karnataka                        │
│  📧 sheershsinha08@gmail.com                    │
│  📞 +91-7903432922                              │
└─────────────────────────────────────────────────┘`,

  skills: `╔══════════════════════════════════════════════╗
║  TECHNICAL SKILLS                            ║
╠══════════════════════════════════════════════╣
║  ☁️  Cloud    : AWS (EC2,VPC,IAM,EKS,ECR)    ║
║  ⚙️  DevOps   : Jenkins, CodePipeline        ║
║  🐳 Containers: Docker, Kubernetes           ║
║  📜 IaC      : Terraform, Bash, Python       ║
║  📊 Monitor  : CloudWatch, Observability     ║
║  🛠️  Tools    : Linux, Git, Nginx            ║
╚══════════════════════════════════════════════╝`,

  projects: `[1] Cloud-Native Application Deployment
    → Jenkins CI/CD | Terraform | AWS EKS
    → Reduced manual deployment by 70%

[2] Containerized Web App Deployment
    → Docker | Bash | AWS EC2
    → Accelerated deployment cycles by 65%

[3] AWS-Native CI/CD Deployment
    → CodePipeline | EKS | ECR | CloudWatch
    → Reduced release time by 70%

Type 'projects' and scroll up for details.`,

  education: `🎓 B.Tech in CSE — SRM Institute, Chennai (2021-2025)

🏅 AWS Solutions Architect – Associate (Ongoing)
🏅 Multicloud Network Associate – Aviatrix (Dec 2025)

📋 AWS APAC Solutions Architecture – Forage (Dec 2025)`,

  contact: `╔═══════════════════════════════════════════╗
║  CONTACT INFORMATION                      ║
╠═══════════════════════════════════════════╣
║  📧 sheershsinha08@gmail.com              ║
║  📞 +91-7903432922                        ║
║  🔗 linkedin.com/in/sheershsinha          ║
║  🐙 github.com/Sheersh123                ║
║  📍 Bengaluru, Karnataka                  ║
╚═══════════════════════════════════════════╝`,

  whoami: "sheersh — DevOps Engineer & Cloud Enthusiast",

  date: new Date().toLocaleString(),

  uptime: "Career uptime: 4+ years of learning, building, and shipping",

  neofetch: `
  sheersh@portfolio
  ─────────────────
  OS:       Cloud-Native Linux
  Host:     Bengaluru, India
  Shell:    bash 5.1.16
  Stack:    AWS / Docker / K8s / Terraform
  Editor:   VS Code
  Theme:    Matrix Green [Terminal]
  Terminal: portfolio-v1.0
  CPU:      Always Learning™
  Memory:   ∞ curiosity / 0 limits`,
};

const InteractiveTerminal = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "",
      output: `Welcome to Sheersh's Portfolio Terminal v1.0
Type 'help' to see available commands.
──────────────────────────────────────────`,
    },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const playType = useTypingSound();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistIdx(-1);

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    if (trimmed === "github") {
      window.open("https://github.com/Sheersh123", "_blank");
      setHistory((prev) => [...prev, { command: cmd, output: "Opening GitHub profile..." }]);
      return;
    }

    if (trimmed === "linkedin") {
      window.open("https://linkedin.com/in/sheershsinha", "_blank");
      setHistory((prev) => [...prev, { command: cmd, output: "Opening LinkedIn profile..." }]);
      return;
    }

    if (trimmed === "resume") {
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: "📄 Resume available — contact sheershsinha08@gmail.com for the latest copy!" },
      ]);
      return;
    }

    const output = COMMANDS[trimmed] || `bash: ${trimmed}: command not found. Type 'help' for available commands.`;
    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
        setHistIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) {
        const newIdx = histIdx - 1;
        setHistIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      } else {
        setHistIdx(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded border border-border border-glow bg-card overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-muted border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-terminal-red opacity-80" />
          <div className="w-3 h-3 rounded-full bg-terminal-yellow opacity-80" />
          <div className="w-3 h-3 rounded-full bg-primary opacity-80" />
        </div>
        <span className="text-terminal-gray text-xs font-mono ml-2">
          interactive — bash — 80×24
        </span>
      </div>

      <div className="p-4 font-mono text-sm max-h-[400px] overflow-y-auto">
        {history.map((entry, i) => (
          <div key={i} className="mb-3">
            {entry.command && (
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-terminal-cyan font-bold">sheersh</span>
                <span className="text-terminal-gray">@</span>
                <span className="text-terminal-magenta">portfolio</span>
                <span className="text-terminal-gray">:~$</span>
                <span className="text-primary ml-1">{entry.command}</span>
              </div>
            )}
            <pre className="text-terminal-white whitespace-pre-wrap mt-1 text-xs sm:text-sm">
              {entry.output}
            </pre>
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-terminal-cyan font-bold">sheersh</span>
          <span className="text-terminal-gray">@</span>
          <span className="text-terminal-magenta">portfolio</span>
          <span className="text-terminal-gray">:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-primary outline-none border-none ml-1 font-mono text-sm min-w-[100px] caret-primary"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
