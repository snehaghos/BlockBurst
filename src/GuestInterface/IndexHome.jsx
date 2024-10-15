import React from 'react';
import { motion } from 'framer-motion';
import '../blockBurst/blockBurst.css';

const IndexHome = () => {
  const homeStyle = {
    backgroundImage: "url('images/blockbg.jpg')",
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const slideInAnimation = {
    initial: { x: '-100vw', scale: 0.5, opacity: 0 }, 
    animate: { x: 0, scale: 1, opacity: 1 }, 
    transition: { type: 'spring', stiffness: 80, damping: 15, duration: 2.5 },
  };

  return (
    <div style={homeStyle}>
      <motion.div
        className="text-9xl font-extrabold font-luckiestGuy flex justify-center items-center h-[100vh] neon-border"
        initial="initial"
        animate="animate"
        variants={slideInAnimation} 
      >
        Block Burst
      </motion.div>
    </div>
  );
};

export default IndexHome;
