import { CircularProgress, Grid, TextField } from '@mui/material'

import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../utils/axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from "@mui/material"
const Signup = () => {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: "",
        phone_number: ''
    })
    const navigate = useNavigate()

    const [text, setText] = useState(false)

    const handleChange = (e) => {
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const togglePassword = () => setText(!text)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('processing....')
        setLoading(true)

        if (state.password !== state.confirm_password) {
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

        const { confirm_password, ...others } = state
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/registration`, others)

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
            <div className='bg-gray-100 min-h-screen md:h-screen'>
                <div className=''>
                    {/* <div className='w-4/5 mx-auto flex flex-col justify-between'>
                        <Link to="/">
                            <h2 className='text-xl fourier'>Fourier<span className='text-[#1d3329]'>Pay</span></h2>
                        </Link>
                    </div> */}
                    <Grid container>
                        <Grid item xs={12} md={5} >
                            <img src="/images/registration.jpg" className='w-full h-screen object-cover hidden md:block' />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <div className='w-[85%] mx-auto mt-[5%]'>
                                <Link to='/'>
                                    {/* <img src='/images/logo-header.svg' className='absolute' alt="alt-img" /> */}
                                    <img src='/images/five.svg' width="110" className='absolute' alt="alt-img" />
                                </Link>
                                {/* <p className='text-center text-white text-2xl font-bold'>Pay</p> */}
                            </div>
                            
                            <div className='min-h-[100vh] flex flex-col justify-center p-3'>
                                <div className='w-[90%] md:w-[85%] mx-auto mb-0 py-6 md:py-0'>
                                    <h2 className='text-xl md:mb-4 mb-4 font-bold home c-auth-title'>Sign Up</h2>
                                    <p className='font-2xl text-gray-700'>Fill the form to get started.</p>
                                    {/* <small className='font-bold text-gray-500 inline-block w-full md:w-[70%]'></small> */}
                                </div>
                                <div className='w-[85%] mx-auto md:py-4 py-2'>
                                    <form onSubmit={handleSubmit}>

                                        <Grid container spacing={3}>
                                            <Grid item sm={12} lg={6} md={12} className='w-full'>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>First Name</label>
                                                <input placeholder='' onChange={handleChange} required name='firstname' type="text" className='py-2 px-4 w-full outline-none order rounded-lg border-gray-400 focus:border-green-500 c-text-input' />
                                            </Grid>
                                            <Grid item lg={6} md={12} className='w-full'>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Last Name</label>
                                                <input placeholder='' onChange={handleChange} required type="text" name='lastname' className='py-2 px-4 w-full outline-none  order rounded-lg border-gray-400 focus:border-green-500 c-text-input' />
                                            </Grid>
                                            <Grid item lg={6} md={12} className='w-full'>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Email</label>
                                                <input placeholder='' onChange={handleChange} required type='email' name='email' className='py-2 px-4 w-full outline-none order rounded-lg border-gray-400 focus:border-green-500 c-text-input' />
                                            </Grid>
                                            <Grid item lg={6} md={12} className='w-full'>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Phone Number</label>
                                                <input placeholder='' onChange={handleChange} name='phone_number' required type="text" className='py-2 px-4 w-full outline-none order rounded-lg border-gray-400 focus:border-green-500 c-text-input' />
                                            </Grid>
                                            <Grid item lg={6} md={12} className='w-full'>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Password</label>
                                                <div className="relative">
                                                    <input placeholder='' name='password' onChange={handleChange} required type={text ? "text" : "password"} className='py-2 px-4 w-full outline-none order rounded-lg border-gray-400 focus:border-green-500 c-text-input' />
                                                    <IconButton className="absolute left-[80%]  md:left-[90%] bottom-10" onClick={togglePassword}>
                                                        {text ? (<VisibilityOffIcon />) : (<VisibilityIcon />)}
                                                    </IconButton>
                                                </div>
                                            </Grid>
                                            <Grid item lg={6} md={12} className='w-full'>
                                                <label className='text-sm font-bold block my-2 text-gray-700'>Confirm Password</label>
                                                <div>
                                                    <input placeholder='' name='confirm_password' onChange={handleChange} required type={text ? "text" : "password"} className='py-2 px-4 order rounded-lg border-gray-400 focus:border-green-500 w-full outline-none c-text-input' />
                                                    <IconButton className="absolute left-[90%] bottom-10" onClick={togglePassword}>

                                                        {text ? (<VisibilityOffIcon />) : (<VisibilityIcon />)}
                                                    </IconButton>
                                                </div>

                                            </Grid>
                                        </Grid>

                                        <div className=' mb-6'>
                                            <p className='text-sm font-bold text-gray-500'> Signing up to 
                                                <span className='c-primary-color'> Fourierpay</span> account means you agree to our
                                                {/* <span className='c-primary-link-color'> Terms</span> and */}
                                                <span className=''> Terms</span> and
                                                <span className=''> Privacy Policy</span></p>
                                        </div>

                                        <div className='md:block hidden'>
                                            <button disabled={loading ? true : false} className='c-primary-button'>
                                                {loading ? 'Loading....' : 'Get Started'}
                                            </button>
                                        </div>
                                        <div className='block md:hidden'>
                                            <button disabled={loading ? true : false} className='c-primary-button w-full'>
                                                {loading ? 'Loading....' : 'Get Started'}
                                            </button>
                                        </div>
                                    </form>
                                    <div className='py-4'>
                                        <p className="text-gray-700 ">Already have an account?
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