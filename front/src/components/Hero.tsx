import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-[70vh] relative flex items-center justify-center bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <div 
        ref={ref}
        className="max-w-7xl mx-auto px-4 text-center relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-bold text-white mb-6"
        >
          Your Fridge Connected.
        </motion.h1>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
    </div>
  );
}