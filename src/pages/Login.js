import { Grid, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            const res = await axios.post(`http://localhost:3000/api/auth/login`, state)
            console.log(res.response)
            navigate('/dashboard')
            setLoading(false)
        } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message)
            setLoading(false)
        }

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
                        <Grid item xs={12} md={6}>
                            <div className='min-h-[90vh] flex flex-col justify-center items-center p-3'>
                                <h2 className='text-xl font-bold main'>Welcome Back</h2>
                                <div className='w-[30%] mx-auto py-8'>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={12}>
                                                <label className='p-4'>Email</label>
                                                <input placeholder='Email' name='email' onChange={handleChange} required type="email" className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <label className='p-4'>Password</label>
                                                <input placeholder='Password' name='password' onChange={handleChange} required type="password" className='py-2 bg-gray-200 px-4 w-full outline-none rounded-md' />
                                            </Grid>
                                        </Grid>
                                        <div className='py-4'>
                                            <button className='bg-[#234243] w-full rounded-md py-3 text-white'>
                                                {loading ? 'loading....' : 'Log In'}
                                            </button>
                                        </div>
                                    </form>
                                    <div className='py-2 flex flex-col justify-between items-center'>
                                        <p className="text-center underline cursor-pointer text-gray-500 text-sm">Do You Have an Account ?</p>
                                        <p className='text-center text-sm text-gray-500 cursor-pointer underline'>Forgot Pasword</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src="/images/registration.jpg" className='w-full h-screen object-cover'/>
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