import { Grid } from '@mui/material'
import React from 'react'

const BeneficiarySkeleton = () => {
    const array = [0, 1]
    return (
        <>
            <div className='space-y-3 relative'>
                <div className='absolute top-[20%] left-[30%] z-20'>
                    <img src="/images/wihdrawal.svg" className='w-24'/>
                    <div className='py-2'>
                       <p className='text-black text-center'>No beneficiary Yet</p>
                    </div>
                </div>
                {array.map((arr) => (
                    <div className='py-4 mb-4 px-6 cursor-pointer w-full profile-beneficiary relative overflow-hidden'>
                        <span className='profile-beneficiary-overlay'></span>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div className='w-[95%] mx-auto space-y-4 justify-between items-center'>
                                    <div className='flex justify-between items-center'>
                                        <div className='space-y-2 w-full'>
                                            <div className='bg-gray-200 h-4 w-[60%]'>
                                            </div>
                                            <div className='bg-gray-200 h-4 w-[20%]'>
                                            </div>
                                            <div className='bg-gray-200 h-4 w-[40%]'>
                                            </div>

                                        </div>

                                        {/* <div className='space-y-2 flex-col flex'>
                      <div className='bg-gray-200 h-4 w-20'>
                      </div>
                      <div className='bg-gray-200 h-4  w-8 self-end'>
                      </div>
                  </div> */}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                ))}

            </div>
        </>
    )
}

export default BeneficiarySkeleton