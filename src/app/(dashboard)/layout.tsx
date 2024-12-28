import Menu from '@/components/Menu'
import Navbar from '@/components/navbar'
import React from 'react'

const DashboardLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='min-h-screen flex w-full bg-dashboardBackground  h-full'>
      <div className='w-[14%] lg:w-[16%] xl:w-[8%]'>
        <Menu/>
      </div>
      <div className='w-[86%] lg:w-[84%] xl:w-[92%] flex flex-col'>
        <Navbar/>
        {children}
      </div>


    </div>
  )
}

export default DashboardLayout
