'use client'
import PromptCard from "./promptCard"
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <motion.section 
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
        <h1 className="head_text text-left"><span className="blue_gradient">{name} Profile</span></h1>
        <p className="desc text-left">{desc}</p>
        <AnimatePresence>
        {isVisible && (
          <motion.div
            className="mt-10 prompt_layout"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1.5 }}
          >
            {data.map((post) => (
              <PromptCard 
              key = {post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
              />
          ))
          }
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section> 
  )
}

export default Profile