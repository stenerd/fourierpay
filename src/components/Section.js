import { Grid, IconButton } from '@mui/material'
import React from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import '../styles/section.css'
const Section = () => {
    return (
        <>
            <div className='bg-gray-100'>
                <div className='py-4'>
                    <div className=''>
                        <h2 className='text-center fourier text-[#234243] text-lg'>How it works</h2>
                        <div className='py-5 w-[65%] mx-auto'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <div className='bg-white py-8 h-[250px] px-3 rounded-md'>
                                        <div className='w-[90%] mx-auto'>
                                            <IconButton>
                                                <LibraryAddCheckIcon fontSize='large' className='text-[#234243]' />
                                            </IconButton>
                                            <h2 className=" fourier text-xl">Sign Up</h2>
                                            <div className='py-2'>
                                                <p className='text-gray-500'>Create an account and instantly start accepting payments, selling your beautiful products online and building financial tools.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className='bg-white py-8 px-3 h-[250px] rounded-md'>
                                        <div className='w-[90%] mx-auto'>
                                            <IconButton>
                                                <LibraryAddCheckIcon fontSize='large' className='text-[#234243]' />
                                            </IconButton>
                                            <h2 className=' fourier text-xl'>Create Payment Links</h2>
                                            <div className='py-2'>
                                                <p  className='text-gray-500'>Receive one-off or recurring payments from anyone, anywhere, via your unique payment link.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className='bg-white py-8 px-3 h-[250px] rounded-md'>
                                        <div className='w-[90%] mx-auto'>
                                            <IconButton>
                                                <LibraryAddCheckIcon fontSize='large' className='text-[#234243]' />
                                            </IconButton>
                                            <h2 className=' fourier text-xl'>Customer Management</h2>
                                            <div className='py-2'>
                                                <p  className='text-gray-500'>Customers are ground zero for most operations. Manage your customers and see all related information in a single view.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className='bg-white py-8 px-3 h-[250px] rounded-md'>
                                        <div className='w-[90%] mx-auto'>
                                            <IconButton>
                                                <LibraryAddCheckIcon fontSize='large' className='text-[#234243]' />
                                            </IconButton>
                                            <h2 className=' fourier text-xl'>Invoices and Refunds</h2>
                                            <div className='py-2'>
                                                <p  className='text-gray-500'>Issue invoice and make refunds to customers, agents and otherwise automatically without any manual efforts.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className="py-4">
                        <div className="w-[70%] mx-auto py-3">
                            <h2 className='text-[55px] selectt text-left'> <span className='text-[#234243] fourier'>Accept,Manage, make Payments</span> with Fourier Pay fast and Easy</h2>
                            <div className='w-4/5 py-3'>
                                <h4 className='sub leading-8'>We have done the core payments integrations and abstractions, so your team can easily accept and Manage payments with our APIs and access multiple payment functionalities.</h4>
                            </div>
                            <div className="py-4 space-y-4">
                                <div className='flex items-center space-x-2'>
                                    <div className='bg-[#234243] py-1 px-1 rounded-full'></div>
                                    <h2>Quick Transfers</h2>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <div className='bg-[#234243]  py-1 px-1 rounded-full'></div>
                                    <h2>Initiate one-time and recurring payments</h2>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <div className='bg-[#234243] py-1 px-1 rounded-full'></div>
                                    <h2>Secure Payment verification</h2>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <div className='bg-[#234243]  py-1 px-1 rounded-full'></div>
                                    <h2>Customer verification</h2>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='w-[70%] mx-auto flex justify-center items-center px-4 py-4 bg-[#234243] rounded-lg'>
                        <div className='py-4 px-4 space-y-4'>
                            <h1 className='text-[40px] text-center text-white'>Ready to get started?</h1>
                            <h3 className='text-white text-center'>Create an account and instantly start accepting payments, selling your beautiful products online and building financial tools.</h3>
                            {/* <button className='px-2 py-3 rounded-md text- bg-[#234243]'>Get Started</button> */}
                        </div>
                    </div>
                    <div className='flex justify-between items-center px-5 py-10'>
                        <h2 className='text-gray-400'>Fourier Pay Technologies</h2>
                        <h2 className='text-gray-400'>Data privacy Policy</h2>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Section