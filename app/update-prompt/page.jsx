'use client'
import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation"; // Use next/router instead of next/navigation
import { useSearchParams } from "next/navigation"; // Use next/router instead of next/navigation
import { Alert, AlertIcon } from "@chakra-ui/react";

import Form from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
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

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };

        if (promptId) getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert('Prompt ID not found.');

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (res.ok) {
                setAlert({ type: 'success', message: 'Prompt edited successfully! Wait for 3s' });
            } else {
                setAlert({ type: 'error', message: 'Failed to edit prompt' });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
            setTimeout(() => {
                setAlert({ type: '', message: '' });
                router.push('/');
            }, 3000);
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}> {/* Wrap your component in a Suspense boundary */}
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
                    setPost={setPost}
                    submitting={submitting}
                    handleSubmit={updatePrompt}
                />
            </>
        </Suspense>
    );
};

export default EditPrompt;
