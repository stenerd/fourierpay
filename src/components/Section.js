import { Divider, Grid, IconButton } from '@mui/material'
import React from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import '../styles/section.css'
const Section = () => {
    return (
        <>
            <div className='bg-gray-100'>
                <div className='py-8'>
                    <div className="w-4/5 mx-auto flex justify-between items-center">
                        <div>
                            <h1 className='text-2xl text-center font-bold'>250K</h1>
                            <p className='text-center'>Registared Business</p>
                        </div>
                        <div>
                            <h1 className='text-2xl text-center font-bold'>250M+</h1>
                            <p className='text-center'>Revenue Total</p>
                        </div>
                        <div>
                            <h1 className='text-2xl text-center font-bold'>85%</h1>
                            <p className='text-center'>Revenue Growth</p>
                        </div>
                    </div>
                </div>
                <div className="py-8 divide-y-2 divide-gray-300">
                  <Divider/>
                </div>
                <div className='w-4/5 mx-auto flex justify-between items-center'>
                      <div className=''>
                           <h1 className='text-[46px] font-bold'>Financial experience built for tomorrow</h1>
                      </div>
                      <div className=''>
                           {/* <h1 className='text-[40px] font-bold'>Financial experience built for tomorrow</h1> */}
                      </div>
                </div>
            </div>

        </>
    )
}

export default Section