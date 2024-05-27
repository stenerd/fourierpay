import { Grid, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../utils/axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from "@mui/material"
const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const [text, setText] = useState(false)

    const togglePassword = () => setText(!text)

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
                    <Grid container>
                        <Grid item xs={12} md={7}>
                            <img src="/images/registration.jpg" className='w-full h-screen object-cover hidden md:block' />
                        </Grid>
                        <Grid item xs={12} md={5}>
                                <div className='w-[85%] mx-auto mt-[5%]'>
                                        <Link to='/'>
                                            {/* <img src='/images/logo-header.svg' className='absolute' alt="alt-img" /> */}
                                            <img src='/images/five.svg' width="110" className='absolute' alt="alt-img" />
                                        </Link>
                                        {/* <p className='text-center text-white text-2xl font-bold'>Pay</p> */}
                                </div>
                            <div className='min-h-[100vh] justify-center w-[85%] mx-auto flex flex-col '>
                                <div className=''>

                                    <p className=' text-gray-700'>Welcome back <span className='c-login-emoji'></span></p>
                    
                                    <h2 className='text-xl mb-4 font-bold home c-auth-title'>Sign in to your account</h2>

                                    {/* <small className='font-bold text-gray-500 inline-block w-[70%]'>Thanks for visiting again. Lets .</small> */}
                                </div>
                                {/* <h2 className='text-xl font-bold main'>Welcome Back</h2> */}
                                <div className='py-4'>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={12}>
                                                <label className='text-sm font-bold block py-1 text-gray-700'>Email</label>
                                                <input placeholder='' name='email' onChange={handleChange} required type="email"   className="py-2 px-4 w-full outline-none border rounded-lg border-gray-400 focus:border-green-500 c-text-input" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <label className='text-sm font-bold block py-1 text-gray-700'>Password</label>
                                                <div >
                                                    <input placeholder='' name='password' onChange={handleChange} required type={text ? "text" : "password"} className='py-2 px-4 w-full rounded-lg border-gray-400 focus:border-green-500 outline-none c-text-input' />
                                                    <IconButton className="absolute md:left-[92%] left-[80%] bottom-10" onClick={togglePassword}>
                                                        {text ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
                                                    </IconButton>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <div className='mb-6 hidden md:block'>
                                            <button disabled={loading ? true : false} className='c-primary-button'>
                                                {loading ? 'Loading...' : 'Login'}
                                            </button>
                                        </div>
                                        <div className='mt-4 mb-6 block md:hidden'>
                                            <button disabled={loading ? true : false} className='c-primary-button w-full'>
                                                {loading ? 'Loading....' : 'Login'}
                                            </button>
                                        </div>
                                    </form>
                                    <div className=''>
                                        <p className="text-gray-700 m-auto ">I dont have an account.
                                            <Link to="/signup">
                                                <span className='cursor-pointer c-primary-link-color'> Sign Up</span>
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