'use client'

import Image from 'next/image'
import React from 'react'
import logo from '../../public/logo.svg'
import { Link }  from "react-scroll"

function Navbar()  {
  return (
    <div className='flex items-center justify-between h-[100px] px-[200px]'>
   
    <div className='flex flex-row gap-2'>
      <Image src={logo} alt='logo' height={28} width={28} ></Image>
      <p className='pt-2 font-bold text-2xl text-red-400'>
        BloodLine
      </p>
     </div>
   
    <div className='flex items-center justify-evenly cursor-pointer'>
    <Link to="hero" duration={1000} className='mr-3 font-medium text-[18px]' smooth={true}>Home</Link>
    <Link to="featured" duration={1000} className='mr-3 font-medium text-[18px]' smooth={true}>About us</Link>
    <Link to="featured" duration={1000} className='mr-3 font-medium text-[18px]' smooth={true}>Login</Link>
    <Link to="contact" duration={1000} className='mr-3  font-medium text-[18px]' smooth={true}>Contact us</Link>
    
    </div>
 

    </div>
  )
}

export default Navbar
