interface TerminalPromptProps {
  command: string;
  path?: string;
}

const TerminalPrompt = ({ command, path = "~" }: TerminalPromptProps) => {
  return (
    <div className="flex items-center gap-1 mb-3 flex-wrap">
      <span className="text-terminal-cyan font-bold">sheersh</span>
      <span className="text-terminal-gray">@</span>
      <span className="text-terminal-magenta">portfolio</span>
      <span className="text-terminal-gray">:</span>
      <span className="text-terminal-blue">{path}</span>
      <span className="text-terminal-gray">$</span>
      <span className="text-primary ml-1">{command}</span>
    </div>
  );
};

export default TerminalPrompt;
