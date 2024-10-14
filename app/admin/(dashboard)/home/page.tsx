import Card from '@/components/ui/CardChart'
import DonorChart from '@/components/ui/admin-ui/DonorChart'
import DonorGuageChart from '@/components/ui/admin-ui/DonorGuageChart'
import DonorLineChart from '@/components/ui/admin-ui/LinChart'
import { DonorPieChart } from '@/components/ui/admin-ui/donorPieChart'
import { UserButton } from '@clerk/nextjs'
import React from 'react'


function page() {
    return (
        <div className='flex justify-between h-[100vh]'>
            <div>
                <div className='flex flex-row'>
                    <div className='flex flex-wrap'>

                        <Card>
                            <DonorGuageChart />
                        </Card>
                        <Card >
                            <DonorChart />
                        </Card>
                    </div>


                </div>
                <div>
                    <DonorLineChart />
                </div>
            </div>



            <div className='flex flex-col bg-gray-100 m-[20px] h-[700px] w-[300px] shadow-xl' >

                <div className='ml-64 mt-4'>
                    <UserButton afterSignOutUrl='/'></UserButton>
                </div>
                <div className='m-[40px] '>
                    <h2 className='font-semibold '> Recent Donors</h2>
                    <ul>
                        <li className='my-2' >
                            1.Dhanesh Pandey
                        </li >
                        <li  className='my-2 '>
                            2.John Doe
                        </li>
                        <li  className='my-2'>
                            3.Sam Smith
                        </li>
                        <li  className='my-2'>
                            4.Alice Brown
                        </li>
                    </ul>
                </div>
                <div>
                    <DonorPieChart/>
                </div>



            </div>
        </div>
    )
}

export default page

