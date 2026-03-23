import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TerminalPrompt from "./TerminalPrompt";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const fields = [
    { key: "name", label: "Name", placeholder: "John Doe", type: "text", icon: "👤" },
    { key: "email", label: "Email", placeholder: "john@example.com", type: "email", icon: "📧" },
    { key: "subject", label: "Subject", placeholder: "Let's work together!", type: "text", icon: "📝" },
    { key: "message", label: "Message", placeholder: "Hi Sheersh, I'd love to discuss...", type: "textarea", icon: "💬" },
  ];

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending delay for effect
    await new Promise((r) => setTimeout(r, 1500));

    // Open mailto with prefilled data
    const mailtoLink = `mailto:sheershsinha08@gmail.com?subject=${encodeURIComponent(
      formData.subject || "Portfolio Contact"
    )}&body=${encodeURIComponent(
      `Hi Sheersh,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.open(mailtoLink, "_blank");

    setSending(false);
    setSubmitted(true);
  };

  const isValid = formData.name && formData.email && formData.message;

  return (
    <TerminalWindow title="contact.sh — bash">
      <TerminalPrompt command="./send-message.sh --to sheersh" path="~/contact" />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              className="text-5xl"
            >
              ✅
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <p className="text-primary text-glow font-mono text-lg">
                Message sent successfully!
              </p>
              <p className="text-terminal-gray text-xs font-mono">
                $ echo "Thank you, {formData.name}! I'll get back to you soon."
              </p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", subject: "", message: "" });
              }}
              className="mt-4 px-4 py-2 text-xs font-mono border border-primary/30 text-primary rounded hover:bg-primary/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              $ ./send-another.sh
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 space-y-1"
            >
              <p className="text-terminal-white text-sm">
                Want to <span className="text-primary text-glow">collaborate</span>, have a{" "}
                <span className="text-terminal-cyan">question</span>, or just want to{" "}
                <span className="text-terminal-yellow">say hi</span>?
              </p>
              <p className="text-terminal-gray text-xs">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </motion.div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
              {fields.map((field, i) => (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`group rounded border transition-all duration-300 ${
                    focusedField === field.key
                      ? "border-primary border-glow bg-muted"
                      : "border-border hover:border-primary/30 bg-muted/30"
                  }`}
                >
                  <div className="flex items-start gap-3 p-3">
                    <motion.span
                      className="text-base mt-0.5 shrink-0"
                      animate={{
                        scale: focusedField === field.key ? 1.2 : 1,
                        rotate: focusedField === field.key ? [0, -10, 10, 0] : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {field.icon}
                    </motion.span>
                    <div className="flex-1 min-w-0">
                      <label className="block text-terminal-gray text-[10px] uppercase tracking-wider mb-1 font-mono">
                        {field.label}
                        {(field.key === "name" || field.key === "email" || field.key === "message") && (
                          <span className="text-terminal-red ml-1">*</span>
                        )}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          value={formData[field.key as keyof FormData]}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          onFocus={() => setFocusedField(field.key)}
                          onBlur={() => setFocusedField(null)}
                          placeholder={field.placeholder}
                          rows={4}
                          className="w-full bg-transparent text-terminal-white text-sm font-mono placeholder:text-terminal-gray/40 focus:outline-none resize-none"
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.key as keyof FormData]}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          onFocus={() => setFocusedField(field.key)}
                          onBlur={() => setFocusedField(null)}
                          placeholder={field.placeholder}
                          className="w-full bg-transparent text-terminal-white text-sm font-mono placeholder:text-terminal-gray/40 focus:outline-none"
                        />
                      )}
                    </div>
                    {formData[field.key as keyof FormData] && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-primary text-xs mt-1"
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Terminal-style submit */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-terminal-gray mb-3">
                  <span className="text-terminal-cyan">sheersh</span>
                  <span>@</span>
                  <span className="text-terminal-magenta">portfolio</span>
                  <span>:~/contact$</span>
                  <span className="text-primary">
                    {sending ? "sending..." : isValid ? "ready to send ✓" : "waiting for input..."}
                  </span>
                </div>

                <motion.button
                  type="submit"
                  disabled={!isValid || sending}
                  className={`w-full py-3 px-4 rounded font-mono text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    isValid && !sending
                      ? "bg-primary text-background hover:bg-primary/80 border border-primary/30 border-glow cursor-pointer"
                      : "bg-muted text-terminal-gray border border-border cursor-not-allowed opacity-50"
                  }`}
                  whileHover={isValid && !sending ? { scale: 1.02, y: -1 } : {}}
                  whileTap={isValid && !sending ? { scale: 0.98 } : {}}
                >
                  {sending ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⏳
                      </motion.span>
                      Sending message...
                    </>
                  ) : (
                    <>
                      <span>📨</span>
                      $ ./send-message.sh --execute
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Quick contact alternatives */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-5 pt-4 border-t border-border"
            >
              <p className="text-terminal-gray text-[10px] uppercase tracking-wider mb-2 font-mono">
                // or reach out directly
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Email", href: "mailto:sheershsinha08@gmail.com", icon: "📧" },
                  { label: "LinkedIn", href: "https://linkedin.com/in/sheershsinha", icon: "🔗" },
                  { label: "GitHub", href: "https://github.com/Sheersh123", icon: "🐙" },
                ].map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-border hover:border-primary/30 text-terminal-gray hover:text-primary transition-all duration-200 bg-muted/30 hover:bg-muted"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TerminalWindow>
  );
};

export default ContactSection;
