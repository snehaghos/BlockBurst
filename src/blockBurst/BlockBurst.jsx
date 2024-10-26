import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './blockBurst.css';

const createEmptyGrid = () => Array.from({ length: 12 }, () => Array(12).fill(null));

const shapes = [
  { type: 'square', blocks: [[0, 0], [0, 1], [1, 0], [1, 1]] },
  { type: 'line', blocks: [[0, 0], [1, 0], [2, 0], [3, 0]] },
  { type: 'lShape', blocks: [[0, 0], [1, 0], [2, 0], [2, 1]] },
  { type: 'hyphenShape', blocks: [[0, 0], [0, 0], [0, 0], [0, 1]] },
];

const BlockBurst = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [startGame, setStartGame] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const [shapePosition, setShapePosition] = useState({ row: 0, col: 2 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

 
  const spawnNewShape = () => {
    const newShape = shapes[Math.floor(Math.random() * shapes.length)];
    setCurrentShape(newShape);
    setShapePosition({ row: 0, col: 2 });
  };

  const canMoveDown = () => {
    if (!currentShape) return false;
    return currentShape.blocks.every(([r, c]) => {
      const newRow = shapePosition.row + r + 1;
      const newCol = shapePosition.col + c;
      return newRow < 12 && !grid[newRow][newCol];
    });
  };

  const moveShapeDown = () => {
    if (canMoveDown()) {
      setShapePosition((pos) => ({ ...pos, row: pos.row + 1 }));
    } else {
      mergeShape();
    }
  };

  const mergeShape = () => {
    const newGrid = grid.map((row) => row.slice());

    currentShape.blocks.forEach(([r, c]) => {
      const newRow = shapePosition.row + r;
      const newCol = shapePosition.col + c;
      if (newRow < 12 && newCol < 12) {
        newGrid[newRow][newCol] = currentShape.type;
      }
    });

    setGrid(newGrid);
    checkAndClearRows(newGrid);
    spawnNewShape();
  };

  const checkAndClearRows = (newGrid) => {
    const clearedGrid = newGrid.filter((row) => row.some((cell) => cell === null));
    const clearedRows = 12 - clearedGrid.length;
    if (clearedRows > 0) {
      setScore((prevScore) => prevScore + clearedRows * 10);
      while (clearedGrid.length < 12) {
        clearedGrid.unshift(Array(12).fill(null));
      }
      setGrid(clearedGrid);
    }
  };

  const checkGameOver = () => {
    if (grid[0].some((cell) => cell !== null)) {
      setIsGameOver(true);
    }
  };

  const moveShapeHorizontal = (direction) => {
    if (!currentShape) return;
    const canMove = currentShape.blocks.every(([r, c]) => {
      const newRow = shapePosition.row + r;
      const newCol = shapePosition.col + c + direction;
      return newCol >= 0 && newCol < 12 && !grid[newRow][newCol];
    });

    if (canMove) {
      setShapePosition((pos) => ({ ...pos, col: pos.col + direction }));
    }
  };

  useEffect(() => {
    if (startGame && !isGameOver) {
      const interval = setInterval(() => {
        moveShapeDown();
        checkGameOver();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [shapePosition, currentShape, isGameOver, startGame]);

  const handleKeyPress = (e) => {
    if (!currentShape) return;
    if (e.key === 'ArrowLeft') {
      moveShapeHorizontal(-1);
    }
    if (e.key === 'ArrowRight') {
      moveShapeHorizontal(1);
    }
    if (e.key === 'ArrowDown') {
      moveShapeDown();
    }
  };

  useEffect(() => {
    if (startGame) {
      spawnNewShape();
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [startGame]);

  const renderGrid = () => {
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
            className={`grid-cell w-6 h-6 border border-gray-300 ${cell ? 'bg-blue-500' : 'bg-transparent'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: cell ? 1.2 : 1 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>
    ));
  };

  return (
    <motion.div
      className="block-burst p-4 flex flex-col items-center justify-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* <motion.h1
        className="text-4xl font-bold mb-4 neon-title"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
      >
        BlockBurst Game
      </motion.h1> */}

      {!startGame ? (
        <motion.button
          onClick={() => setStartGame(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg start-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Game
        </motion.button>
      ) : (
        <>
          <motion.h2
            className="text-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Score: {score}
          </motion.h2>
          {isGameOver ? (
            <motion.h2
              className="game-over"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            >
              Game Over!
            </motion.h2>
          ) : (
            <motion.div
              className="game-grid"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            >
              {renderGrid()}
            </motion.div>
          )}
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
        </>
      )}
    </motion.div>
  );
};

export default BlockBurst;
