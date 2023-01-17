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
                <div className='w-4/5 pt-4 pb-16 mx-auto flex justify-between items-center gap-3'>
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
            

            <div className='pt-16 pb-16 bg-[#ebefe6] mx-auto'>
                <div className='bg-[#ebefe6] w-[65%] mx-auto'>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div className='pt-16 text-center font-bold'>How It Works</div>
                        </Grid>
                        <Grid  item xs={6}>
                            <div className='px-10 py-12 bg-white c-how-it-works-icon'>
                                <div className='relative mb-12'>
                                    <span className='left'></span>
                                    <span className='right'></span>
                                </div>
                                <div>
                                    We don't just help you pay for anything—we help you get paid! And we make it easy for anyone who wants to pay to do so by creating links that they can access directly through their email inboxes.
                                </div>
                                
                            </div>
                        </Grid>
                        <Grid  item xs={6}>
                            <div className='px-10 py-12 bg-white c-how-it-works-icon'>
                                <div className='relative mb-12'>
                                    <span className='left'></span>
                                    <span className='right'></span>
                                </div>
                                <div>
                                    We don't just help you pay for anything—we help you get paid! And we make it easy for anyone who wants to pay to do so by creating links that they can access directly through their email inboxes.
                                </div>
                                
                            </div>
                        </Grid>
                        <Grid  item xs={6}>
                            <div className='px-10 py-12 bg-white c-how-it-works-icon'>
                                <div className='relative mb-12'>
                                    <span className='left'></span>
                                    <span className='right'></span>
                                </div>
                                <div>
                                    We don't just help you pay for anything—we help you get paid! And we make it easy for anyone who wants to pay to do so by creating links that they can access directly through their email inboxes.
                                </div>
                                
                            </div>
                        </Grid>
                        <Grid  item xs={6}>
                            <div className='px-10 py-12 bg-white c-how-it-works-icon'>
                                <div className='relative mb-12'>
                                    <span className='left'></span>
                                    <span className='right'></span>
                                </div>
                                <div>
                                    We don't just help you pay for anything—we help you get paid! And we make it easy for anyone who wants to pay to do so by creating links that they can access directly through their email inboxes.
                                </div>
                                
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className='bg-[#ebefe6] w-4/5 mx-auto mt-24'>
                    
                    <p className='text-6xl font-medium leading-normal mb-8'>
                        Accept, manage and make payments with fourierpay fast and easy!
                    </p>
                    <p className='text-xl leading-9 font-medium text-gray-700 mb-4'>
                    Fourierpay is a payment platform that gives you the ability to pay for products through a link.it also helps you create payment links that can be accessed by whoever you want payment from thereby enabling mass payments.
                    </p>
                    <p className='text-xl leading-9 font-medium text-gray-700 mb-4'>
                        We have done the core payment integrations and abstractions, so your team can easily access and mange payments with our APIs and access multiple payment functionalities.
                    </p>
                    <p className='text-base leading-9 font-medium text-gray-700 mb-4'>
                        <ul className='list-inside' style={{listStyle: 'inside'}}>
                            <li>Quick transfers</li>
                            <li>Initiate one-time and recurring payments</li>
                            <li>Secure payment verification</li>
                            <li>Customer verification</li>
                        </ul>
                    </p>
                </div>
            </div>

            <div className='py-3 bg-[#1f332b]'>
                <div className='py-20 flex justify-center items-center'>
                    <div className='w-4/5 mx-auto'>
                        <Grid container spacing={3} alignItems='center' justifyContent='space-between'>
                            <Grid item xs={12} md={7}>
                                <div className='c-comment-bar'></div>
                                <div className='w-4/5'>
                                    {/* <div className='flex justify-start px-4 items-start'>
                                        <div className='h-1 w-10 bg-gray-500'></div>
                                    </div> */}
                                    <h2 className='py-4 text-white font-bold text-[30px]' style={{lineHeight: '1.725'}}>" Fourierpay enabled me to create an account with just a few clicks, make payments in minutes, not days or weeks, easily find the most current details about my account and track all of my transactions in one place.</h2>
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
                                    <img src="/images/ochuko.png" className='w-full h-[500px] object-cover' />
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
                        <div className='flex justify-center items-center'>
                            <button className='c-primary-button'>
                                    Submit
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <Footer/>

        </>
    )
}

export default Section;