import React from 'react'
import Image from "next/image"

function Footer() {
    return (
        <div>
            <div className='bg-gray-100  grid grid-cols-12 px-[200px] h-[50vh] mt-[100px]'>

                <div className='flex flex-col col-span-4 my-[10%]'>
                    <div className='flex flex-row gap-2 mb-3'>
                        <Image src="/logo.svg" alt='logo' height={28} width={28} ></Image>
                        <p className='pt-2 font-bold text-2xl text-red-400'>
                            BloodLine
                        </p>

                    </div>
                    <span>
                        Saving lives, one donation at a time.
                    </span>

                </div>


                <div className='col-span-5 my-[10%] ml-[20%]'>


                    <div className='text-xl font-semibold '>
                        <h3>Quick Links</h3>
                    </div>
                    <ul>
                        <li className='hover:underline'><a href='/'>Home</a></li>
                        <li className='hover:underline'><a href='/'>About Us</a></li>
                        <li className='hover:underline'><a href='/donor/profile'>Donate</a></li>
                        <li className='hover:underline'><a href='/admin/donor'>Admin</a></li>
                        <li className='hover:underline'><a href='/hsopial/profile'>Hospital</a></li>

                    </ul>
                </div>

                <div className='col-span-3 my-[20%]'>
                    <h3 className='text-xl font-semibold'>Contact us</h3>
                    <p className='mt-2'>Address: Gopal Nagar Rewa, M.P. </p>
                    <p className='mt-2'>Phone No. : +91 6232405808 </p>
                    <a href="https://www.instagram.com/devansh_aka_dev/?next=%2F" className='flex flex-row'>
                    <p>Social Media : </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>

                    </a>
                    <p className='mt-2'>Email : devansh.dp2004@gmail.com </p>

                </div>

            </div>
            <div className=' border-t border-red-800 pt-8 text-center mx-[10%] '>
                <p>&copy; 2024 BloodLine. All rights reserved</p>
            </div>

        </div>
    )
}

export default Footer
