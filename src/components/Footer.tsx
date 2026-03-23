import { motion } from "framer-motion";

const Footer = () => {
  const links = [
    { label: "GitHub", href: "https://github.com/Sheersh123" },
    { label: "LinkedIn", href: "https://linkedin.com/in/sheershsinha" },
    { label: "Email", href: "mailto:sheershsinha08@gmail.com" },
  ];

  return (
    <footer className="border-t border-border py-6 text-center font-mono">
      <div className="space-y-3">
        <p className="text-terminal-gray text-xs">
          <span className="text-primary">$</span> echo "Built with ❤️ by Sheersh Sinha"
        </p>
        <div className="flex justify-center gap-4 text-xs">
          {links.map((l) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-terminal-cyan hover:text-primary transition-colors"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              [{l.label}]
            </motion.a>
          ))}
        </div>
        <p className="text-terminal-gray/50 text-[10px]">
          © {new Date().getFullYear()} — All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
