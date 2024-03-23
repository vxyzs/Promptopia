'use client'
import { motion, AnimatePresence } from 'framer-motion';
import Feed from '../components/Feed';
import { useEffect, useState } from 'react';


const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  
  const words = [
    {
      text: "PromptEase",
    },
    {
      text: "is"
    },
    {
      text: "an"
    },
    {
      text: "open-source"
    },
    {
      text: "AI"
    },
    {
      text: "Prompting"
    },
    {
      text: "Tool"
    },
    {
      text: "for"
    },{
      text: "the"
    },
    {
      text: "modern"
    },
    {
      text: "world"
    },
    {
      text: "to"
    },
    {
      text: "discover,"
    },
    {
      text: "create,"
    },
    {
      text: "and"
    },
    {
      text: "share"
    },
    {
      text: "creative"
    },
    {
      text: "Prompts."
    }
  ];

  return (
    <motion.section
      className="w-full flex-center flex-col relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="desc relative z-10"
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
