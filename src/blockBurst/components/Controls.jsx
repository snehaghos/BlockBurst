import React from 'react';
import { motion } from 'framer-motion';

const Controls = ({ moveShapeHorizontal }) => (
  <div className="mt-4 flex space-x-4">
    <motion.button
      onClick={() => moveShapeHorizontal(-1)}
      className="px-4 py-2 bg-blue-600 text-white rounded"
      whileHover={{ scale: 1.05 }}
    >
      Move Left
    </motion.button>
    <motion.button
      onClick={() => moveShapeHorizontal(1)}
      className="px-4 py-2 bg-blue-600 text-white rounded"
      whileHover={{ scale: 1.05 }}
    >
      Move Right
    </motion.button>
  </div>
);

export default Controls;
