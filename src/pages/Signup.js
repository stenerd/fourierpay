import { Grid, TextField } from '@mui/material'

import React from 'react'

import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <>
            <div className='bg-gray-100 min-h-screen'>
                <div className='py-6'>
                    <div className='w-4/5 mx-auto flex flex-col justify-between'>
                        <Link to="/">
                            <h2 className='text-xl fourier'>Fourier<span className='text-[#234243]'>Pay</span></h2>
                        </Link>
                    </div>
                    <div className='min-h-[90vh] flex flex-col justify-center items-center p-3'>
                        <h2 className='text-xl font-bold selectt'>Get Started For Free</h2>
                        <div className='w-[35%] mx-auto py-8'>
                            <form>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <label className='p-4'>Company Name</label>
                                        <input placeholder='First Name' className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <label className='p-4'>Email</label>
                                        <input placeholder='Email' className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <label className='p-4'>Phone Number</label>
                                        <input placeholder='Email' className='py-2 px-4 bg-gray-200 w-full outline-none rounded-md' />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <label className='p-4'>Password</label>
                                        <input placeholder='Password' type="password" className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <label className='p-4'>First Name</label>
                                        <input placeholder='First Name' type="text" className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <label className='p-4'>Last Name</label>
                                        <input placeholder='Last Name' type="text" className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <label className='p-4'>Address</label>
                                        <input placeholder='Address' type="text" className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                    </Grid>
                                </Grid>
                                <div className='py-4'>
                                    <button className='bg-[#234243] w-full rounded-md py-3 text-white'>Get Started</button>
                                </div>
                            </form>
                            <div className='py-2 space-y-4'>
                                <p className="text-center underline cursor-pointer text-gray-500">Do You Have an Account ?</p>
                                <p className='text-center text-sm text-gray-400'>Signing into Fourier account means You agree to the Privacy </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup