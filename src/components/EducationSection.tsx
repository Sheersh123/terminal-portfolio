import TerminalWindow from "./TerminalWindow";
import TerminalPrompt from "./TerminalPrompt";

const EducationSection = () => {
  return (
    <TerminalWindow title="education.sh — bash" delay={0.25}>
      <TerminalPrompt command="cat ~/education/degree.json" path="~/education" />
      <div className="bg-muted rounded p-4 border border-border mb-4">
        <pre className="text-sm">
          <span className="text-terminal-gray">{"{"}</span>{"\n"}
          <span className="text-terminal-cyan">  "degree"</span>
          <span className="text-terminal-gray">: </span>
          <span className="text-terminal-yellow">"B.Tech in Computer Science and Engineering"</span>
          <span className="text-terminal-gray">,</span>{"\n"}
          <span className="text-terminal-cyan">  "institution"</span>
          <span className="text-terminal-gray">: </span>
          <span className="text-terminal-yellow">"SRM Institute of Science and Technology"</span>
          <span className="text-terminal-gray">,</span>{"\n"}
          <span className="text-terminal-cyan">  "location"</span>
          <span className="text-terminal-gray">: </span>
          <span className="text-terminal-yellow">"Chennai"</span>
          <span className="text-terminal-gray">,</span>{"\n"}
          <span className="text-terminal-cyan">  "duration"</span>
          <span className="text-terminal-gray">: </span>
          <span className="text-terminal-yellow">"2021 – 2025"</span>{"\n"}
          <span className="text-terminal-gray">{"}"}</span>
        </pre>
      </div>

      <TerminalPrompt command="cat ~/certifications/list.txt" path="~/education" />
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-terminal-yellow">🏅</span>
          <span className="text-terminal-white">AWS Solutions Architect – Associate</span>
          <span className="px-1.5 py-0.5 text-xs rounded bg-terminal-yellow/10 text-terminal-yellow border border-terminal-yellow/30">
            Ongoing
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-terminal-yellow">🏅</span>
          <span className="text-terminal-white">Multicloud Network Associate – Aviatrix</span>
          <span className="px-1.5 py-0.5 text-xs rounded bg-primary/10 text-primary border border-primary/30">
            Dec 2025
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <TerminalPrompt command="cat ~/experience/forage.log" path="~/education" />
        <div className="bg-muted rounded p-3 border border-border">
          <p className="text-terminal-cyan text-xs mb-1">
            AWS APAC Solutions Architecture – Forage | Dec 2025
          </p>
          <div className="space-y-1 text-xs text-terminal-white">
            <p>
              <span className="text-terminal-yellow">→</span> Designed scalable hosting architecture using AWS Elastic Beanstalk
            </p>
            <p>
              <span className="text-terminal-yellow">→</span> Communicated architecture in clear, non-technical language for client
            </p>
          </div>
        </div>
      </div>
    </TerminalWindow>
  );
};

export default EducationSection;
