"use client";

import { Button } from '@/components/ui/button'
import { UseNewSheet } from '@/store/hooks/useSetSheet'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function page() {
  const onDonorSheetOpen = UseNewSheet((state) => (state.onDonorSheetOpen))
  return (
    <div className="flex items-center justify-center ml-72">
    <div className="space-x-4 bg-gray-200 w-[400px] h-[200px]">
     
   <div>
     <div className='ml-48 mt-12'>
     <UserButton afterSignOutUrl='/'></UserButton>
     </div>
     <div className='flex items-center justify-center gap-3'>
       <Button onClick={onDonorSheetOpen}
       className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
         Update Profile
       </Button > 
      <a href='feedback'>
      <Button  
       className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
        Feedback
       </Button>

      </a>
     </div>
     </div>
     </div>
   </div>
  )
}

export default page

