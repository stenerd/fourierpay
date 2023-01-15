import { Divider, Grid, IconButton } from '@mui/material'
import React from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import '../styles/section.css'
import Footer from './Footer';
const Section = () => {
    return (
        <>
            <div className='bg-gray-100'>
                <div className='pt-16 pb-8'>
                    <div className="w-4/5 mx-auto flex justify-between items-center">
                        <div>
                            <h1 className='text-2xl text-center' style={{ fontWeight: '900' }}>250K</h1>
                            <p className='text-center font-bold text-gray-500'>Registared Business</p>
                        </div>
                        <div className='c-vertical-divider'></div>
                        <div>
                            <h1 className='text-2xl text-center' style={{ fontWeight: '900' }}>250M+</h1>
                            <p className='text-center font-bold text-gray-500'>Revenue Total</p>
                        </div>
                        <div className='c-vertical-divider'></div>
                        <div>
                            <h1 className='text-2xl text-center' style={{ fontWeight: '900' }}>85%</h1>
                            <p className='text-center font-bold text-gray-500'>Revenue Growth</p>
                        </div>
                    </div>
                </div>
                <div className="py-8 divide-y-2 divide-gray-300">
                    <Divider />
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
                <div className='py-4 w-4/5 mx-auto'>
                    <div>
                        <h2 className='text-center text-2xl font-bold'>How it works</h2>
                        <div className='py-6 w-[80%] mx-auto'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <div className='bg-white rounded-md h-[300px] w-full'>
                                        <div className='w-4/5 h-full mx-auto py-2 flex justify-center items-center'>
                                            <div className='py-3'>
                                                <h2>SIGN UP</h2>
                                                <p>We don't just help you pay for anything—we help you get paid! And we make it easy for anyone who wants to pay to do so by creating links that they can access directly through their email inboxes.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className='bg-white rounded-md h-[300px] w-full'>
                                        <div className='w-4/5 h-full mx-auto py-2 flex justify-center items-center'>
                                            <div className='py-3'>
                                                <h2>SIGN UP</h2>
                                                <p>We don't just help you pay for anything—we help you get paid! And we make it easy for anyone who wants to pay to do so by creating links that they can access directly through their email inboxes.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className='bg-white rounded-md h-[300px] w-full'>
                                        <div className='w-4/5 h-full mx-auto py-2 flex justify-center items-center'>
                                            <div className='py-3'>
                                                <h2>SIGN UP</h2>
                                                <p>We don't just help you pay for anything—we help you get paid! And we make it easy for anyone who wants to pay to do so by creating links that they can access directly through their email inboxes.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className='bg-white rounded-md h-[300px] w-full'>
                                        <div className='w-4/5 h-full mx-auto py-2 flex justify-center items-center'>
                                            <div className='py-3'>
                                                <h2>SIGN UP</h2>
                                                <p>We don't just help you pay for anything—we help you get paid! And we make it easy for anyone who wants to pay to do so by creating links that they can access directly through their email inboxes.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                        </div>
                    </div>
                    <div className='py-3'>
                        <h1 className='text-[70px]'>Accept, manage and make payments with fourierpay fast and easy!</h1>
                        <div className='py-4'>
                            <h1>Fourierpay is a payment platform that gives you the ability to pay for products through a link.it also helps you create payment links that can be accessed by whoever you want payment from thereby enabling mass payments.</h1>
                            <h1>We have done the core payment integrations and abstractions, so your team can easily access and mange payments with our APIs and access multiple payment functionalities.</h1>
                            <div className='py-4'>
                                <ul className='list-disc space-y-4'>
                                    <li>Initiate one-time and recurring payments</li>
                                    <li>Secure payment verification</li>
                                    <li>Data Visualization of Payments/Transactions</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='py-3 bg-[#1f332b]'>
                    <div className='py-3 flex justify-center items-center'>
                        <div className='w-4/5 mx-auto'>
                            <Grid container spacing={3} alignItems='center' justifyContent='space-between'>
                                <Grid item xs={12} md={6}>
                                    <div className='w-full'>
                                        {/* <div className='flex justify-start px-4 items-start'>
                                            <div className='h-1 w-10 bg-gray-500'></div>
                                        </div> */}
                                        <h2 className='py-4 text-white font-bold text-[30px]'>Fourierpay enabled me to create an account with just a few clicks, make payments in minutes, not days or weeks, easily find the most current details about my account and track all of my transactions in one place.</h2>
                                        {/* <div className='flex justify-end px-4 items-end'>
                                            <div className='h-1 w-10 bg-gray-500'></div>
                                        </div> */}

                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <div className='py-3'>
                                        <img src="/images/ochuko.png" className='w-full h-[500px] object-cover rounded-md ' />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                <div className='py-8'>
                    <div className='flex justify-center items-center'>
                        <div className='py-6'>
                            <h2 className='text-4xl'>Subscribe to Our NewsLetter</h2>
                            <div className='py-6'>
                                <input placeholder='Enter Email' name='confirm_password' required type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                            </div>
                            <div>
                                <button className='c-primary-button'>
                                     Submit
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>

        </>
    )
}

export default Section