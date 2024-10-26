import React from 'react';
import { motion } from 'framer-motion';

const Grid = ({ grid, currentShape, shapePosition }) => {
  const shapeColors = {
    square: 'bg-yellow-500',
    line: 'bg-blue-500',
    lShape: 'bg-red-500',
    hyphenShape: 'bg-green-500',
  };

  const renderedGrid = grid.map((row, rowIndex) => row.slice());
  if (currentShape) {
    currentShape.blocks.forEach(([r, c]) => {
      const newRow = shapePosition.row + r;
      const newCol = shapePosition.col + c;
      if (newRow < 12 && newCol < 12) {
        renderedGrid[newRow][newCol] = currentShape.type;
      }
    });
  }

  return renderedGrid.map((row, rowIndex) => (
    <motion.div key={rowIndex} className="grid-row flex">
      {row.map((cell, cellIndex) => (
        <motion.div
          key={cellIndex}
          className={`grid-cell w-8 h-8 border border-gray-300 ${cell ? shapeColors[cell] : 'bg-white'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: cell ? 1.2 : 1 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  ));
};

export default Grid;
