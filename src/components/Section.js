import { Divider, Grid, IconButton } from '@mui/material'
import React from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import '../styles/section.css'
const Section = () => {
    return (
        <>
            <div className='bg-gray-100'>
                <div className='pt-16 pb-8'>
                    <div className="w-4/5 mx-auto flex justify-between items-center">
                        <div>
                            <h1 className='text-2xl text-center' style={{fontWeight: '900'}}>250K</h1>
                            <p className='text-center font-bold text-gray-500'>Registared Business</p>
                        </div>
                        <div className='c-vertical-divider'></div>
                        <div>
                            <h1 className='text-2xl text-center' style={{fontWeight: '900'}}>250M+</h1>
                            <p className='text-center font-bold text-gray-500'>Revenue Total</p>
                        </div>
                        <div className='c-vertical-divider'></div>
                        <div>
                            <h1 className='text-2xl text-center' style={{fontWeight: '900'}}>85%</h1>
                            <p className='text-center font-bold text-gray-500'>Revenue Growth</p>
                        </div>
                    </div>
                </div>
                <div className="py-8 divide-y-2 divide-gray-300">
                  <Divider/>
                </div>
                <div className='w-4/5 py-4 mx-auto flex justify-between items-center gap-3'>
                      <div className='flex-1'>
                           <h1 className='text-[46px] font-bold'>Financial experience built for tomorrow</h1>
                      </div>
                      <div className='py-3 flex-1 space-y-8'>
                           {/* <h1 className='text-[40px] font-bold'>Financial experience built for tomorrow</h1> */}
                           <h2 className='text-xl'>Fourier Pay was built from scratch to inspire embedded Financial experience. We Provide you products and tools you need to grow your revenue and collect payment instantly</h2>
                           <button className='bg-[#1f332b] text-white py-4 px-6 rounded-md'>Learn More</button>
                      </div>
                </div>
            </div>

        </>
    )
}

export default Section