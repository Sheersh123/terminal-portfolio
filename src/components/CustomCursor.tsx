import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const over = () => setHovering(true);
    const out = () => setHovering(false);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);

    const addHoverListeners = () => {
      document.querySelectorAll("button, a, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", over);
        el.addEventListener("mouseleave", out);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: pos.x - (hovering ? 16 : 4),
          y: pos.y - (hovering ? 16 : 4),
          width: hovering ? 32 : 8,
          height: hovering ? 32 : 8,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{
          borderRadius: "50%",
          backgroundColor: hovering ? "transparent" : "hsl(120, 100%, 55%)",
          border: hovering ? "2px solid hsl(120, 100%, 55%)" : "none",
          boxShadow: "0 0 10px hsl(120 100% 55% / 0.5)",
        }}
      />
      {/* Trail glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{ x: pos.x - 12, y: pos.y - 12 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(120 100% 55% / 0.15), transparent 70%)",
        }}
      />
    </>
  );
};

export default CustomCursor;
