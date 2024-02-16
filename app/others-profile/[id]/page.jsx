'use client'
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from '@components/profile';

const OtherProfile = ({params}) => {
    const [posts, setposts] = useState([]);
    const searchparams = useSearchParams();
    const username = searchparams.get('username');

    useEffect(() => {
        const fetchposts = async () => {
          const response = await fetch(`/api/users/${params?.id}/posts`);
          const data = await response.json();
    
          setposts(data);
        }
    
        if(params?.id) fetchposts();
    }, [params.id])
    

  return (
    <Profile 
        name = {username}
        desc = {`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
        data = {posts}
    />
  )
}

export default OtherProfile;