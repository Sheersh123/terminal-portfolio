import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalPrompt from "./TerminalPrompt";

const EducationSection = () => {
  return (
    <TerminalWindow title="education.sh — bash">
      <TerminalPrompt command="cat ~/education/degree.json" path="~/education" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        className="bg-muted rounded p-4 border border-border hover:border-primary/20 transition-all duration-300 mb-4 cursor-default"
      >
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
      </motion.div>

      <TerminalPrompt command="cat ~/certifications/list.txt" path="~/education" />
      <div className="space-y-2 mb-4">
        {[
          { name: "AWS Solutions Architect – Associate", status: "Ongoing", statusColor: "bg-terminal-yellow/10 text-terminal-yellow border-terminal-yellow/30" },
          { name: "Multicloud Network Associate – Aviatrix", status: "Dec 2025", statusColor: "bg-primary/10 text-primary border-primary/30" },
        ].map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ x: 6, scale: 1.01 }}
            className="flex items-center gap-2 text-sm px-3 py-2 rounded bg-muted/50 hover:bg-muted 
              border border-transparent hover:border-border transition-all duration-200 cursor-default"
          >
            <motion.span whileHover={{ rotate: 20, scale: 1.2 }} className="text-base">🏅</motion.span>
            <span className="text-terminal-white flex-1">{cert.name}</span>
            <span className={`px-1.5 py-0.5 text-xs rounded border ${cert.statusColor}`}>
              {cert.status}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="pt-3 border-t border-border">
        <TerminalPrompt command="cat ~/experience/forage.log" path="~/education" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.01 }}
          className="bg-muted rounded p-3 border border-border hover:border-primary/20 transition-all duration-300 cursor-default"
        >
          <p className="text-terminal-cyan text-xs mb-2 font-bold">
            AWS APAC Solutions Architecture – Forage | Dec 2025
          </p>
          {[
            "Designed scalable hosting architecture using AWS Elastic Beanstalk",
            "Communicated architecture in clear, non-technical language for client",
          ].map((text, i) => (
            <motion.p
              key={i}
              whileHover={{ x: 4 }}
              className="text-xs text-terminal-white py-1 flex items-start gap-2"
            >
              <span className="text-terminal-yellow shrink-0">→</span>
              <span>{text}</span>
            </motion.p>
          ))}
        </motion.div>
      </div>
    </TerminalWindow>
  );
};

export default EducationSection;
