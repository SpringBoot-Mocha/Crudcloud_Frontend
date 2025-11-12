import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({
  children,
  className = "",
  hoverable = true,
  ...props
}) => {
  return (
    <motion.div
      className={`
        relative p-8
        bg-white/10 backdrop-blur-md
        border border-white/20
        rounded-3xl shadow-glass
        transition-all duration-500
        ${hoverable ? 'hover:bg-white/15 hover:shadow-glass-light' : ''}
        ${className}
      `}
      whileHover={hoverable ? {
        y: -4,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
      {...props}
    >
      {children}

      {/* Shine effect on hover */}
      {hoverable && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.div>
  );
};

export default GlassCard;