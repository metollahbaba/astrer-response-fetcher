
import React from "react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer 
      className="w-full py-6 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Astrer Response Viewer</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <motion.a 
              href="#" 
              className="hover:text-primary transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Privacy
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-primary transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Terms
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-primary transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Contact
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
