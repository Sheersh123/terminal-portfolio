const Footer = () => {
  return (
    <footer className="border-t border-border py-6 text-center font-mono">
      <div className="space-y-2">
        <p className="text-terminal-gray text-xs">
          <span className="text-primary">$</span> echo "Built with ❤️ by Sheersh Sinha"
        </p>
        <div className="flex justify-center gap-4 text-xs">
          <a
            href="https://github.com/Sheersh123"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-cyan hover:text-primary transition-colors"
          >
            [GitHub]
          </a>
          <a
            href="https://linkedin.com/in/sheershsinha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-cyan hover:text-primary transition-colors"
          >
            [LinkedIn]
          </a>
          <a
            href="mailto:sheershsinha08@gmail.com"
            className="text-terminal-cyan hover:text-primary transition-colors"
          >
            [Email]
          </a>
        </div>
        <p className="text-terminal-gray/50 text-[10px]">
          © {new Date().getFullYear()} — All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
