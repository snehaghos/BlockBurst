import React, { useState, useEffect } from 'react';
import './blockBurst.css';

const createEmptyGrid = () => Array.from({ length: 12 }, () => Array(12).fill(null));

const shapes = [
  { type: 'square', blocks: [[0, 0], [0, 1], [1, 0], [1, 1]] },
  { type: 'line', blocks: [[0, 0], [1, 0], [2, 0], [3, 0]] },
  { type: 'lShape', blocks: [[0, 0], [1, 0], [2, 0], [2, 1]] },
  { type: 'hyphenShape', blocks: [[0, 0], [0, 0], [0, 0], [0, 1]] },
  // {
  //   type: 'tShape', blocks: [[0, 0], [1, 0], [2, 0], [1, 1]]
  // },
  // {
  //   type: 'sShape',
  //   blocks: [[0, 1], [1, 0], [1, 1], [2, 0]]
  // },
  // {
  //   type: 'zShape',
  //   blocks: [[0, 0], [1, 0], [1, 1], [2, 1]]
  // },
  // {
  //   type: 'stairShape',
  //   blocks: [[0, 0], [0, 1], [1, 1], [1, 2]]
  // },
  // {
  //   type: 'cornerShape',
  //   blocks: [[0, 0], [0, 1], [1, 1]]
  // },
  // {
  //   type: 'reverseLShape',
  //   blocks: [[0, 1], [1, 1], [2, 1], [2, 0]]
  // },
  // {
  //   type: 'pyramidShape',
  //   blocks: [[1, 0], [0, 1], [1, 1], [2, 1]]
  // }

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
      {!startGame ? (
        <button
          onClick={() => setStartGame(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Start Game
        </button>
      ) : (
        <>
          <h2 className="text-lg mb-4">Score: {score}</h2>
          {isGameOver ? (
            <h2 className="text-red-600">Game Over!</h2>
          ) : (
            <div className="game-grid">{renderGrid()}</div>
          )}
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
        </>
      )}
    </div>
  );
};

export default BlockBurst;
