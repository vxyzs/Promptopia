'use client'
import { useState, useEffect} from 'react';
import { Image } from '@chakra-ui/next-js';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';


const promptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
    const {data:session} = useSession();

    const [copied, setcopied] = useState("");

    const handleCopy = () => {
        setcopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setcopied(""),5000);
    }
  return (
    <div className='prompt_card'>
        <div className='flex justify-between items-start gap-5'>
            <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
                <Image 
                    src={post.creator.image}
                    alt='user_image'
                    width={16}
                    height={16}
                    className='rounded-full'
                />

                <div className='flex flex-col'>
                    <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
                    <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
                </div>
            </div>

            <div className='copy_btn' onClick={handleCopy}>
                <Image 
                    src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                    width={8}
                    height={8}
                />
            </div>
        </div> 

        <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
        <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>   
    </div>
  )
}

export default promptCard