import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingFocusMode = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (!loading) return;

  return (
    <motion.div
      className="absolute inset-0 w-screen h-screen bg-[#F0F2F5] z-[999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <p className="text-6xl font-medium font-louize">
        Focusing <span className="animate-pulse">...</span>
      </p>
    </motion.div>
  );
};
