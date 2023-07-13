import { Grid, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../utils/axios';

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/login`, state)
            window.localStorage.setItem('bearer_token', res?.data?.data.token)
            console.log(res?.data?.data.token)
            navigate('/dashboard')
            setLoading(false)
        } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    const handleConfirmEmail = async () => {
        try {
            const params = new URLSearchParams(window.location.search)
            let token = params.get('token')
            const res = await axios.get(`${BASE_URL}/api/auth/confirm-email/${token}`)
            console.log(res?.data)
            toast.success('Email Verified!', {
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
            console.log(error.response)
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        let token = params.get('token')
        console.log("token >> ", token)
        if (token) {
            handleConfirmEmail()
        }
    }, [])

    return (
        <>
            <div className='bg-gray-100 h-screen'>
                <div className=''>
                    {/* <div className='w-4/5 mx-auto flex flex-col justify-between'>
                        <Link to="/">
                            <h2 className='text-xl fourier'>Fourier<span className='text-[#1d3329]'>Pay</span></h2>
                        </Link>
                    </div> */}
                    <Grid container>
                        <Grid item xs={12} md={5}>
                            <div className='min-h-[100vh] flex flex-col justify-center p-3'>
                                <div className='w-[80%] mx-auto mb-0'>
                                    <h2 className='text-xl mb-12 font-bold home c-auth-title'>Log in</h2>
                                    <p className='font-bold text-gray-700'>Welcome back <span className='c-login-emoji'>🤗</span></p>
                                    <small className='font-bold text-gray-500 inline-block w-[70%]'>Thanks for visiting again. Lets do some monitoring.</small>
                                </div>
                                {/* <h2 className='text-xl font-bold main'>Welcome Back</h2> */}
                                <div className='w-[80%] mx-auto py-8'>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={12}>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Email</label>
                                                <input placeholder='Email' name='email' onChange={handleChange} required type="email" className='py-2 px-4 w-full outline-none c-text-input' />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Password</label>
                                                <input placeholder='Password' name='password' onChange={handleChange} required type="password" className='py-2 px-4 w-full outline-none c-text-input' />
                                            </Grid>
                                        </Grid>
                                        <div className='mt-12 mb-6 hidden md:block'>
                                            <button disabled={loading ? true : false} className='c-primary-button'>
                                                {loading ? 'loading....' : 'Login'}
                                            </button>
                                        </div>
                                        <div className='mt-12 mb-6 block md:hidden'>
                                            <button disabled={loading ? true : false} className='c-primary-button w-full'>
                                                {loading ? 'loading....' : 'Login'}
                                            </button>
                                        </div>
                                    </form>
                                    <div className=''>
                                        <p className="text-gray-700 font-bold">Do not have an account?
                                            <Link to="/signup">
                                                <span className='cursor-pointer c-primary-link-color'> Register</span>
                                            </Link>
                                        </p>
                                        {/* <p className="text-gray-700 font-bold">Can't remember your password?
                                            <Link to="/forgot-password">
                                                <span className='cursor-pointer c-primary-link-color'> Click here</span>
                                            </Link>
                                        </p> */}
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <img src="/images/registration.jpg" className='w-full h-screen object-cover hidden md:block' />
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

export default Login