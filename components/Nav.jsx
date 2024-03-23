"use client"
import React from 'react'
import { Link } from '@chakra-ui/next-js';
import { Image} from '@chakra-ui/next-js';
import { useState, useEffect } from 'react';
import {signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { Button, Divider } from '@chakra-ui/react';
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ConnectKitButton } from 'connectkit';

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
    <nav className='flex-between w-full mb-0 pt-5'>
      <Link href="/" className='flex gap-2 flex-center'>
      <Image src="/assets/images/logo.svg" alt='logo' width={30} height={30} className='object-contain' />
      <p className='logo_text orange_gradient'>Socialize</p>
      </Link>
      {/* <div className='sm:flex hidden'>
        { session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            <Button onClick={signOut} className='outline_btn'>Sign Out</Button> 
            <Link href={'/profile'}>
              <Image src={session?.user.image} width={37} height={37} className='rounded-full hover:scale-95' alt='profile' />
            </Link>
          </div>
        ) : (
          <div className='flex flex-row gap-1'>
            {providers && Object.values(providers).map((provider) => (
              <Button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn rounded-full'>
                {provider.name === 'Google' ? <FcGoogle /> : <FaGithub />}
              </Button>
            ))}
          </div>
        )}
      </div> */}
      {/*Mobile Navigation */}
      <div className='sm:flex relative z-10'>
        {session?.user ? (
          <div className='flex gap-4'> 
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            <ConnectKitButton/>
            
              <Button width={37} height={37} className='rounded-full' onClick={() => settoggledropdown((prev) => !prev)}><Image src={session?.user.image} width={37} height={37} alt='profile' className='rounded-full'/></Button>
              { toggledropdown && (
                <div className='dropdown'>
                  <Link href={'/profile'} className='dropdown_link' onClick={() => settoggledropdown(false)} >Profile</Link>
                  {/* <Link href={'/create-prompt'} className='dropdown_link' onClick={() => settoggledropdown(false)} >Create-prompt</Link> */}
                  <Button className='dropdown_link'>Redeem</Button>
                  <Button type='button' onClick={() => { settoggledropdown(false); signOut();}} className='mt-5 w-full black_btn'>signOut</Button>
                </div>
              )}
          </div>
        ) : (
          <div className='flex flex-row gap-1'>
            {providers && Object.values(providers).map((provider) => (
              <Button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn rounded-full'>
                {provider.name === 'Google' ? <FcGoogle /> : <FaGithub />}
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav;