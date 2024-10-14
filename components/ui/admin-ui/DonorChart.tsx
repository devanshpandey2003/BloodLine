import React from 'react'

function DonorChart() {
    return (
        <div>
            <div className='h-[200px] w-[200px] m-[10px] border-[20px] border-red-400 border-solid  rounded-full'>
                <div className='flex items-center justify-center m-[30px]'>
                    <h2 className='font-semibold text-[18px] m-[40px]'>
                        100%
                    </h2>
                </div>

            </div>
            <h2 className='font-semibold text-[18px] m-[30px] '>
                Donors
            </h2>
        </div>
    )
}

export default DonorChart

