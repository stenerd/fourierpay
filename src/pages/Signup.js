import { CircularProgress, Grid, TextField } from '@mui/material'

import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../utils/axios';

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password:"",
        phone_number:''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('processing....')
        setLoading(true)

        if(state.password!==state.confirm_password){
            toast.error('Password does not match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false)
            return
            
        }
       
        const {confirm_password,...others} = state
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/registration`,others)

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
            navigate('/login')
        } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message)
            console.log('An error occurred')
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
                        <Grid item  xs={12} md={5}>
                             <img src="/images/registration.jpg" className='w-full h-screen object-cover'/>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <div className='min-h-[100vh] flex flex-col justify-center p-3'>
                                <div className='w-[80%] mx-auto mb-0'>
                                    <h2 className='text-xl mb-16 font-bold home c-auth-title'>Register</h2>
                                    <p className='font-bold text-gray-700'>Manage and monitor your payment links.</p>
                                    <small className='font-bold text-gray-500 inline-block w-[70%]'>Let's get you all set up so you can create your personal account and begin setting up your profile.</small>
                                </div>
                                <div className='w-[80%] mx-auto py-8'>
                                    <form onSubmit={handleSubmit}>

                                        <Grid container spacing={3}>
                                            <Grid item lg={6} md={12}>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>First Name</label>
                                                <input placeholder='First Name' onChange={handleChange} required name='firstname' type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                                            </Grid>
                                            <Grid item lg={6} md={12}>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Last Name</label>
                                                <input placeholder='Last Name' onChange={handleChange} required type="text" name='lastname' className='py-2 px-4 w-full outline-none c-text-input' />
                                            </Grid>
                                            <Grid item lg={6} md={12}>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Email</label>
                                                <input placeholder='Email' onChange={handleChange} required type='email' name='email' className='py-2 px-4 w-full outline-none c-text-input' />
                                            </Grid>
                                            <Grid item lg={6} md={12}>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Phone Number</label>
                                                <input placeholder='Phone Number' onChange={handleChange} name='phone_number' required type="text" className='py-2 px-4 w-full outline-none c-text-input' />
                                            </Grid>
                                            <Grid item lg={6} md={12}>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Password</label>
                                                <input placeholder='Password' onChange={handleChange} name='password' required type="password" className='py-2 px-4 w-full outline-none c-text-input' />
                                            </Grid>
                                            <Grid item lg={6} md={12}>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Confirm Password</label>
                                                <input placeholder='Confirm Password' onChange={handleChange} name='confirm_password' required type="password" className='py-2 px-4 w-full outline-none c-text-input' />
                                            </Grid>


                                        </Grid>

                                        <div className='mt-12 mb-6'>
                                            <p className='text-sm font-bold text-gray-500'>👍 Signing into Fourier
                                            <span className='c-primary-color'>pay</span> account means you agree to the 
                                            <span className='c-primary-link-color'> Terms</span> and 
                                            <span className='c-primary-link-color'> Privacy Policy</span></p>
                                        </div>

                                        <div>
                                            <button disabled={loading ? true:false}  className='c-primary-button'>
                                                {loading ? 'Loading....' : 'Get Started'}
                                            </button>
                                        </div>
                                    </form>
                                    <div className='py-4'>
                                        <p className="text-gray-700 font-bold">Already have an account? 
                                            <Link to="/login">
                                                <span className='cursor-pointer c-primary-link-color'> Log in</span>
                                            </Link>
                                        </p>
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