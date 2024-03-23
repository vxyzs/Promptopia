import { Button, FormLabel, Input, Textarea } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Form = ({type, post, setPost, submittimg, handlesubmit}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);
  return (
    <motion.section 
        className='w-full max-w-full flex-start flex-col'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
    >
        <h1 className='head_text text-left'><span className='blue_gradient'>{type} Post</span></h1>
        <p className='desc text-left max-w-md'>
            {type} and share amazing posts with the world.
        </p>
        <AnimatePresence>
        {isVisible && (
            <motion.form onSubmit={handlesubmit} 
                className='mt-10 w-full max-w-2xl flex flex-col glassmorphism'
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 2 }}
            >
            <FormLabel>
                <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI prompt</span>
                <Textarea value={post.prompt} onChange={(e) => setPost({ ...post, prompt: e.target.value})} placeholder='Write your prompt here...' required className='form_textarea' />
            </FormLabel>

            <FormLabel>
                <span className='font-satoshi font-semibold text-base text-gray-700'>Tag {' '} <span className='font-normal'>(#product, #webdevelopment,#idea)</span></span>
                <Input value={post.tag} onChange={(e) => setPost({ ...post, tag: e.target.value})} placeholder='#tag...' required className='form_input' />
            </FormLabel>

            <div className='flex-end mx-3 mb-5 gap-4'>
                <Link href='/' className='text-gray-500 text-sm'>
                    Cancel
                </Link>

                <Button type='Submit' className='px-5 py-1.5 text-sm rounded-full text-white' colorScheme={'orange'} isLoading={submittimg} loadingText={type}>
                    {submittimg ? `${type}...` : type}
                </Button>
            </div>
            </motion.form>
        )}
        
        </AnimatePresence>
    </motion.section>
  )
}

export default Form
