import React from 'react'
import Sidebar from './SideBar'

const DashboardLayout = ({children}) => {
    return (
        <>
          <div className='w-[100vw] flex'>
               <div className="w-[20%] hidden md:block ">
                 <Sidebar/>
               </div>
               <main className="md:w-[80%] w-full">
                 {children}
               </main>
          </div>
        </>
     )
}
export default DashboardLayout;