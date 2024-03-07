import { motion } from "framer-motion";

export const DragError = () => {
  return (
    <motion.div
      className="flex items-center justify-center bg-white rounded-xl"
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="red"
          viewBox="0 0 256 256"
        >
          <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-42.34-82.34L139.31,152l18.35,18.34a8,8,0,0,1-11.32,11.32L128,163.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L116.69,152,98.34,133.66a8,8,0,0,1,11.32-11.32L128,140.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
        <div className="flex flex-col items-center">
          <h3 className="pr-8 text-2xl">Error, file type not supported.</h3>
          <h4 className="text-xl opacity-80">Just try another one.</h4>
        </div>
      </div>
    </motion.div>
  );
};
