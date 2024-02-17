'use client'
import { motion, AnimatePresence } from 'framer-motion';
import Feed from '@components/Feed';
import { useEffect, useState } from 'react';
import { Divider } from '@chakra-ui/react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.section
      className="w-full flex-center flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="desc text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1.5 }}
          >
            <h1 className="head_text text-center orange_gradient">
              Discover & Share 
              <br className="max-md:hidden" />
              <span className="blue_gradient text-center"> AI-Powered Prompts</span> 
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isVisible && (
          <motion.p
            className="desc text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.5 }}
          >
            PromptEase is an open-source AI prompting tool for the modern world to discover, create, and share creative prompts.
          </motion.p>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="desc"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1.5 }}
          >
            <Feed />
            
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Home;
