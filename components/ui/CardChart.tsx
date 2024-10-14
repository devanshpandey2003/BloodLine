import React from 'react'


function Card ({children} : {children: React.ReactNode}) {
    return (

        <div className='bg-gray-50 m-[30px] w-[350px] shadow-xl h-[300px]'>
            {children}
        </div>

    )
}

export default Card


