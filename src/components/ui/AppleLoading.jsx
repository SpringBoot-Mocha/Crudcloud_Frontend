/**
 * Componente de loading premium tipo Apple
 * Optimizado para performance y UX
 */

import React from 'react';
import { motion } from 'framer-motion';

const AppleLoading = ({
  size = 'md',
  color = 'brand',
  text = 'Cargando...'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    brand: 'border-brand-500',
    white: 'border-white',
    slate: 'border-slate-600'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 text-sm font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default AppleLoading;