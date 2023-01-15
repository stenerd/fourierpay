import { Divider, Grid, IconButton } from '@mui/material'
import React from 'react'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import '../styles/section.css'
const Section = () => {
    return (
        <>
            <div className='bg-gray-100'>
                <div className='pt-16 pb-16'>
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

        </>
    )
}

export default Section