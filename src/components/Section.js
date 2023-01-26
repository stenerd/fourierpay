import { Divider, Grid, IconButton } from '@mui/material'
import React from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import '../styles/section.css'
import Footer from './Footer';
const Section = () => {
    return (
        <>
            <div className='bg-gray-100'>
                <div className='pt-16 pb-16'>
                    <div className="w-4/5 mx-auto flex-col md:flex-row flex justify-between items-center">
                        <div>
                            <h1 className='text-5xl font-semibold text-center'>250K</h1>
                            <p className='text-center font-bold text-gray-500'>Registared Business</p>
                        </div>
                        <div className='c-vertical-divider'></div>
                        <div>
                            <h1 className='text-5xl font-semibold  text-center'>250M+</h1>
                            <p className='text-center font-bold text-gray-500'>Revenue Total</p>
                        </div>
                        <div className='c-vertical-divider'></div>
                        <div>
                            <h1 className='text-5xl font-semibold  text-center'>85%</h1>
                            <p className='text-center font-bold text-gray-500'>Revenue Growth</p>
                        </div>
                    </div>
                </div>
                <div className="py-8 divide-y-2 divide-gray-300">
                    <Divider />
                </div>
                <div className='w-4/5 pt-4 md:pb-24 pb-18 mx-auto flex-col md:flex-row flex justify-between md:gap-[7rem] gap-[4em]'>
                    <div className='md:w-[55%] w-full'>
                        <h1 className='text-[46px] font-bold text-[4rem] leading-none'>Financial experience built for tomorrow</h1>
                    </div>
                    <div className='py-3 w-full md-w-[45%] space-y-8'>
                        {/* <h1 className='text-[40px] font-bold'>Financial experience built for tomorrow</h1> */}
                        <h2 className='text-xl font-medium text-gray-700'>Fourier Pay was built from scratch to inspire embedded Financial experience. We Provide you products and tools you need to grow your revenue and collect payment instantly with just one link.</h2>
                        <button className='bg-[#1f332b] font-medium text-white py-4 px-6 rounded-sm'>Learn More</button>
                    </div>
                </div>
            </div>


            <div className='pt-16 pb-16 bg-[#ebefe6] mx-auto'>
                <div className='bg-[#ebefe6] w-[85%] md:w-[65%] mx-auto'>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div className='pt-16 text-center font-bold'>How It Works</div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className='px-10 py-12 bg-white c-how-it-works-icon relative'>
                                <div className='relative mb-12'>
                                    <span className='left'></span>
                                    <span className='right'></span>
                                </div>
                                <div className='mb-4'>
                                    We don't just help you pay for anything—we help you get paid! And we make it easy for anyone who wants to pay to do so by creating links that they can access directly through their email inboxes.
                                </div>
                                <div className='c-how-it-works-overlay'> REGISTER </div>

                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className='px-10 py-12 bg-white c-how-it-works-icon relative'>
                                <div className='relative mb-12'>
                                    <span className='left'></span>
                                    <span className='right'></span>
                                </div>
                                <div className='mb-4'>
                                    We don't just help you pay for anything—we help you get paid! And we make it easy for anyone who wants to pay to do so by creating links that they can access directly through their email inboxes.
                                </div>
                                <div className='c-how-it-works-overlay'> LOGIN </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className='px-10 py-12 bg-white c-how-it-works-icon relative'>
                                <div className='relative mb-12'>
                                    <span className='left'></span>
                                    <span className='right'></span>
                                </div>
                                <div className='mb-4'>
                                    We don't just help you pay for anything—we help you get paid! And we make it easy for anyone who wants to pay to do so by creating links that they can access directly through their email inboxes.
                                </div>
                                <div className='c-how-it-works-overlay'> CREATE PAYMENT LINK </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className='px-10 py-12 bg-white c-how-it-works-icon relative'>
                                <div className='relative mb-12'>
                                    <span className='left'></span>
                                    <span className='right'></span>
                                </div>
                                <div className='mb-4'>
                                    We don't just help you pay for anything—we help you get paid! And we make it easy for anyone who wants to pay to do so by creating links that they can access directly through their email inboxes.
                                </div>
                                <div className='c-how-it-works-overlay'> MAKE PAYENT </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className='bg-[#ebefe6] w-[90%] md:w-4/5 mx-auto mt-24'>
                    <p className='md:text-6xl text-5xl  font-medium md:leading-normal leading-tight mb-8'>
                        Accept, manage and make payments with fourierpay fast and easy!
                    </p>
                    <p className='text-xl leading-9 font-medium text-gray-700 mb-4'>
                        Fourierpay is a payment platform that gives you the ability to pay for products through a link.it also helps you create payment links that can be accessed by whoever you want payment from thereby enabling mass payments.
                    </p>
                    <p className='text-xl leading-9 font-medium text-gray-700 mb-4'>
                        We have done the core payment integrations and abstractions, so your team can easily access and mange payments with our APIs and access multiple payment functionalities.
                    </p>
                    <p className='text-base leading-9 font-medium text-gray-700 mb-4'>
                        <ul className='list-inside' style={{ listStyle: 'inside' }}>
                            <li>Quick transfers</li>
                            <li>Initiate one-time and recurring payments</li>
                            <li>Secure payment verification</li>
                            <li>Customer verification</li>
                        </ul>
                    </p>
                </div>
            </div>

            <div className='py-8 bg-[#1f332b]'>
                <div className=''>
                    <div className='py-20 flex justify-center items-center'>
                        <div className='w-4/5 mx-auto'>
                            <Grid container spacing={3} alignItems='center' justifyContent='space-between'>
                                <Grid item xs={12} md={7}>
                                    <div className='c-comment-bar'></div>
                                    <div className='md:w-4/5 w-[93%]'>
                                        {/* <div className='flex justify-start px-4 items-start'>
                                            <div className='h-1 w-10 bg-gray-500'></div>
                                        </div> */}
                                        <h2 className='py-4 text-white font-bold md:text-[30px] text-[25px]' style={{lineHeight:'1.75'}}>" Fourierpay enabled me to create an account with just a few clicks, make payments in minutes, not days or weeks, easily find the most current details about my account and track all of my transactions in one place.</h2>
                                        {/* <div className='flex justify-end px-4 items-end'>
                                            <div className='h-1 w-10 bg-gray-500'></div>
                                        </div> */}
                                        <p className='text-right italic text-white'>
                                            _Ochuko Okpako
                                        </p>

                                    </div>
                                </Grid>
                                <Grid item xs={12} md={5} >
                                    <div className='py-3'>
                                        <img src="/images/ochuko.png" className='w-full h-[500px] object-cover c-home-section-image' />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-16'>
                <div className='flex items-center w-4/5 mx-auto'>
                    <div className='py-6 w-[55%]'>
                        <p className='text-5xl font-medium leading-normal'>Subscribe to Our NewsLetter</p>
                        <p className='text-xl leading-9 font-medium text-gray-400'>Subscribe for our news letter to get latest news, update and available offers delivered directly in your inbox.</p>
                       

                    </div>
                    <div className='w-[45%] flex justify-between'>
                        <div className='py-6 w-[68%]'>
                            <input placeholder='Enter Email' name='confirm_password' required type="text" className='py-2 px-4 w-full h-[3.5rem] outline-none c-text-input' />
                        </div>
                        <div className='flex justify-center items-center'>
                            <button className='c-primary-button'>
                                    Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
}

export default Section;