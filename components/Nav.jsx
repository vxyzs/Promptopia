"use client"
import React from 'react'
import { Link } from '@chakra-ui/next-js';
import { Image} from '@chakra-ui/next-js';
import { useState, useEffect } from 'react';
import {signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { Button, Avatar } from '@chakra-ui/react';

const Nav = () => {
  const { data: session} =useSession();

  const [providers, setproviders] = useState(null);
  const [toggledropdown, settoggledropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setproviders(response);
    }
    setProviders();
  },[]);

  console.log(session?.user);

  return (
    <nav className='flex-between w-full mb-16 pt-5'>
      <Link href="/" className='flex gap-2 flex-center'>
      <Image src="/assets/images/logo.svg" alt='logo' width={30} height={30} className='object-contain' />
      <p className='logo_text'>PromptEase</p>
      </Link>
      <div className='sm:flex hidden'>
        { session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            <Button onClick={signOut} className='outline_btn'>Sign Out</Button> 
            <Link href={'/profile'}>
              <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' />
            </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <Button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                Sign In
              </Button>
            ))}
          </>
        )}
      </div>
      {/*Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'> 
              <Button width={37} height={37} className='rounded-full' onClick={() => settoggledropdown((prev) => !prev)}><Image src={session?.user.image} width={37} height={37} alt='profile' className='rounded-full'/></Button>
              { toggledropdown && (
                <div className='dropdown'>
                  <Link href={'/profile'} className='dropdown_link' onClick={() => settoggledropdown(false)} >Profile</Link>
                  <Link href={'/create-prompt'} className='dropdown_link' onClick={() => settoggledropdown(false)} >Create-prompt</Link>
                  <Button type='button' onClick={() => { settoggledropdown(false); signOut();}} className='mt-5 w-full black_btn'>signOut</Button>
                </div>
              )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <Button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                Sign In
              </Button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav;