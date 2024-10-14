"use client";

import { UserButton } from '@clerk/nextjs'
import React from 'react'

import { Button } from '@/components/ui/button'
import { UseNewSheet } from '@/store/hooks/useSetSheet'
import { toast } from 'sonner';

function page() {
  const onAdminSheetOpen = UseNewSheet((state) => (state.onAdminSheetOpen));
  return (
    <div className="flex items-center justify-center ml-72">
     <div className="space-x-4 bg-gray-200 w-[400px] h-[200px]">
      
    <div>
      <div className='ml-48 mt-12'>
      <UserButton afterSignOutUrl='/'></UserButton>
      </div>
      <div className='flex items-center justify-center gap-3'>
        <Button onClick={onAdminSheetOpen}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Update Profile
        </Button>
        <Button  onClick={() => {
          toast.success("Mast Project hai re baba!")
        }}
        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
          Generate Toast 
        </Button>
      </div>

      </div>

      </div>

    </div>

  )
}

export default page
