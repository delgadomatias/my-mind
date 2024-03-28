import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingFocusMode = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (!loading) return;

  return (
    <motion.div className="absolute inset-0 z-[999] flex h-screen w-screen items-center justify-center bg-[#F0F2F5]">
      <p className="font-louize text-6xl font-medium">
        Focusing <span className="animate-pulse">...</span>
      </p>
    </motion.div>
  );
};
