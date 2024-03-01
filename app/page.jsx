'use client'
import { motion, AnimatePresence } from 'framer-motion';
import Feed from '@components/Feed';
import { useEffect, useState } from 'react';
import { TypewriterEffect } from '@components/ui/TypewritterEffect';

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
      <motion.div
        className="relative z-10 w-full mx-auto"
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
      <TypewriterEffect words={words} />
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
