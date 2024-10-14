"use client";

import { SignUp , ClerkLoaded, ClerkLoading, useUser} from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const router = useRouter();
    const { isSignedIn } = useUser();
  
    useEffect(() => {
      const userType = localStorage.getItem("currentUser");
  
      if (isSignedIn) {
        if (userType === 'donor') {
          router.push('/donor/profile');
        } else if (userType === 'hospital') {
          router.push('/hospital/profile');
        } else if (userType === 'admin') {
          router.push('/admin/donor');
        }
      }
    }, [isSignedIn, router]);
    return (
        <div className='min-h-screen grid grid-col-1 lg:grid-cols-2'>
            <div className='h-full lg:flex   flex-col justify-center items-center'>
                <div className=' text-center  pt-16 lg:pt-2 '>
                    <h1 className='font-bold text-3xl py-1 text-[#2E2A47] '>
                        Welcome Back!
                    </h1>
                    <p className='text-base text-[#7E8CA0]  py-2 mb-3' >
                        Log in or Create to get back to your dashboard!
                    </p>
                </div>
               <div className='flex items-center justify-center'>
                <ClerkLoaded>
                <SignUp />
                </ClerkLoaded>
                <ClerkLoading>
                    <Loader  className='animate-spin text-muted-foreground '/>
                </ClerkLoading>
               
               </div>
            </div>
            <div className='h-full hidden  bg-slate-300 lg:flex   items-center justify-center'>
            <Image src="./logo.svg" height={100} width={100} alt={'Logo'} />
            </div>
           
        </div>

    )
};