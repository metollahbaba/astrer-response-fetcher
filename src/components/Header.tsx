
import React from "react";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header 
      className="w-full py-6 md:py-8 relative z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2 text-primary font-medium tracking-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-xl md:text-2xl font-semibold">Astrer Response</span>
          </motion.div>
          
          <motion.a
            href="https://astrer.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Visit Astrer.tech
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
