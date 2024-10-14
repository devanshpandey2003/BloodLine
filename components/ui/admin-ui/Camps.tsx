"use client";

import React from 'react'
import { Button } from '../button'
import { UseNewSheet } from '@/store/hooks/useSetSheet'

function Camps() {
    const onOpen = UseNewSheet((state) => state.onOpen);
  return (
    <div>
       <div className="w-[70vw]">
      <div className="flex items-center justify-between m-[30px]">
        <h1 className="m-[20px] text-[20px] font-semibold">All Blood Camps</h1>
        
         <Button onClick={onOpen}>
         Create New Camp
         </Button>
      </div>
    </div>
    </div>
  )
}

export default Camps
