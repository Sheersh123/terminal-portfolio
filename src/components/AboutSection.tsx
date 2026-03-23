import TerminalWindow from "./TerminalWindow";
import TerminalPrompt from "./TerminalPrompt";

const AboutSection = () => {
  return (
    <TerminalWindow title="about.sh — bash" delay={0.1}>
      <TerminalPrompt command="cat README.md" path="~/about" />
      <div className="space-y-3 text-terminal-white text-sm leading-relaxed">
        <p>
          Engineering graduate focused on building{" "}
          <span className="text-primary text-glow">scalable cloud-native solutions</span>{" "}
          through CI/CD automation, container orchestration, and Infrastructure as Code on AWS.
        </p>
        <p>
          Hands-on experience designing{" "}
          <span className="text-terminal-cyan">Kubernetes-based deployments</span>,
          automating delivery pipelines, and improving deployment reliability
          using modern DevOps practices.
        </p>
        <p>
          Strong interest in optimizing{" "}
          <span className="text-terminal-yellow">release workflows</span>,{" "}
          <span className="text-terminal-yellow">infrastructure provisioning</span>, and{" "}
          <span className="text-terminal-yellow">observability-driven operations</span>{" "}
          within fast-paced cloud environments.
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <TerminalPrompt command="echo $CONTACT_INFO" path="~/about" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-terminal-gray">📍 </span>
            <span className="text-terminal-white">Bengaluru, Karnataka</span>
          </div>
          <div>
            <span className="text-terminal-gray">📧 </span>
            <a href="mailto:sheershsinha08@gmail.com" className="text-terminal-cyan hover:text-primary transition-colors hover:underline">
              sheershsinha08@gmail.com
            </a>
          </div>
          <div>
            <span className="text-terminal-gray">📞 </span>
            <span className="text-terminal-white">+91-7903432922</span>
          </div>
          <div>
            <span className="text-terminal-gray">🔗 </span>
            <a href="https://linkedin.com/in/sheershsinha" target="_blank" rel="noopener noreferrer" className="text-terminal-cyan hover:text-primary transition-colors hover:underline">
              linkedin.com/in/sheershsinha
            </a>
          </div>
        </div>
      </div>
    </TerminalWindow>
  );
};

export default AboutSection;
