'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertIcon } from "@chakra-ui/react";

import Form from '@components/Form';


const EditPrompt = () => {
    const router = useRouter();
    const [submittimg, setsubmittimg] = useState(false);
    const [post, setpost] = useState({
        prompt: '',
        tag: '',
    });
    const [alert, setAlert] = useState({ type: '', message: '' });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setpost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if(promptId) getPromptDetails();
    },[promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setsubmittimg(true);

        if(!promptId) return alert('Prompt ID not found.');

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if(res.ok){
                setAlert({ type: 'success', message: 'Prompt edited successfully! Wait for 3s' });
            } else {
                setAlert({ type: 'error', message: 'Failed to edit prompt' });
            }
        } catch (error) {
            console.log(error);
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
        type="Edit"
        post={post}
        setpost={setpost}
        submittimg={submittimg}
        handlesubmit= {updatePrompt}
    />
    </>
  )
}

export default EditPrompt