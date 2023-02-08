import { Avatar, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Hero.css'
const Hero = () => {
    return (
        <>
            <div className="bg-[#1f332b] min-h-screen md:min-h-[90vh] max-w-[100vw]">
                <div className='w-[90%] md:w-4/5 mx-auto'>
                    <div className='py-5'>
                        <div className='flex justify-between items-center'>
                            {/* <h2 className='text-2xl hero font-bold text-white'>Fourier<span className='text-[#97f675]'>Pay</span></h2> */}
                            <div className='w-[10rem]'>
                                <img src="/images/two.svg" />
                            </div>
                            <div className='flex items-center space-x-3 md:space-x-6'>
                                <Link to='/login'>
                                    <span className='text-white cursor-pointer font-bold'>Login</span>
                                </Link>
                                <Link to='signup'>
                                    <button className='bg-[#354740] text-white font-bold rounded-sm py-2 px-4 md:py-3 md:px-6'>Register</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='min-h-[80vh] md:min-h-[75vh] flex justify-center items-center mx-auto'>
                        <div className='flex justify-center items-center'>
                            <Grid container justifyContent={{xs:'center'}} alignItems='center' spacing={4} className='w-full' style={{marginLeft: 0}}>
                                <Grid item xs={12} md={6} style={{ paddingLeft: '0' }}>
                                    <div className='space-y-8 w-full'>
                                        <h2 className='text-white md:text-left text-center font-bold text-[40px] md:text-[60px] leading-tight md:leading-[5rem]  w-[90%] md:w-4/5 md:mx-0 mx-auto'>
                                            Collect All Your  <span className='text-[#97f675] text-center md:text-left'> Payments</span> with One <span className='c-home-title-underline'>Link</span>
                                        </h2>
                                        <h4 className='text-white  md:text-left text-center w-[90%] md:w-4/5 md:mx-0 mx-auto'>All in one platform for accepting payment and embedded fintech experience to fast track your payment</h4>
                                    </div>
                                    <div className='py-5 mt-8 w-[90%] md:w-4/5 flex justify-center md:block md:mx-0 mx-auto'>
                                        <Link to='signup'>
                                            <button className='bg-[#97f675] rounded-md py-4 px-12 font-bold'>Get Started</button>
                                        </Link>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} className="hidden md:block">
                                    <div className=''>
                                        <div className='z-10 h-full w-[80%] rounded-full border-white border-1'>

                                        </div>
                                        <div className='bg-white rounded-xl h-[500px]  w-[60%] mx-auto relative'>
                                            <div className='c-overlay-content px-4 py-6'>
                                                <p className='font-bold text-gray-700' style={{ lineHeight: '0.7rem' }}>Revenue</p>
                                                <small className='text-gray-400 c-overlay-content-description'>Total revenue since product launch</small>
                                                <p className='c-overlay-content-amount'>
                                                    $ 1,098,450
                                                </p>
                                            </div>
                                            <div className='c-overlay-circle'></div>
                                            <div className='flex flex-col h-full relative overflow-hidden'>
                                                <div className='w-[85%] py-8 mx-auto flex-1'>
                                                    <div className='c-home-card-overlay'>
                                                        <div className='c-top-circle-big'></div>
                                                        <div className='c-top-circle-small'></div>
                                                        <div className='c-top-clear'></div>
                                                        <div className='c-bottom-circle-big'></div>
                                                        <div className='c-bottom-circle-small'></div>
                                                        <div className='c-bottom-clear'></div>

                                                    </div>
                                                    {/* <h2 className='hero font-bold text-2xl text-[#1f332b]'>Fourier<span style={{ color: '#97f675' }}>Pay</span></h2> */}
                                                    <div className='w-[7rem]'>
                                                        <img src="/images/four.svg" />
                                                    </div>
                                                </div>
                                                <div className="w-[85%] mx-auto py-5">
                                                    {/* <h1 className='font-bold text-[#1f332b] text-2xl'>VISA</h1> */}
                                                </div>
                                                <div className='p-1'>
                                                    <div className='w-full bg-[#1f332b] py-4 rounded-b-xl'>
                                                        <div className='w-[85%] mx-auto flex items-center space-x-3'>
                                                            <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src="/images/home-img.jpeg" />
                                                            <div className='flex flex-col space-y-0'>
                                                                <h2 className='text-gray-200 font-bold'>OFUZOR EMEKE</h2>
                                                                <p className='text-gray-400 font-bold mt-0'>Department Lead</p>
                                                            </div>
                                                        </div>


                                                    </div>
                                                    {/* <h2>Emeke</h2> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Hero;