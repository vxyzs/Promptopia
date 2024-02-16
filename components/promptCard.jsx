'use client'
import { useState } from 'react';
import { Image, } from '@chakra-ui/next-js';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Tag, Divider } from '@chakra-ui/react';

const promptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
    const {data:session} = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [copied, setcopied] = useState("");

    const handleProfileClick = () => {
        console.log(post);
        if (post.creator._id === session?.user?.id) {
            router.push('/profile');
        } else {
            const { _id, username } = post.creator;
            router.push(`/others-profile/${_id}?username=${username}`);
        }
    }

    const handleCopy = () => {
        setcopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setcopied(""),5000);
        alert("Copied to clipboard");
    }
  return (
    <div className='prompt_card'>
        <div className='flex justify-between items-start gap-5 pb-2'>
            <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer '>
                <Image 
                    src={post.creator.image}
                    alt='user_image'
                    width={16}
                    height={16}
                    className='rounded-full shadow-lg hover:shadow-none'
                    onClick={handleProfileClick}
                />

                <div className='flex flex-col' onClick={handleProfileClick}>
                    <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
                    <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
                </div>
            </div>

            <div className='copy_btn ' onClick={handleCopy}>
                <Image 
                    src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                    width={8}
                    height={8}
                    alt='copy'
                    className=' hover:scale-75'
                />
            </div>
        </div> 
        <Divider orientation='horizontal' />
        <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
        <Tag colorScheme={'blue'} className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}</Tag>  

        {session?.user.id === post.creator._id && pathname === '/profile' && (
            <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
                    Edit
                </p>
                <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
                    Delete
                </p>
            </div>
        ) } 
    </div>
  )
}

export default promptCard