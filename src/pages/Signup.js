import { CircularProgress, Grid, TextField } from '@mui/material'

import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('processing....')
        setLoading(true)
        try {
            const res = await axios.post(`http://localhost:3000/api/auth/registration`, state)

            console.log(res)
            console.log('done successfully')
            setLoading(false)
            toast.success('Registration Successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
            console.log('An erroe occurred')
            setLoading(false)
        }
        console.log(state)

    }
    return (
        <>
            <div className='bg-gray-100 h-screen'>
                <div className=''>
                    {/* <div className='w-4/5 mx-auto flex flex-col justify-between'>
                        <Link to="/">
                            <h2 className='text-xl fourier'>Fourier<span className='text-[#234243]'>Pay</span></h2>
                        </Link>
                    </div> */}
                    <Grid container>
                        <Grid item  xs={12} md={6}>
                             <img src="/images/registration.jpg" className='w-full h-screen object-cover'/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className='min-h-[90vh] flex flex-col justify-center items-center p-3'>
                                <h2 className='text-xl font-bold home'>Get Started For Free</h2>
                                <div className='w-[35%] mx-auto py-8'>
                                    <form onSubmit={handleSubmit}>

                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={12}>
                                                <label className='p-4'>First Name</label>
                                                <input placeholder='First Name' onChange={handleChange} required name='firstname' type="text" className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <label className='p-4'>Last Name</label>
                                                <input placeholder='Last Name' onChange={handleChange} required type="text" name='lastname' className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <label className='p-4'>Email</label>
                                                <input placeholder='Email' onChange={handleChange} required type='email' name='email' className='py-2 px-4 bg-gray-200 w-full outline-none rounded-md' />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <label className='p-4'>Password</label>
                                                <input placeholder='Password' onChange={handleChange} name='password' required type="password" className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                            </Grid>


                                        </Grid>
                                        <div className='py-4'>
                                            <button className='bg-[#234243] w-full rounded-md py-3 text-white'>
                                                {loading ? 'Loading....' : 'Get Started'}
                                            </button>
                                        </div>
                                    </form>
                                    <div className='py-2 space-y-4'>
                                        <p className="text-center underline cursor-pointer text-gray-500">Do You Have an Account ?</p>
                                        <p className='text-center text-sm text-gray-400'>Signing into Fourier account means You agree to the Privacy </p>
                                    </div>
                                </div>
                            </div>
                        </Grid>

                    </Grid>

                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Signup