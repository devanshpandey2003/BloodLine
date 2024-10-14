import React from 'react'
import { Button } from './button'


function Hero() {
  return (
    <div className="bg-[url('/hero.jpg')] bg-no-repeate bg-cover bg-center h-[85vh] px-[200px]" >
      <div  className='flex flex-col text-white w-[50%] pt-[10%]'>
        <span>Donate Blood Save Life!</span>
        <h1 className='text-[38px] mt-3  z-10'> Your Blood Can Bring Smile In Many Lifes </h1>
      </div>
      <div className='flex items-center mt-20px '>
         
        <Button className='bg-red-500 text-white'>Login Now</Button>
        

      </div>
    </div>
  )
}

export default Hero
