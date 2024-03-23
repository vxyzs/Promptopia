'use client'
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon } from "@chakra-ui/react";

import Form from "../../components/Form"

const CreatePrompt = () => {
    const { data: session} = useSession();
    const router = useRouter();
    const [submittimg, setsubmittimg] = useState(false);
    const [post, setpost] = useState({
        prompt: '',
        tag: '',
    });
    const [alert, setAlert] = useState({ type: '', message: '' });

    const createPrompt = async (e) => {
        e.preventDefault();
        setsubmittimg(true);

        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if(res.ok){
                setAlert({ type: 'success', message: 'Post created successfully! Wait for 3s' });
            } else {
                setAlert({ type: 'error', message: 'Failed to create post' });
            }
        } catch (error) {
            console.log(error);
            setAlert({ type: 'error', message: 'Failed to create post' });
        } finally {
            setsubmittimg(false);
            setTimeout(() => {
                setAlert({ type: '', message: '' });
                router.push('/');
            }, 3000);
        }
    }

    return (
        <>
            {alert.type && (
                <Alert status={alert.type} variant='subtle'>
                    <AlertIcon />
                    {alert.message}
                </Alert>
            )}
            <Form
                type="Create"
                post={post}
                setPost={setpost}
                submittimg={submittimg}
                handlesubmit= {createPrompt}
            />
        </>
    )
}

export default CreatePrompt;
