import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGradient = ({ className = "" }) => {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{
        background: [
          'radial-gradient(circle at 20% 20%, rgba(123, 97, 255, 0.15) 0%, transparent 50%)',
          'radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
          'radial-gradient(circle at 40% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
          'radial-gradient(circle at 20% 20%, rgba(123, 97, 255, 0.15) 0%, transparent 50%)',
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default AnimatedGradient;