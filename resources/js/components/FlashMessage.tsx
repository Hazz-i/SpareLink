import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface FlashMessageProps {
  message?: string;
  type?: "success" | "error" | "info";
}

export default function FlashMessage({ message, type = "success" }: FlashMessageProps) {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const bgColor =
    type === "success"
      ? "bg-green-500/90 border-green-400"
      : type === "error"
      ? "bg-red-500/90 border-red-400"
      : "bg-blue-500/90 border-blue-400";

  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg text-white shadow-lg border ${bgColor}`}
        >
          <div className="flex items-center gap-2">
            {type === "success" && (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {type === "error" && (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
