'use client'
import { useState, useEffect } from "react";
import { Image } from '@chakra-ui/next-js';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineLike } from "react-icons/ai";
import { Tag, Button, Divider, Popover, PopoverArrow, PopoverTrigger, PopoverBody, PopoverCloseButton, Portal, PopoverContent, PopoverHeader } from '@chakra-ui/react';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, likedPrompts }) => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [copied, setCopied] = useState("");
    const [liked, setLiked] = useState(false);
    const [Post, setpost] = useState(post);

    const handleProfileClick = () => {
        console.log(post);
        if (Post.creator?._id === session?.user?.id) {
            router.push('/profile');
        } else {
            const { _id, username } = Post.creator;
            router.push(`/others-profile/${_id}?username=${username}`);
        }
    }

    const handleCopy = () => {
        setCopied(Post.prompt);
        navigator.clipboard.writeText(Post.prompt);
        setTimeout(() => setCopied(""), 5000);
        alert("Copied to clipboard");
    }

    const handleLikes = async () => {
        if (!session) {
            alert('Please login!');
            return;
        }

        const newLiked = !liked;

        setLiked(newLiked);

        setpost(prevPost => ({
            ...prevPost,
            likes: newLiked ? prevPost.likes + 1 : prevPost.likes - 1,
        }));

        try {
            const res = await fetch(`/api/prompt/${Post._id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: Post.prompt,
                    tag: Post.tag,
                    likes: newLiked ? Post.likes + 1 : Post.likes - 1,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                console.log(newLiked ? 'liked' : 'disliked');
            } else {
                console.error('Failed to update like status');
            }
        } catch (error) {
            console.error('Error updating like status:', error);
        } 

        if (newLiked) {
            try {
                const res = await fetch(`/api/users/${session?.user?.id}/likedPosts/${Post._id}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        creator: Post.creator._id,
                        prompt: Post.prompt,
                        tag: Post.tag,
                        likes: Post.likes + 1,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (res.ok) {
                    console.log('liked added');
                } else {
                    console.error('Failed to update');
                }
            } catch (error) {
                console.error('Error updating liked prompt', error);
            }
        } else {
            try {
                const res = await fetch(`/api/users/${session?.user?.id}/likedPosts/${Post._id}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    console.log('liked prompt removed');
                } else {
                    console.error('Failed to update');
                }
            } catch (error) {
                console.error('Error updating liked prompt', error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/prompt/${post?._id}`, {
                    method: 'GET',
                });
                const data = await response.json();
                console.log(data);
                setpost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        if (likedPrompts && likedPrompts.find(prompt => prompt._id === post?._id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }

        fetchData();

    }, [likedPrompts, post]);

    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5 pb-2'>
                <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer ' onClick={handleProfileClick}>
                    <Image
                        src={Post.creator?.image}
                        alt='user_image'
                        width={16}
                        height={16}
                        className='rounded-full shadow hover:shadow-none hover:scale-95'
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>{Post.creator?.username}</h3>
                        <p className='font-inter text-sm text-gray-500 hidden md:block'>{Post.creator?.email}</p>
                    </div>
                </div>

                <div className='copy_btn ' onClick={handleCopy}>
                    <Image
                        src={copied === Post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                        width={8}
                        height={8}
                        alt='copy'
                        className=' hover:scale-90 '
                    />
                </div>
                <div className='flex flex-col gap-1 justify-center items-center'>
                    {session?.user.id !== Post.creator?._id && pathname !== '/profile' && (
                        <AiOutlineLike color={liked ? 'red' : 'gray'} className='copy_btn hover:scale-95' onClick={handleLikes} />
                    )}
                    <p className='font-satoshi font-light text-xs'>{Post.likes} {Post.likes === 1 ? 'like' : 'likes'}</p>
                </div>
            </div>
            <Divider orientation='horizontal' />
            <p className='my-4 font-satoshi text-sm text-gray-700'>{Post.prompt}</p>
            <Tag colorScheme={'blue'} className='font-serif text-sm cursor-pointer hover:scale-95 w-fit' onClick={() => handleTagClick && handleTagClick(Post.tag)}>#{Post.tag}</Tag>
            {session?.user.id === Post.creator?._id && pathname === '/profile' && (
                <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                    <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
                        Edit
                    </p>
                    <Popover>
                        <PopoverTrigger>
                            <p className='font-inter text-sm orange_gradient cursor-pointer' >
                                Delete
                            </p>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader>Are you sure you want to Delete the prompt?</PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <Button colorScheme='red' onClick={handleDelete}>Yes</Button>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </div>
            )}
        </div>
    )
}

export default PromptCard;