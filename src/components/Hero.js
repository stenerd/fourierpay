import { Avatar, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Hero.css'
const Hero = () => {
    return (
        <>
            <div className="bg-[#1f332b] h-[85vh]">
                <div className='w-4/5 mx-auto'>
                    <div className='py-5'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-2xl hero font-bold text-white'>FourierPay</h2>
                            <div className='flex items-center space-x-6'>
                                <Link to='/login'>
                                    <span className='text-white cursor-pointer font-bold'>Login</span>
                                </Link>
                                <Link to='signup'>
                                    <button className='bg-[#354740] text-white font-bold rounded-md py-3 px-6'>Sign up</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div className='h-[75vh] flex justify-center items-center w-[95%] mx-auto'>
                        <div>
                            <Grid container justifyContent="space-between" spacing={3}>
                                <Grid item xs={12} md={6} >
                                    <div className='space-y-4'>
                                        <h2 className='text-white font-bold text-[60px]'>Start Collecting <span className='text-[#97f675]'> Payment</span> with One Link</h2>
                                        <h4 className='text-white w-4/5'>All in One Platform for accepting payment and embedded fintech experience to fast track your payment</h4>
                                    </div>
                                    <div className='py-5'>
                                        <button className='bg-[#97f675] rounded-md py-4 px-8 font-bold'>Get Started</button>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className=''>
                                        <div className='z-10 h-full w-[80%] rounded-full border-white border-1'>

                                        </div>
                                        <div className='bg-white rounded-xl h-[350px]  w-[60%] mx-auto'>
                                            <div className='flex flex-col h-full'>
                                                <div className='w-[85%] py-8 mx-auto flex-1'>
                                                    <h2 className='hero font-bold text-2xl text-[#1f332b]'>FourierPay</h2>
                                                </div>
                                                <div className="w-4/5 mx-auto py-5">
                                                    <h1 className='font-bold text-[#1f332b] text-2xl'>VISA</h1>
                                                </div>
                                                <div className='p-1'>
                                                    <div className='w-full bg-[#1f332b] py-4 rounded-b-xl'>
                                                        <div className='w-4/5 mx-auto flex items-center space-x-5'>
                                                            <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src="/images/passport.jpg" />
                                                            <div className='flex flex-col space-y-1'>
                                                                <h2 className='text-gray-200'>OFUZOR EMEKE</h2>
                                                                <p className='text-white'>Arm White Inc</p>
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

export default Hero