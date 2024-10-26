import React from 'react';
import { motion } from 'framer-motion';

const Score = ({ score, isGameOver }) => (
  <div>
    <motion.h2
      className="text-lg mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      Score: {score}
    </motion.h2>
    {isGameOver && (
      <motion.h2
        className="game-over"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      >
        Game Over!
      </motion.h2>
    )}
  </div>
);

export default Score;
