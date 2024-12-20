import React, { useState, useEffect } from 'react';
import './blockBurst.css';

const createEmptyGrid = () => Array.from({ length: 8 }, () => Array(8).fill(null));

const shapes = [
  { type: 'square', blocks: [[0, 0], [0, 1], [1, 0], [1, 1]] }, // 2x2 square
  { type: 'line', blocks: [[0, 0], [1, 0], [2, 0], [3, 0]] },    // vertical line
  { type: 'lShape', blocks: [[0, 0], [1, 0], [2, 0], [2, 1]] }   // L-shape
];

const BlockBurst = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [currentShape, setCurrentShape] = useState(null);
  const [shapePosition, setShapePosition] = useState({ row: 0, col: 2 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Function to add a new random shape
  const spawnNewShape = () => {
    const newShape = shapes[Math.floor(Math.random() * shapes.length)];
    setCurrentShape(newShape);
    setShapePosition({ row: 0, col: 2 });
  };

  // Check if the shape can move down
  const canMoveDown = () => {
    if (!currentShape) return false;
    return currentShape.blocks.every(([r, c]) => {
      const newRow = shapePosition.row + r + 1;
      const newCol = shapePosition.col + c;
      return newRow < 8 && !grid[newRow][newCol]; // Check bounds and if space is empty
    });
  };

  // Move shape down
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
      if (newRow < 8 && newCol < 8) {
        newGrid[newRow][newCol] = currentShape.type;
      }
    });

    setGrid(newGrid);
    checkAndClearRows(newGrid);
    spawnNewShape();
  };

  // Check and clear full rows
  const checkAndClearRows = (newGrid) => {
    const clearedGrid = newGrid.filter((row) => row.some((cell) => cell === null));
    const clearedRows = 8 - clearedGrid.length;
    if (clearedRows > 0) {
      setScore((prevScore) => prevScore + clearedRows * 10);
      while (clearedGrid.length < 8) {
        clearedGrid.unshift(Array(8).fill(null)); // Add empty rows at the top
      }
      setGrid(clearedGrid);
    }
  };

  // Handle game over condition
  const checkGameOver = () => {
    if (grid[0].some((cell) => cell !== null)) {
      setIsGameOver(true);
    }
  };

  // Move shape left or right
  const moveShapeHorizontal = (direction) => {
    if (!currentShape) return; // Prevent running if no shape exists
    const canMove = currentShape.blocks.every(([r, c]) => {
      const newRow = shapePosition.row + r;
      const newCol = shapePosition.col + c + direction;
      return newCol >= 0 && newCol < 8 && !grid[newRow][newCol]; // Check bounds and collisions
    });

    if (canMove) {
      setShapePosition((pos) => ({ ...pos, col: pos.col + direction }));
    }
  };

  // Automatically move the shape down every second
  useEffect(() => {
    if (!isGameOver) {
      const interval = setInterval(() => {
        moveShapeDown();
        checkGameOver();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [shapePosition, currentShape, isGameOver]);

  // Key press handler for arrow keys
  const handleKeyPress = (e) => {
    if (!currentShape) return; // Prevent running if no shape exists
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

  // Set up the key press event listener
  useEffect(() => {
    spawnNewShape();
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Render the grid
  const renderGrid = () => {
    const renderedGrid = grid.map((row, rowIndex) => row.slice());

    if (currentShape) {
      currentShape.blocks.forEach(([r, c]) => {
        const newRow = shapePosition.row + r;
        const newCol = shapePosition.col + c;
        if (newRow < 8 && newCol < 8) {
          renderedGrid[newRow][newCol] = currentShape.type;
        }
      });
    }

    return renderedGrid.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row flex">
        {row.map((cell, cellIndex) => (
          <div
            key={cellIndex}
            className={`grid-cell w-8 h-8 border border-gray-300 ${cell ? 'bg-blue-500' : 'bg-white'}`}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="block-burst p-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">BlockBurst Game</h1>
      <h2 className="text-lg mb-4">Score: {score}</h2>
      {isGameOver ? (
        <h2 className="text-red-600">Game Over!</h2>
      ) : (
        <div className="game-grid">{renderGrid()}</div>
      )}

      {/* Control buttons for horizontal movement */}
      <div className="mt-4">
        <button
          onClick={() => moveShapeHorizontal(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
        >
          Move Left
        </button>
        <button
          onClick={() => moveShapeHorizontal(1)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Move Right
        </button>
      </div>
    </div>
  );
};

export default BlockBurst;
