import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalPrompt from "./TerminalPrompt";

const AboutSection = () => {
  const infoItems = [
    { icon: "📍", label: "Location", value: "Bengaluru, Karnataka", link: undefined },
    { icon: "📧", label: "Email", value: "sheershsinha08@gmail.com", link: "mailto:sheershsinha08@gmail.com" },
    { icon: "📞", label: "Phone", value: "+91-7903432922", link: undefined },
    { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/sheershsinha", link: "https://linkedin.com/in/sheershsinha" },
    { icon: "🐙", label: "GitHub", value: "github.com/Sheersh123", link: "https://github.com/Sheersh123" },
  ];

  return (
    <TerminalWindow title="about.sh — bash">
      <TerminalPrompt command="cat README.md" path="~/about" />
      <div className="space-y-3 text-terminal-white text-sm leading-relaxed">
        {[
          <>Engineering graduate focused on building{" "}
            <span className="text-primary text-glow">scalable cloud-native solutions</span>{" "}
            through CI/CD automation, container orchestration, and Infrastructure as Code on AWS.</>,
          <>Hands-on experience designing{" "}
            <span className="text-terminal-cyan">Kubernetes-based deployments</span>,
            automating delivery pipelines, and improving deployment reliability
            using modern DevOps practices.</>,
          <>Strong interest in optimizing{" "}
            <span className="text-terminal-yellow">release workflows</span>,{" "}
            <span className="text-terminal-yellow">infrastructure provisioning</span>, and{" "}
            <span className="text-terminal-yellow">observability-driven operations</span>{" "}
            within fast-paced cloud environments.</>,
        ].map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            {text}
          </motion.p>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-border">
        <TerminalPrompt command="echo $CONTACT_INFO" path="~/about" />
        <div className="space-y-2">
          {infoItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              whileHover={{ x: 6, scale: 1.01 }}
              className="flex items-center gap-3 px-3 py-2 rounded bg-muted/50 hover:bg-muted border border-transparent hover:border-border transition-all duration-200 cursor-default group"
            >
              <span className="text-base group-hover:scale-125 transition-transform duration-200">{item.icon}</span>
              <span className="text-terminal-gray text-xs w-16 shrink-0">{item.label}:</span>
              {item.link ? (
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-terminal-cyan hover:text-primary transition-colors text-sm hover:underline"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-terminal-white text-sm">{item.value}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </TerminalWindow>
  );
};

export default AboutSection;
