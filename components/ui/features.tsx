import React from 'react'

function Features() {
    return (
        <div className='flex px-[200px] mt-[150px] '>
            <div className='bg-gray-200 h-[400px] w-[500px] z-10 mt-[20px]' >
                <div className='m-10'>
                    <h1 className='text-[25px] font-semibold'>Who we are?</h1>
                    <div className='bg-red-500 w-[150px] h-[3px] my-[20px]'> </div>
                    <span>BloodLine is a web app that streamlines the blood donation process by connecting hospitals with eligible blood donors. It ensures efficient blood management, promoting timely donations and improving patient outcomes. </span>
                    <ul>
                        <li className='mt-3' >
                           1.Specialist blood donors and clinical supervision.
                        </li>
                        
                        <li className='mt-3'>
                            2.Increasing Communication with our member
                        </li>
                        
                        <li className='mt-3'>
                           3.High qulaity assessment, diagnosis and treatment.
                        </li>
                        
                        <li className='mt-3'>
                            4.Examin critically to ensure alignment.
                        </li>
                    </ul>
                </div>
            </div>
            <div className='h-[550px] w-[500px] ml-[-30px]'>
                <video src='/video.mp4' height="550px" width="500px" loop muted autoPlay  ></video>
            </div>

        </div>
    )
}

export default Features
